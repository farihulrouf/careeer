import React from "react";
import "../assets/css/EmployeeUserProfilePoints.css";
import { message } from "antd";
import { getLeaderboardEmployeeDetails } from "../core/apiClient/leaderboard/leaderboardClient";
import { decryptData } from "../utils/encryptDecrypt";
import orange from "../assets/images/badge_orange.svg";
import blue from "../assets/images/badge_blue.svg";
import pink from "../assets/images/badge_pink.svg";
import purpel from "../assets/images/badge_purpel.svg";
import medal from "../assets/images/medal-big.svg";
import ToolTip from "../components/ToolTipComponent";

export default class EmployeeUserProfilePoints extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pointsBadges: "",
      badgeImage: "",
      isManager: false,
      showEmployeeToolTip: false,
      showManagerToolTip: false,
    };
  }
  componentDidMount() {
    this.loadBadgesAndPoints();
  }

  loadBadgesAndPoints = async () => {
    let orgId = decryptData(localStorage.orgId),
      employeeId = this.props.selectedUser
        ? this.props.selectedUser
        : decryptData(localStorage.employeeId);
    let token = decryptData(localStorage.token);
    if (orgId && employeeId) {
      try {
        document.toggleLoading(true);
        let response = await getLeaderboardEmployeeDetails(orgId, employeeId, {
          Authorization: token,
        });
        if (response.status === 200) {
          let badgeImage = "";
          if (response.data.badges === 0) {
            badgeImage = blue;
          } else if (response.data.badges % 4 === 1) {
            badgeImage = orange;
          } else if (response.data.badges % 4 === 2) {
            badgeImage = blue;
          } else if (response.data.badges % 4 === 3) {
            badgeImage = pink;
          } else if (response.data.badges % 4 === 0) {
            badgeImage = purpel;
          }
          this.setState({
            pointsBadges: response.data,
            badgeImage,
            isManager: response.data.managerBadges >= 0 ? true : false,
          });
        }
      } catch (error) {
        message.error("Unable to fetch details, please try after sometime");
      }
      document.toggleLoading();
    }
    return;
  };

  render() {
    return (
      <div className="pointsAndBadges-mainDiv">
        <div className="pointsAndBadges-item">
          <div className="employee-points">
            <img
              src={require("../assets/images/star.svg")}
              width={60}
              height={60}
              alt="star"
            />
            <div className="textTitle">
              <div className="text">Points</div>
              <div className="numbers">
                {this.state.pointsBadges && this.state.pointsBadges.points}
              </div>
            </div>
          </div>
          <div className="employee-badges">
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "flex-end",
                flexDirection: "column",
                marginTop: "18%",
              }}
            >
              <div
                onMouseOver={() => this.setState({ showEmployeeToolTip: true })}
                onMouseLeave={() =>
                  this.setState({ showEmployeeToolTip: false })
                }
              >
                <img
                  src={(this.state.badgeImage && this.state.badgeImage) || ""}
                  alt="medal"
                  style={{
                    height: this.state.isManager ? 35 : 60,
                    width: this.state.isManager ? 25 : 40,
                    marginRight: 14,
                    marginTop: this.state.isManager ? 10 : 0,
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    opacity: this.state.showEmployeeToolTip ? 1 : 0,
                    visibility: this.state.showEmployeeToolTip
                      ? "visible"
                      : "hidden",
                    transition: "opacity 0.4s ease-out",
                  }}
                >
                  <ToolTip
                    className="toolTip"
                    style={{
                      minWidth: 130,
                      maxWidth: 300,
                      minHeight: 30,
                      maxHeight: 100,
                      left: !this.state.isManager ? "0px" : "-8px",
                      bottom: !this.state.isManager ? 76 : 50,
                      opacity: 1,
                      borderRadius: 1,
                      display: "flex",
                      backgroundColor: "#F4F4FE",
                    }}
                    toolTip={{ placement: "topLeft", width: "7px" }}
                  >
                    <div
                      style={{
                        width: "inherit",
                        height: "inherit",
                        outline: "none",
                      }}
                    >
                      <div
                        style={{
                          padding: 10,
                          fontSize: "0.955em",
                          color: "#4D4CAC",
                        }}
                      >
                        Employee Badge
                      </div>
                    </div>
                  </ToolTip>
                </div>
              </div>
              <div
                style={{
                  display: this.state.isManager ? "" : "none",
                }}
                onMouseOver={() => this.setState({ showManagerToolTip: true })}
                onMouseLeave={() =>
                  this.setState({ showManagerToolTip: false })
                }
              >
                <img
                  src={medal}
                  alt="medal"
                  style={{
                    height: 35,
                    width: 25,
                    marginRight: 14,
                    marginTop: 10,
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    opacity: this.state.showManagerToolTip ? 1 : 0,
                    visibility: this.state.showManagerToolTip
                      ? "visible"
                      : "hidden",
                    transition: "opacity 0.4s ease-out",
                  }}
                >
                  <ToolTip
                    className="toolTip"
                    style={{
                      minWidth: 130,
                      maxWidth: 300,
                      minHeight: 30,
                      maxHeight: 100,
                      left: "-4px",
                      top: 14,
                      opacity: 1,
                      borderRadius: 1,
                      display: "flex",
                      backgroundColor: "#F4F4FE",
                    }}
                    toolTip={{ placement: "bottomLeft", width: "7px" }}
                  >
                    <div
                      style={{
                        width: "inherit",
                        height: "inherit",
                        outline: "none",
                      }}
                    >
                      <div
                        style={{
                          padding: 10,
                          fontSize: "0.955em",
                          color: "#4D4CAC",
                        }}
                      >
                        Manager Badge
                      </div>
                    </div>
                  </ToolTip>
                </div>
              </div>
            </div>
            <div className="textTitle">
              <div className="text">Badges</div>
              <div
                className="numbers"
                onMouseOver={() => this.setState({ showEmployeeToolTip: true })}
                onMouseLeave={() =>
                  this.setState({ showEmployeeToolTip: false })
                }
              >
                {this.state.pointsBadges && this.state.pointsBadges.badges}
              </div>
              <div
                className="numbers"
                style={{
                  display: this.state.isManager ? "" : "none",
                }}
                onMouseOver={() => this.setState({ showManagerToolTip: true })}
                onMouseLeave={() =>
                  this.setState({ showManagerToolTip: false })
                }
              >
                {this.state.pointsBadges &&
                  this.state.pointsBadges.managerBadges}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
