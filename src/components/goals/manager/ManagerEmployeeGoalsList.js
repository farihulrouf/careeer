import React, { Component } from "react";
import EmployeeGoalItem from "./ManagerEmployeeGoalsItem";
import checked from "../assets/images/checkedBox.svg";
import unChecked from "../assets/images/unCheckedBox.svg";
import "../assets/css/OpenSans.css";
class EmployeeGoalList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeGoalList: this.props.employeeGoalList || [],
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
      <div>
        {this.state.employeeGoalList.map((ele, index) => (
          <div
            key={index}
            style={{ display: "flex", alignItems: "center", marginBottom: 16 }}
          >
            <div style={{ width: "100%" }}>
              <EmployeeGoalItem
                percentage={ele.percentage}
                title={ele.title}
                type={ele.type}
                description={ele.description}
                startDate={ele.startDate}
                startDateTime={ele.startDateTime}
                endDate={ele.endDate}
                endDateTime={ele.endDateTime}
                userRole={this.props.userRole}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default EmployeeGoalList;
