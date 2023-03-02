import React, { Component } from "react";
import DisplayPicture from "../../DisplayPicture";
import timeStampToDateTime from "../../../core/lib/TimeStampToDateTime";
import "antd/dist/antd.css";
import { Checkbox } from "antd";

class CourseTableRow extends Component {
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
              gridTemplateColumns:
                this.props.selectedSubNavLink.title !== "approved"
                  ? "1.95fr 1.7fr 1fr 1.36fr 0.81fr"
                  : "1.9fr 1.5fr 1fr 1.3fr 0.7fr 0.6fr",
              alignItems: "center",
              flex: 1,
            }}
          >
            <td style={{ flex: 1, display: "flex", alignItems: "center" }}>
              <div
                style={{
                  padding: "10px",
                  display:
                    this.props.selectedSubNavLink.title === "approved"
                      ? "none"
                      : "",
                }}
              >
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
                  <DisplayPicture
                    profile={
                      (this.props.profilePicture &&
                        (this.props.profilePicture.substring(0, 8) ===
                        "https://"
                          ? this.props.profilePicture
                          : `https://dk91y438j4an1.cloudfront.net/${this.props.profilePicture}`)) ||
                      null
                    }
                  />
                </div>
              </div>
              <div style={{ flex: 0.9 }}>
                <div style={{ flex: 1, marginBottom: "1%" }}>
                  {this.props.name || ""}
                </div>
                <div style={{ fontSize: "0.858em", color: "#767676" }}>
                  {this.props.designation || ""}
                </div>
              </div>
            </td>
            <td style={{ flex: 1 }}>{this.props.department || ""}</td>
            <td style={{ flex: 0.55 }}>{this.props.skillScore || 0}</td>
            <td style={{ flex: 1, fontSize: "0.875em" }}>
              <div title={this.props.courseName} style={{ color: "#FF808B" }}>
                {((this.props.courseName &&
                  this.props.courseName.substring(0, 20)) ||
                  "") + "&..."}
              </div>
              <div>
                {timeStampToDateTime(this.props.approvalRequested).date}
              </div>
            </td>
            <td style={{ flex: 0.4 }}>&#8377; {this.props.amount || 0}</td>
            <td
              style={{
                flex: 0.4,
                alignItems: "center",
                justifyContent: "center",
                display:
                  this.props.selectedSubNavLink.title !== "approved"
                    ? "none"
                    : "",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    borderRadius: "15px",
                    backgroundColor: "#E8FAF3",
                    textAlign: "center",
                    marginTop: "2%",
                    color: "#57C079",
                    width: "65%",
                    padding: "4.5px",
                    fontSize: "0.775em",
                  }}
                >
                  Approved
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default CourseTableRow;
