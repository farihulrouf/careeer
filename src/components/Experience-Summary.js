import React from "react";

function profileSummary(props) {
  const styles = {
    MainContainer: {
      width: "100%",
      height: "100%",
      fontFamily: "open Sans Regular",
      border: "0.5px solid #FAFAFA",
      display: "flex",
      flexDirection: "column",
      background: "#FFFFFF",
      boxShadow: "1px 4px 12px #00000027",
      borderRadius: 8,
    },
    IconAndTitleContainer: {
      flex: 1.5,
      height: "90px",
      display: "flex",
    },
    IconContainer: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    TitleContainer: {
      flex: 2.5,
      display: "flex",
      alignItems: "center",
      marginLeft: "8%",
      fontSize: "16px",
      fontWeight: "600",
      color: "#2D2F39",
    },
    TrackerIconContainer: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
    },
    TrackerLine: { height: "1px", width: "58%", background: "#F2F3F4" },
    TrackerIcon: {
      fontSize: "1.3em",
    },
    SummaryContainer: {
      flex: 3,
      fontSize: "0.7em",
      lineHeight: "15px",
      overflowY: "auto",
      marginBottom: "22px",
    },
  };
  return (
    <div style={{ height: "100%" }}>
      <div style={styles.MainContainer}>
        <div style={styles.IconAndTitleContainer}>
          <div style={styles.IconContainer}>
            <div>
              <img
                src={props.icon}
                alt="icon"
                style={{ fontSize: "0.9em", color: "#F05994" }}
              />
            </div>
          </div>
          <div style={styles.TitleContainer}>
            <div style={{ marginRight: "10%" }}>{props.title}</div>
            <div style={styles.TrackerLine}></div>
          </div>
        </div>
        <div className="scroll-container" style={styles.SummaryContainer}>
          {(props.experienceDetails.length &&
            props.experienceDetails.map((ele, index) => {
              return (
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                  }}
                  key={index}
                >
                  <div style={styles.TrackerIconContainer}>
                    <img
                      src={props.trackerIcon}
                      alt="tracker"
                      style={styles.TrackerIcon}
                    />
                    <div
                      style={{
                        flex: 1,
                        width: "2px",
                        marginRight: "7px",
                        background: "#ACAED8",
                        display:
                          props.experienceDetails.length - 1 !== index
                            ? "Block"
                            : "none",
                      }}
                    ></div>
                  </div>
                  <div
                    style={{
                      flex: 2.5,
                      marginLeft: "8%",
                      paddingBottom:
                        props.type === "timeTracker"
                          ? props.experienceDetails.length - 1 !== index
                            ? "8%"
                            : "6%"
                          : "6%",
                    }}
                  >
                    <div
                      style={{
                        color: "#303030",
                        fontSize: "14px",
                        paddingRight: "12%",
                      }}
                    >
                      {ele.designation}
                      {ele.organization ? " @" + ele.organization + " " : ""}
                      {ele.startDate && ele.endDate
                        ? "(" + ele.startDate + " - " + ele.endDate + ")"
                        : ele.startDate
                        ? ele.startDate
                        : ele.endDate
                        ? ele.endDate
                        : ""}
                    </div>
                    {(ele.tools.length &&
                      ele.tools.map((element, indx) => {
                        return (
                          <div
                            key={indx}
                            style={{
                              color: "#818E94",
                              paddingRight: "12%",
                              fontSize: "14px",
                              marginTop: "8px",
                            }}
                          >
                            {element.name}
                          </div>
                        );
                      })) ||
                      ""}
                  </div>
                </div>
              );
            })) ||
            ""}
        </div>
      </div>
    </div>
  );
}
export default profileSummary;
