import React from "react";
import "../assets/css/EmployeeUserProfileCard.css";
import defaultProfile from "../assets/images/defaultProfile.svg";
import profileDots from "../assets/images/profileDots.svg";
import { COLORS } from "../theme";

export default class DashboardUserProfileCard extends React.Component {
  render() {
    const employee = this.props.professionalDetails;
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          borderRadius: "8px",
          background: "#FFFFFF",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        }}
      >
        <div
          style={{
            flex: 0.65,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <div style={{ position: "relative", left: "10px", bottom: "12px" }}>
            <img src={profileDots} alt="profileDots" />
          </div>
          <div
            style={{
              position: "relative",
              cursor: "pointer",
            }}
            onClick={() => this.props.toggleUploadPicDrawer()}
          >
            <img
              src={this.props.profileURL || defaultProfile}
              style={{
                transform: `rotate(${this.props.updateRotation}deg)`,
                borderRadius: "100%",
                width: "116px",
                height: "115px",
                background: COLORS.GREY_T_96,
              }}
              alt="profilePic"
            />
            <div className="camera">
              <img src={require("../assets/images/photo-camera.svg")} alt="camera" />
            </div>
          </div>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              marginLeft: "26px",
            }}
          >
            <div className="name">
              {(employee.firstName || "") +
                " " +
                `${employee.middleName || ""}` +
                " " +
                (employee.lastName || "")}
            </div>
            <div className="role">{employee.designation || ""}</div>
          </div>
        </div>
      </div>
    );
  }
}
