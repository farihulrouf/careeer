import React, { Component } from "react";
import Styled from "styled-components";
import HeaderIcon from "./AppBellIcon";
import Poygon from "../assets/images/Polygon.svg";
import ToolTip from "./ToolTipComponent";
import EditProfilePicture from "../components/profilePictureEdit.js";
import CloseIcon from "../assets/images/close.svg";
import defaultProfile from "../assets/images/defaultProfile.svg";
import { COLORS } from "../theme";
import BellIcon from "../assets/images/notification.svg";
import CareerIcon from "../assets/images/career.svg";
import CancelIcon from "../assets/svg/cancelIcon.svg";
import RightRotateIcon from "../assets/svg/rightRotateIcon.svg";
import lefttRotateIcon from "../assets/svg/leftRotateIcon.svg";
import ReactCrop from "react-image-crop";
import ProfilePicture from "../assets/images/defaultProfile.svg";
import { List } from "antd";
import InfiniteScroll from "react-infinite-scroller";
import { decryptData } from "../utils/encryptDecrypt";
import { message } from "antd";
import "react-image-crop/dist/ReactCrop.css";
import {
  uploadProfilePicture,
  removeProfilePicture,
} from "../core/apiClient/organization/organizationClient";
import {
  getNotifications,
  viewNotifications,
  readNotifications,
} from "../core/apiClient/notification";
import dateTimeToTimestamp from "../core/lib/DateTimeToTimeStamp";
import timeStampToTimeElapsed from "../core/lib/TimeStampToTimeElapsed";
const styles = {
  cancelEditPhoto: {
    height: "26px",
    width: "26px",
    fontSize: "0.9em",
    color: "#8154AA",
    background: "#F1F1F8",
    borderRadius: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "10px",
    cursor: "pointer",
  },
};
const Headder = Styled.header`
height: 60px;
width: 100%;
background:#4D4CAC;
padding:0px 0 0 30px;
display:flex;
align-items:center;
position:relative;
.logoContainer{
    flex: 1;
}
.logo{
    margin-top:8px;
    height:30px;
    width:125px;
}

.profileContainer{
    display:flex;
    float:right;
    align-items:center;
}
.flag{
    width: 40px;    
    height: 26px;
}
.bellIcon{
    margin:0 30px;
    cursor:pointer;
    outline:none;
}

.profilePic{
    height:35px;
    width:35px;
    border: 1.8px solid #ffffff;
    border-radius:50%;
    margin-left:10px;
    background: ${COLORS.GREY_T_96};
}
.icon{
    width: 9px;
    height: 6px;
    transform: matrix(-1, 0, 0, -1, 0, 0);
    background: #FFFFFF 0% 0% no-repeat padding-box;
    opacity: 1;
}
.polygon{
    width:12px;
    height:6px;
    margin-left:6px;
    cursor:pointer
}
.profileViewPic{
  height:48px;
  width:48px;
  border-radius:50%;
  margin-right:10px;
  background: ${COLORS.GREY_T_96};
}
.imageContainer{
  display:flex;
  padding:0 20px;
  line-height:1.8em;
  cursor:default;
  align-items:center;
  margin-bottom:25px;
}
.employeeImageContainer{
  display:flex;
  padding:0 20px;
  line-height:1.8em;
  cursor:default;
  align-items:center;
  margin-bottom:25px;

  &:hover{
    color:#4D4CAC;
    background-color:#F1F1F8;
    cursor:pointer
  }
}
.nameLabel{
  color:#303030;
  font-family:Open Sans Semibold;
}

.designationLabel{
  color:#8E8E8E;
  font-size:12px;
}
.linkContainer div{
  padding:9px 20px;

  &:hover{
    color:#4D4CAC;
    background-color:#F1F1F8;
    cursor:pointer
  }
}
.notificationDropDown{
  width: inherit;
  height: inherit;
  outline: none;
  padding-top:20px;
}
.notificationTitle{
  text-align:center;
  font-size:18px;
  font-family:Open Sans Semibold;
  border-bottom:1px solid #9FA9BC66;
  padding-bottom:5%;
  letter-spacing:0.03em;
}
.detailsContainer{
  min-height:22px;
  max-height:320px;
  overflow-y:auto;
  margin-right:0.9%;
  &::-webkit-scrollbar {
    width: 3px;
    background-color: #ffffff;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #bbb9b9;
    border-radius: 20px;
  }
  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }
}

.notifictionDetails{
  display:flex;
  padding-right:4%;
  align-items:center;
  &:hover{
    background-color:#F1F1F8;
    cursor:pointer
  }
}
.notificationIcon{
  height:40px;
  width:40px;
}
.closeIcon{
  height:8px;
  width:8px;
}
.notifyTitleContainer{
  flex:1;
  padding: 0 15px 0 10px;
  letter-spacing:0.03em;
}
.notifySubtitle{
  font-size:10px;
  padding-top:0.6em
}
.ant-list-items {
  width: 100%
}
`;

