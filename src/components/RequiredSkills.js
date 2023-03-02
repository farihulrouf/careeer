import React from "react";
import Styled from "styled-components";
import corner1 from "../assets/images/Mask Group 11.svg";
import corner2 from "../assets/images/Mask Group 12.svg";
import "antd/dist/antd.css";
import { Progress } from "antd";

const Div = Styled.div`
box-shadow: 1px 4px 12px #00000027;
border-radius: 8px;
background:#ffffff;
margin: 10px 10px 15px 0px;
height: 202px;
font-family:Open Sans Regular;
color:#303030;
position:relative;
z-index: 1;
#title{
font-size:16px;
padding:20px 20px 12px 20px;
}
.container{
    display:grid;
    grid-template-columns:0.5fr 1fr;
}
.subTitle{
    font-size:16px;
    font-family:Open Sans Semibold;
    padding-bottom:5px;
    text-transform:capitalize;
}
.unorderList{
    color:#767676;
    font-size:14px;
    overflow-y: auto;
    height: 93px;
    margin-right: 2%;

    &::-webkit-scrollbar {
      width: 3px;
      background-color: #ffffff;
    }
    
    &::-webkit-scrollbar-track {
      background: var(--track-color);
    }
    
    &::-webkit-scrollbar-thumb {
      background: var(--thumb-color);
      border-radius: 20px;
    }
    
    &::-webkit-scrollbar-thumb:hover {
      background: var(--thumb-hover-color);
    }
    &:hover {
      --thumb-color: #bbb9b9;
    }
}

.progress{
    display: flex;
    justify-content: center;
}
`;

const RequiredSkills = (props) => {
  return (
    <Div>
      <img
        style={{
          position: "absolute",
          top: "-32px",
          left: "-27px",
          zIndex: "-1",
        }}
        src={corner1}
        alt="cornerImg"
      />
      <div id="title">{props.title}</div>
      <div className="container">
        <div className="progress">
          <Progress type="dashboard" percent={Math.round(props.percent)} />
        </div>
        <div>
          <div className="subTitle">{props.subTitle}</div>
          <ul className="unorderList">
            {props.list.map((element, index) => (
              <li key={index}>{element}</li>
            ))}
          </ul>
        </div>
      </div>
      <img
        style={{
          position: "absolute",
          bottom: "-61px",
          right: "-65px",
          zIndex: -1,
        }}
        src={corner2}
        alt="cornerImg"
      />
    </Div>
  );
};

export default RequiredSkills;
