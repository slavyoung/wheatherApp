import React from "react";

import './ToolTip.scss';

const Tooltip = ({ feature }) => {
    if (!feature) return null;
    const { temp, pressure, humidity, feels_like: feelsLike } = feature;

    return (
        <div className='tooltip__container' id={`tooltip-${temp}`}>
            <div>
                <div>Temperature</div>
                <div><strong>{temp}</strong></div>
            </div>
            <div>
                <div>Feels Like</div>
                <div>{feelsLike}</div>
            </div>
            <div>
                <div>Pressure</div>
                <div>{pressure}</div>
            </div>
            <div>
                <div>Humidity</div>
                <div>{humidity}</div>
            </div>
        </div>
    );
};

export default Tooltip;
