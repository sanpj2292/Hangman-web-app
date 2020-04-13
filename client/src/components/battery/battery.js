import React, { Fragment } from 'react';

import BatteryContainer from "../styled/battery/battery-container";
import BatteryFiller from "../styled/battery/battery-filler";

const Battery = ({ actual, total }) => {
    return (
        <Fragment>
            <BatteryContainer>
                <BatteryFiller width={100 * (1 - (actual / total))} />
                <span>{actual}/{total}</span>
            </BatteryContainer>
        </Fragment>
    );
}

    ;

export default Battery;