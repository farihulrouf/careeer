import React, { Component } from "react";
import star from "../../../../../assets/images/star.svg";
import medal from "../../../../../assets/images/medal-big.svg";
import ToolTip from "../../../../../components/ToolTipComponent";

class LeaderboardPointsBadges extends Component {
  state = {
    showEmployeeToolTip: false,
    showManagerToolTip: false,
  };
  render() {
    return (
      <div
        style={{
          height: 240,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Open Sans Regular",
          color: "#303030",
        }}
      >
        <div
          style={{
            flex: 0.6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <img src={star} alt="star" style={{ width: 65, height: 63 }} />
          </div>
          <div
            style={{
              paddingLeft: 14,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: "1em" }}>Points</div>
            <div
              style={{
                fontSize: "2em",
                fontFamily: "Open Sans Semibold",
              }}
            >
              {(this.props.pointsBadges && this.props.pointsBadges.points) || 0}
            </div>
          </div>
        </div>
        <div style={{ flex: 0.5, display: "flex", justifyContent: "center" }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "flex-end",
              flexDirection: "column",
            }}
          >
            <div
              onMouseOver={() => this.setState({ showEmployeeToolTip: true })}
              onMouseLeave={() => this.setState({ showEmployeeToolTip: false })}
            >
              <img
                src={this.props.badgeImage}
                alt="medal"
                style={{
                  height: this.props.isManager ? 50 : 60,
                  width: this.props.isManager ? 30 : 40,
                  marginRight: 14,
                  marginTop: this.props.isManager ? 20 : 10,
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
                    left: !this.props.isManager ? "0px" : "-6px",
                    bottom: !this.props.isManager ? 72 : 60,
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
                display: this.props.isManager ? "" : "none",
              }}
              onMouseOver={() => this.setState({ showManagerToolTip: true })}
              onMouseLeave={() => this.setState({ showManagerToolTip: false })}
            >
              <img
                src={medal}
                alt="medal"
                style={{
                  height: 50,
                  width: 30,
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
                    left: "0px",
                    top: 10,
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
          <div
            style={{
              flex: 1,
              display: "flex",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginLeft: 22,
              }}
            >
              <div style={{ fontSize: "1em" }}>Badges</div>
              <div
                style={{
                  fontSize: "2em",
                  fontFamily: "Open Sans Semibold",
                }}
              >
                {(this.props.pointsBadges && this.props.pointsBadges.badges) ||
                  0}
              </div>
              <div
                style={{
                  fontSize: "2em",
                  fontFamily: "Open Sans Semibold",
                  display: this.props.isManager ? "" : "none",
                }}
              >
                {(this.props.pointsBadges &&
                  this.props.pointsBadges.managerbadges) ||
                  0}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LeaderboardPointsBadges;
