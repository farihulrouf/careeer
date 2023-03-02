import React, { Component } from "react";
import "../../../../assets/css/OpenSans.css";
import EmployeeReceivedGeneralFeedbackListGroupWithManager from "./EmployeeReceivedGeneralFeedbackListGroupWithManager.js";
import { getEmployeeGenralFeedback } from "../../../../core/apiClient/organization/organizationClient";
import { decryptData } from "../../../../utils/encryptDecrypt";
import { InboxOutlined } from "@ant-design/icons";
class EmployeeReceivedGeneralFeedbackWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { receivedRatingDetails: [] };
  }

  componentDidMount() {
    this.loadEmployeeGeneralFeedback();
  }

  loadEmployeeGeneralFeedback = async () => {
    try {
      let orgId = decryptData(localStorage.orgId),
        employeeId = decryptData(localStorage.employeeId),
        token = decryptData(localStorage.token);
      if (orgId && employeeId) {
        document.toggleLoading(true);
        let { data, status } = await getEmployeeGenralFeedback(
          orgId,
          employeeId,
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          this.setState({ receivedRatingDetails: [...data] });
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
      <>
        {this.state.receivedRatingDetails.length > 0 ? (
          <div style={{ fontSize: "16px", marginTop: "20px" }}>
            <EmployeeReceivedGeneralFeedbackListGroupWithManager
              receivedRatingDetails={this.state.receivedRatingDetails}
            />
          </div>
        ) : (
          <div style={{ textAlign: "center", marginTop: "8em" }}>
            <InboxOutlined style={{ fontSize: "5em" }} />
            <div style={{ fontSize: "1.4em" }}>No feedback available</div>
          </div>
        )}
      </>
    );
  }
}
export default EmployeeReceivedGeneralFeedbackWrapper;
