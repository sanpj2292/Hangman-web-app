module.exports = [
    {
        name: 'check-user',
        text: 'SELECT "profileId" FROM auth."user" WHERE "profileId"=$1 LIMIT 1',
    },
    {
        name: 'insert-user',
        text: `INSERT INTO auth."user"
            ("profileId", "profileName", email, provider, "imageURL")
            VALUES ( $1, $2, $3, $4, $5) ON CONFLICT DO NOTHING;`,
    },
];