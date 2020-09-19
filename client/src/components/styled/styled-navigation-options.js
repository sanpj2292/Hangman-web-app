import styled from "styled-components";
import { Link } from "react-router-dom";

export const OptionLink = styled(Link)`
    /* padding: 10px 15px; */
    height: 100%;
    cursor: pointer;
    margin-left: ${props => `${props.mLeft ? props.mLeft : '0' }`};
    text-decoration: none;
    background-color: #117cb5;
    color: #fff;
    display: flex;
    align-items: center;
    padding: 0 1rem;

    &:hover, &:active {
        color: #fff;
        text-decoration: none;
    }
`;
export const OptionsContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    height: 100%;
    margin-left: 1rem;
    ${OptionLink}:not(:last-child) {
        border-right: 2px solid #234e68;
    }
`;
