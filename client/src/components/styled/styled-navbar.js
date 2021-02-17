import React, { useContext } from 'react';
import styled from 'styled-components';
import GoogleButton from "react-google-button";
import { OptionLink, OptionsContainer } from "./styled-navigation-options";
import { AppContext } from "../../contexts/context-provider";

const Nav = styled.nav`
  width: 100%;
  height: 3.25rem;
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
    height: 2.3rem;
  }

  .nav-text {
    color: #e7ded6;
  }

`;

const onLogin = async () => {
  try {
      window.open('http://localhost:3001/api/auth/google/', '_self');
  } catch (error) {
      console.error(error);
  }
}

const onLogout = async () => {
  try {
    window.open('http://localhost:3001/api/auth/google/logout', '_self');
  } catch (error) {
    console.error(error);
  }
}

const Navbar = () => {
  const { isAuthenticated, dispatch } = useContext(AppContext);
  return (
    <Nav>
      <div className="row logo">
        <img className='nav-icon' src='/vocabuilder.ico' alt='FunGamers'></img>
        <h3 className='nav-text'>FunGamers</h3>
      </div>
      <OptionsContainer>
        {
          isAuthenticated ? <OptionLink onClick={onLogout}> Logout </OptionLink> :
          <GoogleButton style={{height: '3.1rem', marginRight: '0.15rem'}} onClick={onLogin} />
        }
        {/* <OptionLink to="/login" mLeft='1rem'>Login</OptionLink> */}
        <OptionLink to="/">Vocabuilder</OptionLink>
        <OptionLink to="/league">Super League</OptionLink>
      </OptionsContainer>
    </Nav>
  )
}

export default Navbar