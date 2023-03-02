import React from "react";
const styles = {
  noDataMainDiv: {
    display: "grid",
    marginTop: "1%",
  },
  noDataContent: {
    gridTemplateColumns: "auto",
    padding: "5% 0% 5% 0%",
    textAlign: "center",
    boxShadow: " 1px 4px 12px #00000027",
    borderRadius: "8px",
    opacity: 1,
  },
  firstLine: {
    color: "#303030",
    fontSize: "18px",
    fontFamily: "Open Sans Semibold",
    marginTop: "1%",
  },
  secondLine: {
    color: "#767676",
    fontSize: "16px",
    fontFamily: "Open Sans Regular",
    marginTop: "1%",
  },
};
export default class NoRewardDataPage extends React.Component {
  render() {
    return (
      <div style={styles.noDataMainDiv}>
        <div style={styles.noDataContent}>
          <div>
            <img src={require("../../../assets/images/nodata.svg")} alt="noData" />
          </div>
          <div style={styles.firstLine}>
            You don’t have any reward approval request
          </div>
          <div style={styles.secondLine}>
            We will notify you in case anyone sends you a request
          </div>
        </div>
      </div>
    );
  }
}
