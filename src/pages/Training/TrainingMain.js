import React, { Component } from "react";
import Styled from "styled-components";
import Assessment from "../../components/Assessment";
import RecommendedCourse from "../../components/recommendedCourses.js";
import AssessmentImage from "../../assets/images/undraw_site_stats_l57q.svg";
import FreecoursesCard from "../../components/freecourses";
import PaidcoursesCard from "../../components/paidcourses";
import ReqiredSkills from "../../components/RequiredSkills";
import FunctionalAssessment from "../../components/functionalAssessment";
import CertificateModal from "../Dashboard/Employee/Profile/CertificateDetails/CertificateModal";
import {
  getCourses,
  getEmployeeDetails,
  getManagerDetails,
  getDesignationsSkills,
  getCareerpathDesignations,
  updateLikeCourse,
} from "../../core/apiClient/organization/organizationClient";
import {
  getAssessmentLink,
  getAssessmentScore,
} from "../../core/apiClient/assessment";
import { decryptData } from "../../utils/encryptDecrypt";
import "antd/dist/antd.css";
import "../../assets/css/ScrollBarDesign.css";
import { Modal, message, List } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import InfiniteScroll from "react-infinite-scroller";

const Div = Styled.div`
.trainningAssesment{
    display:grid;
    grid-template-columns: 0.8fr 1fr;
}
.courseContainer{
    display:grid;
    background:#ffffff;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 4%;
    padding: 15px 0px 0 24px;
}
.subTitle{
    font-family:Open Sans Semibold;
    font-size:16px;
    color:#303030;
}
.recommendedContainer{
  padding: 11px 0px;
  background-color: #ffff;
  border-radius: 8px;
}
.ant-list-items{
  width:100%
}
`;

class TrainingMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: 0,
      selectedDesignationId: 0,
      addCertificate: false,
      lateralDesignation: [],
      upwardDesignation: [],
      professionalDetails: "",
      technical: [],
      functional: [],
      stakeHolder: [],
      interpersonal: [],
      freeCourses: [],
      paidCourses: [],
      skillTypeId: this.props.match.params.id,
      managerList: [],
      managersNameList: [],
      assessmentLink: "",
      skillPercentage: 0,
      managerName: "",
      filterValue: 0,
      filterName: "",
      freeCoursesCount: 0,
      freeCoursesloading: false,
      hasMoreFreeCourses: true,
      freeCoursesLimit: 10,
      freeCoursesoffset: 0,
      paidCoursesCount: 0,
      paidCoursesloading: false,
      hasMorePaidCourses: true,
      paidCoursesLimit: 10,
      paidCoursesoffset: 0,
      filterdropdownText: "Filter By",
    };
  }

  componentDidMount() {
    this.loadEmployeeDetails();
    this.loadRequiredSkills();
    this.loadManagers();
    this.loadAssessmentLink();
    this.loadSkillScore();
  }
  loadFreeCourses = async (callback) => {
    let orgId = decryptData(localStorage.orgId),
      token = decryptData(localStorage.token),
      employeeId = decryptData(localStorage.employeeId);
    if (orgId && employeeId) {
      try {
        let { data, status } = await getCourses(
          orgId,
          employeeId,
          this.state.skillTypeId,
          "free",
          this.state.freeCoursesLimit,
          this.state.freeCoursesoffset,
          this.state.selectedDesignationId,
          this.state.filterValue,
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          let freeCourses = data.result;
          let freeCoursesCount = data.count;
          this.setState(
            {
              freeCoursesCount: freeCoursesCount,
            },
            () => callback(freeCourses)
          );
        } else if (status === 404) {
          this.setState(
            {
              freeCourses: [],
              selectedDesignationId: this.state.selectedDesignationId,
              freeCoursesCount: 0,
            },
            () => callback(this.state.freeCourses)
          );
        }
        document.toggleLoading();
      } catch (error) {
        message.error("Unable to fetch details, please try after sometime");
        document.toggleLoading();
      }
    }
  };
  loadPaidCourses = async (callback) => {
    let orgId = decryptData(localStorage.orgId),
      employeeId = decryptData(localStorage.employeeId),
      token = decryptData(localStorage.token);
    if (orgId && employeeId) {
      try {
        let { data, status } = await getCourses(
          orgId,
          employeeId,
          this.state.skillTypeId,
          "paid",
          this.state.paidCoursesLimit,
          this.state.paidCoursesoffset,
          this.state.selectedDesignationId,
          this.state.filterValue,
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          let paidCourses = data.result;
          let paidCoursesCount = data.count;
          this.setState(
            {
              paidCoursesCount: paidCoursesCount,
            },
            () => callback(paidCourses)
          );
        } else if (status === 404) {
          this.setState(
            {
              paidCourses: [],
              selectedDesignationId: this.state.selectedDesignationId,
              paidCoursesCount: 0,
            },
            () => callback(this.state.paidCourses)
          );
        }
        document.toggleLoading();
      } catch (error) {
        message.error("Unable to fetch details, please try after sometime");
        document.toggleLoading();
      }
    }
  };
  loadEmployeeDetails = async () => {
    let orgId = decryptData(localStorage.orgId),
      employeeId = decryptData(localStorage.employeeId),
      token = decryptData(localStorage.token);
    if (orgId && employeeId) {
      try {
        document.toggleLoading(true);
        let { data, status } = await getEmployeeDetails(orgId, employeeId, {
          Authorization: token,
        });
        if (status >= 200 && status < 300) {
          this.setState({
            professionalDetails: data.professionalDetails,
          });
          this.loadCareerpathOptions(data.professionalDetails.designationId);
        }

        document.toggleLoading();
      } catch (error) {
        message.error("Unable to fetch details, please try after sometime");
        document.toggleLoading();
      }
    }
  };

  loadManagers = async () => {
    let orgId = decryptData(localStorage.orgId),
      employeeId = decryptData(localStorage.employeeId),
      token = decryptData(localStorage.token);
    if (orgId && employeeId) {
      try {
        document.toggleLoading(true);
        let { data, status } = await getManagerDetails(orgId, employeeId, {
          Authorization: token,
        });
        let managerList = [],
          managersNameList = [],
          managerName = "";
        if (status >= 200 && status < 300) {
          if (data.length) {
            for (let i = 0; i < data.length; i++) {
              let obj = { name: "", employeeId: "" };
              obj.name =
                (data[i].firstName || "") + " " + (data[i].lastName || "");
              obj.employeeId = data[i].employeeId;
              managersNameList.push(obj.name);
              managerList.push(obj);
              managerName = managersNameList[0];
            }
          }
          this.setState({
            managerList,
            managersNameList,
            managerName,
          });
        }
        document.toggleLoading();
      } catch (error) {
        message.error("Unable to fetch details, please try after sometime");
        document.toggleLoading();
      }
    }
  };

  loadRequiredSkills = async () => {
    let orgId = decryptData(localStorage.orgId),
      employeeId = decryptData(localStorage.employeeId),
      token = decryptData(localStorage.token);
    if (orgId && employeeId) {
      try {
        document.toggleLoading(true);
        let { data, status } = await getDesignationsSkills(orgId, employeeId, {
          Authorization: token,
        });
        if (status >= 200 && status < 300) {
          let technicalFilter = data.filter(
            (ele) => ele && ele.skillTypeId === 1
          );
          let functionalFilter = data.filter(
            (ele) => ele && ele.skillTypeId === 2
          );
          let interPersonalFilter = data.filter(
            (ele) => ele && ele.skillTypeId === 3
          );
          let stackeholderFilter = data.filter(
            (ele) => ele && ele.skillTypeId === 4
          );
          let technical = technicalFilter.map((ele) => ele && ele.name);
          let functional = functionalFilter.map((ele) => ele && ele.name);
          let stakeHolder = stackeholderFilter.map((ele) => ele && ele.name);
          let interpersonal = interPersonalFilter.map((ele) => ele && ele.name);
          this.setState({ technical, functional, interpersonal, stakeHolder });
        }
        document.toggleLoading();
      } catch (error) {
        message.error("Unable to fetch details, please try after sometime");
        document.toggleLoading();
      }
    }
  };

  loadCareerpathOptions = async (currentId) => {
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
        let upward = [],
          lateral = [];
        if (status >= 200 && status < 300) {
          for (let i = 0; i < data.length; i++) {
            let upwardObj = {},
              lateralObj = {};
            if (data[i].careerpath === "UPWARD") {
              upwardObj.forwardDesignation = data[i].forwardDesignation;
              upwardObj.forwardDesignationId = data[i].forwardDesignationId;
              upwardObj.department = data[i].department;
              upwardObj.currentDesignationId = data[i].currentDesignationId;
              upwardObj.id = data[i].id;
              upward.push(upwardObj);
            } else {
              lateralObj.forwardDesignation = data[i].forwardDesignation;
              lateralObj.forwardDesignationId = data[i].forwardDesignationId;
              lateralObj.currentDesignationId = data[i].currentDesignationId;
              upwardObj.department = data[i].department;
              lateralObj.id = data[i].id;
              lateral.push(lateralObj);
            }
          }
          this.setState(
            {
              upwardDesignation: upward,
              lateralDesignation: lateral,
              currentId,
              selectedDesignationId: currentId,
            },
            () => {
              this.loadFreeCourses((freeCourses) => {
                this.setState({
                  freeCourses: freeCourses,
                });
              });
              this.loadPaidCourses((paidCourses) => {
                this.setState({
                  paidCourses: paidCourses,
                });
              });
            }
          );
        }
        document.toggleLoading();
      } catch (error) {
        message.error("Unable to fetch details, please try after sometime");
        document.toggleLoading();
      }
    }
  };

  loadAssessmentLink = async () => {
    try {
      let employeeId = decryptData(localStorage.employeeId),
        token = decryptData(localStorage.token),
        skillType = this.props.match.params.skillType;
      if (employeeId) {
        document.toggleLoading(true);
        let { data, status } = await getAssessmentLink(employeeId, skillType, {
          Authorization: token,
        });
        if (status >= 200 && status < 300) {
          let link = Object.values(data);
          if (link.length) {
            this.setState({ assessmentLink: link[0] });
          }
        } else {
          this.setState({ assessmentLink: "" });
        }
        document.toggleLoading();
      }
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  loadSkillScore = async () => {
    try {
      let employeeId = decryptData(localStorage.employeeId),
        token = decryptData(localStorage.token),
        skillType = this.props.match.params.skillType;
      if (employeeId && skillType) {
        document.toggleLoading(true);
        let { data, status } = await getAssessmentScore(employeeId, skillType, {
          Authorization: token,
        });
        console.log("data assessment", data, skillType);
        if (status >= 200 && status < 300) {
          let link = Object.values(data);
          if (link.length) {
            this.setState({ skillPercentage: link[0] });
          }
        } else {
          this.setState({ skillPercentage: 0 });
        }
        document.toggleLoading();
      }
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  addCertificate = () => {
    this.setState({ addCertificate: true });
  };

  cancelModelView = () => {
    this.setState({
      addCertificate: false,
    });
  };

  updateLikeStatus = async (id, like, field) => {
    let employeeId = decryptData(localStorage.employeeId);
    let orgId = decryptData(localStorage.orgId);
    let token = decryptData(localStorage.token);
    try {
      document.toggleLoading(true);
      let { status } = await updateLikeCourse(
        orgId,
        employeeId,
        id,
        { approvalRequest: like },
        {
          Authorization: token,
        }
      );
      if (status >= 200 && status < 300) {
        message.success("Updated Successfully!");
        if (!like) {
          let coursesList = this.state[field];
          let courseIndex = coursesList.findIndex(
            (eachCourse) => eachCourse.id === id
          );
          coursesList.splice(courseIndex, 1);
          this.setState({ [field]: coursesList });
        }
      } else {
        message.error("Something went wrong!");
      }
      document.toggleLoading();
    } catch (error) {
      message.error("Unable to serve your request, please try after sometime");
      document.toggleLoading();
    }
  };

  designationSelected = (e) => {
    document.toggleLoading(true);
    this.setState(
      {
        selectedDesignationId: e,
        freeCoursesoffset: 0,
        paidCoursesoffset: 0,
        freeCourses: [],
        paidCourses: [],
        hasMoreFreeCourses: true,
        hasMorePaidCourses: true,
      },
      () => {
        this.loadFreeCourses((freeCourses) => {
          this.setState({
            freeCourses: freeCourses,
          });
        });
        this.loadPaidCourses((paidCourses) => {
          this.setState({
            paidCourses: paidCourses,
          });
        });
      }
    );
    document.toggleLoading();
  };
  filterDropdown = (filterValue, filterName) => {
    this.setState(
      {
        filterValue: filterValue,
        filterName: filterName,
        freeCoursesoffset: 0,
        paidCoursesoffset: 0,
        filterdropdownText: filterName,
        hasMoreFreeCourses: true,
        hasMorePaidCourses: true,
      },
      () => {
        this.loadFreeCourses((freeCourses) => {
          this.setState({
            freeCourses: freeCourses,
          });
        });
        this.loadPaidCourses((paidCourses) => {
          this.setState({
            paidCourses: paidCourses,
          });
        });
      }
    );
  };
  handleInfiniteOnLoad1 = () => {
    let { freeCourses } = this.state;
    this.setState({
      freeCoursesloading: true,
    });
    let freeCoursesCount = this.state.freeCoursesCount;
    if (this.state.freeCourses.length >= freeCoursesCount) {
      this.setState({
        hasMoreFreeCourses: false,
        freeCoursesloading: false,
      });
    } else {
      let freeCoursesoffset =
        this.state.freeCoursesLimit + this.state.freeCoursesoffset;
      if (freeCoursesoffset < freeCoursesCount) {
        this.setState(
          {
            freeCoursesoffset: freeCoursesoffset,
          },
          () =>
            this.loadFreeCourses((freeCourses1) => {
              freeCourses = freeCourses.concat(freeCourses1);
              this.setState({
                freeCourses: freeCourses,
                freeCoursesloading: false,
              });
            })
        );
      } else {
        this.setState({
          freeCoursesloading: false,
        });
      }
    }
  };
  handleInfiniteOnLoad2 = () => {
    let paidCourses = this.state.paidCourses;
    this.setState({
      paidCoursesloading: true,
    });
    let paidCoursesCount = this.state.paidCoursesCount;
    if (this.state.paidCourses.length >= paidCoursesCount) {
      this.setState({
        hasMorePaidCourses: false,
        paidCoursesloading: false,
      });
    } else {
      let paidCoursesoffset =
        this.state.paidCoursesLimit + this.state.paidCoursesoffset;
      if (paidCoursesoffset < paidCoursesCount) {
        this.setState(
          {
            paidCoursesoffset: paidCoursesoffset,
          },
          () =>
            this.loadPaidCourses((paidCourses1) => {
              paidCourses = paidCourses.concat(paidCourses1);
              this.setState({
                paidCourses: paidCourses,
                paidCoursesloading: false,
              });
            })
        );
      } else {
        this.setState({
          paidCoursesloading: false,
        });
      }
    }
  };
  render() {
    let {
      freeCourses,
      paidCourses,
      freeCoursesCount,
      paidCoursesCount,
      professionalDetails,
    } = this.state;
    const { id, skillType } = this.props.match.params;

    return (
      <Div>
        <div className="trainningAssesment">
          <div>
            <ReqiredSkills
              title={professionalDetails && professionalDetails.designation}
              subTitle={"Required " + skillType + " Skills"}
              list={
                (skillType.includes("technical") && this.state.technical) ||
                (skillType.includes("functional") && this.state.functional) ||
                (skillType.includes("interpersonal") &&
                  this.state.interpersonal) ||
                this.state.stakeHolder
              }
              percent={this.state.skillPercentage}
            />
          </div>
          {skillType.includes("functional") ? (
            <FunctionalAssessment
              image={AssessmentImage}
              rampcount={30}
              buttonName={"Ready"}
              name={
                professionalDetails &&
                (professionalDetails.firstName || "") +
                  " " +
                  (professionalDetails.middleName || "") +
                  " " +
                  (professionalDetails.lastName || "")
              }
              para3={"Are you ready to start your ramp up?"}
              assessmentLink={this.state.assessmentLink}
            />
          ) : (
            <Assessment
              image={AssessmentImage}
              Percentage={this.state.skillPercentage}
              assessmentLink={this.state.assessmentLink}
              skillType={skillType}
            />
          )}
        </div>
        <div className="subTitle">Recommended courses</div>
        <div className="recommendedContainer">
          <div style={{ position: "relative", zIndex: 10 }}>
            <RecommendedCourse
              addCertificate={this.addCertificate}
              trainingNav={skillType}
              upwardDesignation={this.state.upwardDesignation}
              lateralDesignation={this.state.lateralDesignation}
              currentDesignation={this.state.currentId}
              designationSelected={this.designationSelected}
              filterDropdown={this.filterDropdown}
              filterdropdownText={this.state.filterdropdownText}
            />
          </div>
          <div className="courseContainer">
            <div>
              <span className="subTitle">
                {(skillType.includes("functional") &&
                  "Product based courses") ||
                  "Free courses"}
              </span>

              {freeCoursesCount !== 0 ? (
                <div
                  style={{
                    height: "29em",
                    overflowY: "auto",
                    paddingRight: "3%",
                    marginTop: "2.5%",
                  }}
                  className="scroll-container"
                >
                  <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleInfiniteOnLoad1}
                    hasMore={
                      !this.state.freeCoursesloading &&
                      this.state.hasMoreFreeCourses
                    }
                    useWindow={false}
                  >
                    <List
                      dataSource={freeCourses}
                      renderItem={(item) => (
                        <div key={item.id} style={{ marginBottom: 20 }}>
                          <FreecoursesCard
                            {...item}
                            updateLikeStatus={(courseId, like) =>
                              this.updateLikeStatus(
                                courseId,
                                like,
                                "freeCourses"
                              )
                            }
                          />
                        </div>
                      )}
                    >
                      {this.state.freeCoursesloading &&
                        this.state.hasMoreFreeCourses && (
                          <div
                            style={{
                              position: "absolute",
                              bottom: 120,
                              width: "100%",
                              textAlign: "center",
                            }}
                          ></div>
                        )}
                    </List>
                  </InfiniteScroll>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    height: "100%",
                    fontSize: "1.2em",
                    margin: "30px 0",
                  }}
                >
                  <span>
                    <InboxOutlined style={{ fontSize: "10em" }} />
                  </span>
                  <span>No Data</span>
                </div>
              )}
            </div>
            <div>
              <span className="subTitle">
                {(skillType.includes("functional") && "Role based courses") ||
                  "Paid courses"}
              </span>

              {paidCoursesCount !== 0 ? (
                <div
                  style={{
                    height: "29em",
                    overflowY: "auto",
                    paddingRight: "3%",
                    marginTop: "2.5%",
                  }}
                  className="scroll-container"
                >
                  <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleInfiniteOnLoad2}
                    hasMore={
                      !this.state.paidCoursesloading &&
                      this.state.hasMorePaidCourses
                    }
                    useWindow={false}
                  >
                    <List
                      dataSource={paidCourses}
                      renderItem={(item) => (
                        <div key={item.id} style={{ marginBottom: 20 }}>
                          <PaidcoursesCard
                            managerList={this.state.managerList}
                            managersNameList={this.state.managersNameList}
                            managerName={this.state.managerName}
                            trainingNav={skillType}
                            skillTypeId={id}
                            currentDesignationId={
                              this.state.selectedDesignationId
                            }
                            {...item}
                            updateLikeStatus={(courseId, like) =>
                              this.updateLikeStatus(
                                courseId,
                                like,
                                "paidCourses"
                              )
                            }
                          />
                        </div>
                      )}
                    >
                      {this.state.paidCoursesloading &&
                        this.state.hasMorePaidCourses && (
                          <div
                            style={{
                              position: "absolute",
                              bottom: 120,
                              width: "100%",
                              textAlign: "center",
                            }}
                          ></div>
                        )}
                    </List>
                  </InfiniteScroll>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: "1.2em",
                  }}
                >
                  <span>
                    <InboxOutlined style={{ fontSize: "10em" }} />
                  </span>
                  <span>No Data</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <Modal
          visible={this.state.addCertificate}
          width="50%"
          footer={null}
          onCancel={this.cancelModelView}
          height="400px"
          className="dashboard-modal"
        >
          <div className="user-profile-edit scroll-container">
            <CertificateModal
              changeOnboardingStep={(e) => this.cancelModelView(e)}
              cancel={this.cancelModelView}
            />
          </div>
        </Modal>
      </Div>
    );
  }
}

export default TrainingMain;
