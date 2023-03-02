import React, { Component } from "react";
import DefaultPic from "../../../assets/images/defaultProfile.svg";
import GoalStatusCard from "../../GoalStatusCard";
import Button from "../../Button";
import "../../../assets/css/ScrollBarDesign.css";
import { COLORS } from "../../../theme";
import Icon from "../../../assets/images/ic_more_vert.svg";
class ManagerEmployeeAssignedGoalItem extends Component {
  render() {
    return (
      <div
        style={{
          borderTop: "1px solid #9FA9BC66",
          display: "grid",
          gridTemplateColumns: "0.7fr 2fr 0.5fr",
        }}
      >
        <div style={{ flex: 0.4, padding: "18px 0  18px 0" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: 18 }}>
              <img
                src={this.props.profilePicture || DefaultPic}
                alt="pic"
                style={{
                  height: 52,
                  width: 52,
                  borderRadius: "50%",
                  background: COLORS.GREY_T_96,
                }}
              />
            </div>
            <div style={{ fontFamily: "Open Sans Regular" }}>
              <div style={{ fontSize: "0.875em", color: "#303030" }}>
                {(this.props.firstName ? this.props.firstName + " " : "") +
                  (this.props.middleName ? this.props.middleName + " " : "") +
                  (this.props.lastName ? this.props.lastName + " " : "")}
              </div>
              <div
                style={{ fontSize: "0.75em", color: "#767676", marginTop: 4 }}
              >
                {this.props.designation}
              </div>
            </div>
          </div>
        </div>
        <div
          className="scroll-container"
          style={{
            flex: 1,
            height: 192,
            overflowX: "auto",
            overflowY: "hidden",
            padding: "18px 5px",
            marginBottom: "6px",
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            {this.props.goals &&
              this.props.goals.map((ele, index) => (
                <div
                  key={index}
                  onClick={() =>
                    ele.completionPercentage !== 100
                      ? this.props.onClickGoalCard(this.props.employeeId)
                      : ""
                  }
                  style={{
                    cursor: ele.completionPercentage !== 100 ? "pointer" : "",
                    margin: "0 12px",
                  }}
                >
                  <GoalStatusCard
                    title={ele.title}
                    completed={ele.completionPercentage}
                    deadline={ele.endDate}
                    dropDownOptions={["View Profile", "Remove"]}

                  />
                 
                </div>
                
              ))}
          </div>
        </div>
        <div
          style={{
            flex: 0.2,
            display: "flex",
            justifyContent: "flex-end",
            padding: "18px 0  18px 0",
          }}
        >
          <div
            onClick={this.props.setGoalHandler}
            style={{
              width: "128px",
              fontSize: 14,
              fontFamily: "Open Sans Semibold",
            }}
          >
            <Button
              label={"Set Goal"}
              styles={{
                color: "#FF808B",
                backgroundColor: "#FFFFFF",
                border: "#FF808B",
                height: "40px",
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ManagerEmployeeAssignedGoalItem;
