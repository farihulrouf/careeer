import React from "react";
import EmployeeDashboardMySkillIteam from "./EmployeeDashboardMySkillIteam.js";
import { getAssessmentScore } from "../core/apiClient/assessment";
import { decryptData } from "../utils/encryptDecrypt";

const styles = {
  skillsMainDiv: {
    display: "flex",
    height: "100%",
    borderRadius: "8px",
    boxShadow: "1px 4px 12px #00000027",
  },
  skillsSubDiv: {
    width: "100%",
    padding: "20px",
  },
  boxTitle: {
    display: "flex",
    alignItems: "center",
    color: "#303030",
    fontSize: "18px",
    fontFamily: "Open Sans SemiBold, Regular",
  },
};

export default class EmployeeDashboardMySkillsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assessmentSkills: [
        {
          skillType: "Technical",
          progressPercentage: 0,
          color: "#FFB97D",
          trailColor: "#FFF5EC",
        },
        {
          skillType: "Functional",
          progressPercentage: 0,
          color: "#9898F7",
          trailColor: "#F0F0FE",
        },
        {
          skillType: "Interpersonal",
          progressPercentage: 0,
          color: "#FF8C96",
          trailColor: "#FDEEEF",
        },
        {
          skillType: "Stake holder",
          progressPercentage: 0,
          color: "#9698C7",
          trailColor: "#F3F3F9",
        },
      ],
    };
  }
  componentDidMount() {
    this.loadAssessmentSkillsScore();
  }

  loadAssessmentSkillsScore = async () => {
    try {
      let employeeId = decryptData(localStorage.employeeId),
        token = decryptData(localStorage.token),
        assessmentSkills = this.state.assessmentSkills;
      if (employeeId) {
        document.toggleLoading(true);
        let { data, status } = await getAssessmentScore(employeeId, "", {
          Authorization: token,
        });
        if (status >= 200 && status < 300) {
          if (data) {
            for (let i = 0; i < assessmentSkills.length; i++) {
              for (const [key, value] of Object.entries(data)) {
                if (assessmentSkills[i].skillType.includes(key)) {
                  assessmentSkills[i].progressPercentage = value || 0;
                }
              }
            }
          }
          this.setState({ assessmentSkills });
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
      <div style={styles.skillsMainDiv}>
        <div style={styles.skillsSubDiv}>
          <div style={styles.boxTitle}>My Skills</div>
          <div
            style={{ marginBottom: "1px", height: "270px", overflowY: "auto" }}
          >
            {this.state.assessmentSkills.map((eachSkill, id) => (
              <div style={{ marginTop: id === 0 ? "45px" : "28px" }} key={id}>
                <EmployeeDashboardMySkillIteam {...eachSkill} {...this.props} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
