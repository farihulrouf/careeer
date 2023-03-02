import React from "react";
import styled from "styled-components";
import DefaultImage from "../assets/images/defaultProfile.svg";
const Div = styled.div`
  display: flex;
  flex-direction: column;
  height: inherit;
  width: 100%;
  box-shadow: 0px 2px 7px #0000002e;
  border-radius: 10px;
  font-family: "Open Sans Regular";
  .imageContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1.3;
    position: relative;
  }
  .image {
    height: 40px;
    width: 40px;
    border-radius: 100%;
  }
  .textContainer {
    display: flex;
    align-items: center;
    flex-direction: column;
    flex: 1.2 1 0%;
    line-height: 18px;
  }
  .title {
    font-size: 14px;
    font-family: "Open Sans Semibold";
    color: #303030;
  }
  .viewTitle {
    margin-top: 6.5%;
    font-size: 0.75em;
    color: #f46773;
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default function HiddenEmployeesDisplay(props) {
  return (
    <Div>
      <div className="imageContainer">
        {props.images.map((image, index) => {
          return (
            <div
              style={{
                position: "absolute",
                right: 20 + index * 12 + "%",
                zIndex: 3 - index,
              }}
              key={index}
            >
              <img className="image" src={image || DefaultImage} alt="profilePic2" />
            </div>
          );
        })}
      </div>
      <div className="textContainer">
        <div className="title">{props.title}</div>
        <div style={{ fontSize: "12px", color: "#767676" }}>
          {props.subtitle}
        </div>
        <div className="viewTitle" onClick={props.viewHandler}>
          {props.linkTitle}
        </div>
      </div>
    </Div>
  );
}
