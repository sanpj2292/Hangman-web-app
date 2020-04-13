import styled from "styled-components";

// const BatteryContainer = styled.div`
// display: flex;
// content: " ";
// border: 1px solid #fff;
// border-bottom-left-radius: 0.25rem;
// border-top-left-radius: 0.25rem;
// border-top-right-radius: 0.25rem;
// border-bottom-right-radius: 0.25rem;
// width: 20%;
// height: 90%;

//     &:after {
//         display: block;
//         content: " ";
//         position: relative;
//         top: -2%;
//         left: 40%;
//         width: 20%;
//         height: 2%;
//         background: #fff;
//         border-top-left-radius: 25%;
//         border-top-right-radius: 25%;
//     }
// `;

const BatteryContainer = styled.div`
    position: relative;
    border: 1px solid #fff;
    border-bottom-left-radius: 0.5rem;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    height: 1rem;
    width: 70%;
    margin: 0.5rem auto;

    & span{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 0.75rem;
        color: ${props => props.width < 50 ? 'hsl(0,0%,0%)' : 'hsl(0,0%,100%)'}
    }
`;

export default BatteryContainer;