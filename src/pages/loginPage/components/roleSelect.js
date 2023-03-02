import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function RoleSelect(props) {
  const classes = {
    roleSelectCard: {
      display: "flex",
      fontFamily: "Open Sans Regular",
      flexDirection: "row",
      fontSize: props.settings.fontSize,
      border: "1.4px solid #BDBDBD",
      borderRadius: "25px",
      padding: "2px 0px 2px 5px",
      width: "100%",
      cursor: "pointer",
    },

    checkIcon: {
      display: "flex",
      alignItems: "center",
      fontSize: "1.5em",
      color: props.isSelected ? props.settings.checkInColor : "#E4E4E4",
    },
    roleName: {
      flex: 1,
      display: "flex",
      textTransform: "capitalize",
      fontSize: "1em",
      alignItems: "center",
      letterSpacing: "0.01em",
      color: "#303030",
      opacity: props.isSelected ? "100%" : "100%",
      paddingLeft: "5%",
    },
  };

  return (
    <div style={classes.roleSelectCard} onClick={props.onClick}>
      <div style={classes.checkIcon}>
        <FontAwesomeIcon icon={faCheckCircle} />
      </div>
      <div style={classes.roleName}>
        <span style={{ paddingTop: "2px", paddingBottom: "2px" }}>
          {props.role}
        </span>
      </div>
    </div>
  );
}
