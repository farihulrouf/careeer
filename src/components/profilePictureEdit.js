import React from "react";
import CancelIcon from "../assets/svg/cancelIcon.svg";
import RightRotateIcon from "../assets/svg/rightRotateIcon.svg";
import lefttRotateIcon from "../assets/svg/leftRotateIcon.svg";
import ReactCrop from "react-image-crop";
import ProfilePicture from "../assets/images/defaultProfile.svg";
import "react-image-crop/dist/ReactCrop.css";
import {
  uploadProfilePicture,
  removeProfilePicture,
} from "../core/apiClient/organization/organizationClient";
import { decryptData } from "../utils/encryptDecrypt";
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
export default class ProfilePictureEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rotation: 0,
      crop: {
        unit: "%",
        width: 30,
        aspect: 1 / 1,
      },
      croppedImageUrl: null,
      cropWidth: 0,
      cropHeight: 0,
      cropX: 0,
      cropY: 0,
      isLoading: false,
      img: "",
    };
  }
  async componentDidMount() {
    try {
      let img = ProfilePicture;
      this.setState({ img });
    } catch (error) {
      console.log(error);
    }
  }
  rotatePicture = (imageSrc, rotateDeg = 0, callBack) => {
    console.log(imageSrc)
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
          callBack(croppedImage);
        };
      });
    };
  };
  saveChangedPhotoHandler = () => {
    try {
      document.toggleLoading(true);
      if (this.props.src !== this.state.img) {
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
              this.props.saveChangedPhotoHandler(
                this.state.croppedImage,
                this.state.rotation
              );
            } else {
              document.message.error(JSON.stringify(data));
            }
            this.setState({ isLoading: false });
          }
        );
        document.toggleLoading();
      } else {
        document.message.error("Please upload a photo");
      }
      document.toggleLoading();
    } catch (error) {
      document.message.error("Something went wrong! Please try again later");
      document.toggleLoading();
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const user = this.props.currentUser;
    const formData = new FormData();
    formData.append("user[id]", user.id);
    formData.append("user[profile_pic]", this.state.croppedImage);
  };
  onImageLoaded = (image) => {
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
        this.props.removeProfilePhotoHandler();
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
  render() {
    const { crop, profile_pic } = this.state;
    return (
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
              onClick={this.props.toggleUploadPicDrawer || null}
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
            Edit Photo
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
                {this.props.src &&
                  (this.props.disableCrop ? (
                    <img
                      src={this.props.src || ProfilePicture}
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
                      src={this.props.src}
                      crop={crop}
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
                    display: this.props.disableCrop ? "none" : "block",
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
                    display: this.props.disableCrop ? "none" : "block",
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
                      this.props.src !== this.state.img ? "#FA808A" : "#b0b0cb",
                    border:
                      this.props.src !== this.state.img
                        ? "1px solid #FA808A"
                        : "1px solid #b0b0cb",
                    borderRadius: "2px",
                    cursor:
                      this.props.src !== this.state.img
                        ? "pointer"
                        : "not-allowed",
                  }}
                  disabled={this.props.src !== this.state.img ? false : true}
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
                    value={profile_pic}
                    onChange={(e) => this.props.changeProfilePhotoHandler(e)}
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
                    opacity: this.props.disableCrop
                      ? 0.4
                      : this.props.src !== this.state.img
                      ? 1
                      : 0.4,
                    pointerEvents: this.props.disableCrop ? "none" : "auto",
                  }}
                  disabled={
                    this.props.src !== this.state.img
                      ? this.state.isLoading
                      : true
                  }
                  onClick={this.saveChangedPhotoHandler}
                >
                  {this.state.isLoading ? "Please wait..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
