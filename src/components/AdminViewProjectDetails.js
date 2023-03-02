import React, { Component } from "react";
import { getEmployeeProjectsDetails } from "../core/apiClient/organization/organizationClient";
import { decryptData } from "../utils/encryptDecrypt";
import { Empty } from "antd";
const styles = {
  projectsMainDiv: {
    display: "flex",
    height: "100%",
    background: "#FFFFFF",
    borderRadius: "8px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
  },
  projectsCard: {
    flex: 1,
    border: "1px solid #ffffff",
    borderRadius: "5px",
    padding: "2% 0 4% 2.5%",
    width: "100%",
  },
  projectsHeading: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginBottom: "2.5%",
  },
  title: {
    paddingLeft: "18px",
    color: "#303030",
    fontSize: "16px",
    fontFamily: "Open Sans SemiBold",
    fontWeight: "600",
  },
  horizontalLine: {
    width: "69%",
    border: "1px solid #F9F9FA",
    marginLeft: "15px",
    paddingLeft: "20%",
  },
  cardContents: {
    display: "block",
    maxHeight: "75%",
    minHeight: "75%",
    overflowY: "auto",
  },
  projects: {
    paddingLeft: "10%",
    display: "flex",
    paddingBottom: "4%",
  },
  Dot_line: {
    width: "2%",
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
    marginTop: 2,
  },
  projectsDetails: {
    display: "block",
    lineHeight: "1.6",
    padding: "0 36px 0 4%",
    flex: 1,
  },
  designation: {
    color: "#303030",
    fontFamily: "Open Sans SemiBold, Regular",
    fontSize: "14px",
  },
  projectsDuration: {
    color: "#8E8E8E",
    fontSize: "14px",
    fontFamily: "Open Sans Regular",
  },
};
class AdminViewProjectDetails extends Component {
  state = {
    projectDetails: [],
  };
  componentDidMount = () => {
    this.loadProjectsDetails();
  };

  loadProjectsDetails = async () => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId);
      let employeeId = this.props.selectedUser;
      let token = decryptData(localStorage.token);
      let { data, status } = await getEmployeeProjectsDetails(
        orgId,
        employeeId,
        { Authorization: token }
      );

      if (status >= 200 && status < 300) {
        if (data.length) {
          if (data.length) this.setState({ projectDetails: data });
        }
      } else {
        document.message.error(JSON.stringify(data));
      }
      document.toggleLoading();
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  render() {
    const { projectDetails } = this.state;
    return (
      <div style={styles.projectsMainDiv}>
        <div style={styles.projectsCard}>
          <div style={styles.projectsHeading}>
            <img
              src={require("../assets/images/adminViewProject.svg")}
              alt="icon"
            />
            <div style={styles.title} className="projecttile">Projects Handled </div>
            <div style={styles.horizontalLine}></div>
          </div>
          <div className="scroll-container" style={styles.cardContents}>
            {projectDetails.length ? (
              projectDetails.map((project, id) => (
                <div style={styles.projects} key={id}>
                  <div style={styles.Dot_line}>
                    <div style={styles.dot}></div>
                  </div>
                  <div style={styles.projectsDetails}>
                    <div style={styles.designation}>{project.name || ""}</div>
                    <div style={styles.projectsDuration}>
                      {project.descriptions || ""}
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

export default AdminViewProjectDetails;
