import React, { Component } from "react";
import Active from "../assets/svg/active.svg";
import OnNotice from "../assets/svg/onNotice.svg";
import InActive from "../assets/svg/inactive.svg";
import DotedMenu from "../assets/svg/dotedMenu.svg";
import DisplayPicture from "./DisplayPicture";
const styles = {
  checkBoxIcon: {
    flex: 0.1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  CheckBox: {
    fontSize: "20px",
    color: "#B2B2B2",
    background: "#F7F7F7",
  },
  nameAndProfile: { flex: 0.8, display: "flex", alignItems: "center" },
  designation: { flex: 0.7, paddingRight: 30 },
  department: { flex: 0.6 },
  score: { flex: 0.4 },
  role: { flex: 0.5, display: "flex", fontSize: 14 },
  date: { flex: 0.5 },
  status: { flex: 0.3 },
  dotsIcon: { flex: 0.05, zIndex: 3, outline: "none" },
  popUpContainer: {
    position: "absolute",
    right: "2%",
    top: "65%",
    height: "74px",
    width: "121px",
    borderRadius: "8px",
    boxShadow: " 1px 4px 12px #00000027",
    background: "#FFFFFF",
    display: "flex",
    color: "#303030",
    flexDirection: "column",
    justifyContent: " space-evenly",
    paddingLeft: "12px",
    zIndex: 4,
  },
};

class AdminUserManagement extends Component {
  state = {
    menuClicked: false,
    status: this.props.status,
    bgColor: "#FFFFFF",
  };
  menuClickedHandler = () => {
    this.setState({
      menuClicked: !this.state.menuClicked,
    });
  };
  statusClickedHandler = (status, id) => {
    this.setState(
      {
        menuClicked: false,
      },
      () => this.props.statusHandler(status, id)
    );
  };
  doHoverHandler = () => {
    this.setState({
      bgColor: "#ecebeb",
    });
  };
  removeHoverHandler = () => {
    this.setState({
      bgColor: "#FFFFFF",
    });
  };
  closeMenu = () => {
    this.setState({
      menuClicked: false,
    });
  };
  render() {
    return (
      <div
        onMouseEnter={this.doHoverHandler}
        onMouseLeave={this.removeHoverHandler}
        style={{
          width: "100%",
          minHeight: "50px",
          display: "flex",
          alignItems: "center",
          position: "relative",
          fontSize: "14px",
          color: "#303030",
          cursor: "pointer",
          background: this.state.bgColor,
          fontFamily: "Open Sans Regular",
          borderRadius: 8,
        }}
      >
        <div
          onClick={() => this.props.onClickOfList(this.props)}
          style={{ flex: 1.5, display: "flex", alignItems: "center" }}
        >
          <div style={styles.checkBoxIcon}></div>
          <div style={styles.nameAndProfile}>
            <div style={{ width: "34px", height: "34px", marginRight: "10px" }}>
              <DisplayPicture profile={this.props.profile} />
            </div>
            <div>{this.props.name}</div>
          </div>
          {this.props.role}
          <div style={styles.designation}>{this.props.designation}</div>
          <div style={styles.department}>{this.props.department}</div>
          <div style={styles.score}>{Math.round(this.props.icScore)}</div>
          <div style={styles.date}>
            {this.props.employeeType || "New Joinee"}
          </div>
          <div style={styles.status}>
            <img
              src={
                this.props.status === "Active"
                  ? Active
                  : this.props.status === "On Notice"
                  ? OnNotice
                  : InActive
              }
              alt="icon"
            />
          </div>
        </div>
        <div
          onBlur={this.closeMenu}
          onClick={this.menuClickedHandler}
          style={styles.dotsIcon}
          tabIndex="1"
        >
          <img src={DotedMenu} style={{ cursor: "pointer" }} alt="icon" />
        </div>
        {this.state.menuClicked && (
          <div style={styles.popUpContainer}>
            {this.props.status === "Active" && (
              <div
                style={{ cursor: "pointer" }}
                onMouseDown={() => this.statusClickedHandler("Inactive", 0)}
              >
                Inactive
              </div>
            )}
            {this.props.status === "Active" && (
              <div
                style={{ cursor: "pointer" }}
                onMouseDown={() => this.statusClickedHandler("On Notice", 2)}
              >
                On Notice
              </div>
            )}
            {this.props.status === "On Notice" && (
              <div
                style={{ cursor: "pointer" }}
                onMouseDown={() => this.statusClickedHandler("Active", 1)}
              >
                Active
              </div>
            )}
            {this.props.status === "On Notice" && (
              <div
                style={{ cursor: "pointer" }}
                onMouseDown={() => this.statusClickedHandler("Inactive", 0)}
              >
                Inactive
              </div>
            )}
            {this.props.status === "Inactive" && (
              <div
                style={{ cursor: "pointer" }}
                onMouseDown={() => this.statusClickedHandler("Active", 1)}
              >
                Active
              </div>
            )}
            {this.props.status === "Inactive" && (
              <div
                style={{ cursor: "pointer" }}
                onMouseDown={() => this.statusClickedHandler("On Notice", 2)}
              >
                On Notice
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default AdminUserManagement;
