import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  width: 100%;
  height: 55px;
  border-bottom: 2px solid #E7E7E7;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  background-color: #034e67;
  /* background-image: linear-gradient(to right, #6a8da2, #7ba3bb); */
  .logo {
    padding: 8px 0;
  }

  .nav-icon {
    padding: 2px 4px;
    height: 35px;
  }

  .nav-text {
    color: #e7ded6;
  }
`

const Navbar = () => {
  return (
    <Nav>
      <div className="row logo">
        <img className='nav-icon' src='/vocabuilder.ico' alt='Vocabuilder'></img>
        <h3 className='nav-text'>VocaBuilder</h3>
      </div>
    </Nav>
  )
}

export default Navbar