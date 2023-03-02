import React from "react";
import styled from "styled-components";
import CareerPathDesignationList from "./CareerPathDesignationList";
import TreeIcon from "../assets/images/tree.svg";
import DefaultPic from "../assets/images/defaultProfile.svg";
import { COLORS } from "../theme";
const Div = styled.div`
  color: #303030;
  font-size: 16px;
  font-family: Open Sans Regular;
  .career-user-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #career-user-Image {
    height: 80px;
    width: 80px;
    border-radius: 50%;
    border: 3px solid #ffffff;
    background: ${COLORS.GREY_T_96};

    @media (max-width: 768px) {
      height: 60px;
      width: 60px;
    }
  }
  .career-name-lable {
    font-family: Open Sans Semibold;
    font-size: 1em;
  }
  .career-designation-label {
    color: #767676;
    font-size: 0.875em;
  }
  #tree-structure-container {
    display: flex;
    justify-content: center;
    height: 67px;
    position: relative;
    top: 8.5px;
  }
  #career-path-designation-container {
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 2;
  }
  #tree-icon {
    width: 45%;
    height: 67px;
    z-index: 1;
    display: ${(props) =>
      props.lateral > 0 && props.upward > 0 ? "" : "none"};
  }
  #line {
    height: 67px;
    border: 1px solid #9b9b9b;
    z-index: 1;
    display: ${(props) =>
      props.lateral > 0 && props.upward > 0
        ? "none"
        : props.lateral === 0 && props.upward === 0
        ? "none"
        : ""};
  }
  .individual-card {
    width: 36.862%;
    height: 121px;
    margin: 0 3%;
    @media screen and (min-width: 600px) {
      height: 128px;
    }
    @media screen and (min-width: 700px) {
      height: 140px;
    }
    @media screen and (min-width: 800px) {
      height: 183px;
    }
    @media screen and (min-width: 1024px) {
      height: 238px;
    }
  }
`;

class CareerPathDesignationTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      careerPathDetail: this.props.careerPathDetail,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      careerPathDetail: nextProps.careerPathDetail,
    };
  }

  render() {
    return (
      <>
        {this.state.careerPathDetail && (
          <Div
            lateral={this.state.careerPathDetail.lateralDesignationCount}
            upward={this.state.careerPathDetail.upwardDesignationCount}
          >
            <div className="career-user-container">
              <img
                src={
                  this.state.careerPathDetail.employeeDetails.profilePicture ||
                  DefaultPic
                }
                id="career-user-Image"
                alt="profile-pic"
              />
              <div className="career-name-lable">
                {(this.state.careerPathDetail.employeeDetails.firstName || "") +
                  " " +
                  `${
                    this.state.careerPathDetail.employeeDetails.middleName || ""
                  }` +
                  " " +
                  (this.state.careerPathDetail.employeeDetails.lastName || "")}
              </div>
              <div className="career-designation-label">
                {this.state.careerPathDetail.employeeDetails
                  .currentDesignationName || ""}
              </div>
            </div>
            <div id="tree-structure-container">
              <img src={TreeIcon} alt="tree-icon" id="tree-icon" />
              <div id="line"></div>
            </div>
            <div id="career-path-designation-container">
              {this.state.careerPathDetail.upwardDesignationCount > 0 && (
                <div className="individual-card">
                  <CareerPathDesignationList
                    {...this.state}
                    cardDetails={this.state.careerPathDetail.designationMatrix}
                    title="Within Department"
                    careerTitle="UPWARD"
                    requestModel={this.props.requestModel || ""}
                  />
                </div>
              )}
              {this.state.careerPathDetail.lateralDesignationCount > 0 && (
                <div className="individual-card">
                  <CareerPathDesignationList
                    {...this.state}
                    cardDetails={this.state.careerPathDetail.designationMatrix}
                    title="Alternate Career"
                    careerTitle="LATERAL"
                    requestModel={this.props.requestModel || ""}
                  />
                </div>
              )}
            </div>
          </Div>
        )}
      </>
    );
  }
}

export default CareerPathDesignationTree;
