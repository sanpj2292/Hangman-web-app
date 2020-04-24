import React from "react";
import "./scaffold.css";

export default class HangmanScaffold extends React.Component {

    // An <SVG /> element. Defines the scaffolding we see on the main page. Defined only to reduce rendering time by setting
    // shouldComponentUpdate false for this element.

    // Props: None
    // State: None.

    // saves important re-rendering time when Parent has to update. This NEVER needs to change.
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    // 
    render() {
        return (
            <div className='scaffold-container'>
                <svg version="1.1" viewBox="0 0 100 100" width='40%' height='80%' preserveAspectRatio="xMinYMin meet" >
                    <rect fill="#053544" width="2%" height="80%" x="4%" y="0" />
                    <rect fill="#053544" width="60%" height="2%" x="4%" y="0" />
                    <rect fill="#053544" width="60%" height="2%" x="0" y="80%" />
                    <line x1="58%" y1="0" x2="58%" y2="24%" stroke="rgb(0,0,0)" />
                </svg>
            </div>
        );
    }
};