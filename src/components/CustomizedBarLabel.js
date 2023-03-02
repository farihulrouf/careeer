import React from "react";
const customizedBarLabel = (props) => {
  const { x, y, index } = props;
  const skillType = props[index].skillType;
  const skillStatus = props[index].skillStatus;
  return (
    
    skillStatus == false ? "" :  <g transform={`translate(${x},${y})`}>
      
       <text
        x={15}
        y={0}
        fontSize="1em"
        fontFamily="sans-serif"
        dy={-8}
        textAnchor="middle"
        fill={
          (skillType === "Technical Skills" && "#9C9ED1") ||
          (skillStatus === false || skillType === "Functional Skills" && "#FF8C96") ||
          (skillType === "Interpersonal Skills" && "#7A94EB") ||
          "#FFB97D"
        }
      >
        {(Math.round(
         (props[index].gainedSkills / props[index].totalSkills) * 100
        )) }
        %
      </text> 
    </g> 
  );
};

export default customizedBarLabel;
