import React from "react";
import styled from "styled-components";
import GoogleButton from "react-google-button";

export const LoginContainer = styled.div`
    background-color: blueviolet;
    width: 40%;
    height: 75%;
    margin: 0.5rem auto;
    border: 1px solid #d2d7d3;
    box-shadow: 0 0.5rem 1rem #a4a7ab;
    padding: 1rem;
    background-color: #f8f9fa;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width: 900px) {
        width: 70%;
        margin: 0.25rem auto;
    }


    @media screen and (max-width: 768px) {
        width: 90%;
        margin: 0.25rem auto;
    }
`;

const LoginInput = styled.input.attrs(props => {
    const { type, size, mtop, mbot, ...otherProps } = props;
    return {
        type: type,
        size: size || '0.15rem',
        mtop: mtop || '0.5rem',
        mbot: mbot || '0rem',
        ...otherProps
    };
})`
    font-size: 1em;
    border: 0.09rem solid #d2d7d3;
    outline: none;
    border-radius: 3px;

    /* here we use the dynamically computed prop */
    margin: ${props => `${props.mtop} ${props.size} ${props.mbot} ${props.size}`};
    transition: all 0.1s ease-in-out;

    &:focus {
        box-shadow: 0 0 0.75rem #356BEA;
        padding: 0.3rem 0px 0.3rem 0.3rem;
        margin: 0.5rem 0.1rem 0.3rem 0px;
    }
`;

const Label = styled.h6`
    margin-bottom: 0.25rem;
`;

const LoginButton = styled.button`
    background: #154CCB;
    padding: ${props => props.padding || '0.4rem'};
    margin-top: 2rem;
    margin-bottom: 2rem;
    text-justify: center;
    color: #fff;
    outline: none;
    border: none;
    box-shadow: 0 0.25rem 1rem #a4a7ab;
    border-radius: 0.1rem;
    transition: 0.01s all ease-in-out;

    &:active {
        transform: translateY(0.2rem);
        box-shadow: 0 0.25rem 1rem #a4a7ab;
    }

    &:focus {
        outline: none;
    }
`;

const onLogin = async () => {
    try {
        window.open('http://localhost:3001/api/auth/google/', '_self');
    } catch (error) {
        console.error(error);
    }
}

export default props => {
    // const { onLogin } = props;
    return (
        <LoginContainer>
            {/* <Label size="1rem" mtop="0">Username</Label>
            <LoginInput type='text' placeholder='Enter your username' mbot='0.75rem' />
            <Label size="1rem" mtop="1.6rem">Password</Label>
            <LoginInput type='password' placeholder='Enter your password' />
            <LoginButton onClick={onLogin}>Login</LoginButton> */}
            <GoogleButton onClick={onLogin} />
        </LoginContainer>
    );
};