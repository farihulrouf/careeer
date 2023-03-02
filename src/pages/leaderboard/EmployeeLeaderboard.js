import React from "react";
import { Link } from "react-router-dom";
import Top5Ranks from "./components/LeaderboardTopFiveRankers";
import Sidebar from "./components/employeeDetailsSidebar/index";
import CircularRanking from "./components/circularRanking";
import FormSelector from "../../components/InputField/FormSelector";
import FavouriteSearchSelector from "../../components/FavouriteSearchSelector.js";
import { message, Empty } from "antd";
import { decryptData } from "../../utils/encryptDecrypt";
import { sendLeaderboardFavourite } from "../../core/apiClient/organization/organizationClient";
import { searchLeaderboardEmployees } from "../../core/apiClient/leaderboard/leaderboardClient";
class EmployeeLeaderboard1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderboardDetails: {
        employeeId: 1,
        employeeFirstName: "",
        employeeMiddleName: "",
        employeeLastName: "",
        profilePicture: "",
        designation: "",
        department: "",
        leaderPoints: 0,
        leaderBadges: 0,
        approvalRequested: "",
        rewardsReceived: [
          // {
          //   imageUrl:
          //     "data:image/png;base64,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",
          //   rewardName: "Ladakh Holiday Package",
          //   receivedDate: "27/JAN/2020",
          //   leaderPointsForReward: 3,
          // },
        ],
      },
      tasks: [
        "Complete your profile.",
        "Complete Technical, Functional, Interpersonal, Stakeholder course.",
        "Upload recently completed course certificate.",
        "Take assessment to re-validate your skill score.",
        "Have a discssion with manager on career path.",
        "Get regular feedback from manager."
      ],
      maxWidthOfCircleGraph: 1000,
      options: [],
      selected: "",
    };
  }
  componentDidMount() {
    this.setCircleMaxWidth();
    window.addEventListener("resize", this.setCircleMaxWidth);
  }
  setCircleMaxWidth = () => {
    let ranksContainer = document.getElementById("rankContainer");
    if (ranksContainer) {
      let offsetWidth = ranksContainer.offsetWidth;
      this.setState({ maxWidthOfCircleGraph: offsetWidth - 300 });
    }
  };
  componentWillUnmount() {
    window.removeEventListener("resize", () => {});
  }
  getLeftPadding = (maxWidthOfCircleGraph) => {
    let leftPadding = 0;
    leftPadding = (maxWidthOfCircleGraph * 400) / 651;
    return 800 - leftPadding;
  };
  loadEmployeeSearch = async (search) => {
    let orgId = decryptData(localStorage.orgId),
      employeeId = decryptData(localStorage.employeeId);
    let token = decryptData(localStorage.token);
    if (orgId && employeeId) {
      if (search !== "") {
        try {
          let response = await searchLeaderboardEmployees(
            orgId,
            employeeId,
            search,
            {
              Authorization: token,
            }
          );
          if (response.status === 200) {
            if (response.data === "No results found") {
              this.setState({ options: [] });
            } else {
              this.setState({ options: [...response.data] });
            }
          }
          document.toggleLoading();
        } catch (error) {
          message.error("Unable to fetch details, please try after sometime");
          document.toggleLoading();
        }
      } else {
        this.setState({ options: [] });
      }
    }
  };

  saveFavourite = async (selected) => {
    let orgId = decryptData(localStorage.orgId),
      employeeId = decryptData(localStorage.employeeId);
    let token = decryptData(localStorage.token);
    if (orgId && employeeId) {
      let obj = {
        employeeId: selected.employeeId,
        isFavourite: JSON.stringify(!selected.isFavourite),
      };
      try {
        let response = await sendLeaderboardFavourite(obj, orgId, employeeId, {
          Authorization: token,
        });
        if (response.status === 200) {
          let options = this.state.options;
          console.log({ options });
          options.map((eachEmployee) => {
            if (eachEmployee.employeeId === selected.employeeId) {
              return (eachEmployee.isFavourite = !eachEmployee.isFavourite);
            } else {
              return eachEmployee;
            }
          });
          console.log({ options });
          this.setState({ options });
          this.props.loadRadialFavourites(
            this.props.scopeType,
            this.props.referenceId
          );
        } else {
          message.error(response.data);
        }
        document.toggleLoading();
      } catch (error) {
        message.error(
          "Unable to save details at this time, please try after sometime"
        );
        document.toggleLoading();
      }
    }
  };
  onChangeInput = (selected) => {
    this.loadEmployeeSearch(selected);
    this.setState({ selected });
  };
  render() {
    return (
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          background: "#F8F8F8",
          fontFamily: "Open Sans Regular",
          height: "100%",
        }}
      >
        <div>
          <div
            style={{ display: "flex", flex: 1, flexDirection: "row" }}
            id="rankContainer"
          >
            <div
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
                margin: "5px 5px 0 0",
                background: "#ffff",
                paddingBottom: 60,
              }}
            >
              {this.props.scopeType && this.props.referenceId ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        minHeight: 45,
                      }}
                    >
                      <div
                        style={{
                          minWidth: "100px",
                          fontSize: "0.775em",
                          marginRight: "3em",
                          display:
                            this.props.linkStatus === "Region" || false
                              ? ""
                              : "none",
                        }}
                      >
                        <FormSelector
                          type="selector"
                          value={
                            this.props.linkStatus === "Region"
                              ? this.props.selectedOption
                              : this.props.teamSelectedOption
                          }
                          onClick={this.props.onClickSelector}
                          option={
                            this.props.linkStatus === "Region"
                              ? this.props.selectorOptions
                              : ["Team A", "Team B"]
                          }
                          placeHolder="Select Team"
                        />
                      </div>
                      <Link
                        to={`/employee/leaderboard/view-all/${
                          this.props.referenceId
                        }/${
                          this.props.scopeType === "root"
                            ? "global"
                            : this.props.scopeType
                        }`}
                      >
                        <span
                          style={{
                            padding: 15,
                            textDecoration: "underline",
                            color: "#F46773",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            this.setState({ isViewAllClicked: true });
                          }}
                        >
                          {this.props.employeeRadialData.length > 1
                            ? "View all"
                            : ""}
                        </span>
                      </Link>
                    </div>
                    <div style={{ padding: "0 7%" }}>
                      {this.props.referenceId && (
                        <Top5Ranks
                          referenceId={this.props.referenceId}
                          scopeType={this.props.scopeType}
                          linkStatus={this.props.linkStatus}
                          role={this.props.role || ""}
                        />
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        display:
                          this.props.employeeRadialData.length > 1
                            ? "flex"
                            : "none",
                        flex: 1,
                        flexDirection: "row",
                        marginRight: 30,
                        justifyContent: "flex-end",
                      }}
                    >
                      <div
                        style={{
                          display:
                            this.props.linkStatus === "Team" ? "" : "none",
                        }}
                      >
                        {this.props.managerName && (
                          <FormSelector
                            style={{ height: 40 }}
                            option={this.props.managerList.map(
                              (eachManger) => eachManger.name
                            )}
                            value={this.props.managerName.name || ""}
                            onClick={this.props.onManagerChange}
                          />
                        )}
                      </div>

                      <div
                        style={{
                          margin: "7px 0 0 7px",
                          width: 255,
                        }}
                      >
                        <FavouriteSearchSelector
                          options={this.state.options || []}
                          placeHolder={"Search employee"}
                          style={{
                            color: {
                              hover: "#fadfe1",
                              selectedBg: "#997073",
                              optionHover: "#fadfe1",
                            },
                          }}
                          onChange={this.saveFavourite}
                          onChangeInput={this.onChangeInput}
                          value={this.state.selected}
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        maxWidth: this.state.maxWidthOfCircleGraph,
                        overflowX: "auto",
                        height: 600,
                        overflowY: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft:
                          this.state.maxWidthOfCircleGraph < 900
                            ? this.getLeftPadding(
                                this.state.maxWidthOfCircleGraph
                              )
                            : 0,
                      }}
                    >
                      {this.props.employeeRadialData.length > 1 && (
                        <CircularRanking
                          employeeRadialData={this.props.employeeRadialData}
                          employee={this.props.employee}
                        />
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    marginTop: "10%",
                  }}
                >
                  <Empty description={<span>No manager assigned</span>} />
                </div>
              )}
            </div>

            <div
              style={{
                display: "flex",
                flex: 0.2,
                margin: "5px 0 0 5px",
              }}
            >
              <Sidebar {...this.state} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default EmployeeLeaderboard1;
