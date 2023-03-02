import React, { Component } from "react";
import AdminViewEmployeeDetails from "./AdminViewEmployeeDetails";
import AdminViewEducationDetails from "./AdminViewEducationDetails";
import AdminViewSkillDetails from "./AdminViewSkillDetails";
import AdminViewExperienceDetails from "./AdminViewExperienceDetails";
import AdminViewProjectDetails from "./AdminViewProjectDetails";
import AdminViewCertificateDetails from "./AdminViewCertificateDetails";
import "../assets/css/OpenSans.css";
import "antd/dist/antd.css";
class AdminViewEmployeeProfileDetails extends Component {
  state = {
    isLoding: false,
  };
  loadingHandler = (isLoding) => {
    document.toggleLoading(isLoding);
  };
  render() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            height: 340,
            marginBottom: "12px",
          }}
        >
          <div style={{ flex: 1, marginRight: "16px" }}>
            <AdminViewEmployeeDetails
              {...this.props}
              loadingHandler={this.loadingHandler}
            />
          </div>
          <div style={{ flex: 1 }}>
            <AdminViewEducationDetails {...this.props} />
          </div>
        </div>
        <div style={{ display: "flex", height: 340, marginBottom: "16px" }}>
          <div style={{ flex: 1, marginRight: "16px" }}>
            <AdminViewSkillDetails {...this.props} />
          </div>
          <div style={{ flex: 1 }}>
            <AdminViewExperienceDetails {...this.props} />
          </div>
        </div>
        <div style={{ display: "flex", height: 305 }}>
          <div style={{ flex: 1, marginRight: "16px" }}>
            <AdminViewProjectDetails {...this.props} />
          </div>
          <div style={{ flex: 1 }}>
            <AdminViewCertificateDetails {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}

export default AdminViewEmployeeProfileDetails;
