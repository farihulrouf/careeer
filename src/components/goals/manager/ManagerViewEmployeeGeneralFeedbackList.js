import React from "react";
import EmployeeReceivedGeneralFeedbackList from "../employee/generalFeedback/EmployeeReceivedGeneralFeedbackList";
import timeStampToDateTime from "../../../core/lib/TimeStampToDateTime";
const EmployViewEmployeeGeneralFeedbackList = (props) => {
  const receivedRatingListGroup = props.receivedRatingListGroup;
  return (
    <div
      style={{
        background: "#ffffff",
        color: "#303030",
        fontFamily: "Open Sans Regular",
        borderRadius: "8px",
        boxShadow: " 1px 4px 12px #00000027",
        padding: "0.875em",
        marginTop: "1.5%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            background: "#D0D0D0",
            border: "2px solid #fff",
            borderRadius: "50%",
            height: "1em",
            width: "1em",
          }}
        ></div>
        &ensp;
        <span style={{ fontSize: "0.875em" }}>
          Feedback on&nbsp;
          {timeStampToDateTime(receivedRatingListGroup.feedbackDate).date || ""}
        </span>
      </div>
      <div style={{ padding: "0 2%" }}>
        {receivedRatingListGroup.feedback.map(
          (eachReceivedRatingList, index) => (
            <div
              key={eachReceivedRatingList.id || index}
              style={{ padding: "1.4em 0 2.4em 0" }}
            >
              <EmployeeReceivedGeneralFeedbackList
                receivedRatingList={eachReceivedRatingList}
              />
            </div>
          )
        )}
      </div>
      <hr style={{ borderTop: "1px solid #ccc", margin: "0 3%" }} />
      <div
        style={{
          fontSize: "0.875em",
          display: "grid",
          gridTemplateColumns: " 0.18fr 1fr",
          padding: "1.3em 0 1.3em 2.3em",
        }}
      >
        <div>Comment</div>
        <div style={{ color: "#767676" }}>{receivedRatingListGroup.note}</div>
      </div>
    </div>
  );
};
export default EmployViewEmployeeGeneralFeedbackList;
