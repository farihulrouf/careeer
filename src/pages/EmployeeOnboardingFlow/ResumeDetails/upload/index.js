import React from "react";
import "antd/dist/antd.css";
import cloudComputing from "../../../../assets/images/cloud-computing.svg";
import pdfSvg from "../../../../assets/images/pdf.svg";
import CancelIcon from "../../../../assets/images/cancelIcon.svg";

const styles = {
  uploadContainer: {
    width: "100%",
    fontFamily: "Open Sans Regular",
    display: "flex",
    flexDirection: "column",
  },
  titleContainer: {
    fontSize: "24px",
    fontFamily: "Open Sans Semibold",
    color: "#303030",
  },
  subTitleContainer: {
    color: "#707070",
    fontSize: "16px",
    marginTop: "8px",
  },
  uploadFileContainer: {
    flex: 1,
    background:
      "linear-gradient(to right, #D5D8E2 50%, rgba(255, 255, 255, 0) 0%), linear-gradient(#D5D8E2 50%, rgba(255, 255, 255, 0) 0%), linear-gradient(to right, #D5D8E2 50%, rgba(255, 255, 255, 0) 0%), linear-gradient(#D5D8E2 50%, rgba(255, 255, 255, 0) 0%)",
    backgroundPosition: "top, right, bottom, left",
    backgroundRepeat: "repeat-x, repeat-y",
    backgroundSize: "21.7px 2px, 2px 21.8px",
    borderRadius: "10px",
    color: "#303030",
    fontSize: "0.8em",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  uploadingFile: {
    background: "#FCFCFF",
  },
  chooseFileButton: {
    height: "40px",
    width: "148px",
    fontSize: "1.2em",
    cursor: "pointer",
    background: "none",
    border: "1px solid #4D4CAC",
    color: "#4D4CAC",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "3px",
  },
  nameAndUploading: {
    height: "100%",
    width: "70%",
    marginLeft: "2%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  uploadStatus: {
    width: "100%",
    height: "4px",
    background: "#E4EAFC",
    borderRadius: "10px",
  },
  cancelUploadingIconContainer: {
    cursor: "pointer",
    height: "26px",
    width: "26px",
    fontSize: "0.9em",
    background: "#F1EDF8",
    borderRadius: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "20px",
  },
};
export default class ResumeUpload extends React.Component {
  render() {
    return (
      <div style={styles.uploadContainer}>
        <div style={{ flex: 1, marginBottom: "4%", letterSpacing: "0.5px" }}>
          <div style={styles.titleContainer}>
            Resume
            <span
              style={{
                float: "right",
                fontSize: "13px",
                color: "#FF808B",
                cursor: "pointer",
              }}
              onClick={() => this.props.changeOnboardingStep(1)}
            >
              {"Skip >>"}
            </span>
          </div>
          <div style={styles.subTitleContainer}>
            Upload your resume to auto fill your information
          </div>
        </div>
        <div style={styles.uploadingFile}>
          <div
            onDrag={this.props.handleDrag}
            onDrop={this.props.handleDrop}
            onDragOver={this.props.handleDrag}
            style={styles.uploadFileContainer}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "8% 0 1% 0",
              }}
            >
              <img src={cloudComputing} alt="icon"></img>
            </div>
            <div style={{ fontSize: "18px" }}>
              Drag and Drop your resume here
            </div>
            <div style={{ margin: "1% 0 1% 0", fontSize: "18px" }}>OR</div>
            <div style={{ marginBottom: "8%" }}>
              <input
                type="file"
                name="resumeFile"
                id="resumeFile"
                value=""
                accept=".doc,.docx,.pdf"
                onChange={(e) => this.props.resumeUploadFileHandler(e)}
                onClick={(event) => {
                  event.target.value = null;
                }}
                style={{ display: "none" }}
              />
              <label htmlFor="resumeFile">
                <div type="primary" style={styles.chooseFileButton}>
                  Choose File
                </div>
              </label>
            </div>
          </div>
        </div>
        <span style={{ color: "#FF808B" }}>* Only pdf and docx allowed</span>
        <div
          style={{
            height: "59px",
            width: "55%",
            marginTop: "22px",
            display: "flex",
            alignItems: "center",
            boxShadow: "0px 2px 1px #EBEBEB",
            visibility: !this.props.resumeFileName ? "hidden" : "visible",
          }}
        >
          <img style={{ marginLeft: "10px" }} src={pdfSvg} alt="icon"></img>
          <div style={styles.nameAndUploading}>
            <div
              id="fileName"
              style={{ fontSize: "14px", marginBottom: "3px" }}
            >
              {this.props.resumeFileName}
            </div>
            <div style={styles.uploadStatus}>
              <div
                style={{
                  height: "100%",
                  borderRadius: "inherit",
                  width: this.props.uploadStatus + "%",
                  background: "#4E52AC",
                }}
              ></div>
            </div>
          </div>
          <div
            onClick={() => this.props.cancelChoosenResumeFileHandler()}
            style={styles.cancelUploadingIconContainer}
          >
            <img src={CancelIcon} alt="icon"></img>
          </div>
        </div>
      </div>
    );
  }
}
