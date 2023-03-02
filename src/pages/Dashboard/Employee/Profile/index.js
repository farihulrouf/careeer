import React, { Component } from "react";
import "../../../../assets/css/OpenSans.css";
import ProfilePicture from "../../../../assets/images/defaultProfile.svg";
import Button from "../../../../components/Button";
import ProfileCard from "../../../../components/EmployeeUserProfileCard";
import ProfilePoints from "../../../../components/EmployeeUserProfilePoints";
import SkillScoreCard from "../../../../components/SkillScoreCard";
import ProfessionalDetails from "./ProfessionalDetails";
import ActivityVsSkillPerformance from "../../../../components/ActivityVsSkillPerformance";
import EducationDetails from "./EducationDetails";
import SkillsDetails from "./SkillsDetails";
import ExperienceDetails from "./ExperienceDetails";
import ProjectDetails from "./ProjectDetails";
import CertificateDetails from "./CertificateDetails";
import EmployeeUserProfileAssessment from "../../../../components/EmployeeUserProfileAssessment";
import ProfilePictureEdit from "../../../../components/profilePictureEdit.js";
import { getEmployeeDetails } from "../../../../core/apiClient/organization/organizationClient";
import { decryptData } from "../../../../utils/encryptDecrypt";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: null,
      profileURL: ProfilePicture,
      originalProfilePic: ProfilePicture,
      professionalDetails: "",
      updateRotation: 0,
      mySkillScore: {
        earnedScore: 58,
        totalScore: 100,
      },
      disableCrop: false,
    };
  }
  componentDidMount = () => {
    this.loadEmployeeDetails();
  };

  loadEmployeeDetails = async () => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId),
        employeeId = decryptData(localStorage.employeeId),
        token = decryptData(localStorage.token),
        profileURL;
      let { data, status } = await getEmployeeDetails(orgId, employeeId, {
        Authorization: token,
      });
      if (status >= 200 && status < 300) {
        if (data.professionalDetails.profilePicture !== null) {
          profileURL = data.professionalDetails.profilePicture;
        } else profileURL = ProfilePicture;
        this.setState({
          professionalDetails: data.professionalDetails,
          profileURL,
        });
      }
      this.props.profileChangeHandler(data.professionalDetails);
      document.toggleLoading();
    } catch (error) {
      console.log(error);
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  changeProfilePhotoHandler = (e) => {
    let file = e.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        this.setState({
          src: fileReader.result,
          originalProfilePic: fileReader.result,
          disableCrop: false,
        });
      };
      fileReader.readAsDataURL(file);
    }
  };
  saveChangedPhotoHandler = (croppedImage, rotation) => {
    if (!this.state.src) {
      this.setState({
        profileURL: "",
        profilePicEdit: false,
        disableCrop: false,
      });
    } else {
      if (this.state.originalProfilePic != null) {
        this.setState({
          profileURL: URL.createObjectURL(croppedImage),
          updateRotation: rotation,
          profilePicEdit: false,
          disableCrop: false,
        });
        this.props.profilePicUpload(URL.createObjectURL(croppedImage));
      } else {
        this.setState({
          profileURL: null,
          profilePicEdit: false,
          disableCrop: false,
        });
      }
    }
  };

  removeProfilePhotoHandler = () => {
    this.setState({
      src: ProfilePicture,
      profileURL: ProfilePicture,
      originalProfilePic: ProfilePicture,
      updateRotation: 0,
      disableCrop: true,
    });
    this.props.profilePicUpload("remove");
  };

  toggleUploadPicDrawer = () => {
    try {
      this.setState((state) => {
        return {
          src: this.state.profileURL,
          disableCrop: true,
          profilePicEdit: !state.profilePicEdit,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div
        style={{
          background: "#F8F8F8",
          padding: "20px",
          overflowX: "hidden",
          color: "#303030",
        }}
      >
        {this.state.profilePicEdit && (
          <ProfilePictureEdit {...this.state} {...this} {...this.props} />
        )}
        <div
          style={{
            fontSize: "12px",
            color: "#767676",
            fontFamily: "Open Sans Regular",
          }}
        >
          {this.props.viewProfileFrom
            ? this.props.viewProfileFrom + " > User Profile"
            : "User Profile"}
        </div>
        <div
          style={{
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "6px",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontFamily: "Open Sans Semibold",
            }}
          >
            User Profile
          </div>
          <div
            onClick={() => this.props.history.goBack()}
            style={{
              width: "104px",
              fontSize: 14,
              fontFamily: "Open Sans Regular",
            }}
          >
            <Button
              label={"<  Back"}
              styles={{
                color: "#FF808B",
                backgroundColor: "transparent",
                border: "#FF808B",
                height: "40px",
              }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{ display: "flex", height: "167px", marginBottom: "12px" }}
          >
            <div style={{ flex: 1, marginRight: "12px" }}>
              <ProfileCard {...this.state} {...this} />
            </div>
            <div style={{ flex: 0.7, marginRight: "12px" }}>
              <ProfilePoints />
            </div>
            <div
              style={{
                flex: 0.6,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#FFFFFF",
                borderRadius: "8px",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
              }}
            >
              <SkillScoreCard {...this.state} />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              height: "340px",
              marginBottom: "12px",
            }}
          >
            <div style={{ flex: 1, marginRight: "12px" }}>
              <ProfessionalDetails {...this.state} {...this} {...this.props} />
            </div>
            <div
              style={{
                flex: 1,
                background: "#FFFFFF",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                height: "100%",
                borderRadius: "8px",
              }}
            >
              <ActivityVsSkillPerformance role="employee"/>
            </div>
          </div>
          <div
            style={{ display: "flex", height: "340px", marginBottom: "12px" }}
          >
            <div style={{ flex: 1, marginRight: "12px" }}>
              <EducationDetails dropDownScroll={true} />
            </div>
            <div style={{ flex: 1 }}>
              <SkillsDetails />
            </div>
          </div>
          <div
            style={{
              height: "300px",
              marginBottom: "12px",
              display: "flex",
            }}
          >
            <div style={{ flex: 1, marginRight: "12px" }}>
              <ExperienceDetails
                {...this.state}
                {...this}
                {...this.props}
                dropDownScroll={true}
              />
            </div>
            <div style={{ flex: 1 }}>
              <ProjectDetails />
            </div>
          </div>
          <div
            style={{
              height: "305px",
              marginBottom: "28px",
              display: "flex",
            }}
          >
            <div style={{ flex: 1, marginRight: "12px" }}>
              <CertificateDetails
                {...this.state}
                {...this}
                {...this.props}
                dropDownScroll={true}
              />
            </div>
            <div style={{ flex: 1 }}>
              <EmployeeUserProfileAssessment />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
