import React from "react";
import "../../assets/css/CareerPage.css";
import { getCareerpathDesignations } from "../../core/apiClient/organization/organizationClient";
import { decryptData } from "../../utils/encryptDecrypt";
import Lateral from "./Lateral";
import Upward from "./Upward";
import Info from "../../assets/images/info.svg";
import ToolTip from "../../components/ToolTipComponent";
import { message } from "antd";

class CareerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      selectedDesignation: "",
      designationCardDetails: [
        {
          currentDesignationId: 0,
          forwardDesignationId: 0,
          title: "Upward",
          designationList: [],
        },
        {
          currentDesignationId: 0,
          forwardDesignationId: 0,
          title: "Lateral",
          designationList: [],
        },
      ],
      upwardCareerpathDetails: [],
      lateralCareerpathDetails: [],
      skillsChartDetails: [],
    };
  }
  componentDidMount = () => {
    this.loadCareerPathDetails();
  };

  infoMouse = (index) => {
    this.setState({ showToolTip: index });
  };
  infoMouseLeave = () => {
    this.setState({ showToolTip: 2 });
  };

  loadCareerPathDetails = async () => {
    let orgId = decryptData(localStorage.orgId),
      employeeId = decryptData(localStorage.employeeId),
      token = decryptData(localStorage.token);
    if (orgId && employeeId) {
      try {
        document.toggleLoading(true);
        let { data, status } = await getCareerpathDesignations(
          orgId,
          employeeId,
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          let careerpathDetails = data;
          let upwardCareerpathDetails = this.state.upwardCareerpathDetails;
          let lateralCareerpathDetails = this.state.lateralCareerpathDetails;
          for (let i = 0; i < careerpathDetails.length; i++) {
            if (careerpathDetails[i].careerpath === "UPWARD") {
              upwardCareerpathDetails.push(careerpathDetails[i]);
            } else {
              lateralCareerpathDetails.push(careerpathDetails[i]);
            }
          }
          if (upwardCareerpathDetails.length <= 0) {
            this.setState({ tab: 1 });
          }
          this.setState({
            upwardCareerpathDetails,
            lateralCareerpathDetails,
          });
        }
        document.toggleLoading();
      } catch (error) {
        message.error("Unable to fetch details, please try after sometime");
        document.toggleLoading();
      }
      this.setState({ isLoading: false });
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      careerPathDetail: nextProps.careerPathDetail,
    };
  }

  render() {
    const { careerPathDetail, tab, showToolTip } = this.state;
    return (
      <div className="CareerPageMain-div">
        {careerPathDetail && (
          <div className="CareerPageMain-sub-div">
            <div className="tabs-main">
              <div
                className="Upward-tab"
                onClick={() => {
                  if (careerPathDetail.upwardDesignationCount !== 0) {
                    this.setState({ tab: 0 });
                  }
                }}
                style={{
                  borderBottom: tab === 0 ? "4px solid #f39ba4" : "",
                  cursor:
                    careerPathDetail.upwardDesignationCount === 0
                      ? "not-allowed"
                      : "pointer",
                  color:
                    careerPathDetail.upwardDesignationCount === 0
                      ? "#767676"
                      : tab === 0
                      ? "#303030"
                      : "#767676",
                }}
              >
                Within Department
                {careerPathDetail.upwardDesignationCount === 0 && (
                  <img
                    src={Info}
                    className="Info-icon"
                    alt="info-Icon"
                    onMouseOver={() => this.infoMouse(0)}
                    onMouseLeave={() => this.infoMouseLeave()}
                    style={{
                      paddingLeft: "10px",
                      visibility:
                        careerPathDetail.upwardDesignationCount === 0
                          ? "visible"
                          : "hidden",
                    }}
                  />
                )}
                <div
                  style={{
                    position: "relative",
                    opacity: showToolTip === 0 ? 1 : 0,
                    visibility: showToolTip === 0 ? "visible" : "hidden",
                    transition: "opacity 0.4s ease-out",
                  }}
                >
                  <ToolTip
                    className="toolTip"
                    style={{
                      minWidth: 300,
                      maxWidth: 400,
                      minHeight: 20,
                      maxHeight: 100,
                      top: "64%",
                      opacity: 1,
                      borderRadius: 1,
                      display: "flex",
                      backgroundColor: "#F4F4FE",
                    }}
                    toolTip={{ placement: "right", width: "1px" }}
                  >
                    <div
                      style={{
                        width: "inherit",
                        height: "inherit",
                        outline: "none",
                      }}
                    >
                      <div
                        style={{
                          padding: 10,
                          fontSize: "0.955em",
                          color: "#4D4CAC",
                        }}
                      >
                        {`You do not have any Within Department option`}
                      </div>
                    </div>
                  </ToolTip>
                </div>
              </div>
              <div
                className="Lateral-tab"
                onClick={() => {
                  if (careerPathDetail.lateralDesignationCount !== 0) {
                    this.setState({ tab: 1 });
                  }
                }}
                style={{
                  borderBottom: tab === 1 ? "4px solid #f39ba4" : "",
                  cursor:
                    careerPathDetail.lateralDesignationCount === 0
                      ? "not-allowed"
                      : "pointer",
                  color:
                    careerPathDetail.lateralDesignationCount === 0
                      ? "#767676"
                      : tab === 1
                      ? "#303030"
                      : "#767676",
                }}
              >
                Alternate Career
                {careerPathDetail.lateralDesignationCount === 0 && (
                  <img
                    src={Info}
                    className="Info-icon"
                    alt="info-Icon"
                    onMouseOver={() => this.infoMouse(1)}
                    onMouseLeave={() => this.infoMouseLeave()}
                    style={{
                      paddingLeft: "10px",
                      visibility:
                        careerPathDetail.lateralDesignationCount === 0
                          ? "visible"
                          : "hidden",
                    }}
                  />
                )}
                <div
                  style={{
                    position: "relative",
                    opacity: showToolTip === 1 ? 1 : 0,
                    visibility: showToolTip === 1 ? "visible" : "hidden",
                    transition: "opacity 0.4s ease-out",
                  }}
                >
                  <ToolTip
                    className="toolTip"
                    style={{
                      minWidth: 300,
                      maxWidth: 400,
                      minHeight: 20,
                      maxHeight: 100,
                      top: "64%",
                      opacity: 1,
                      borderRadius: 1,
                      display: "flex",
                      backgroundColor: "#F4F4FE",
                    }}
                    toolTip={{ placement: "Right", width: "1px" }}
                  >
                    <div
                      style={{
                        width: "inherit",
                        height: "inherit",
                        outline: "none",
                      }}
                    >
                      <div
                        style={{
                          padding: 10,
                          fontSize: "0.955em",
                          color: "#4D4CAC",
                        }}
                      >
                        {`You do not have any Alternate Career option`}
                      </div>
                    </div>
                  </ToolTip>
                </div>
              </div>
            </div>
            {this.state.tab === 0 ? (
              <Upward
                careerPathDetail={careerPathDetail}
                skillsChartDetails={this.props.skillsChartDetails}
                loadSkillComparisonChart={this.props.loadSkillComparisonChart}
                isLoading={this.props.isLoading}
              ></Upward>
            ) : (
              ""
            )}
            {this.state.tab === 1 ? (
              <Lateral
                careerPathDetail={careerPathDetail}
                skillsChartDetails={this.props.skillsChartDetails}
                loadSkillComparisonChart={this.props.loadSkillComparisonChart}
                isLoading={this.props.isLoading}
              ></Lateral>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    );
  }
}
export default CareerPage;
