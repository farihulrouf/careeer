import React from "react";
import { PercentageOutlined } from "@ant-design/icons";

export default function goalStatusCard(props) {
  return (
    <div>
      <div
        style={{
          background: props.backgroundColor,
          height: "250px",
          width: "200px",
          overflow: "hidden",
          border: "2px solid #FFFFFF",
          boxShadow: "0px 4px 12px 4px #F6F6F6",
          position: "relative",
          borderRadius: "12px",
        }}
      >
        <div
          style={{
            width: "185%",
            height: "150%",
            background: "#FFFFFF",
            position: "absolute",
            top: -props.status - 50 + "%",
            left: "-30%",
            borderRadius: props.status > 0 ? "100%" : "0%",
          }}
        ></div>
        <div
          style={{
            background: `url(${props.backgroundImage})`,
            height: "100%",
            width: "100%",
            backgroundSize: "120%",
            backgroundPosition: "center",
            opacity: "20%",
            border: "inherit",
            borderRadius: "inherit",
          }}
        ></div>
        <div
          style={{
            height: "100%",
            width: "100%",
            color: props.status === 100 ? "#FFFFFF" : "#6E6E6E",
            fontFamily: "sans-serif",
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            top: "0%",
            border: "inherit",
            borderRadius: "inherit",
          }}
        >
          <div
            style={{
              padding: "22% 0 0 10%",
              fontSize: "1.4em",
              flex: 0.5,
              letterSpacing: "0.5px",
            }}
          >
            {props.title}
          </div>
          <div
            style={{
              flex: 1,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              padding: "0% 0 0 0%",
              fontSize: "3.5 em",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ fontSize: "3.5em", letterSpacing: "2px" }}>
                {props.status}
              </div>
              <span style={{ paddingTop: "8%" }}>
                <PercentageOutlined style={{ fontSize: "2.5em" }} />
              </span>
            </div>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              fontSize: "1.1em",
            }}
          >
            <div style={{ paddingBottom: "8%" }}>{props.deadLine}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
