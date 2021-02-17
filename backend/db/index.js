const { Pool } = require('pg');
const queries = require('./queries');

const pool = new Pool({
    database: 'ipl',
    user: 'postgres',
    host: 'localhost',
    password: process.env.POSTGRES_ACCOUNT_PWD,
    port: 5432,
});

pool.queries = queries.reduce((obj, item) => (obj[item.name] = item, obj) ,{});

async function query(text, params) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('executed query', { text, duration, rows: res.rowCount });
  return res;
}

async function getClient() {
  const client = await pool.connect();
  const query = client.query;
  const release = client.release;
  // set a timeout of 5 seconds, after which we will log this client's last query
  const timeout = setTimeout(() => {
    console.error('A client has been checked out for more than 5 seconds!');
    console.error(`The last executed query on this client was: ${client.lastQuery}`);
  }, 5000);
  // monkey patch the query method to keep track of the last query executed
  client.query = (...args) => {
    client.lastQuery = args
    return query.apply(client, args)
  };
  client.release = () => {
    // clear our timeout
    clearTimeout(timeout)
    // set the methods back to their old un-monkey-patched version
    client.query = query
    client.release = release
    return release.apply(client)
  };
  return client;
}

async function executeQuery(queryName, ...args) {
  const client = await getClient();
  try {
    const query = pool.queries[queryName];
    query.values = args;
    const res = await client.query(query);
    return { isError: false, result: res };
  } catch (error) {
    console.log(error);
    return { isError: true, ...error };
  } finally {
    client.release();
  }
}

module.exports = {
  query,
  getClient,
  executeQuery,
};