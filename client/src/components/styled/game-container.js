import styled from "styled-components";

const GameContainer = styled.div`
    width: 90%;
    height: 90%;
    margin-top: 0.5rem;
    border: 1px solid #d2d7d3;
    box-shadow: 0 0.5rem 1rem #a4a7ab;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;
    padding: 8px;


    @media screen and (max-width: 480px) {
        width: 96%
    }
`;

export default GameContainer;