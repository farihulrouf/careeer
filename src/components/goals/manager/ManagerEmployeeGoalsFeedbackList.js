import React, { Component } from "react";
import ManagerEmployeeGoalsFeedbackItem from "./ManagerEmployeeGoalsFeedbackItem";

class ManagerEmployeeGoalsFeedbackList extends Component {
  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        {this.props.goals.map((ele, index) => (
          <div
            key={ele.goalId}
            style={{
              borderTop: index !== 0 ? "1px solid #9FA9BC66" : "",
              paddingTop: 24,
            }}
          >
            <ManagerEmployeeGoalsFeedbackItem
              index={index}
              goalId={ele.goalId}
              goalCompletionPercentage={ele.completionPercentage}
              title={ele.title}
              type={ele.goalType}
              description={ele.description}
              startDate={ele.startDate}
              startDateTime={ele.startDateTime}
              endDate={ele.endDate}
              endDateTime={ele.endDateTime}
              goalStatusUpdate={ele.statusUpdate}
              comment={ele.comment}
              validComment={ele.validComment}
              cancelGoalFeedback={this.props.cancelGoalFeedback}
              submitGoalFeedback={this.props.submitGoalFeedback}
              rateHandler={(e) => this.props.rateHandler(e, index)}
              onChange={(value) => this.props.addNoteHandler(value, index)}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default ManagerEmployeeGoalsFeedbackList;