class AppHeadderV2 extends Component {
  state = {
    isClicked: false,
    btndisbled :false,
    notifyClicked: false,
    notificationCount: 0,
    notificationoffset: 0,
    notificationLimit: 5,
    notificationloading: false,
    hasMoreNotification: true,
    icon: BellIcon,
    value: 0,
    isDisabled: true,
    notifications: [],
    crop: {
      unit: "%",
      width: 30,
      aspect: 1 / 1,
    },
    src: null,
    profileURL: ProfilePicture,
    originalProfilePic: ProfilePicture,
    professionalDetails: "",
    updateRotation: 0,
    disableCrop: false,
  };

  func = () => {
    let notifications = this.state.notifications;
    this.loadNotifications((notifications1) => {
      this.setState({
        notifications: notifications,
      });
    });
  };
  componentDidMount = async () => {
    let notifications = this.state.notifications;
    this.loadNotifications((notifications1) => {
      this.setState({
        notifications: notifications,
        notificationloading: false,
      });
    });
    this.setInterval();
    try {
      let img = ProfilePicture;
      this.setState({ img });
    } catch (error) {
      console.log(error);
    }
  };

  getTimeElapsedFormat = (dateTime) => {
    let data = dateTime.split("T")[0].split("-");
    let date = data[2] + "/" + data[1] + "/" + data[0];
    let time = dateTime.split("T")[1].split(".")[0];
    let previousTimeStamp = dateTimeToTimestamp({
      date: date,
      time: time,
    });
    let currentDateTime = new Date().toLocaleString();
    let currentDate = currentDateTime.substring(0, 10);
    let currentTime = currentDateTime.substring(12);

    let currentTimeStamp = dateTimeToTimestamp({
      date: currentDate,
      time: currentTime,
    });
    let timeElapse = timeStampToTimeElapsed(
      currentTimeStamp,
      previousTimeStamp
    );
    return timeElapse || "";
  };

  setInterval = () => {
    var timer = setInterval(() => {
      this.func();
      if (this.state.notifyClicked) {
        clearInterval(timer);
      }
    }, 10000);
  };

  clickHandler = () => {
    this.setState({ isClicked: !this.state.isClicked });
  };
  ExitHandler = (e) => {
    e.preventDefault();
    this.setState({ isClicked: false });
  };

  notifyHandler = async () => {
    let notifications = this.state.notifications;
    this.setState({ notifyClicked: !this.state.notifyClicked }, () =>
      this.loadNotifications((notifications1) => {
        notifications = notifications.concat(notifications1);
        this.setState({
          notifications: notifications,
          notificationloading: false,
        });
      })
    );
    try {
      let obj = {
        viewedTimestamp: new Date().getTime(),
      };
      let token = decryptData(localStorage.token);
      let employeeId = decryptData(localStorage.employeeId);
      let { data, status } = await viewNotifications(employeeId, obj, {
        Authorization: token,
      });
      if (status >= 200 && status < 300) {
        this.setState({ value: 0 });
        document.toggleLoading();
      } else {
        document.message.error(JSON.stringify(data));
      }
    } catch (error) {
      // document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
      return { status: 500 };
    }
  };

  notifyExitHandler = () => {
    this.setState(
      {
        notifyClicked: false,
        notifications: [],
        notificationoffset: 0,
        notificationloading: false,
        hasMoreNotification: true,
      },
      () => this.setInterval()
    );
  };

