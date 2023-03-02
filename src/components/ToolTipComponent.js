import React from "react";
import Styled from "styled-components";

const handleColorType = color => {
  switch (color) {
    case "top":
      return "top: 100%;left: 46%;transform: rotate(180deg);";
    case "topRight":
      return "top: 100%;right: 5%;transform: rotate(180deg);";
    case "topLeft":
      return "top: 100%;left: 10%;transform: rotate(180deg);";
    case "rightTop":
      return " top: 10%;right: 100%;transform: rotate(270deg);";
    case "right":
      return " top: 45%;right: 100%;transform: rotate(270deg);";
    case "rightBottom":
      return " top: 85%;right: 100%;transform: rotate(270deg);";
    case "bottomRight":
      return "bottom: 100%;right: 5%;";
    case "bottom":
      return "bottom: 100%;right: 45%;";
    case "bottomLeft":
      return "bottom: 100%;left: 8%;";
    case "left":
      return "top: 46%; left: 100%;transform: rotate(90deg)";
    case "leftTop":
      return "top: 8%; left: 100%;transform: rotate(90deg)";
    case "leftBottom":
      return "bottom: 7%; left: 100%;transform: rotate(90deg)";
    default:
      return "color: #000; background: #eee;";
  }
};

const Div = Styled.div`  
display:inherit;
opacity:inherit;
transition:opacity 0.4s,display 0.4s;
position:absolute;
z-index:1;
flex-direction:column;
font-size:14px;
letter-spacing: 0.02em;
font-family:Open Sans Regular;
width: inherit;
height: inherit;
background-color:inherit;
box-shadow: 1px 4px 12px #00000027;
border-radius:inherit;
top: inherit;
right: inherit;
&:after {
  content: "";
  position: absolute;
  z-index:1;
  ${({ placement }) => handleColorType(placement)};

  margin-left:${props =>
    props.placement === "left" || "leftBottom" || "leftTop" ? "0px" : "-5px"};
  border-width: ${props =>
    props.tipWidth === undefined ? "5px" : props.tipWidth};
  border-style: solid;
  border-color:transparent transparent ${props =>
    props.style.backgroundColor === undefined
      ? "#fff"
      : props.style.backgroundColor} transparent;
}`;

const ToolTipComponent = props => {
  return (
    <Div
      style={props.style}
      tipWidth={props.toolTip.width}
      placement={props.toolTip.placement}
    >
      {props.children}
    </Div>
  );
};

export default ToolTipComponent;
