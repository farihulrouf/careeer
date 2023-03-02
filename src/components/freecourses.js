import React, { Component } from "react";
import optionsicon from "../assets/images/ic_more_vert.svg";
import ProgressBar from "../components/progress";
import user from "../assets/images/man-user.svg";
import { ClockCircleFilled } from "@ant-design/icons";
import defaultCourseImage from "../assets/images/online_-courses_programs.png";

const styles = {
  PCCard: {
    width: "100%",
    cursor: "pointer",
  },
  PCMainCard: {
    background: "#F7F9FF 0% 0% no-repeat padding-box",
    display: "flex",
    padding: "5px",
    borderRadius: "5px",
  },
  image: {
    margin: "5px",
    flex: "0.2",
    display: "flex",
    justifyContent: "center",
    cursor: "pointer",
  },

  courseDetails: {
    margin: "5px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  title_option: {
    flex: 1,
    fontFamily: "Open Sans Semibold",
    fontSize: 14,
    letterSpacing: "0px",
    color: "#303030",
    opacity: 1,
    display: "flex",
    alignItems: "center",
  },
  title: {
    flex: 1,
  },
  option: {
    flex: 0.001,
    paddingRight: "0.5%",
    cursor: "pointer",
  },
  Author_clock: {
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  author: {
    flex: 1.2,
    fontFamily: "Open Sans Regular",
    fontSize: 14,
    color: "#767676",
    opacity: 1,
    display: "flex",
    alignItems: "center",
  },
  clock: {
    flex: 0.6,
    fontFamily: "Open Sans Regular ",
    color: "#767676",
    opacity: 1,
  },
  approved: {
    flex: 1,
    fontFamily: "Open Sans Regular",
    fontSize: 14,
    letterSpacing: "0px",
    opacity: 1,
  },
  Percentage_Price: {
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  progress: {
    width: "60%",
  },
  price: {
    flex: 1,
    textAlign: "right",
    paddingRight: "10%",
    fontFamily: "Open Sans Semibold",
    fontSize: 16,
    letterSpacing: "0px",
    color: " #4D4CAC",
    textTransform: "uppercase",
    opacity: 1,
  },

  optionDiv: {
    position: "relative",
    right: 4,
    bottom: 20,
  },
  picture: {
    width: 170,
    borderRadius: 10,
  },
  optionsubDiv: {
    width: "140px",
    position: "absolute",
    right: "0%",
    top: 0,
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "0px 3px 8px #0000001F",
    borderRadius: "8px",
    opacity: 1,
    margin: "5px",
    padding: "10px 5px",
    fontFamily: "Open Sans Regular",
    fontSize: 16,
  },
  popupdiv: {},
  icon_Message: {
    display: "flex",
  },
};
export default class paidcourses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayPopup: false,
      approvalStatus: this.props.approvalStatus || "",
      statusIcon: "",
      selected: false,
      statusColor: "#FF9300",
      link: "",
    };
  }
  popup = () => {
    this.setState({
      displayPopup: !this.state.displayPopup,
    });
  };
  popupclose = () => {
    this.setState({
      displayPopup: this.state.displayPopup,
    });
  };

  onClickEvent = async (event) => {
    console.log("event", event);
    let like = null;
    if (event === "NotInterested") {
      like = false;
      this.setState({
        displayPopup: false,
      });
    } else {
      like = true;
      this.setState({
        displayPopup: false,
      });
    }
    this.props.updateLikeStatus(this.props.id, like);
  };
  close = () => {
    this.setState({
      displayPopup: false,
      link: "",
    });
  };
  onMouseOver = (e) => {
    this.setState({ link: e });
  };

  render() {
    return (
      <div style={styles.PCCard}>
        <div style={styles.PCMainCard}>
          <div style={styles.image}>
            <img
              onClick={() => window.open(this.props.url, "_blank")}
              src={defaultCourseImage}
              style={styles.picture}
              alt="course"
            ></img>
          </div>
          <div
            style={styles.courseDetails}
            onClick={() => window.open(this.props.url, "_blank")}
          >
            <div style={styles.title_option}>
              <div style={styles.title}>
                <span
                  style={{
                    cursor: "pointer",
                  }}
                >
                  {this.props.title}
                </span>
              </div>
            </div>
            <div style={styles.Author_clock}>
              <div style={styles.author}>
                <div style={{ display: "flex" }}>
                  <img
                    src={user}
                    style={{
                      width: 13,
                      height: 13,
                      marginRight: 5,
                    }}
                    alt="icon"
                  />
                </div>
                <div>{this.props.author}</div>
              </div>
              <div style={styles.clock}>
                {/* {this.props.duration ? (
                  <ClockCircleFilled style={{ paddingRight: "15px" }} />
                ) : null}
                {this.props.duration ? this.props.duration : null} */}
              </div>
            </div>
            <div style={styles.Percentage_Price}>
              <div style={styles.progress}>
                {this.props.progress ? (
                  <ProgressBar progress={this.props.progress} />
                ) : null}
              </div>
              <div style={styles.price}>FREE</div>
            </div>
          </div>
          <div style={styles.option}>
            <img
              src={optionsicon}
              onClick={this.popup}
              onBlur={this.close}
              tabIndex="1"
              style={{
                outline: "none",
                cursor: "pointer",
                position: "relative",
                top: 4,
              }}
              alt="icon"
            />
            {this.state.displayPopup ? (
              <div style={styles.optionDiv}>
                <div style={styles.optionsubDiv}>
                  <div style={styles.popupdiv}>
                    <div
                      style={{
                        opacity: "1",
                        padding: "5px 5px",
                        fontSize: "14px",
                        color:
                          this.state.link === "NotInterested"
                            ? "#4D4CAC"
                            : "#303030",
                        backgroundColor:
                          this.state.link === "NotInterested"
                            ? "#E2E2E2"
                            : "#ffffff",
                      }}
                      onMouseDown={() => this.onClickEvent("NotInterested")}
                      onMouseOver={() => this.onMouseOver("NotInterested")}
                    >
                      Not Interested
                    </div>
                    {this.props.hasOwnProperty("liking") ? (
                      this.props.liking !== true ? (
                        <div
                          style={{
                            opacity: "1",
                            padding: "5px 5px",
                            fontSize: "14px",
                            color:
                              this.state.link === "Save"
                                ? "#4D4CAC"
                                : "#303030",
                            backgroundColor:
                              this.state.link === "Save"
                                ? "#E2E2E2"
                                : "#ffffff",
                          }}
                          onMouseDown={() => this.onClickEvent("Save")}
                          onMouseOver={() => this.onMouseOver("Save")}
                        >
                          Save
                        </div>
                      ) : (
                        ""
                      )
                    ) : (
                      <div
                        style={{
                          opacity: "1",
                          padding: "5px 5px",
                          fontSize: "14px",
                          color:
                            this.state.link === "Save" ? "#4D4CAC" : "#303030",
                          backgroundColor:
                            this.state.link === "Save" ? "#E2E2E2" : "#ffffff",
                        }}
                        onMouseDown={() => this.onClickEvent("Save")}
                        onMouseOver={() => this.onMouseOver("Save")}
                      >
                        Save
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
