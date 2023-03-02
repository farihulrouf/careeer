import React, { Component } from "react";
import ProfilePicture from "../../../assets/images/defaultProfile.svg";
import TimeStampToDate from "../../../core/lib/TimeStampToDate";
import { COLORS } from "../../../theme";
const styles = {
  RequestDetailsDiv: {
    padding: "6px",
    display: "flex",
    alignItems: "center",
    margin: "3px",
  },
  RequestImage: {
    flex: 0.2,
    margin: "3px",
  },
  Requestprofileimage: {
    width: "48px",
    height: "48px",
    borderRadius: "100%",
    marginLeft: "4px",
    background: COLORS.GREY_T_96,
  },
  RequestName_Desgination: {
    flex: 1,
    marginLeft: "12px",
  },
  Requestname: {
    opacity: 1,
    display: "flex",
  },
  Requestdesignation: {
    fontSize: "0.75em",
    color: "#767676",
    opacity: 1,
  },
  RequestDate: {
    margin: "3px",
    display: "flex",
    justifyContent: "flex-end",
    fontSize: "0.75em",
    color: "#767676",
  },
};
export default class PathRequest extends Component {
  state = {
    bgColor: "#FFFFFF",
    activeHover: false,
  };
  mouseLeaveHandler = () => {
    this.setState({ bgColor: "#FFFFFF", activeHover: false });
  };
  mouseOverHandler = () => {
    this.setState({ bgColor: "#f5f3f3", activeHover: true });
  };
  render() {
    return (
      <div
        onMouseMove={this.mouseOverHandler}
        onMouseLeave={this.mouseLeaveHandler}
        style={{
          padding: "6px",
          display: "flex",
          alignItems: "center",
          background:
            this.props.selectedIndex === this.props.index ||
              this.state.activeHover
              ? "#F6F6FB"
              : "#FFFFFF",
          cursor: "pointer",
          borderLeft:
            this.props.selectedIndex === this.props.index
              ? "5px solid #4D4CAC"
              : "5px solid #FFFFFF",
          paddingRight: 20,
        }}
      >
        <div style={styles.RequestImage}>
          <img
            style={styles.Requestprofileimage}
            src={this.props.profilePicture || ProfilePicture }
            alt="profilePic"
          ></img>
        </div>
        <div style={styles.RequestName_Desgination}>
          <div style={styles.Requestname}>
            <div style={{ fontSize: "0.875em", color: "#303030", flex: 1 }}>
              {this.props.firstName ? this.props.firstName + " " : ""}
              {this.props.middleName ? this.props.middleName + " " : ""}
              {this.props.lastName ? this.props.lastName : ""}
            </div>
            <div style={styles.RequestDate}>
              {TimeStampToDate(this.props.createdDate)}
            </div>
          </div>
          <div style={styles.Requestdesignation}>{this.props.designation}</div>
        </div>
      </div>
    );
  }
}
