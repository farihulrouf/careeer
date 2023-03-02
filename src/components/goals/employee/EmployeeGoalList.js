import React, { Component } from "react";
import EmployeeGoalItem from "./EmployeeGoalItem";

class EmployeeGoalList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeGoalList: [],
    };
  }
  static getDerivedStateFromProps(nextProps) {
    return {
      employeeGoalList: nextProps.employeeGoalList || [],
    };
  }

  onClickCheckbox = (index) => {
    let employeeGoalList = this.state.employeeGoalList;
    employeeGoalList[index].checked = !employeeGoalList[index].checked;
    this.setState({
      employeeGoalList,
    });
  };
  render() {
    return (
      <div
        className="scroll-container"
        style={{ height: "100%", overflowY: "auto" }}
      >
        {this.state.employeeGoalList.map((ele, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 16,
              marginRight: 10,
            }}
          >
            <div style={{ width: "100%" }}>
              <EmployeeGoalItem
                id={ele.id}
                goalCompletionPercentage={ele.completionPercentage}
                title={ele.title}
                type={ele.goalType}
                description={ele.description}
                goalTypeId= {ele.goalTypeId}
                image = {ele.image}
                startDate={ele.startDate}
                startDateTime={ele.startDateTime}
                endDate={ele.endDate}
                endDateTime={ele.endDateTime}
                cursor={
                  this.props.hasOwnProperty("cursor") ? this.props.cursor : true
                }
                onClickGoal={() =>
                  this.props.onClickGoal(ele.id, ele.employeeId, index)
                }
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default EmployeeGoalList;
