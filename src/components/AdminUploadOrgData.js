import React, { Component } from "react";
import Styled from "styled-components";
import FormSelector from "./form_selector";
import Button from "./Button";
import "../assets/css/OpenSans.css";
import Close from "../assets/images/closeImage.svg";

const StyledDiv = Styled.div`
  background-color:${(props) => (props.status ? "#BBBBBB" : "#ff808b")};
  border-radius: 4px;
  border: 1px solid ${(props) => (props.status ? "#BBBBBB" : "#ff808b")};
  cursor: ${(props) => (props.isLoading ? "not-allowed" : "pointer")};
  outline: none;
  height: 40px;
  width: 100%;
  &:hover{
    opacity:${(props) => (props.status ? 1 : 0.7)};
  }

`;
const StyledLabel = Styled.label`
cursor: pointer;
font-family: Open Sans Regular;
color: #ffffff;
font-size: 14px;
display:flex;
height:100%;
align-items:center;
justify-content:center;
  cursor: ${(props) => (props.isLoading ? "not-allowed" : "")};

`;
const className = {
  selectorContainer: {
    paddingTop: 1,
    paddingBottom: 30,
    position: "relative",
  },
  ButtonContainer: {
    display: "flex",
    marginTop: 21,
    justifyContent: "space-between",
  },
  Buttons: {
    width: 158,
  },
  title: {
    fontFamily: "Open Sans Semibold",
    fontSize: 16,
  },
  close: {
    cursor: "pointer",
    height: 32,
    width: 32,
    position: "absolute",
    right: "-12%",
    top: "-5%",
  },
};

