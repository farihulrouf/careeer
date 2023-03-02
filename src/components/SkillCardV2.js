import React from "react";
import "../assets/css/OpenSans.css";
const className = {
  title: {
    fontSize: 14,
    paddingBottom: 4,
    fontFamily: "Open Sans Regular",
  },
  percentage: {
    fontFamily: "Open Sans Semibold",
    fontSize: 34,
  },
};

const SkillCardV2 = (props) => {
  return (
    <div
      style={{
        fontFamily: "inherit",
        height: props.style.height,
        width: "175px",
        borderRadius: "8px",
        backgroundColor: props.style.backgroundColor,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#FFFFFF",
      }}
    >
      <div style={className.title}>{props.title}</div>
      <div style={className.percentage}>
        {isNaN(props.percentage) ? 0 : props.percentage}%
      </div>
    </div>
  );
};

export default SkillCardV2;
