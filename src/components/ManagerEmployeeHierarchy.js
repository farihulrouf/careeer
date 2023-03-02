import React, { Component } from "react";
import HierarchyDepartmentHead from "./HierarchyDepartmentHead";
import Button from "./Button";
import HierarchyTeamMember from "./HierarchyTeamMember";
import HiddenEmployeesDisplay from "./HiddenEmployeesDisplay";
import styled from "styled-components";
const Div = styled.div`
  display: flex;
  .departmentContainer {
    display: felx;
    text-align: center;
    width: 12%;
  }
  .employeeListContainer {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    grid-auto-rows: max-content;
    margin: 0 1%;
    font-size: 0.875em;
  }
  .deptSubTitle {
    color: #767676;
    font-size: 1em;
    margin-bottom: 5px;
    margin-top: 15px;
  }
  .numberDisplay {
    font-family: "Open Sans Semibold";
    font-size: 1.429em;
    color: #303030;
  }
  #addButtonContainer {
    position: relative;
    left: -15px;
    width: 152px;
    margin-top: 20px;
  }
  .hiddenMembers {
    height: 152px;
    width: 131px;
    margin-left: 10px;
  }
  .sideBorder {
    border-left: 1px solid #c8c8c8;
    height: 266px;
    margin-left: 15px;
    margin-top: 5px;
  }
`;
class ManagerEmployeeHierarchy extends Component {
  constructor(props) {
    super(props);
    this.state = { viewStatus: false, imageData: [], reportees: [] };
  }

  static getDerivedStateFromProps(props, state) {
    let imageData, filterImage;
    if (
      props.hierarchyList &&
      props.hierarchyList.reportees.length !== state.reportees.length
    ) {
      imageData = props.hierarchyList.reportees.filter((ele, index) => {
        if (index > 7 && index < 12) {
          return ele;
        } else return null;
      });
      if (imageData !== "") {
        filterImage = imageData.map((ele) => ele.profilePicture);
      }
      return { imageData: filterImage };
    } else {
      return null;
    }
  }

  viewHandler = () => {
    this.setState({
      viewStatus: true,
    });
  };

  render() {
    return (
      <Div>
        <div className="departmentContainer">
          <div
            style={{
              width: 131,
              height: 127,
              fontSize: "0.875em",
              marginLeft: "10px",
              paddingTop: "10px",
            }}
          >
            <HierarchyDepartmentHead
              headData={this.props.hierarchyList.manager || ""}
            />
            <div className="deptSubTitle">Number of Reportees</div>
            <div className="numberDisplay">
              {this.props.hierarchyList.reportees.length || 0}
            </div>
            <div
              id="addButtonContainer"
              onClick={() =>
                this.props.openDrawer(this.props.hierarchyList, "Add Employee")
              }
            >
              <Button
                label="Add Employee"
                styles={{
                  color: "#FF808B",
                  backgroundColor: "#FFFFFF",
                  border: "#FF808B",
                  height: "40px",
                }}
              />
            </div>
          </div>
          <div className="sideBorder"></div>
        </div>
        <div className="employeeListContainer">
          {this.props.hierarchyList &&
            this.props.hierarchyList.reportees
              .slice(
                0,
                this.state.viewStatus
                  ? this.props.hierarchyList.reportees.length
                  : 8
              )
              .map((eachTeamMember, index) => {
                return (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      cursor: "pointer",
                    }}
                    key={index}
                  >
                    <HierarchyTeamMember
                      memberData={eachTeamMember}
                      onClick={(e) =>
                        this.props.reporteesEdit(e, eachTeamMember, index)
                      }
                      dropDownOptions={["View Profile", "Remove"]}
                      loadHierarchyDetails={this.props.loadHierarchyDetails}
                    />
                  </div>
                );
              })}
        </div>
        <div
          className="hiddenMembers"
          style={{
            display:
              this.props.hierarchyList.reportees.length > 7
                ? this.state.viewStatus
                  ? "none"
                  : ""
                : "none",
          }}
        >
          <HiddenEmployeesDisplay
            images={this.state.imageData || []}
            title={
              this.props.hierarchyList.reportees.length > 7
                ? this.props.hierarchyList.reportees.length - 8
                : 0
            }
            subtitle={"People"}
            linkTitle={this.state.viewStatus ? "View less" : "View all"}
            viewHandler={this.viewHandler}
          />
        </div>
      </Div>
    );
  }
}

export default ManagerEmployeeHierarchy;
