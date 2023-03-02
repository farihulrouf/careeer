import React, { Component } from "react";
import styled from "styled-components";

const ToolSpan = styled.div`
  visibility: hidden;
  display: ${(props) => (props.status === "disable" ? "none" : "flex")};
  width: ${(props) => props.style.width};
  background-color: ${(props) => props.style.backgroundColor};
  color: ${(props) => props.style.color};
  text-align: center;
  font-family: inherit;
  box-shadow: 0px 2px 6px #00000029;
  border-radius: 2px;
  padding: 10px 0px;
  position: absolute;
  z-index: 1;
  top: 125%;
  opacity: 0.6;
  transition: opacity 1s;
  right: 0%;
  margin-left: -60px;
  &:after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 80%;
    margin-left: -5px;
    border-width: 8px;
    border-style: solid;
    border-color: transparent transparent
      ${(props) => props.style.backgroundColor} transparent;
  }
`;

const ToolDiv = styled.div`
  position: relative;
  display: inline-block;
  width: inherit;
  font-family: inherit;
  &:hover ${ToolSpan} {
    visibility: visible;
    opacity: 1;
  }
`;

var style;
class Tooltip extends Component {
  constructor(props) {
    super(props);
    this.propsUpdateHandler();
  }

  propsUpdateHandler = () => {
    style = {
      width:
        (this.props.style && this.props.style.width) === undefined
          ? 148
          : this.props.style.width,
      color:
        (this.props.style && this.props.style.color) === undefined
          ? "#ffffff"
          : this.props.style.color,
      backgroundColor:
        (this.props.style && this.props.style.backgroundColor) === undefined
          ? "#00000094"
          : this.props.style.backgroundColor,
    };
  };

  render() {
    return (
      <ToolDiv>
        {this.props.children}
        <ToolSpan
          style={style}
          status={this.props.status === undefined ? "" : this.props.status}
        >
          <div style={{ display: "flex", padding: "0 15px" }}>
            <div
              style={{
                display: this.props.icon === undefined ? "none" : "flex",
              }}
            >
              <img
                src={this.props.icon}
                style={{
                  marginTop: 3,
                  marginRight: 8,
                  height: 12,
                  width: 12,
                  fontSize: 12,
                }}
                alt="icon"
              />
            </div>
            <div
              style={{
                textAlign: "left",
                fontSize: 14,
                letterSpacing: "0.003em",
                lineHeight: "1.3em",
              }}
            >
              {this.props.title}
            </div>
          </div>
        </ToolSpan>
      </ToolDiv>
    );
  }
}

export default Tooltip;
