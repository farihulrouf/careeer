import React from "react";
import Goal from "../assets/images/goalCardBackground.svg";
export default function goalStatusCard(props) {
  return (
    <div
      style={{
        background:
          (props.percentage || props.goalCompletionPercentage) < 50
            ? "#FA8C96"
            : (props.percentage || props.goalCompletionPercentage) === 100
              ? "#9AAEF9"
              : (props.percentage || props.goalCompletionPercentage) >= 50
                ? "#ABADD7"
                : "",
        height: props.width || "100%",
        width: props.width || "100%",
        overflow: "hidden",
        border: "2px solid #FFFFFF",
        position: "relative",
        borderRadius: "4px",
      }}
    >
      <div
        style={{
          width: "185%",
          height: "150%",
          background: "#FFFFFF",
          position: "absolute",
          top: -(props.percentage || props.goalCompletionPercentage) - 50 + "%",
          left: "-30%",
          borderRadius:
            (props.percentage || props.goalCompletionPercentage) > 0
              ? "100%"
              : "0%",
        }}
      ></div>
      <img
        src={Goal}
        style={{
          position: "absolute",
          right: " -12px",
          bottom: "-6px",
          opacity:
            (props.percentage || props.goalCompletionPercentage) === 100
              ? 1
              : 0.3,
        }}
        alt="goal"
      />
      <div
        style={{
          height: "100%",
          width: "100%",
          color:
            (props.percentage || props.goalCompletionPercentage) === 100
              ? "#FFFFFF"
              : "#6E6E6E",
          fontFamily: "sans-serif",
          position: "absolute",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          top: "0%",
          borderRadius: "inherit",
        }}
      >
        <div
          style={{
            flex: 1,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontFamily: "Open Sans Regular",
            }}
          >
            <div style={{ fontSize: "34px" }}>
              {props.percentage || props.goalCompletionPercentage}
            </div>
            <span style={{ fontSize: "32px" }}>%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
