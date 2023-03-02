import React from "react";
import styled from "styled-components";
import timeStampToDateTime from "../../../core/lib/TimeStampToDateTime";
const Div = styled.div`
  color: #303030;
  font-family: "Open Sans Regular";
  font-size: 1em;
  #person-name-container {
    display: flex;
    justify-content: space-between;
    margin: 0.575em 0px;
  }
  #comments {
    width: 100%;
    resize: none;
    padding: 0.675em;
    cursor: default;
    border: 1.2px solid #bcbcbc;
    outline: none;
    height: 90px;
    border-radius: 0.575em;
    background: #f6f6f6;
    &:hover {
      border: 1.2px solid #ff808b;
    }
  }
`;
const managerViewEmployeeFeedbackCommentItem = (props) => {
  const commentDetails = props.commentDetails;
  return (
    <Div>
      <div>
        <div id="person-name-container">
          <div>
            {(commentDetails.employeeFirstName || "") +
              " " +
              `${commentDetails.employeeMiddleName || ""}` +
              " " +
              (commentDetails.employeeLastName || "")}
          </div>
          <div>
            Date:&nbsp;
            <span style={{ textTransform: "capitalize" }}>
              {timeStampToDateTime(commentDetails.statusUpdateDate).date}
            </span>
          </div>
        </div>
        <textarea id="comments" readOnly>
          {commentDetails.goalStatusUpdate || ""}
        </textarea>
      </div>
      <div style={{ marginTop: "10px 0px" }}>
        <div id="person-name-container">
          <div>
            {(commentDetails.managerFirstName || "") +
              " " +
              `${commentDetails.managerMiddleName || ""}` +
              " " +
              (commentDetails.managerLastName || "")}
          </div>
          <div>
            Date:&nbsp;{timeStampToDateTime(commentDetails.commentDate).date}
          </div>
        </div>
        <textarea id="comments" readOnly>
          {commentDetails.comment || ""}
        </textarea>
      </div>
    </Div>
  );
};

export default managerViewEmployeeFeedbackCommentItem;
