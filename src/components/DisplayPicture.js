import React from "react";
import defaultProfile from "../assets/images/defaultProfile.svg";
import photoCamera from "../assets/images/photo-camera.svg";
import { COLORS } from "../theme";
export default function SidebarProfile(props) {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div
        style={{
          height: "100%",
          width: "100%",
          background: COLORS.GREY_T_96,
          borderRadius: "50%",
        }}
      >
        <img
          style={{
            height: "100%",
            width: "100%",
            borderRadius: "100%",
            border: "none",
            transform: `rotate(${props.updateRotation}deg)`,
          }}
          src={props.profile || defaultProfile}
          alt="profile"
          onError={(e)=>{e.target.onerror = null; e.target.src=defaultProfile}}
        />
      </div>
      {props.enableUpload && (
        <div
          style={{
            position: "relative",
            bottom: "40px",
            left: 75,
            height: "36px",
            width: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            background: COLORS.GREY_T_96,
            cursor: "pointer",
            boxShadow: "10px 13px 18px -8px rgba(0,0,0,0.34)",
          }}
          onClick={props.toggleUploadPicDrawer || null}
        >
          <img
            src={photoCamera}
            alt="camera"
            style={{ height: "15px", width: "18px" }}
          ></img>
        </div>
      )}
    </div>
  );
}
