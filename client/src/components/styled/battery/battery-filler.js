import styled from 'styled-components';

const BatteryFiller = styled.div`
    width: ${props => props.width}%;
    height:100%;
    border-radius: inherit;
    background: ${props => {
        const { width } = props;
        let hue = 240 * (1 - (width / 100));
        let sat = 100 - width;
        return `hsl(${hue},${sat}%,50%)`;
    }};
    transition: background 0.25s linear, width 0.25s ease-in;
    cursor: pointer;
`;

export default BatteryFiller;