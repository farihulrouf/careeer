import React, { Component } from "react";
import GoalCard from "../../../components/GoalCard";
import calendar from "../../../assets/images/calendar.svg";
import clock from "../../../assets/images/clock-circular.svg";
import "../../../assets/css/ManagerEmployeeGoalItem.css";
import TimeStampToDateTime from "../../../core/lib/TimeStampToDateTime";
const STYLES = {
  imgAndDate: { display: "flex", paddingBottom: 6 },
  dateAndTime: {
    marginLeft: 4,
  },
};
class EmployeeGoalItem extends Component {
  render() {
    return (
      <div
        style={{
          fontSize: "1em",
          minHeight: 138,
          display: "flex",
          fontFamily: "Open Sans Regular",
          boxShadow: "2px 5px 10px #80808057",
          borderRadius: 8,
          zIndex: 3,
        }}
      >
        <div style={{ flex: 0.3 }}>
          <GoalCard {...this.props} />
        </div>

        <div
          className="descriptionContainers"
          style={{
            flex: 1,
            display: "flex",
          }}
        >
          <div
            style={{
              flex: 1,
              marginLeft: 30,
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "16px 16px 16px 0px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: "1em",
                  color: "#303030",
                }}
              >
                {this.props.title}
              </div>
              <div>
                <div
                  style={{
                    padding: "5px 10px",
                    background: "#F4F4FE",
                    fontSize: "0.75em",
                    borderRadius: 4,
                    marginLeft: 14,
                    color: "#4D4CAC",
                  }}
                >
                  {this.props.type}
                </div>
              </div>
            </div>
            <div
              style={{
                padding: "0 10% 6px 0",
                fontSize: "0.875em",
                color: "#767676",
              }}
            >
              {this.props.description}
            </div>
          </div>
          <div className="timeDateContainers">
            <div className="startDateContainers">
              <div className="dateTitles">Started on</div>
              <div>
                <div style={STYLES.imgAndDate}>
                  <img src={calendar} alt="date" />
                  <div style={STYLES.dateAndTime}>
                    {" "}
                    {TimeStampToDateTime(this.props.startDate).date}
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <img src={clock} alt="date" />
                  <div style={STYLES.dateAndTime}>
                    {TimeStampToDateTime(this.props.startDate).time}
                  </div>
                </div>
              </div>
            </div>
            <div className="endingDateContainers">
              <div className="dateTitles">Ending on</div>
              <div>
                <div style={STYLES.imgAndDate}>
                  <img src={calendar} alt="date" />
                  <div style={STYLES.dateAndTime}>
                    {TimeStampToDateTime(this.props.endDate).date}
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <img src={clock} alt="date" />
                  <div style={STYLES.dateAndTime}>
                    {TimeStampToDateTime(this.props.endDate).time}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EmployeeGoalItem;
