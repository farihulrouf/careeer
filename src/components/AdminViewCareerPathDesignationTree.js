import React from "react";
import styled from "styled-components";
import { getCareerpathDetails } from "../core/apiClient/organization/organizationClient";
import { decryptData } from "../utils/encryptDecrypt";
import CareerPathDesignationList from "./AdminViewCareerPathDesignationList";
import TreeIcon from "../assets/images/tree.svg";
import { InboxOutlined } from "@ant-design/icons";
import profilePic from "../assets/images/defaultProfile.svg";
import { COLORS } from "../theme";
const Div = styled.div`
  color: #303030;
  font-size: 16px;
  font-family: Open Sans Regular;
  height: 100%;
  .career-user-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 22px;
  }
  #career-user-Image {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    border: 3px solid #ffffff;
    background: ${COLORS.GREY_T_96};
    @media (max-width: 768px) {
      height: 50px;
      width: 50px;
    }
  }
  .career-name-lable {
    font-family: Open Sans Semibold, Regular;
    font-size: 0.875em;
  }
  .career-designation-label {
    color: #767676;
    font-size: 0.75em;
  }
  #tree-structure-container {
    display: flex;
    justify-content: center;
    height: 46px;
    position: relative;
  }
  #career-path-designation-container {
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 2;
  }
  #tree-icon {
    width: 60%;
    z-index: 1;
    display: ${(props) =>
    props.lateral > 0 && props.upward > 0 ? "" : "none"};
  }
  #line {
    height: 50px;
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
    width: 43.862%;
    height: 136px;
    margin: 0 1.2%;
    @media screen and (min-width: 600px) {
      height: 128px;
    }
    @media screen and (min-width: 700px) {
      height: 140px;
    }
    @media screen and (min-width: 800px) {
      height: 110px;
    }
    @media screen and (min-width: 1024px) {
      height: 132px;
    }
  }
`;

class CareerPathDesignationTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: "",
      upwardDesignation: [],
      lateralDesignation: [],
      upwardCount: 0,
    };
  }

  componentDidMount = () => {
    this.loadCareerPathDetails();
  };
  loadCareerPathDetails = async () => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId),
        token = decryptData(localStorage.token),
        employeeId =
          this.props.selectedUser === undefined ||
            this.props.selectedUser === null
            ? decryptData(localStorage.employeeId)
            : this.props.selectedUser;
      if (orgId && employeeId) {
        let upwardDesignation = [],
          lateralDesignation = [];
        let { data, status } = await getCareerpathDetails(orgId, employeeId, {
          Authorization: token,
        });
        if (status >= 200 && status < 300) {
          console.log(data.designationMatrix, "data")
          let careerpathDetails = data.designationMatrix;
          for (let i = 0; i < careerpathDetails.length; i++) {
            if (careerpathDetails[i].careerpath === "UPWARD") {
              console.log(data, "data")
              upwardDesignation.push(careerpathDetails[i]);
            } else {
              lateralDesignation.push(careerpathDetails[i]);
            }
          }
          this.setState({
            upwardDesignation,
            lateralDesignation,
            employee: data.employeeDetails,
          });


        }
      }
      document.toggleLoading();
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  render() {
    const { employee } = this.state;
    return (
      <Div
        lateral={this.state.lateralDesignation.length}
        upward={this.state.upwardDesignation.length}
      >
        <div
          style={{
            position: "absolute",
            fontSize: "1.126em",
            left: 26,
            top: 16,
            fontFamily: "Open sans Semibold",
          }}
        >
          Career Path
        </div>

        {this.state.upwardDesignation.length > 0 ||
          this.state.lateralDesignation.length > 0 ? (
            <>
              {employee && (
                <div className="career-user-container">
                  <img
                    src={employee.profilePicture || profilePic}
                    id="career-user-Image"
                    alt="profile-pic"
                  />
                  <div className="career-name-lable">
                    {(employee.firstName || "") +
                      " " +
                      `${employee.middleName || ""}` +
                      " " +
                      (employee.lastName || "")}
                  </div>
                  <div className="career-designation-label">
                    {employee.designation}
                  </div>
                </div>
              )}

              <div id="tree-structure-container">
                <img src={TreeIcon} alt="tree-icon" id="tree-icon" />
                <div id="line"></div>
              </div>
              <div id="career-path-designation-container">
                {this.state.upwardDesignation.length > 0 && (
                  <div className="individual-card">
                    <CareerPathDesignationList
                      cardDetails={this.state.upwardDesignation}
                      title="Within Department"
                      careerTitle="UPWARD"
                      requestModel={this.props.requestModel || ""}
                    />
                  </div>
                )}
                {this.state.lateralDesignation.length > 0 && (
                  <div className="individual-card">
                    <CareerPathDesignationList
                      cardDetails={this.state.lateralDesignation}
                      title="Alternate Career"
                      careerTitle="LATERAL"
                      requestModel={this.props.requestModel || ""}
                    />
                  </div>
                )}
              </div>
            </>
          ) : (
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                marginTop: "6%",
              }}
            >
              <InboxOutlined style={{ fontSize: "5em" }} />
              <div style={{ fontSize: "1.1em", padding: "0 32px 0 32px" }}>
                No upward or lateral paths are available for current designation
                please contact admin
            </div>
            </div>
          )}
      </Div>
    );
  }
}

export default CareerPathDesignationTree;
