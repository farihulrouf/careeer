import React, { Component } from "react";
import { Button } from "antd";
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
    background: #ffffff;
    boxshadow: 0px 3px 6px #00000029;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: ${(props) => (props.width === undefined ? "25%" : props.width)};
    border-radius: 8px;
  }
`;

class PopUpDisplay extends Component {
  state = {
    cancelButtonHover: false,
    saveButtonHover: false,
  };
  buttonHover = (state) => {
    if (state === "cancel") {
      this.setState({ cancelButtonHover: true });
    } else {
      this.setState({ saveButtonHover: true });
    }
  };
  buttonHoverMove = (state) => {
    if (state === "cancel") {
      this.setState({ cancelButtonHover: false });
    } else {
      this.setState({ saveButtonHover: false });
    }
  };
  render() {
    return (
      <Div className="popUpModelView" width={this.props.width}>
        <div className="modal-content">
          <div
            style={{
              display: "flex",
              minHeight: "24%",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2
              style={{
                display: this.props.title === undefined ? "none" : "flex",
              }}
            >
              {this.props.title}
            </h2>
            <h3 style={{ color: "#303030", textAlign: " center" }}>
              {this.props.subTitle}
            </h3>
            <div style={{ display: "flex", marginTop: "12px" }}>
              <Button
                onMouseEnter={() => this.buttonHover("cancel")}
                onMouseLeave={() => this.buttonHoverMove("cancel")}
                onClick={() => this.props.popUpHandler(false)}
                type="primary"
                style={{
                  opacity: this.state.cancelButtonHover ? 0.7 : 1,
                  height: "30px",
                  width: "80px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#FF808B",
                  border: "1px solid #FF808B",
                  borderRadius: "4px",
                  background: "inherit",
                  marginRight: "14px",
                }}
              >
                No
              </Button>
              <Button
                onMouseEnter={() => this.buttonHover("save")}
                onMouseLeave={() => this.buttonHoverMove("save")}
                onClick={() => this.props.popUpHandler(true)}
                type="primary"
                style={{
                  opacity: this.state.saveButtonHover ? 0.7 : 1,
                  height: "30px",
                  width: "80px",
                  fontSize: "14px",
                  fontWeight: "600",
                  border: "none",
                  borderRadius: "4px",
                  background: "#FF808B",
                }}
              >
                Yes
              </Button>
            </div>
          </div>
        </div>
      </Div>
    );
  }
}

export default PopUpDisplay;
