import React from "react";
import Button from "../../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const className = {
  successContainer: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    fontFamily: "Open Sans Semibold",
    justifyContent: "center",
    alignItems: "center",
  },
  subTitle: {
    fontSize: "18px",
    color: "#303030",
    padding: "20px 0 60px 0",
  },
  checkIcon: {
    height: 103,
    color: "#51AE69",
  },
  button: {
    color: "#ffffff",
    backgroundColor: "#FF808B",
    border: "#FF808B",
    height: "40px",
  },
};
const PasswordChanged = (props) => {
  return (
    <div style={className.successContainer}>
      <div>
        {props.icon.type === "svg" ? (
          <img src={props.icon.value} alt="icon" style={className.checkIcon} />
        ) : (
          <FontAwesomeIcon
            icon={props.icon.value}
            style={{
              fontSize: 106.5,
              color: props.icon.color === "" ? "" : props.icon.color,
            }}
          />
        )}
      </div>
      <div style={className.subTitle}>{props.title}</div>
      <div>
        <div
          style={{ width: 148, fontFamily: "Open Sans Semibold", fontSize: 14 }}
          onClick={props.back}
        >
          <Button label={props.buttonName} styles={className.button} />
        </div>
      </div>
    </div>
  );
};

export default PasswordChanged;
