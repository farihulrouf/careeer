import React from "react";
import "antd/dist/antd.css";
import { Badge, Avatar } from "antd";

export default function HeaderIcon(props) {
  const classes = {
    HeaderIconBody: {
      height: "100%",
    },
    BadgeIcon: {
      backgroundColor: "#EE5795",
      visibility: props.isDisabled ? "visible" : "hidden",
    },
    AvtarIcon: {
      opacity: props.isDisabled ? "100%" : "50%",
    },
    SvgIcon: {
      opacity: props.isDisabled ? "100%" : "50%",
    },
    ImageIcon: {
      width: "30px",
      height: "30px",
      opacity: props.isDisabled ? "100%" : "50%",
      position: "relative",
      left: "3px",
      top: "-4px",
    },
  };
  return (
    <div style={classes.HeaderIconBody}>
      <Badge count={props.value} style={classes.BadgeIcon}>
        {props.icon.type === "font" && (
          <Avatar
            shape="circle"
            style={classes.AvtarIcon}
            icon={props.icon.value}
          />
        )}
        {props.icon.type === "svg" && (
          <img style={classes.SvgIcon} src={props.icon.value} alt="icon" />
        )}

        {props.icon.type === "image" && (
          <img style={classes.ImageIcon} src={props.icon.value} alt="icon" />
        )}
      </Badge>
    </div>
  );
}