class AdminUploadOrgData extends Component {
  state = { isClicked: false, value: "", file: "" };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.value !== nextProps.value) {
      return {
        value: nextProps.value,
      };
    } else
      return {
        value: prevState.value,
      };
  }
  closeHandler = () => {
    this.setState({ isClicked: true });
    this.props.closeHandler();
  };
  onChangeHandler = (e) => {
    this.props.onChange(e.target.files, this.state.value);
    this.setState({ file: e.target.files });
    e.currentTarget.value = null;
  };

  render() {
    return (
      <div
        style={{
          fontFamily: "Open Sans Regular",
          fontSize: 14,
          width: "100%",
          backgroundColor: "#ffffff",
          display: this.state.isClicked ? "none" : "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "inherit",
        }}
      >
        <div
          style={{
            marginTop: "9%",
            position: "relative",
            width: "73.334%",
            display: "grid",
            gridTemplateColumns: "1fr",
            gridRowGap: "39px",
            marginBottom: "20%",
          }}
        >
          <img
            src={Close}
            style={className.close}
            onClick={this.props.closeHandler}
            alt="close"
          />
          <div style={className.title}>
            <div>Add Data</div>
          </div>

          <div>
            <div style={className.title}>
              {this.props.data.skillMatrix.title}
            </div>
            <div style={className.ButtonContainer}>
              <div style={className.Buttons}>
                <a
                  href={`${process.env.REACT_APP_API_URL}/static/Role_Competency_Skill.xlsx`}
                  download
                >
                  <Button
                    label="Download Excel"
                    styles={{
                      color: "#FF808B",
                      backgroundColor: "#ffffff",
                      border: "#FF808B",
                      height: "40px",
                    }}
                  />
                </a>
              </div>

              <div style={className.Buttons}>
                <input
                  type="file"
                  accept=".xlsx,.xls,.xlsm,.xlt,.xltx,.xltm,.xla,.xlam,.csv"
                  style={{ display: "none" }}
                  id="skillMatrix"
                  onChange={(e) => {
                    this.props.onChange(
                      e.target.files,
                      this.props.data.skillMatrix.title
                    );
                    e.currentTarget.value = null;
                  }}
                  onClick={(event) => {
                    event.target.value = null;
                  }}
                />
                <StyledDiv isLoading={this.props.isLoading}>
                  <StyledLabel
                    htmlFor="skillMatrix"
                    isLoading={this.props.isLoading}
                  >
                    Upload Excel
                  </StyledLabel>
                </StyledDiv>
              </div>
            </div>
          </div>
          <div>
            <div style={className.title}>
              {this.props.data.careerPath.title}
            </div>
            <div style={className.ButtonContainer}>
              <div style={className.Buttons}>
                <a
                  href={`${process.env.REACT_APP_API_URL}/static/Role_CareerPath.xlsx`}
                  download
                >
                  <Button
                    label="Download Excel"
                    styles={{
                      color: "#FF808B",
                      backgroundColor: "#ffffff",
                      border: "#FF808B",
                      height: "40px",
                    }}
                  />
                </a>
              </div>
              <div style={className.Buttons}>
                <input
                  type="file"
                  accept=".xlsx,.xls,.xlsm,.xlt,.xltx,.xltm,.xla,.xlam,.csv"
                  style={{ display: "none" }}
                  id="careerPath"
                  onChange={(e) => {
                    this.props.onChange(
                      e.target.files,
                      this.props.data.careerPath.title
                    );
                    e.currentTarget.value = null;
                  }}
                  onClick={(event) => {
                    event.target.value = null;
                  }}
                />
                <StyledDiv isLoading={this.props.isLoading}>
                  <StyledLabel
                    htmlFor="careerPath"
                    isLoading={this.props.isLoading}
                  >
                    Upload Excel
                  </StyledLabel>
                </StyledDiv>
              </div>
            </div>
          </div>
          <div>
            <div style={className.title}>
              {this.props.data.curriculum.title}
            </div>
            <div style={className.ButtonContainer}>
              <div style={className.Buttons}>
                <a
                  //need to change
                  href={`${process.env.REACT_APP_API_URL}/static/Role_Competency_Skill.xlsx`}
                  download
                >
                  <Button
                    label="Download Excel"
                    styles={{
                      color: "#FF808B",
                      backgroundColor: "#ffffff",
                      border: "#FF808B",
                      height: "40px",
                    }}
                  />
                </a>
              </div>

              <div style={className.Buttons}>
                <input
                  type="file"
                  accept=".xlsx,.xls,.xlsm,.xlt,.xltx,.xltm,.xla,.xlam,.csv"
                  style={{ display: "none" }}
                  id="curriculum"
                  onChange={(e) => {
                    this.props.onChange(
                      e.target.files,
                      this.props.data.curriculum.title
                    );
                    e.currentTarget.value = null;
                  }}
                  onClick={(event) => {
                    event.target.value = null;
                  }}
                />
                <StyledDiv isLoading={this.props.isLoading}>
                  <StyledLabel
                    htmlFor="curriculum"
                    isLoading={this.props.isLoading}
                  >
                    Upload Excel
                  </StyledLabel>
                </StyledDiv>
              </div>
            </div>
          </div>
          <div style={className.selectorContainer}>
            <div style={{ fontSize: 14 }}>
              <FormSelector
                label={this.props.data.userType.title}
                value={this.props.value}
                type="selector"
                onClick={(e) => this.props.formSelectorHandler(e)}
                option={this.props.data.userType.option}
                placeHolder="Select User Type"
                style={{
                  color: {
                    hover: "#FF808B",
                    selectedBg: "#FF808B",
                    optionHover: "rgb(255, 218, 222)",
                    selectedFont: "#ffffff",
                  },
                }}
              />
            </div>

            <div style={className.ButtonContainer}>
              <div style={className.Buttons}>
                {this.state.value === "" ? (
                  <Button
                    label="Download Excel"
                    status="disable"
                    styles={{
                      color: "#BBBBBB",
                      backgroundColor: "#ffffff",
                      border: "#BBBBBB",
                      height: "40px",
                    }}
                  />
                ) : (
                  <a
                    href={
                      this.state.value === "New employee list"
                        ? `${process.env.REACT_APP_API_URL}/static/New_Employee_List.xlsx`
                        : this.state.value === "Existing employee list"
                        ? `${process.env.REACT_APP_API_URL}/static/Employee_Onboarding_Details.xlsx`
                        : this.state.value === "Promoted employee list"
                        ? `${process.env.REACT_APP_API_URL}/static/Employee_Promotion_List.xlsx`
                        : this.state.value === "Relieved employee list"
                        ? `${process.env.REACT_APP_API_URL}/static/Employee_OnNotice_List.xlsx`
                        : "/#"
                    }
                  >
                    <Button
                      label="Download Excel"
                      status=""
                      styles={{
                        color: "#FF808B",
                        backgroundColor: "#ffffff",
                        border: "#FF808B",
                        height: "40px",
                      }}
                    />
                  </a>
                )}
              </div>
              <div style={className.Buttons}>
                <input
                  type="file"
                  accept=".xlsx,.xls,.xlsm,.xlt,.xltx,.xltm,.xla,.xlam,.csv"
                  style={{ display: "none" }}
                  id={this.state.value !== "" ? "userType" : ""}
                  onChange={this.onChangeHandler}
                  onClick={(event) => {
                    event.target.value = null;
                  }}
                />
                <StyledDiv status={this.state.value === ""}>
                  <StyledLabel htmlFor="userType">Upload Excel</StyledLabel>
                </StyledDiv>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminUploadOrgData;
