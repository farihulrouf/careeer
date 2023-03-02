import React, { Component } from "react";
import Button from "./Button";
import UserGroup from "../assets/images/userGroup.svg";
import ProfilePicture from "../assets/images/defaultProfile.svg";
import InputField from "./InputField";
const styles = {
  DiscussionCard: {
    height: "100%",
    width: "100%",
  },
  DiscussionMainCard: {
    height: "100%",
    background: "#FFFFFF",
    borderRadius: "8px",
    opacity: "1",
    display: "flex",
    flexDirection: "column",
    padding: "0 20px",
  },
  DiscussionHeading: {
    flex: 0.15,
    fontFamily: "Open Sans Semibold",
    fontSize: "1em",
    color: "#303030",
    opacity: "1",
    padding: "1px",
  },
  DiscussionProfile: {
    display: "flex",
    alignItems: "center",
  },
  profileimage: {
    display: "flex",
  },
  profilephoto: {
    width: "68px",
    height: "68px",
    borderRadius: "50%",
  },
  profiles: {
    paddingLeft: "14px",
  },
  name: {
    color: "#303030",
    opacity: 1,
    fontSize: "0.875em",
  },
  designation: {
    fontSize: "0.875em",
    color: "#767676",
    opacity: 1,
  },
  skillScore: {
    fontSize: "0.875em",
    color: "#767676",
    opacity: 1,
  },
  DiscussionDetails: {
    flex: 1,
    paddingBottom: "50px",
  },
  carrerPathdiv: {
    display: "flex",
    marginTop: 30,
  },
  careerPathHeading: {
    fontSize: "0.875em",
    color: "#303030",
    flex: 0.3,
  },
  careerPath: {
    fontSize: "0.875em",
    color: "#767676",
    flex: 1,
  },
  notediv: {
    display: "flex",
    marginTop: 30,
  },
  noteHeading: {
    fontSize: "0.875em",
    color: "#303030",
    flex: 0.3,
  },
  noteTextarea: {
    flex: 1,
    fontSize: "0.875em",
  },
  note: {
    fontSize: "0.875em",
    color: "#767676",
    width: "94%",
    background: "#F7F7F751",
    border: "1px solid #E2E2E2",
    borderRadius: "4px",
    outline: "none",
    resize: "none",
    padding: "14px 0px 0px 16px",
  },
  Discussionbuttons: {
    flex: 0.2,
    padding: "0 24px 32px 0",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    fontFamily: "Open Sans Semibold",
    fontSize: "0.875em",
  },
  DenyButton: {
    margin: "5px",
    background: "#FFFFFF ",
    border: "1px solid #FF808B",
    borderRadius: "4px",
    font: "14px/20px Open Sans",
    color: "#FF808B",
    width: "106px",
    height: "40px",
    opacity: 1,
  },
  ProposeButton: {
    margin: "5px",
    width: "128px",
    height: "40px",
    background: "#FF808B",
    border: "1px solid #FF808B",
    font: "14px/20px Open Sans",
    borderRadius: "4px",
    color: "#FFFFFF",
  },
};
export default class CareerDiscussion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      DetailsofPerson: [],
      note: "",
    };
  }
  onChange = (note) => {
    this.setState({
      note,
    });
  };
  approvalHandler = (status, employeeId, note, careerPathApprovalId) => {
    this.props.approvalHandler(status, employeeId, note, careerPathApprovalId);
    this.setState({
      note: "",
    });
  };
  render() {
    return (
      <div style={styles.DiscussionCard}>
        <div style={styles.DiscussionMainCard}>
          {this.props.showDataOfCareerDiscussion ? (
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={styles.DiscussionHeading}>Career Discussion</div>
              <div style={styles.DiscussionProfile}>
                <div style={styles.profileimage}>
                  <img
                    style={styles.profilephoto}
                    src={this.props.profilePicture || ProfilePicture}
                    alt="profile"
                  ></img>
                </div>
                <div style={styles.profiles}>
                  <div style={styles.name}>
                    {this.props.firstName +
                      " " +
                      this.props.middleName +
                      " " +
                      this.props.lastName}
                  </div>
                  <div style={styles.designation}>
                    {" "}
                    {this.props.designation}
                  </div>
                  <div style={styles.skillScore}>
                    Skill Score: {this.props.skillScore}
                  </div>
                </div>
              </div>
              <div style={styles.DiscussionDetails}>
                <div style={styles.carrerPathdiv}>
                  <div style={styles.careerPathHeading}>
                    Selected Career Path
                  </div>
                  <div style={styles.careerPath}>
                    {this.props.selectedCareerPath === "UPWARD"
                      ? "Within Department"
                      : "Alternate Career"}
                  </div>
                </div>
                <div style={styles.carrerPathdiv}>
                  <div style={styles.careerPathHeading}>Desired Role</div>
                  <div style={styles.careerPath}>{this.props.desiredRole}</div>
                </div>
                <div style={styles.notediv}>
                  <div style={styles.noteHeading}>Add Note</div>
                  <div style={styles.noteTextarea}>
                    <InputField
                      type="textArea"
                      placeHolder="Type here"
                      error={false}
                      required={true}
                      onChange={this.onChange}
                      value={this.state.note}
                      rows="2"
                    />
                  </div>
                </div>
              </div>
              <div style={styles.Discussionbuttons}>
                <div
                  style={{ width: 106 }}
                  onClick={() =>
                    this.approvalHandler(
                      0,
                      this.props.employeeId,
                      this.state.note,
                      this.props.careerPathApprovalId
                    )
                  }
                >
                  <Button
                    label={"Deny"}
                    styles={{
                      color: "#FF808B",
                      backgroundColor: "#ffffff",
                      border: "#FF808B",
                      height: "40px",
                    }}
                  />
                </div>
                <div
                  style={{ width: 128, marginLeft: 16 }}
                  onClick={() =>
                    this.approvalHandler(
                      1,
                      this.props.employeeId,
                      this.state.note,
                      this.props.careerPathApprovalId
                    )
                  }
                >
                  <Button
                    label={"Propose"}
                    styles={{
                      color: "#FFFFFF",
                      backgroundColor: "#FF808B",
                      border: "#FF808B",
                      height: "40px",
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingTop: 160,
                }}
              >
                <img
                  src={UserGroup}
                  alt="data"
                  style={{ height: 135, width: 135 }}
                />
                <div
                  style={{
                    marginTop: 12,
                    fontFamily: "Open Sans Semibold",
                    fontSize: "1.126em",
                  }}
                >
                  No Career Path Has Been Selected
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
