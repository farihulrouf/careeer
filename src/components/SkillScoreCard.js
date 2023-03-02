import React from "react";
import { decryptData } from "../utils/encryptDecrypt";
import { getSkillScore } from "../core/apiClient/assessment";
const styles = {
  CardContainer: {
    height: "104px",
    width: "211px",
    background: "#FF808B",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "6px",
    color: "white",
    boxShadow: "0px 3px 6px 0 rgba(0, 0, 0, 0.2)",
  },
  TitleContainer: {
    fontSize: 16,
    fontFamily: "Open Sans Regular",
  },
};
export default class SkillScoreCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { skillScore: 0 };
  }

  componentDidMount() {
    this.loadSkillScore();
    console.log("employee", this.props.selectedUser);
  }

  loadSkillScore = async () => {
    try {
      let employeeId = this.props.selectedUser
          ? this.props.selectedUser
          : decryptData(localStorage.employeeId),
        token = decryptData(localStorage.token);
      if (employeeId) {
        document.toggleLoading(true);
        let { data, status } = await getSkillScore(employeeId, {
          Authorization: token,
        });
        if (status >= 200 && status < 300) {
          this.setState({ skillScore: data.skillScore });
        }
        document.toggleLoading();
      }
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  render() {
    return (
      <div style={styles.CardContainer}>
        <div style={styles.TitleContainer}>My Skill Score</div>
        <div
          style={{
            display: "flex",
            fontSize: "32px",
            alignItems: "center",
            fontWeight: "600",
            fontFamily: "Open Sans Regular,Bold",
          }}
        >
          <div>{Math.round(this.state.skillScore) || 0}</div>
        </div>
      </div>
    );
  }
}
