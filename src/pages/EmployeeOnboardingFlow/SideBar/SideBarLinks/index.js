import React from "react";

export default function SidebarLink(props) {
  const styles = {
    LinkContainer: {
      height: props.link === "Skills" ? 0 : "50px",
      width: "100%",
      fontSize: "14px",
      display: "flex",
      fontFamily: "sans-serif",
      position: "relative",
    },
    iconContainer: {
      flex: 1,
      display: "flex",
    },
    innerIconContainer: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: props.isSelected ? "-2px" : "4px",
      paddingLeft: "16%",
    },
    lineTracker: {
      height: "100%",
      width: "1px",
      position: "absolute",
      top: "15px",
      background: "#9597A6",
      visibility: props.link === "Skills" ? "hidden" : "visible",
    },
    titleContainer: {
      flex: 2,
      display: "flex",
      marginTop: "2%",
    },
    titleText: {
      color: "#FFFFFF",
      opacity: props.isSelected ? "100%" : "70%",
      height: "50%",
      fontSize: "14px",
      position: "absolute",
      left: "12%",
      zIndex: 1,
      paddingLeft: "20%",
      cursor: "pointer",
    },
  };
  return (
    <div style={styles.LinkContainer}>
      <div style={styles.iconContainer}>
        <div style={styles.innerIconContainer}>
          <img
            style={{
              width: props.selectedStep === props.index ? "28px" : "15px",
              color: "red",
              zIndex: 1,
            }}
            src={
              props.selectedStep === props.index
                ? props.icons.selected
                : props.status === 2
                ? props.icons.updated
                : props.icons.unselected
            }
            alt="icon"
          />
          <div style={styles.lineTracker}></div>
        </div>
      </div>
      <div style={styles.titleContainer}>
        <div
          onClick={() => props.changeOnboardingStep(props.index)}
          style={styles.titleText}
        >
          {props.link}
        </div>
      </div>
    </div>
  );
}
