import React, { Component } from "react";
import SidebarLink from "./SideBarLinks";
import SidebarProfile from "../../../components/DisplayPicture.js";
import EditProfilePicture from "../../../components/profilePictureEdit.js";
import ProfilePicture from "../../../assets/images/defaultProfile.svg";
import PopUpDisplay from "../../../components/PopUpDisplay";
import Logo from "../../../assets/images/logo.png";
import selected from "../../../assets/images/selected.svg";
import unselected from "../../../assets/images/unselected.svg";
import updated from "../../../assets/images/updated.svg";
import { Tooltip } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { COLORS } from "../../../theme";
import { getEmployeeDetails } from "../../../core/apiClient/organization/organizationClient";
import { decryptData } from "../../../utils/encryptDecrypt";
import { logout } from "../../../core/apiClient/auth/index";

const styles = {
  sidebarContainer: {
    width: "100%",
    height: "100%",
    minHeight: 560,
    display: "flex",
    flexDirection: "column",
    background: "#4F53AD",
    fontFamily: "sans-serif",
    position: "relative",
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "12px",
  },
  logo: {
    width: "141px",
    height: "37px",
    fontFamily: "sans-serif",
  },
};
class SidebarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logoutPopUp: false,
      editPic: false,
      src: null,
      profileURL: ProfilePicture,
      originalProfilePic: ProfilePicture,
      updateRotation: 0,
      firstName: "",
      middleName: "",
      lastName: "",
      disableCrop: false,
    };
  }

  componentDidMount() {
    this.loadEmployeeDetails();
  }
  loadEmployeeDetails = async () => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId);
      let employeeId = decryptData(localStorage.employeeId);
      let token = decryptData(localStorage.token);
      let { data, status } = await getEmployeeDetails(orgId, employeeId, {
        Authorization: token,
      });
      if (status >= 200 && status < 300) {
        let professional = data.professionalDetails;
        let firstName = professional.firstName;
        let middleName = professional.middleName;
        let lastName = professional.lastName;
        let profileURL;
        if (professional.profilePicture) {
          profileURL = professional.profilePicture;
        } else profileURL = ProfilePicture;
        this.setState({ profileURL });
        this.setState({ firstName, middleName, lastName });
      }
      document.toggleLoading();
    } catch (error) {
      console.log(error);
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  logoutHandler = () => {
    this.setState({
      logoutPopUp: true,
    });
  };
  popUpHandler = async (bool) => {
    if (bool) {
      try {
        let token = decryptData(localStorage.token);
        localStorage.clear();
        if (token) {
          await logout(token);
        }
        window.open("/login", "_self");
      } catch (error) {
        window.open("/login", "_self");
      }
    } else {
      this.setState({ logoutPopUp: false });
    }
  };
  toggleUploadPicDrawer = () => {
    this.setState((state) => {
      return {
        src: this.state.profileURL,
        disableCrop: true,
        editPic: !state.editPic,
      };
    });
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
        editPic: false,
        disableCrop: false,
      });
    } else {
      if (this.state.originalProfilePic != null) {
        this.setState({
          profileURL: URL.createObjectURL(croppedImage),
          updateRotation: rotation,
          editPic: false,
          disableCrop: false,
        });
      } else {
        this.setState({
          profileURL: null,
          editPic: false,
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
  };
  render() {
    return (
      <div style={styles.sidebarContainer}>
        <div style={styles.logoContainer}>
          <img style={styles.logo} src={Logo} alt="logo" />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: 103,
              width: 103,
              margin: "10% 0 3% 0",
            }}
          >
            <SidebarProfile
              profile={this.state.profileURL}
              updateRotation={this.state.updateRotation}
              enableUpload={true}
              toggleUploadPicDrawer={this.toggleUploadPicDrawer}
            />
          </div>
          <div
            style={{
              color: "#FFFFFF",
              fontFamily: "Open Sans Semibold",
              fontSize: "1.4em",
              marginBottom: 14,
            }}
          >
            {(this.state.firstName ? this.state.firstName + " " : "") +
              (this.state.middleName ? this.state.middleName + " " : "") +
              (this.state.lastName ? this.state.lastName + " " : "")}
          </div>
        </div>
        <div style={{ flex: 3, margin: "5% 0" }}>
          {this.props.links.map((elements, index) => (
            <SidebarLink
              key={index}
              icons={{
                selected: selected,
                unselected: unselected,
                updated: updated,
              }}
              link={elements.title}
              status={elements.status}
              selectedStep={this.props.selectedStep}
              index={index}
              changeOnboardingStep={this.props.changeOnboardingStep}
            />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            flex: 0.5,
            alignItems: "flex-end",
            justifyContent: "center",
            padding: "0 0 5% 0",
          }}
        >
          <span onClick={this.logoutHandler} style={{ cursor: "pointer" }}>
            <Tooltip title="Log out" placement="right" color="#FCFCFC">
              <LogoutOutlined
                style={{ color: COLORS.GREY_T_99, fontSize: "2.2em" }}
              />
            </Tooltip>
          </span>
        </div>
        {this.state.logoutPopUp === true && (
          <PopUpDisplay
            subTitle="Confirm Log Out ?"
            width="20%"
            popUpHandler={this.popUpHandler}
          />
        )}
        {this.state.editPic && (
          <EditProfilePicture
            src={this.state.src}
            disableCrop={this.state.disableCrop}
            toggleUploadPicDrawer={this.toggleUploadPicDrawer}
            changeProfilePhotoHandler={this.changeProfilePhotoHandler}
            saveChangedPhotoHandler={this.saveChangedPhotoHandler}
            removeProfilePhotoHandler={this.removeProfilePhotoHandler}
          />
        )}
      </div>
    );
  }
}
export default SidebarComponent;
