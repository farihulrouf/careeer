import React, { Component } from "react";
import styled from "styled-components";
import Close from "../assets/images/closeImage.svg";
import SingleSearchInput from "./SearchSelector";
import FormSelector from "./form_selector";
import Button from "./Button";
import Info from "../assets/images/info.svg";
import ToolTip from "./ToolTipComponent";

const Div = styled.div`
  width: 100%;
  color: #303030;
  position: relative;
  height: 100%;
  font-family: Open Sans Regular;
  .drawer-container {
    padding: 8% 10%;
  }
  #close-icon {
    position: absolute;
    right: 4%;
    top: 2%;
    cursor: pointer;
  }
  #drawer-title {
    font-family: Open Sans Semibold;
    font-size: 1.29em;
    margin-bottom: 10vh;
  }
`;
class AssignAdminRoleToEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = { employeeList: [] };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      employeeList: props.employeeList,
    };
  }

  render() {
    const status =
      this.props.adminSelectedEmployee &&
      this.props.adminSelectedTier &&
      this.props.adminSelectedAccessType
        ? false
        : true;
    return (
      <Div>
        <div className="drawer-container">
          <img
            src={Close}
            alt="close"
            id="close-icon"
            onClick={this.props.closeAdminDrawer}
          />
          <div id="drawer-title">Add Admin</div>
          <div
            style={{
              marginBottom: "6vh",
            }}
          >
            <SingleSearchInput
              options={this.state.employeeList || []}
              placeHolder="Search & Select Employee"
              value={
                typeof this.props.adminSelectedEmployee !== "object"
                  ? this.props.adminSelectedEmployee
                  : this.props.adminSelectedEmployee.name
              }
              style={{
                color: {
                  hover: "#F4A6AE",
                  selectedBg: "#F4A6AE",
                  optionHover: "#fadfe1",
                },
              }}
              onChange={this.props.selectedEmployee}
              onChangeInput={this.props.onSearchEmployee}
            />
            <div>
              <ToolTip
                style={{
                  minWidth: 100,
                  maxWidth: "max-content",
                  minHeight: 20,
                  maxHeight: 100,
                  margin: "0% 0% 0% 0%",
                  opacity: this.state.showSearchInfo ? 1 : 0,
                  borderRadius: 1,
                  transition: "0.5s opacity",
                  backgroundColor: "rgb(227, 227, 251)",
                  position: "absolute",
                  zIndex: 0,
                }}
                toolTip={{ placement: "bottomLeft", width: "10px" }}
              >
                <div
                  style={{
                    width: "inherit",
                    height: "inherit",
                    outline: "none",
                    display: "flex",
                    padding: 5,
                    textAlign: "center",
                  }}
                >
                  <div>
                    <img src={Info} alt="icon" className="drawer-info-icon" />
                  </div>
                  <div
                    style={{
                      fontSize: "0.955em",
                      color: "#4D4CAC",
                      marginLeft: "10px",
                    }}
                  >
                    Please select the employee
                  </div>
                </div>
              </ToolTip>
            </div>
          </div>
          <div
            onMouseOver={() =>
              this.setState({
                showSearchInfo:
                  this.props.adminSelectedEmployee !== "" ? false : true,
              })
            }
            onMouseLeave={() =>
              this.setState({
                showSearchInfo: false,
              })
            }
          >
            <FormSelector
              type="selector"
              onClick={this.props.selectedAccessType}
              value={this.props.adminSelectedAccessType}
              option={this.props.accessTypeOptions || []}
              placeHolder="Select Access Type"
              isPointerHidden={this.state.showSearchInfo}
              style={{
                color: {
                  hover: "#F4A6AE",
                  selectedBg: "#F4A6AE",
                  optionHover: "#fadfe1",
                  selectedFont: "#ffffff",
                },
              }}
            />
            <div>
              <ToolTip
                style={{
                  minWidth: 100,
                  maxWidth: "max-content",
                  minHeight: 20,
                  maxHeight: 100,
                  margin: "0% 0 0% 0px",
                  opacity: this.state.showSelectorInfo ? 1 : 0,
                  borderRadius: 1,
                  transition: "0.5s opacity",
                  backgroundColor: "rgb(227, 227, 251)",
                  position: "absolute",
                  zIndex: 0,
                }}
                toolTip={{ placement: "bottomLeft", width: "10px" }}
              >
                <div
                  style={{
                    width: "inherit",
                    height: "inherit",
                    outline: "none",
                    display: "flex",
                    padding: 5,
                    textAlign: "center",
                  }}
                >
                  <div>
                    <img src={Info} alt="icon" className="drawer-info-icon" />
                  </div>
                  <div
                    style={{
                      fontSize: "0.955em",
                      color: "#4D4CAC",
                      marginLeft: "10px",
                    }}
                  >
                    Please select the access type
                  </div>
                </div>
              </ToolTip>
            </div>
          </div>
          <div
            style={{ margin: "6vh 0 10vh 0" }}
            onMouseOver={() =>
              this.setState({
                showSelectorInfo:
                  this.props.adminSelectedAccessType !== "" ? false : true,
              })
            }
            onMouseLeave={() =>
              this.setState({
                showSelectorInfo: false,
              })
            }
          >
            <FormSelector
              type="selector"
              onClick={this.props.tierSelectorHandler}
              value={this.props.adminSelectedTier}
              option={this.props.TierTypeOptions || []}
              placeHolder={"Select Tier"}
              isPointerHidden={this.state.showSelectorInfo}
              style={{
                color: {
                  hover: "#F4A6AE",
                  selectedBg: "#F4A6AE",
                  optionHover: "#fadfe1",
                  selectedFont: "#ffffff",
                },
              }}
            />
          </div>
          <div>
            <Button
              label="Add Admin"
              notAllValid={status}
              styles={{
                color: "#ffffff",
                backgroundColor: status ? "#BBBBBB" : "#F17E8A",
                border: status ? "#BBBBBB" : "#F39CA6",
                height: "40px",
              }}
              onClick={!status && (() => this.props.addNewAdminHandler())}
            />
          </div>
        </div>
      </Div>
    );
  }
}

export default AssignAdminRoleToEmployee;
