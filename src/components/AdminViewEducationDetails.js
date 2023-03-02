import React, { Component } from "react";
import { Empty } from "antd";
import adminViewEducation from "../assets/images/adminViewEducation.svg";
import { getEmployeeEducationDetails } from "../core/apiClient/organization/organizationClient";
import { decryptData } from "../utils/encryptDecrypt";
const styles = {
  wholeComponent: {
    width: "100%",
    background: "#FFFFFF",
    borderRadius: "8px",
    height: "100%",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
  },
  Component: {
    border: "1px solid #ffffff",
    borderRadius: "8px",
    padding: "2% 0 0 3%",
    display: "flex",
    flexDirection: "column",
  },
  educationHeading: {
    flex: 0.2,
    display: "flex",
    alignItems: "center",
    marginBottom: "14px",
  },

  educationMainDiv: {
    flex: 1,
    display: "block",
    padding: "0 6% 0 10%",
  },
  educationDiv: {
    display: "flex",
  },
  icon: {
    flex: 0.1,
    display: "flex",
    justifyContent: "center",
  },
  heading: {
    textAlign: "center",
    fontFamily: "Open Sans SemiBold",
    color: "#303030",
    fontSize: "16px",
    opacity: 1,
    marginLeft: "3%",
  },
  horline: {
    flex: 1,
    color: "#F9F9FA",
    width: "100%",
    marginLeft: "10px",
  },
  editButton: {
    flex: 0.1,
    display: "flex",
    justifyContent: "center",
    cursor: "pointer",
  },
  Dot_line: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  Education: {
    display: "block",
    padding: "0 0 0 10px",
    width: "100%",
    marginBottom: "20px",
  },
  Degree_Year: {
    marginLeft: "3px",
    display: "flex",
    fontSize: 14,
    fontFamily: "Open Sans SemiBold, Regular",
    color: "#303030",
    opacity: 1,
  },
  Group_University: {
    margin: "3px",
    fontFamily: "Open Sans Regular",
    fontSize: 14,
    color: "#8E8E8E",
    opacity: 1,
  },
};
class AdminViewEducationDetails extends Component {
  state = {
    educationDetails: [],
  };
  componentDidMount = () => {
    this.loadEducationData();
  };
  loadEducationData = async () => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId);
      let employeeId = this.props.selectedUser;
      let token = decryptData(localStorage.token);
      let { data, status } = await getEmployeeEducationDetails(
        orgId,
        employeeId,
        { Authorization: token }
      );
      if (status >= 200 && status < 300) {
        if (data.length) this.setState({ educationDetails: data });
      } else {
        document.message.error(JSON.stringify(data));
      }
      document.toggleLoading();
    } catch (error) {
      console.log("error", error);
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  render() {
    return (
      <div style={styles.wholeComponent}>
        <div style={styles.Component}>
          <div style={styles.educationHeading}>
            <div style={styles.icon}>
              <img src={adminViewEducation} alt="icon"></img>
            </div>
            <div style={styles.heading}>Education</div>
            <div
              style={{
                border: "1px solid #f9f9fa",
                width: "70%",
                marginLeft: "18px",
              }}
            ></div>
          </div>
          <div
            className="scroll-container"
            style={{ overflowY: "auto", height: "240px" }}
          >
            <div style={styles.educationMainDiv}>
              {this.state.educationDetails.length ? (
                this.state.educationDetails.map((educateele, educateid) => (
                  <div style={styles.educationDiv} key={educateid}>
                    <div style={styles.Dot_line}>
                      <div
                        style={{
                          background: "#ACAED8 0% 0% no-repeat padding-box",
                          border: "2px solid #FFFFFF",
                          opacity: 1,
                          height: educateid === 0 ? "19px" : "16px",
                          width: "16px",
                          borderRadius: "50%",
                        }}
                      ></div>
                      {this.state.educationDetails.length - 1 !== educateid && (
                        <div style={styles.verticalline}></div>
                      )}
                    </div>
                    <div style={styles.Education}>
                      <div style={styles.Degree_Year}>
                        <div>{educateele.degree}</div>
                        <div>
                          &nbsp;
                          {educateele.course ? "in " + educateele.course : ""}
                        </div>
                        &nbsp;
                        <div>
                          {" "}
                          {educateele.completionYear
                            ? "(" + educateele.completionYear + ")"
                            : ""}
                        </div>
                      </div>
                      <div style={styles.Group_University}>
                        {educateele.specialization
                          ? educateele.specialization + ", "
                          : ""}
                        {educateele.institute || ""}
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
      </div>
    );
  }
}

export default AdminViewEducationDetails;
