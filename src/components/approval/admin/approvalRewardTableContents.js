import React, { Component } from "react";
import DisplayPicture from "../../DisplayPicture";
import { Checkbox } from "antd";
import "antd/dist/antd.css";

class RewardTableRow extends Component {
  render() {
    return (
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          minHeight: 58,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          fontFamily: "Open Sans Regular",
          fontSize: "1em",
          color: "#303030",
          background: "#FFFFFF",
          borderRadius: "4px",
        }}
      >
        <tbody>
          <tr
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1.5fr 0.8fr 0.8fr 1.5fr",
              alignItems: "center",
              flex: 1,
            }}
          >
            <td style={{ flex: 0.7, display: "flex", alignItems: "center" }}>
              <div style={{ padding: "10px" }}>
                <Checkbox
                  onClick={this.props.onClickCheckbox}
                  checked={this.props.checkStatus}
                  className="custom-checkbox"
                />
              </div>
              <div
                style={{
                  flex: 0.25,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <div
                  style={{
                    height: 34,
                    width: 34,
                    marginRight: "20%",
                  }}
                >
                  <DisplayPicture profile={this.props.profilePicture} />
                </div>
              </div>
              <div style={{ flex: 0.9 }}>
                <div style={{ flex: 1, marginBottom: "1%" }}>
                  {(this.props.employeeFirstName || "") +
                    " " +
                    ((this.props.employeeMiddleName || "") + " ") +
                    this.props.employeeLastName || ""}
                </div>
                <div style={{ fontSize: "0.858em", color: "#767676" }}>
                  {this.props.designation}
                </div>
              </div>
            </td>
            <td style={{ flex: 0.5 }}>{this.props.department}</td>
            <td style={{ flex: 0.4 }}>{this.props.totalBadges}</td>
            <td style={{ flex: 0.4, display: "flex", alignItems: "center" }}>
              <img
                src={require("../../../assets/images/smallStar.svg")}
                style={{ marginRight: "5px" }}
                alt="starImg"
              />
              {this.props.earnedPoints}
            </td>
            <td
              style={{
                flex: 0.6,
                display: "flex",
                alignItems: "center",
                fontSize: "0.875em",
              }}
            >
              <div>
                <img src={require("../../../assets/images/reward.png")} alt="reward" />
              </div>
              <div style={{ marginLeft: "10px" }}>
                <div style={{ whiteSpace: "nowrap" }}>
                  {this.props.rewardDetails}
                </div>
                <div>3D/2D</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default RewardTableRow;
