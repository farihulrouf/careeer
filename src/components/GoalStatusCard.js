import React from "react";
import styled from "styled-components";
import Goal from "../assets/images/goalCardBackground.svg";
import "../assets/css/OpenSans.css";
import timeStampToDate from "../core/lib/TimeStampToDate";
import { COLORS } from "../theme";


export default function goalStatusCard(props) {
  return (
    <div>
      <div
        style={{
          background:
            props.completed === 0
              ? "#fff"
              : props.completed < 50
                ? "#FA8C96"
                : props.completed === 100
                  ? "#9AAEF9"
                  : props.completed >= 50
                    ? "#ABADD7"
                    : "",
          height: "153px",
          width: "135px",
          overflow: "hidden",
          border: "2px solid #FFFFFF",
          boxShadow: "0.5px 1px 10px 0px #0000001f",
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
            top: -props.completed - 50 + "%",
            left: "-30%",
            borderRadius: props.completed > 0 ? "100%" : "0%",
          }}
        ></div>
        <img
          src={Goal}
          style={{
            position: "absolute",
            right: " -12px",
            bottom: "-6px",
            opacity: props.completed === 100 ? 1 : 0.3,
          }}
          alt="goalIcon"
        />
        <div
          style={{
            height: "100%",
            width: "100%",
            color: props.completed === 100 ? "#FFFFFF" : "#6E6E6E",
            fontFamily: "Open Sans Regular",
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
              fontSize: "14px",
              fontFamily: "Open Sans Regular",
              flex: 0.5,
              textAlign: "center",
              marginTop: "8px",
              minHeight: "42px",
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
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontFamily: "Open Sans Regular",
              }}
            >
              <div style={{ fontSize: "34px" }}>{props.completed}</div>
              <span style={{ fontSize: "32px" }}>%</span>
            </div>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                paddingBottom: "8%",
                fontSize: "11px",
                fontFamily: "Open Sans Regular",
              }}

            >
              Deadline:{timeStampToDate(props.deadline)}
            </div>
            <div id="dropDown">
                    <div
                      className="dropDownItems"
                      key={"eachOptionIndex"}
                      title={"eachOption"}
                      style={{
                        color:
                            "#303030",
                      }}
                    >
                    </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
