import React from "react";
import DisplayProfile from "./displayProfile";

export default function userCard(props) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#FFFFFF",
        borderRadius: "8px",
        fontFamily: "sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "1px 4px 12px rgba(0, 0, 0, 0.27)",
      }}
    >
      <div
        style={{
          color: "#252525",
          fontSize: "16px",
          fontFamily: "Open Sans Semibold",
          letterSpacing: "0.77px",
          minHeight: "40px",
          lineHeight: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {props.departmentName}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "6px",
        }}
      >
        <div
          style={{
            paddingTop: "8px",
            height: "73px",
            width: "73px",
          }}
        >
          <DisplayProfile profile={props.imageUrl} />
        </div>
        <div
          style={{
            letterSpacing: "0.67px",
            color: "#767676",
            paddingTop: "12px",
            fontSize: "14px",
            fontFamily: "Open Sans Regular",
          }}
        >
          Number of People
        </div>
        <div
          style={{
            letterSpacing: "1.15px",
            color: "#303030",
            fontSize: "24px",
            fontFamily: "Open Sans Semibold",
          }}
        >
          {props.nomuberOfPepole}
        </div>
      </div>
    </div>
  );
}
