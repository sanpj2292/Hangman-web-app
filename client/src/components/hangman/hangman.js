import React, { useContext } from "react";
import { AppContext } from "../../contexts/context-provider";

const Hangman = (props) => {
    const { attempts, totalAttempts } = useContext(AppContext);
    const fillPercent = 100 * (1 - (attempts / totalAttempts));
    const stroke = `rgba(${Math.round(2.55 * fillPercent)},0,0,0.8)`;
    return (
        <>
            {attempts < totalAttempts ?
                <>
                    <circle cx="58%" cy="30%" r={`${0.06 * fillPercent}%`} fill={stroke} />
                    <rect width="1.2%" height={`${0.20 * fillPercent}%`} x="57.4%" y="30%"
                        fill={stroke} />
                    <line x1="58%" y1="40%"
                        x2={`${58 + (0.06 * fillPercent)}%`}
                        y2={`${40 + (0.06 * fillPercent)}%`} stroke={stroke} strokeLinecap="round" strokeWidth="1.2%" />
                    <line x1="58%" y1="40%"
                        x2={`${58 + ((0.58 - 0.64) * fillPercent)}%`}
                        y2={`${40 + (0.06 * fillPercent)}%`} stroke={stroke} strokeLinecap="round" strokeWidth="1.2%" /> */
                    <line x1="58%" y1="50%"
                        x2={`${58 - (0.06 * fillPercent)}%`}
                        y2={`${50 + (0.1 * fillPercent)}%`} stroke={stroke} strokeLinecap="round" strokeWidth="1.2%" />
                    <line x1="58%" y1="50%"
                        x2={`${58 + (0.06 * fillPercent)}%`}
                        y2={`${50 + (0.10 * fillPercent)}%`} strokeLinecap="round" stroke={stroke} strokeWidth="1.2%" />
                </> : null}
        </>

    );
}

export default Hangman;