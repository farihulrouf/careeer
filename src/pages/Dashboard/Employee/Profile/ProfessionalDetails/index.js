import React from "react";
import "../../../../../assets/css/EmployeeUserProfileDetails.css";
import { Modal } from "antd";
import "antd/dist/antd.css";
import EditEmployeeDetails from "./ProfessionalModal";

export default class EmployeeUserProfileDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  showDetails = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = () => {
    this.setState({
      visible: false,
    });
    this.props.loadEmployeeDetails();
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const employee = this.props.professionalDetails;
    return (
      <div className="employeeDetails-mainDiv">
        <div className="employeeDetails-item">
          <div className="header">
            <img src={require("../../../../../assets/images/Group.svg")} alt="empIcon" />
            <div className="employeeDetailsHeading">Employee Details</div>
            <div className="line"></div>
            <div className="editButton" onClick={this.showDetails}>
              <img
                src={require("../../../../../assets/images/Groupedit.svg")}
                alt="editIcon"
              />
            </div>
          </div>

          <div className="cardName" style={{ paddingLeft: "10%" }}>
            Professional Details
          </div>
          <div
            className="employeeDetails"
            style={{
              height: "62%",
              overflowY: "auto",
              width: "100%",
              padding: "0 16px 0 10%",
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
        {this.state.visible && (
          <Modal
            visible={this.state.visible}
            width="50%"
            footer={null}
            onCancel={this.handleCancel}
            height="400px"
            className="dashboard-modal"
          >
            <div className="user-profile-edit scroll-container">
              <EditEmployeeDetails
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
