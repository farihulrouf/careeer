import React from "react";
import defaultProfile from "../../assets/images/defaultProfile.svg";
export default function adminManagerTeamGoalItem(props) {
  return (
    <div
      style={{
        fontSize: "1em",
        height: "100%",
        color: "#303030",
        fontFamily: "Open Sans Regular",
        padding: "5%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          height: "3.72em",
          width: "3.72em",
          marginBottom: "2%",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            borderRadius: "100%",
          }}
        >
          <img
            style={{
              height: "100%",
              width: "100%",
              borderRadius: "100%",
            }}
            src={props.profile || defaultProfile}
            alt="profilePic"
          />
        </div>
      </div>
      <div
        style={{
          margin: "20% 0 1.5% 0",
          height: "4em",
          fontSize: "1em",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            textTransform: "capitalize",
            fontSize: "1em",
          }}
        >
          {props.name}
        </div>
        <div
          style={{
            fontSize: "0.858em",
            color: "#878787",
            marginTop: "8%",
          }}
          title={props.designation}
        >
          {props.designation && props.designation.length > 20
            ? props.designation.substring(0, 20) + "..."
            : props.designation}
        </div>
      </div>
      <div
        style={{
          padding: "12% 0 8% 0",
          fontSize: "1em",
          fontFamily: "Open Sans Semibold",
        }}
      >
        {props.status || 0}%
      </div>

      <div
        style={{
          height: "4px",
          width: "100%",
          position: "relative",
          borderRadius: "50px",
          overflow: "hidden",
          background: "#FF808B",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            background: "#E4E4E4",
            right: -props.status + "%",
          }}
        ></div>
      </div>
    </div>
  );
}
