import React from "react";
import Button from "../../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const className = {
  resetLinkContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
  },
  envelopSvgcontainer: {
    paddingBottom: "30px",
  },
  subTitle: {
    fontSize: "18px",
    color: "#303030",
    fontFamily: "Open Sans Semibold",
  },
  resetSubtitleContainer: {
    padding: "10px 0 50px 0",
    color: "#8B8B8B",
    fontSize: "14px",
    fontFamily: "Open Sans Regular",
  },
  fontIcon: {
    fontSize: "123px",
    color: "#6A6AA8",
  },
};
const ForgotSent = (props) => {
  return (
    <div style={className.resetLinkContainer}>
      <div style={className.envelopSvgcontainer}>
        {props.icon.type === "svg" ? (
          <img
            src={props.icon.value}
            alt="icon"
            style={{ height: "123px", width: "110px" }}
          />
        ) : (
          <FontAwesomeIcon icon={props.icon.value} style={className.fontIcon} />
        )}
      </div>
      <div>
        <label style={className.subTitle}>{props.title}</label>
      </div>
      <div style={className.resetSubtitleContainer}>{props.subtitle}</div>

      <div
        onClick={props.back}
        style={{
          width: "150px",
          fontFamily: "Open Sans Semibold",
        }}
      >
        <Button
          label={props.buttonName}
          styles={{
            color: "#FF808B",
            backgroundColor: "#ffffff",
            border: "#FF808B",
            height: "40px",
          }}
        />
      </div>
    </div>
  );
};

export default ForgotSent;
