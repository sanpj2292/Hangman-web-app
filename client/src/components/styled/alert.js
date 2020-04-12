import React, { useEffect } from 'react';
import styled, { css } from "styled-components";

const StyledAlert = styled.div.attrs(props => ({
    type: props.type || 'info',
    show: props.show
}))`
    width: 50%;
    position: relative;
    margin: 8px auto;
    color: white;
    transition: linear 0.1s;
    ${props => {
        switch (props.type) {
            case 'success':
                return css`
                    background: #80cc33;
                `;
            case 'error':
                return css`
                    background: #ff6666;
                `;
            default:
                return css`
                    background: #808080;
                `;
        }
    }}
    ${props => !props.show ? css`display: none;` : css`display:inline-block;`}

    & span {
        display: inline-block;
        margin: 0 0.5rem;
        font-size: 0.7rem;
        color: #FFF;
        cursor: pointer;
    }
`;

const Alert = (props) => {
    const { type, message, onDismissAlert, timeout } = props;

    useEffect(() => {
        const tmOut = setTimeout(onDismissAlert, timeout ? timeout : 2000);
        return () => clearTimeout(tmOut);
    }, []);


    return (
        <StyledAlert type={type} show={type && type.length > 1}>
            {message}<span onClick={onDismissAlert}>&#10060;</span>
        </StyledAlert>
    );
};

export default Alert;