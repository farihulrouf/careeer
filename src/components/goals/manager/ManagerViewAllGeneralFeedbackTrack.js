import React, { Component } from "react";
import { decryptData } from "../../../utils/encryptDecrypt";
import { getManagerEmployeeAllGeneralFeedback } from "../../../core/apiClient/organization/organizationClient";
import ProfileCard from "../ProfileDisplayCard";
import ManagerViewEmployeeGeneralFeedbackList from "./ManagerViewEmployeeGeneralFeedbackList";
class ManagerViewAllGeneralFeedbackTrack extends Component {
  state = { receivedRatingDetails: [], employeeFeedBackData: {} };

  componentDidMount() {
    let empId = this.props.match.params.currentGeneralId;
    this.loadEmployeeGeneralFeedback(empId);
  }
  loadEmployeeGeneralFeedback = async (empId) => {
    try {
      let orgId = decryptData(localStorage.orgId),
        token = decryptData(localStorage.token),
        managerId = decryptData(localStorage.employeeId);
      if (orgId && empId) {
        document.toggleLoading(true);
        let { data, status } = await getManagerEmployeeAllGeneralFeedback(
          orgId,
          managerId,
          empId,
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          let employeeDetails = data;
          this.setState({
            employeeFeedBackData: employeeDetails,
            receivedRatingDetails: [...data.feedbacks],
          });
        }
        document.toggleLoading();
      }
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  render() {
    const employee = this.state.employeeFeedBackData;
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "0.16fr 1fr",
          gridColumnGap: "2%",
        }}
      >
        <div style={{ marginTop: "8.5%" }}>
          <ProfileCard
            firstName={employee.firstName}
            middleName={employee.middleName}
            lastName={employee.lastName}
            profilePicture={employee.profilePicture}
            designation={employee.designation}
          />
        </div>
        <div>
          {this.state.receivedRatingDetails.length > 0
            ? this.state.receivedRatingDetails.map((eachFeedback, index) => (
                <ManagerViewEmployeeGeneralFeedbackList
                  receivedRatingListGroup={eachFeedback}
                  key={index}
                />
              ))
            : ""}
        </div>
      </div>
    );
  }
}

export default ManagerViewAllGeneralFeedbackTrack;
