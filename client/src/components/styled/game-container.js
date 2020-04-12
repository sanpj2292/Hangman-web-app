import styled from "styled-components";

const GameContainer = styled.div`
    width: 60%;
    background: #c2c2a4;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 8px;


    @media screen and (max-width: 480px) {
        width: 96%
    }
`;

export default GameContainer;