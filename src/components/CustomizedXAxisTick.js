import React from "react";
const customizedAxisTick = (props) => {
  const { x, y, payload } = props;
  const string = payload.value.split(" ");
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        fontSize="1em"
        fontFamily="Open Sans Regular"
        dy={-4}
        textAnchor="middle"
        fill="#3D3D3D"
        color="#3D3D3D"
      >
        <tspan x="0" dy="1em">
          {string[0]}
        </tspan>
        <tspan x="0" dy="1em" y="16">
          {string[1]}
        </tspan>
      </text>
    </g>
  );
};

export default customizedAxisTick;
