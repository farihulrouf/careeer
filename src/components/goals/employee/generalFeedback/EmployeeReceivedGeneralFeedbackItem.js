import React from "react";
const EmployeeReceivedGeneralFeedbackItem = (props) => {
  const receivedRating = props.receivedRating;
  return (
    <div
      style={{
        color: "#303030",
        textAlign: "center",
        fontFamily: "Open Sans Regular",
      }}
    >
      <div style={{ fontSize: "1.25em" }}>
        {receivedRating.rating || 0}/{receivedRating.totalRating || 10}
      </div>
      <div
        style={{
          background: (props.track && props.track.background) || "#D3D4E8",
          margin: "0.875em 0",
        }}
      >
        <div
          style={{
            height: "2px",
            background: (props.track && props.track.selected) || "#A0B4F9",
            width:
              (receivedRating.rating / (receivedRating.totalRating || 10)) *
                100 +
                "%" || 0,
          }}
        ></div>
      </div>
      <div style={{ fontSize: "0.875em" }}>{receivedRating.name}</div>
    </div>
  );
};

export default EmployeeReceivedGeneralFeedbackItem;
