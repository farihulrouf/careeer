import React, { Component } from "react";
import downArrow from "../assets/images/downArrow.svg";
import upArrow from "../assets/images/upArrow.svg";
class UserProfileAccordion extends Component {
  render() {
    return (
      <div style={{ marginBottom: "16px" }}>
        <div
          onClick={() => this.props.onClick(this.props.title)}
          style={{
            background: "#FFFFFF",
            cursor: "pointer",
            width: "100%",
            height: "71px",
            boxShadow: "1px 4px 12px #00000027",
            display: "flex",
            borderRadius: "8px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              marginLeft: "28px",
            }}
          >
            <img
              src={this.props.icon}
              style={{ height: 38, width: 38 }}
              alt="icon"
            />
            <div
              style={{
                marginLeft: "18px",
                fontFamily: "Open Sans Regular",
                fontSize: "16px",
                color: this.props.displayToggle ? "#4D4CAC" : "#3D3D3D",
              }}
            >
              {this.props.title}
            </div>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <img
              src={this.props.displayToggle ? upArrow : downArrow}
              style={{ marginRight: "24px" }}
              alt="arrowIcon"
            />
          </div>
        </div>
        <div
          style={{
            minHeight: "50px",
            boxShadow: "1px 4px 12px #00000027",
            borderRadius: "8px",
            display: this.props.displayToggle ? "block" : "none",
            padding: this.props.title === "Activity Log" ? "20px" : "",
            background: this.props.title === "Activity Log" ? "#FFFFFF" : "",
          }}
        >
          {this.props.component}
        </div>
      </div>
    );
  }
}
export default UserProfileAccordion;
