import styled from "styled-components";

const GameContainer = styled.div`
    max-width: 90%;
    max-height: 90%;
    margin-top: 1rem;
    margin-left: 1rem;
    border: 1px solid #d2d7d3;
    box-shadow: 0 0.5rem 1rem #a4a7ab;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;
    padding: 1rem;


    @media screen and (max-width: 480px) {
        max-width: 96%
    }
`;

export default GameContainer;