import React, { Component } from "react";
import { getEmployeeDetails } from "../core/apiClient/organization/organizationClient";
import { decryptData } from "../utils/encryptDecrypt";
import "../assets/css/AdminViewEmployeeDetails.css";

class AdminViewEmployeeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      professionalDetails: "",
    };
  }

  componentDidMount = () => {
    this.loadEmployeeDetails();
  };
  loadEmployeeDetails = async () => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId),
        employeeId = this.props.selectedUser,
        token = decryptData(localStorage.token)

      let { data, status } = await getEmployeeDetails(orgId, employeeId, {
        Authorization: token,
      });
      if (status >= 200 && status < 300) {
        this.setState({
          professionalDetails: data.professionalDetails,
        });
      }
      document.toggleLoading();
    } catch (error) {
      console.log(error);
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };
  render() {
    const employee = this.state.professionalDetails;
    return (
      <div className="employeeDetails-mainDiv1">
        <div className="employeeDetails-item1">
          <div className="header1">
            <img src={require("../assets/images/empDetailsIcon.svg")} alt="empDetailsIcon" />
            <div className="employeeDetailsHeading1">Employee Details</div>
            <div className="line1"></div>
          </div>
          <div className="cardName1" style={{ paddingLeft: "10%" }}>
            Professional Details
          </div>
          <div
            className="employeeDetailsContainer1 scroll-container"
            style={{
              minHeight: "64%",
              maxHeight: "64%",
              overflowY: "auto",
              paddingLeft: "10%",
            }}
          >
            <div style={{ display: "flex" }}>
              <div className="employeeDetails-firstpart">Official Email Id</div>
              <div className="employeeDetails-secondpart">
                {(employee && employee.officialEmail) || "N/A"}
              </div>
            </div>

            <div style={{ display: "flex" }}>
              <div className="employeeDetails-firstpart">Organisation</div>
              <div className="employeeDetails-secondpart">
                {(employee && employee.organization) || "N/A"}
              </div>
            </div>

            <div style={{ display: "flex" }}>
              <div className="employeeDetails-firstpart">Designation</div>
              <div className="employeeDetails-secondpart">
                {(employee && employee.designation) || "N/A"}
              </div>
            </div>

            <div style={{ display: "flex" }}>
              <div className="employeeDetails-firstpart">Department</div>
              <div className="employeeDetails-secondpart">
                {(employee && employee.department) || "N/A"}
              </div>
            </div>

            <div style={{ display: "flex" }}>
              <div className="employeeDetails-firstpart">Country</div>
              <div className="employeeDetails-secondpart">
                {(employee && employee.country) || "India"}
              </div>
            </div>

            <div style={{ display: "flex" }}>
              <div className="employeeDetails-firstpart">Region</div>
              <div className="employeeDetails-secondpart">
                {(employee && employee.region) || "Bangalore,India"}
              </div>
            </div>

            <div style={{ display: "flex" }}>
              <div className="employeeDetails-firstpart">Location</div>
              <div className="employeeDetails-secondpart">
                {(employee && employee.location) ||
                  "BTP Office,Bangalore,India"}
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div className="employeeDetails-firstpart">Phone Number</div>
              <div className="employeeDetails-secondpart">
                {(employee && employee.phoneNumber) || "N/A"}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminViewEmployeeDetails;
