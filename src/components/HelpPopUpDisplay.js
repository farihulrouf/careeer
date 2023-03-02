import React, { Component } from "react";
import closeImage from "../assets/images/closeImage.svg";
import styled from "styled-components";

const Div = styled.div`
  display: block;
  position: fixed;
  z-index: 25;
  padding-top: 15%;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  font-family: open Sans Regular;
  .modal-content {
    position: relative;
    background: #ffffff;
    boxshadow: 0px 3px 6px #00000029;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: ${(props) => (props.width === undefined ? "25%" : props.width)};
    border-radius: 8px;
  }
  .close {
    cursor: pointer;
    height: 32px;
    width: 32px;
    position: absolute;
    top: 8%;
    right: 3%;
  }
  .heading {
    // flex: 1;
    color: #303030;
    margin-right: 15px;
  }
  .content {
    display: flex;
    align-items: center;
  }
  .value {
    // flex: 1;
  }
`;

class HelpPopUpDisplay extends Component {
  render() {
    return (
      <Div className="popUpModelView" width={this.props.width}>
        <div className="modal-content">
          <div
            style={{
              display: "flex",
              minHeight: "24%",
              flexDirection: "column",
            }}
          >
            <img
              src={closeImage}
              alt="closeIcon"
              className="close"
              onClick={() => this.props.popUpHandler("")}
            />
            <h2
              style={{
                display: this.props.title === undefined ? "none" : "flex",
              }}
            >
              {this.props.title}
            </h2>
            <div className="content">
              <h3 className="heading">Email:</h3>
              <h4 className="value">{this.props.email}</h4>
            </div>
            {this.props.phone && (
              <div className="content">
                <h3 className="heading">Ph no:</h3>
                <h4 className="value">{this.props.phone}</h4>
              </div>
            )}
          </div>
        </div>
      </Div>
    );
  }
}

export default HelpPopUpDisplay;
