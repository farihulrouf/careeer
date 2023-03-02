import React from "react";
import profileDots from "../assets/images/profileDots.svg";
import { getEmployeeDetails } from "../core/apiClient/organization/organizationClient";
import { decryptData } from "../utils/encryptDecrypt";
import defaultProfile from "../assets/images/defaultProfile.svg";
import { COLORS } from "../theme";
export default class UserProfileCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { employee: "" };
  }
  componentDidMount = () => {
    this.loadEmployeeDetails();
  };
  loadEmployeeDetails = async () => {
    let orgId = decryptData(localStorage.orgId),
      employeeId = this.props.selectedUser
        ? this.props.selectedUser
        : decryptData(localStorage.employeeId),
      token = decryptData(localStorage.token);
    if (orgId && employeeId) {
      try {
        document.toggleLoading(true);
        let { data, status } = await getEmployeeDetails(orgId, employeeId, {
          Authorization: token,
        });
        if (status >= 200 && status < 300) {
          this.setState({
            employee: data.professionalDetails,
          });
        }

        document.toggleLoading();
      } catch (error) {
        document.message.error(
          "Unable to fetch details, please try after sometime"
        );
        document.toggleLoading();
      }
    }
  };
  render() {
    const { employee } = this.state;
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          borderRadius: "8px",
          background: "#FFFFFF",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        }}
      >
        <div
          style={{
            flex: 0.65,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            position: "relative",
          }}
        >
          <div style={{ position: "relative", left: "10px", bottom: "12px" }}>
            <img src={profileDots} alt="profileDots" />
          </div>
          <div style={{ zIndex: 1 }}>
            <img
              src={(employee && employee.profilePicture) || defaultProfile}
              style={{
                transform: `rotate(${this.props.updateRotation}deg)`,
                borderRadius: "100%",
                width: "116px",
                height: "115px",
                background: COLORS.GREY_T_96,
              }}
              alt="profPic"
            />
          </div>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              marginLeft: "26px",
            }}
          >
            <div
              style={{
                color: "#303030",
                fontFamily: "Open Sans Regular",
                fontSize: "24px",
              }}
            >
              {employee &&
                (employee.firstName || "") +
                " " +
                `${employee.middleName || ""}` +
                " " +
                (employee.lastName || "")}
            </div>
            <div
              style={{
                color: "#8e8e8e",
                fontSize: "18px",
                fontFamily: "Open Sans Regular",
                marginBottom: 6,
              }}
            >
              {employee && employee.designation}
            </div>
            {this.props.isViewProfile && (
              <span
                onClick={() =>
                  this.props.viewProfileHandler(this.props.selectedUser)
                }
                style={{
                  fontSize: "0.875em",
                  color: "#FF808B",
                  cursor: "pointer",
                }}
              >
                <u>View profile</u>
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
}
