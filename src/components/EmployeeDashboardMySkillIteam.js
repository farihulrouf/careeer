import React from "react";
import { Progress } from "antd";
import "antd/dist/antd.css";

const styles = {
  progressMainDiv: {
    display: "flex",
    marginTop: "2.5%",
  },
  progressFirstColumn: {
    flex: 0.26,
    color: "#767676",
    fontSize: "16px",
    fontFamily: "Open Sans SemiBold,Regular",
  },
  progressSecondColumn: {
    flex: 1,
    display: "flex",
    position: "relative",
  },
  showPercentage: {
    flex: 0.08,
    position: "relative",
    bottom: "50%",
    overflow: "hidden",
  },
};

export default class EmployeeDashboardMySkillIteam extends React.Component {
  render() {
    return (
      <div style={styles.progressMainDiv}>
        <div style={styles.progressFirstColumn}>{this.props.skillType}</div>
        <div style={styles.progressSecondColumn}>
          <div style={styles.showPercentage}>
            {/* {this.props.progressPercentage <= 8 ? "" : "0%"} */}
          </div>
          <div style={{ width: "100%", flex: 0.75, position: "relative" }}>
            <Progress
              percent={this.props.progressPercentage}
              showInfo={false}
              strokeColor={this.props.color}
              trailColor={this.props.trailColor}
            />
            <div
              style={{
                display: "flex",
                position: "absolute",
                left:
                  this.props.progressPercentage >= 90
                    ? this.props.progressPercentage - 14 + "%"
                    : this.props.progressPercentage >= 70
                      ? this.props.progressPercentage - 13 + "%"
                      : this.props.progressPercentage >= 50
                        ? this.props.progressPercentage - 10 + "%"
                        : this.props.progressPercentage >= 30
                          ? this.props.progressPercentage - 8 + "%"
                          : this.props.progressPercentage - 13 + "%",
                top: "-30px",
              }}
            >
              <img src={require("../assets/images/employee.svg")} alt="IconImg" />
              <div>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    border: "1px solid",
                    borderColor: this.props.color,
                    borderRadius: "50%",
                    position: "absolute",
                    top: "25px",
                    marginLeft: "2px",
                    boxShadow: "0px 0px 4px" + this.props.color,
                    opacity: 1,
                    backgroundColor: "#ffffff",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {Math.round(this.props.progressPercentage) + "%"}
                </div>
              </div>
            </div>
          </div>
          <div
            style={{ flex: 0.1, position: "relative", bottom: "50%", left: 16 }}
          >
            {/* 100% */}
          </div>
        </div>
      </div>
    );
  }
}
