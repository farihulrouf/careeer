import React, { Component } from "react";
import { Empty } from "antd";
import { decryptData } from "../utils/encryptDecrypt";
import { getEmployeeExperiencesDetails } from "../core/apiClient/organization/organizationClient";
const styles = {
  experienceMainDiv: {
    display: "flex",
    height: "100%",
    background: "#FFFFFF",
    borderRadius: "8px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
  },
  experienceCard: {
    flex: 1,
    border: "1px solid #ffffff",
    borderRadius: "5px",
    padding: "2% 0 4% 2.5%",
    width: "100%",
  },
  experienceHeading: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginBottom: "2.5%",
  },
  title: {
    paddingLeft: "18px",
    color: "#303030",
    fontSize: "16px",
    fontFamily: "Open Sans Semibold",
  },
  horizontalLine: {
    width: "68%",
    border: "0.5px solid #F9F9FA",
    marginLeft: "15px",
    paddingLeft: "20%",
  },
  cardContents: {
    display: "block",
    maxHeight: "78%",
    minHeight: "78%",
    overflowY: "auto",
  },
  experiences: {
    paddingLeft: "11%",
    display: "flex",
  },
  Dot_line: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  dot: {
    background: "#ACAED8 0% 0% no-repeat padding-box",
    border: "2px solid #FFFFFF",
    opacity: 1,
    height: "16px",
    width: "16px",
    borderRadius: "50%",
  },
  verticalline: {
    borderLeft: "2px solid #ACAED8",
    opacity: "0.3",
    flex: 1,
  },
  experienceDetails: {
    flex: 1,
    display: "block",
    lineHeight: "1.6",
    padding: " 0 36px 0 20px",
    marginBottom: "20px",
  },
  designation: {
    color: "#303030",
    fontFamily: "Open Sans SemiBold, Regular",
    fontSize: "14px",
  },
  experienceDuration: {
    color: "#8E8E8E",
    fontSize: "14px",
    fontFamily: "Open Sans Regular",
  },
};
class AdminViewExperienceDetails extends Component {
  state = {
    experienceDetails: [
      // {
      //   designation: "",
      //   organization: "",
      //   startDate: "",
      //   endDate: "",
      //   tools: [],
      //   id: "",
      // },
    ],
  };
  componentDidMount = () => {
    this.loadExperience();
  };

  loadExperience = async () => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId);
      let employeeId = this.props.selectedUser;
      let token = decryptData(localStorage.token);
      let { data, status } = await getEmployeeExperiencesDetails(
        orgId,
        employeeId,
        { Authorization: token }
      );
      if (status >= 200 && status < 300) {
        console.log("data=",data)
        if (data.length) this.setState({ experienceDetails: data });
      } else {
        document.message.error(JSON.stringify(data));
      }
      document.toggleLoading();
    } catch (error) {
      console.log(error);
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  render() {
    return (
      <div style={styles.experienceMainDiv}>
        <div style={styles.experienceCard}>
          <div style={styles.experienceHeading}>
            <img
              src={require("../assets/images/adminExperience.svg")}
              alt="icon"
            />
            <div style={styles.title}>Overall Experience</div>
            <div style={styles.horizontalLine}></div>
          </div>
          <div className="scroll-container" style={styles.cardContents}>
            {this.state.experienceDetails.length ? (
              this.state.experienceDetails.map((experience, id) => (
                <div style={styles.experiences} key={id}>
                  <div style={styles.Dot_line}>
                    <div style={styles.dot}></div>
                    {this.state.experienceDetails.length - 1 !== id && (
                      <div style={styles.verticalline}></div>
                    )}
                  </div>
                  <div style={styles.experienceDetails}>
                    <div style={styles.designation}>
                      {experience.designation}
                      {experience.organization
                        ? " @" + experience.organization
                        : ""}
                    </div>
                    <div style={styles.experienceDuration}>
                      {experience.startDate && experience.endDate
                        ? "(" +
                          experience.startDate +
                          " - " +
                          experience.endDate +
                          ")"
                        : experience.startDate
                        ? experience.startDate
                        : experience.endDate
                        ? experience.endDate
                        : ""}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default AdminViewExperienceDetails;