  readNotification = async (id) => {
    let notifications = this.state.notifications;
    let index = notifications.findIndex((obj) => obj.id === id);
    notifications[index].status = 1;
    this.setState({
      notifications: notifications,
    });
    try {
      let obj = {
        notificationId: id,
      };
      let token = decryptData(localStorage.token);
      let employeeId = decryptData(localStorage.employeeId);
      let { data, status } = await readNotifications(employeeId, obj, {
        Authorization: token,
      });
      if (status >= 200 && status < 300) {
        notifications[index].status = 2;
        this.setState({
          notifications: notifications,
        });
        document.toggleLoading();
      } else {
        document.message.error(JSON.stringify(data));
      }
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
      return { status: 500 };
    }
  };
  loadNotifications = async (callback) => {
    let orgId = decryptData(localStorage.orgId),
      token = decryptData(localStorage.token),
      employeeId = decryptData(localStorage.employeeId);
    if (orgId && employeeId) {
      try {
        let { data, status } = await getNotifications(
          employeeId,
          this.state.notificationLimit,
          this.state.notificationoffset,
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          let notifications = data.rows;
          let notificationCount = data.count;
          this.setState(
            {
              notificationCount: notificationCount,
              value: data.unReadCount,
            },
            () => callback(notifications || [])
          );
        } else if (status === 404) {
          this.setState(
            {
              notifications: [],
              notificationCount: 0,
            },
            () => callback(this.state.notifications)
          );
        }
        document.toggleLoading();
      } catch (error) {
        // message.error("Unable to fetch details, please try after sometime");
        document.toggleLoading();
      }
    }
  };
  handleInfiniteOnLoad = () => {
    let { notifications } = this.state;
    this.setState({
      notificationloading: true,
    });
    let notificationCount = this.state.notificationCount;
    if (this.state.notifications.length >= notificationCount) {
      this.setState({
        hasMoreNotification: false,
        notificationloading: false,
      });
    } else {
      let notificationoffset =
        this.state.notificationLimit + this.state.notificationoffset;
      if (notificationoffset < notificationCount) {
        this.setState(
          {
            notificationoffset: notificationoffset,
          },
          () =>
            this.loadNotifications((notifications1) => {
              notifications = notifications.concat(notifications1);
              this.setState({
                notifications: notifications,
                notificationloading: false,
              });
            })
        );
      } else {
        this.setState({
          notificationloading: false,
        });
      }
    }
  };
  toggleUploadPicDrawer = () => {
    console.log("rrr")
    try {
      this.setState((state) => {
        return {
          src: this.state.profileURL,
          disableCrop: true,
          editPic: !state.editPic,
        };
      });
    } catch (error) {
      console.log(error);
    }
  }
  rotatePicture = (imageSrc, rotateDeg = 0, callBack) => {
    console.log(imageSrc,"imageSrc")
    let img = new Image();
    let fileName = imageSrc.name.replace(/^.*[\\\/]/, ""); //eslint-disable-line
    img.src = URL.createObjectURL(imageSrc);
    let canvas = document.createElement("canvas");
    img.onload = async function () {
      rotateImage();
      saveImage(fileName);
    };

    let rotateImage = () => {
      let ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((Math.PI * rotateDeg) / 180);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
    };
    let saveImage = (filename) => {
      console.log(filename,"filename")
      const reader = new FileReader();
      canvas.toBlob((blob) => {
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          let arr = reader.result.split(","),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          let croppedImage = new File([u8arr], filename, { type: mime });
          // let croppedImage = this.state.img
          callBack(croppedImage);
        };
      });
    };
  };
  saveChangedPhotoHandler = () => {
    console.log("clicked")
    // try {
      document.toggleLoading(true);
      if (this.state.src !== this.state.img) {
        this.setState({ isLoading: true });
        this.rotatePicture(
          this.state.croppedImage,
          this.state.rotation,
          async (image) => {
            let profilePicture = new FormData();
            profilePicture.append("profile_picture", image);
            let token = decryptData(localStorage.token);
            let employeeId = decryptData(localStorage.employeeId);
            let orgId = decryptData(localStorage.orgId);
            let { data, status } = await uploadProfilePicture(
              profilePicture,
              orgId,
              employeeId,
              {
                "Content-Type": "multipart/form-data",
                Authorization: token,
              }
            );
            if (status >= 200 && status < 300) {
              document.message.success("Profile picure updated");
              // this.props.saveChangedPhotoHandler(
              //   this.state.croppedImage,
              //   this.state.rotation
              // );
            this.setState({ isLoading: false });
            } else {
              document.message.error(JSON.stringify(data));
            }
            window.location.reload();
            this.toggleUploadPicDrawer()
          }
        );
        document.toggleLoading();
      } else {
        document.message.error("Please upload a photo");
      }
      document.toggleLoading();
    // } catch (error) {
    //   document.message.error("Something went wrong! Please try again later123");
    //   document.toggleLoading();
    // }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const user = this.props.currentUser;
    const formData = new FormData();
    formData.append("user[id]", user.id);
    formData.append("user[profile_pic]", this.state.croppedImage);
  };
  onImageLoaded = (image) => {
    console.log("fd")
    this.imageRef = image;
  };
  onCropChange = (crop) => {
    this.setState({ crop });
  };
  onCropComplete = (crop) => {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = this.getCroppedImg(this.imageRef, crop);
      this.setState({ croppedImageUrl });
    }
  };
  getCroppedImg(image, crop) {
    let image_name = image.src.replace(/^.*[\\\/]/, ""); //eslint-disable-line
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    const reader = new FileReader();
    canvas.toBlob((blob) => {
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        this.dataURLtoFile(reader.result, image_name + ".jpg");
      };
    });
  }
  dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    let croppedImage = new File([u8arr], filename, { type: mime });
    this.setState({ croppedImage: croppedImage });
  }

  updateRotation = () => {
    let className = document.querySelector(".ReactCrop");
    console.log(className)
    className.style.setProperty(
      "transform",
      `rotate(${this.state.rotation}deg)`
    );
  };
  rotateProfilePhoto = (type) => {
    if (this.props.src !== this.state.img) {
      if (type === "right") {
        this.setState(
          {
            rotation: this.state.rotation + 90,
          },
          () => this.updateRotation()
        );
      } else {
        this.setState(
          {
            rotation: this.state.rotation - 90,
          },
          () => this.updateRotation()
        );
      }
    }
  };
  handleRemovePhoto = async () => {
    console.log("sd")
    try {
      document.toggleLoading(true);
      let employeeId = decryptData(localStorage.employeeId),
        orgId = decryptData(localStorage.orgId),
        token = decryptData(localStorage.token);
      let { data, status } = await removeProfilePicture(orgId, employeeId, {
        Authorization: token,
      });
      if (status >= 200 && status < 300) {
        document.message.success("Successfully removed profile picture");
        this.state.removeProfilePhotoHandler();
      } else {
        document.message.error(JSON.stringify(data));
      }
      document.toggleLoading();
    } catch (error) {
      console.log(error);
      document.message.error("Something went wrong! Please try again later");
      document.toggleLoading();
    }
  };
  changeProfilePhotoHandler = (e) => {
    console.log(e)
    let file = e.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        this.setState({
          src: fileReader.result,
          originalProfilePic: fileReader.result,
          disableCrop: false,
          btndisbled :true
        });
      };
      fileReader.readAsDataURL(file);
      
    }
    console.log(this.state.src,this.props.img)
  };
  render() {
    // const { crop, profile_pic } = this.state;
    return (
      <Headder isClicked={this.state.isClicked}>
        <div className="logoContainer">
          <img className="logo" src={this.props.images.logo} alt="logo" />
        </div>

        <div className="profileContainer">
          <img
            className="flag"
            src={`https://flagpedia.net/data/flags/normal/${
              this.props.countryCode ? this.props.countryCode : "in"
            }.png`}
            alt="flagIcon"
          />
          <div
            className="bellIcon"
            onBlur={this.notifyExitHandler}
            tabIndex="1"
          >
            <div onClick={this.notifyHandler}>
              <HeaderIcon
                icon={{ type: "svg", value: this.state.icon }}
                value={this.state.value}
                isDisabled={
                  this.state.value === 0 ? false : this.state.isDisabled
                }
              />
            </div>
            {this.state.notifyClicked && (
              <ToolTip
                style={{
                  width: 330,
                  height: "",
                  right: 107,
                  top: "96%",
                  opacity: 1,
                  borderRadius: 10,
                  display: this.state.notifyClicked ? "flex" : "none",
                  backgroundColor: "#FFFFFF",
                }}
                toolTip={{ placement: "bottomRight", width: "10px" }}
              >
                <div className="notificationDropDown">
                  <div className="notificationTitle">Notifications</div>
                  <div className="detailsContainer">
                    {this.state.notifications.length > 0 ? (
                      <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        loadMore={this.handleInfiniteOnLoad}
                        hasMore={
                          !this.state.notificationloading &&
                          this.state.hasMoreNotification
                        }
                        useWindow={false}
                      >
                        <List
                          style={{ width: "100%" }}
                          dataSource={this.state.notifications}
                          renderItem={(item, index) => (
                            <div key={item.id}>
                              <div
                                style={{
                                  borderTop: "1px solid #E2E2E2",
                                  width: "91%",
                                  margin: "0 5%",
                                }}
                              ></div>
                              <div className="notifictionDetails">
                                <div
                                  style={{
                                    flex: 1,
                                    display: "flex",
                                    padding: "4% 0 4% 4%",
                                  }}
                                  onClick={() => this.readNotification(item.id)}
                                >
                                  <div>
                                    <img
                                      src={CareerIcon}
                                      className="notificationIcon"
                                      alt="icon"
                                    />
                                  </div>
                                  <div className="notifyTitleContainer">
                                    <div
                                      style={{
                                        color:
                                          item.status === 0 || item.status === 1
                                            ? "#FF808B"
                                            : "",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {item.message}
                                    </div>
                                    <div className="notifySubtitle">
                                      {this.getTimeElapsedFormat(
                                        item.createdAt
                                      ) || item.createdAt}
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="closeIcon"
                                  // onClick={() =>
                                  //   this.notifyCloseHandler(index, item.id)
                                  // }
                                >
                                  <img src={CloseIcon} alt="icon" />
                                </div>
                              </div>
                            </div>
                          )}
                        ></List>
                      </InfiniteScroll>
                    ) : (
                      <div
                        style={{ padding: "4% 0 4% 4%", textAlign: "center" }}
                      >
                        You have read all your notifications
                      </div>
                    )}
                  </div>
                </div>
              </ToolTip>
            )}
          </div>
          <div
            style={{
              outline: "none",
              cursor: "pointer",
              display: "flex",
            }}
            onBlur={this.ExitHandler}
            onClick={this.clickHandler}
            tabIndex="1"
          >
            <img
              className="profilePic"
              src={this.props.images.profilePic || defaultProfile} onError={(e)=>{e.target.onerror = null; e.target.src=defaultProfile}}
              alt="Pic"
            />
            <div
              style={{
                width: 22,
                paddingTop: "5px",
                cursor: "pointer",
                marginRight: 25,
              }}
            >
              <img className="polygon" src={Poygon} alt="poly" />
            </div>
          </div>

          <ToolTip
            style={{
              width: 281,
              minHeight: 100,
              maxHeight: 400,
              right: 10,
              top: "87%",
              opacity: this.state.isClicked ? 1 : 0,
              borderRadius: 10,
              display: this.state.isClicked ? "flex" : "none",
              backgroundColor: "#ffffff",
            }}
            toolTip={{ placement: "bottomRight", width: "10px" }}
          >
            <div
              style={{
                width: "inherit",
                height: "inherit",
                outline: "none",
                padding: "20px 0",
              }}
            >
              <div
                onMouseDown={() =>
                  this.props.role === "employee" &&
                  this.props.viewProfileHanler()
                }
                className={
                  this.props.role === "employee"
                    ? "employeeImageContainer"
                    : "imageContainer"
                }
              >
                <div onMouseDown={() => this.toggleUploadPicDrawer()} style={{cursor:"pointer"}}>
                  <img
                    className="profileViewPic"
                    src={this.props.images.profilePic || defaultProfile} onError={(e)=>{e.target.onerror = null; e.target.src=defaultProfile}}
                    alt="profile_pic123"
                  />
                  <div className="camera1">
              <img src={require("../assets/images/pen.svg")} alt="camera"  style={{width:"13px"}}/>
            </div>
                </div>
                <div>
                  <div className="nameLabel">{this.props.profileData.name}</div>
                  <div className="designationLabel">
                    {this.props.profileData.designation}
                  </div>
                </div>
              </div>
              
              <div className="linkContainer">
              {/* <div className="linkContainer"  onMouseDown={() => this.toggleUploadPicDrawer()}>{"Edit Profile Image"}</div> */}
                {this.props.profileData.links.map((element, index) => (
                  <div
                    onMouseDown={() => this.props.linkHandler(element)}
                    key={index}
                  >
                    {element}
                    
                  </div>
                ))}
                
                
              </div>
            </div>
          </ToolTip>
        </div>
        {this.state.editPic && (
          <div
          style={{
            display: "flex",
            height: "100%",
            width: "100%",
            zIndex: 30,
            position: "fixed",
            right: " 0px",
            top: "0px",
            transition: " width 0.01s linear 0s",
            overflow: "auto",
            backgroundColor: " rgba(0, 0, 0, 0.09)",
          }}
        >
          <div
            style={{
              flex: 1,
              background: "gray",
              opacity: "0.5",
            }}
          ></div>
          <div
            style={{
              flex: 0.5,
              background: "#FFFFFF",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "15px",
              }}
            >
              <div
                onClick={this.toggleUploadPicDrawer || null}
                style={styles.cancelEditPhoto}
              >
                <img src={CancelIcon} alt="cancelIcon"></img>
              </div>
            </div>
            <div
              style={{
                fontSize: "16px",
                fontWeight: "600",
                marginLeft: "50px",
              }}
            >
              Change Photo
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "25px",
              }}
            >
              <div
                style={{
                  height: "300px",
                  width: "90%",
                  display: "flex",
                  justifyContent: "center",
                  background: "#595959",
                }}
              >
                <div
                  className="RotateImage"
                  style={{ width: "300px", height: "100%" }}
                  onSubmit={this.handleSubmit}
                >
                  {this.state.src &&
                    (this.props.disableCrop ? (
                      <img
                        src={this.state.src || ProfilePicture}
                        alt="Profile pic"
                        style={{ width: "100%" }}
                      />
                    ) : (
                      <ReactCrop
                        style={{
                          height: "300px",
                          width: "100%",
                          overflowY: "scroll",
                        }}
                        src={this.state.src}
                        crop={this.state.crop}
                        onImageLoaded={this.onImageLoaded}
                        onComplete={this.onCropComplete}
                        onChange={this.onCropChange}
                      />
                    ))}
                </div>
                <div
                  style={{
                    position: "absolute",
                    color: "white",
                    marginLeft: "12%",
                    marginTop: "3%",
                  }}
                >
                  <div
                    onClick={() => this.rotateProfilePhoto("right")}
                    style={{
                      cursor: "pointer",
                      display: this.state.disableCrop ? "none" : "block",
                    }}
                  >
                    <img src={RightRotateIcon} alt="rotateIcon"></img>
                    <label style={{ marginLeft: "10px", cursor: "pointer" }}>
                      Right
                    </label>
                  </div>
                  <div
                    onClick={() => this.rotateProfilePhoto("left")}
                    style={{
                      marginTop: "20px",
                      cursor: "pointer",
                      display: this.state.disableCrop ? "none" : "block",
                    }}
                  >
                    <img src={lefttRotateIcon} alt="rotateIcon"></img>
                    <label style={{ marginLeft: "10px", cursor: "pointer" }}>
                      Left
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <div style={{ width: "70%" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <button
                    style={{
                      width: "45%",
                      height: "32px",
                      background: "none",
                      padding: 0,
                      margin: 0,
                      color:
                        this.state.src !== this.state.img ? "#FA808A" : "#b0b0cb",
                      border:
                        this.state.src !== this.state.img
                          ? "1px solid #FA808A"
                          : "1px solid #b0b0cb",
                      borderRadius: "2px",
                      cursor:
                        this.state.src !== this.state.img
                          ? "pointer"
                          : "not-allowed",
                    }}
                    disabled={this.state.src !== this.state.img ? false : true}
                    onClick={this.handleRemovePhoto}
                  >
                    Remove Photo
                  </button>
                  <div style={{ width: "45%", cursor: "pointer" }}>
                    <input
                      type="file"
                      accept="image/*"
                      name="resumeFile"
                      id="profile_pic"
                      value={this.state.profile_pic}
                      onChange={(e) => this.changeProfilePhotoHandler(e)}
                      onClick={(event) => {
                        event.target.value = null;
                      }}
                      style={{ display: "none" }}
                    />
                    <label htmlFor="profile_pic">
                      <div
                        type="primary"
                        style={{
                          width: "100%",
                          height: "32px",
                          background: "none",
                          color: "#FA808A",
                          border: "1px solid #FA808A",
                          borderRadius: "2px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        Upload Photo
                      </div>
                    </label>
                  </div>
                </div>
                <div>
                  <button
                    style={{
                      width: "100%",
                      height: "32px",
                      marginTop: "25px",
                      background: "#FA808A",
                      color: "#FFFFFF",
                      border: "1px solid #FA808A",
                      borderRadius: "2px",
                      cursor:
                        this.props.src !== this.state.img
                          ? "pointer"
                          : "not-allowed",
                      opacity: this.state.img
                        ? 0.4
                        : this.props.src !== this.state.img
                        ? 1
                        : 0.4,
                      pointerEvents: this.state.img ? "auto" : "auto",
                    }}
                    disabled={
                      this.state.btndisbled ==false
                    }
                    onClick={this.saveChangedPhotoHandler}
                  >
                    {this.props.src ? "please wait..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
      </Headder>
    );
  }
}

export default AppHeadderV2;
