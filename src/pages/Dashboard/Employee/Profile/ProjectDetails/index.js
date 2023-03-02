import React from "react";
import { Modal, Empty } from "antd";
import "../../../../../assets/css/ScrollBarDesign.css";
import "antd/dist/antd.css";
import ProjectModal from "../../../../EmployeeOnboardingFlow/ProjectDetails";
import { getEmployeeProjectsDetails } from "../../../../../core/apiClient/organization/organizationClient";
import { decryptData } from "../../../../../utils/encryptDecrypt";

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
    padding: "2% 2% 4% 2.5%",
    width: "100%",
  },
  projectsHeading: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginBottom: "1.5%",
  },
  title: {
    paddingLeft: "18px",
    color: "#303030",
    fontSize: "16px",
    fontFamily: "Open Sans SemiBold",
    fontWeight: "600",
  },
  horizontalLine: {
    width: "59%",
    border: "1px solid #F9F9FA",
    marginLeft: "15px",
    paddingLeft: "20%",
  },
  cardContents: {
    display: "block",
    maxHeight: "68%",
    minHeight: "68%",
    overflowY: "auto",
  },
  projects: {
    paddingLeft: "10.5%",
    display: "flex",
    paddingBottom: "4%",
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
    minHeight: "60px",
  },
  projectsDetails: {
    flex: 1,
    display: "block",
    lineHeight: "1.6",
    padding: "0 8% 0 4%",
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
  icon: {
    backgroundColor: "#EDEDF7",
    borderRadius: "50%",
    display: "flex",
    width: "5%",
    alignItems: "center",
    padding: "1% 0.5% 0.7% 1.2%",
  },
  editButton: {
    cursor: "pointer",
  },
};
export default class ProjectDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, projectDetails: [] };
  }

  componentDidMount() {
    this.loadProjectsDetails();
  }

  loadProjectsDetails = async () => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId);
      let employeeId = decryptData(localStorage.employeeId);
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

  showDetails = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = () => {
    this.setState({
      visible: false,
    });
    this.loadProjectsDetails();
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
    this.loadProjectsDetails();
  };
  render() {
    const { projectDetails, visible } = this.state;
    return (
      <div style={styles.projectsMainDiv}>
        <div style={styles.projectsCard}>
          <div style={styles.projectsHeading}>
            <img
              src={require("../../../../../assets/images/projects.svg")}
              width="50px"
              height="50px"
              alt="icon"
            />
            <div style={styles.title}>Projects Handled</div>
            <div style={styles.horizontalLine}></div>
            <div onClick={this.showDetails} style={styles.editButton}>
              <img
                src={require("../../../../../assets/images/Groupedit.svg")}
                alt="edit"
              />
            </div>
          </div>
          <div style={styles.cardContents} className="scroll-container">
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
        {visible && (
          <Modal
            visible={visible}
            width="50%"
            footer={null}
            onCancel={this.handleCancel}
            height="400px"
            className="dashboard-modal"
          >
            <div className="user-profile-edit scroll-container">
              <ProjectModal
                changeOnboardingStep={(e) => this.handleOk(e)}
                cancel={this.handleCancel}
              />
            </div>
          </Modal>
        )}
      </div>
    );
  }
}
