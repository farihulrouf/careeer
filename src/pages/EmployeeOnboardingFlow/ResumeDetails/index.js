import React, { Component } from "react";
import SaveButton from "../../../components/SaveCancelButton";
import ResumeUpload from "./upload";
class ResumeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resumeFileName: "",
      resume: null,
    };
  }
  cancelChoosenResumeFileHandler = () => {
    this.setState({ resumeFileName: "", resume: null });
  };
  resumeUploadFileHandler = (e) => {
    let file = e.target.files[0];
    if (file) {
      let resumeFileName = this.fileNameLengthHandler(file.name);
      this.setState({ resume: file, resumeFileName });
    }
  };
  handleSaveClick = () => {
    let resume = this.state.resume;
    if (resume) {
      document.message.success("Resume uploaded successfully.");
      this.props.changeOnboardingStep(1);
    }
  };

  handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  handleFileDrop = (e) => {
    let file = e.dataTransfer.files[0];
    let str = file.name;
    let result = str.split(".");
    let fileType = result[result.length - 1];
    if (fileType === "docx" || fileType === "doc" || fileType === "pdf") {
      let fileName = this.fileNameLengthHandler(str);
      this.setState({
        resumeFileName: fileName,
        resume: file,
      });
    }
  };
  handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.handleFileDrop(e);
  };
  fileNameLengthHandler = (str) => {
    if (str.length > 18 && window.innerWidth < 700) {
      let fileName =
        str.substring(0, 8) + "..." + str.substring(str.length - 6, str.length);
      return fileName;
    } else if (
      str.length > 18 &&
      window.innerWidth > 700 &&
      window.innerWidth < 900
    ) {
      let fileName =
        str.substring(0, 10) +
        "..." +
        str.substring(str.length - 6, str.length);
      return fileName;
    } else if (str.length > 18 && window.innerWidth > 900) {
      let fileName =
        str.substring(0, 18) +
        "..." +
        str.substring(str.length - 6, str.length);
      return fileName;
    } else {
      return str;
    }
  };
  render() {
    return (
      <div>
        <div>
          <ResumeUpload
            cancelChoosenResumeFileHandler={this.cancelChoosenResumeFileHandler}
            resumeUploadFileHandler={this.resumeUploadFileHandler}
            resumeFileName={this.state.resumeFileName}
            handleDrag={this.handleDrag}
            handleFileDrop={this.handleFileDrop}
            handleDrop={this.handleDrop}
            changeOnboardingStep={this.props.changeOnboardingStep}
          />
        </div>
        <div className="onboarding-button-container">
          <SaveButton
            disabledSave={!this.state.resume}
            save={this.handleSaveClick}
          />
        </div>
      </div>
    );
  }
}

export default ResumeDetails;
