import React from "react";
import DefaultPic from "../assets/images/defaultProfile.svg";
import { COLORS } from "../theme";
export default function SidebarProfile(props) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        borderRadius: "100%",
      }}
    >
      {props.profile != null && (
        <img
          style={{
            height: "100%",
            width: "100%",
            borderRadius: "100%",
            background: COLORS.GREY_T_96,
            border: "none",
            transform: `rotate(${props.updateRotation}deg)`,
          }}
          src={props.profile || DefaultPic}
          alt="profile"
        />
      )}
    </div>
  );
}
