import React, { Component } from "react";
import ManagerViewEmployeeFeedbackCommentItem from "./ManagerViewEmployeeFeedbackCommentItem";
class ManagerViewEmployeeFeedbackComments extends Component {
  constructor(props) {
    super(props);
    this.state = { commentsList: this.props.commentsList };
  }

  render() {
    return (
      <div>
        <div
          style={{
            fontFamily: "Open Sans Semibold",
            color: "#303030",
            fontSize: "1.3em",
          }}
        >
          Comments
        </div>
        <div
          style={{ overflowY: "auto", height: "300px", paddingRight: "10px" }}
        >
          {this.props.commentsList &&
            this.props.commentsList.map((eachComment, index) => (
              <div
                key={index || eachComment.id}
                style={{ width: "100%", margin: "0.675em 0" }}
              >
                <ManagerViewEmployeeFeedbackCommentItem
                  commentDetails={eachComment}
                  viewComments={this.props.viewComments}
                />
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default ManagerViewEmployeeFeedbackComments;
