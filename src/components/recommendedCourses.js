import React from "react";
import styled from "styled-components";
import { PlusCircleOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { Menu, Dropdown } from "antd";

const MainDiv = styled.div`
  width: 100%;
  position: relative;
  z-index: 0;
  .grid-containers {
    background-color: #ffffff;
    overflow: hidden;
    width: 100%;
    padding-left: 0%;
    padding-right: 1%;
    z-index: 0;
  }
  .grid-items-navigation {
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid #ffffff;
    display: grid;
    grid-template-columns: 1fr 0.5fr;
    padding: 0 1.5% 0 0%;
    width: 100%;
    border-radius: 5px;
    font-family: "Open Sans Regular";
    font-size: 16px;
  }
  .grid-firstpart {
    display: flex;
    padding-top: 0.5%;
    align-items: center;
    font-size: 16px;
    padding-left: 5px;
  }
  .grid-secondpart {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0.5% 0% 0.5% 0%;
  }
  .grid-firstpart-item {
    margin-right: 2%;
    margin-left: 1%;
    display: flex;
    font-size: 16px;
    padding: 3.5px 10px 3.5px 10px;
    border: 1px solid #ffffff;
  }
  .grid-firstpart-item:hover {
    cursor: pointer;
  }
  .filter {
    border: 1px solid #f1f0f1;
    border-radius: 3px;
    display: grid;
    align-content: center;
    grid-template-columns: 1.5fr 1fr;
    font-size: 14px;
    color: #767676;
    outline: none;
    text-align: center;
  }
  .add-certificate {
    display: flex;
    align-items: center;
    font-size: 14px;
    padding: 1px 1px 1px 10px;
    color: #646464;
    margin-top: 5px;
    cursor: pointer;
  }
  .dropdownMenu {
    display: block;
    z-index: 1;
  }
  .dropdown {
    border: 1px solid #ffffff;
    padding: 10px 0px;
    position: absolute;
    background: #fff;
    width: 123px;
    text-align: left;
    font-size: 13px;
    border-radius: 5px;
    margin-top: 5px;
    color: #303030;
    box-shadow: 0px 3px 8px #0000001f;
  }
  .listData {
    padding: 5px 5px;
    &:hover {
      background: #e2e2e2;
      cursor: pointer;
      color: #4d4cab;
    }
  }
`;

export default class RecommendedCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trainingNav: "",
      border1: true,
      border2: false,
      border3: false,
      dropdown: false,
      dropdownText: "Filter By",
    };
  }

  borderHandler1 = () => {
    this.setState({
      border1: true,
      border2: false,
      border3: false,
      dropdownText: "Filter By",
    });
  };
  borderHandler2 = () => {
    this.setState({
      border1: false,
      border2: true,
      border3: false,
      dropdownText: "Filter By",
    });
  };
  borderHandler3 = () => {
    this.setState({
      border1: false,
      border2: false,
      border3: true,
      dropdownText: "Filter By",
    });
  };
  dropdownHandler = () => {
    this.setState({
      dropdown: !this.state.dropdown,
    });
  };

  dropdownTextHandler = (index) => {
    if (index === 1) {
      this.setState(
        {
          dropdownText: "All",
        },
        () => this.props.filterDropdown(0, "All")
      );
    }
    if (index === 2) {
      this.setState(
        {
          dropdownText: "Saved",
        },
        () => this.props.filterDropdown(1, "Saved")
      );
    }
  };

  closeHandler = () => {
    this.setState({
      dropdown: false,
    });
  };

  render() {
    const lateral = (
      <Menu>
        {this.props.lateralDesignation.length
          ? this.props.lateralDesignation.map((ele, index) => (
              <Menu.Item
                key={ele.id}
                onClick={() =>
                  this.props.designationSelected(ele.forwardDesignationId)
                }
              >
                {ele.forwardDesignation}
              </Menu.Item>
            ))
          : ""}
      </Menu>
    );

    const upward = (
      <Menu>
        {this.props.upwardDesignation.length
          ? this.props.upwardDesignation.map((ele, index) => (
              <Menu.Item
                key={ele.id}
                onClick={() =>
                  this.props.designationSelected(ele.forwardDesignationId)
                }
              >
                {ele.forwardDesignation}
              </Menu.Item>
            ))
          : ""}
      </Menu>
    );

    return (
      <MainDiv id="area">
        <div className="grid-containers">
          <div className="grid-items-navigation">
            <div className="grid-firstpart">
              <div
                className="grid-firstpart-item"
                onClick={this.borderHandler1}
                onClickCapture={() =>
                  this.props.designationSelected(this.props.currentDesignation)
                }
                style={{
                  border: this.state.border1 ? "1px solid #FF808B" : "",
                  color: this.state.border1 ? "#FF808B" : "#414764",
                  borderRadius: this.state.border1 ? "20px" : "",
                }}
              >
                Present Courses
              </div>
              <Dropdown
                trigger={["click"]}
                overlay={upward}
                getPopupContainer={() => document.getElementById("area")}
                disabled={
                  this.props.upwardDesignation.length <= 1 ? true : false
                }
              >
                <div
                  className="grid-firstpart-item"
                  onClick={this.borderHandler2}
                  onClickCapture={(e) =>
                    this.props.upwardDesignation.length <= 1
                      ? this.props.designationSelected(
                          this.props.upwardDesignation.length
                            ? this.props.upwardDesignation[0]
                                .forwardDesignationId
                            : 0
                        )
                      : e.preventDefault()
                  }
                  style={{
                    border: this.state.border2 ? "1px solid #FF808B" : "",
                    color: this.state.border2 ? "#FF808B" : "#414764",
                    borderRadius: this.state.border2 ? "20px" : "",
                  }}
                >
                  <label
                    className="ant-dropdown-link"
                    style={{ cursor: "pointer" }}
                  >
                    Within Department Courses
                  </label>
                </div>
              </Dropdown>
              <Dropdown
                trigger={["click"]}
                overlay={lateral}
                getPopupContainer={() => document.getElementById("area")}
                disabled={
                  this.props.lateralDesignation.length <= 1 ? true : false
                }
              >
                <div
                  className="grid-firstpart-item"
                  onClick={this.borderHandler3}
                  onClickCapture={(e) =>
                    this.props.lateralDesignation.length <= 1
                      ? this.props.designationSelected(
                          this.props.lateralDesignation.length
                            ? this.props.lateralDesignation[0]
                                .forwardDesignationId
                            : 0
                        )
                      : e.preventDefault()
                  }
                  style={{
                    border: this.state.border3 ? "1px solid #FF808B" : "",
                    color: this.state.border3 ? "#FF808B" : "#414764",
                    borderRadius: this.state.border3 ? "20px" : "",
                  }}
                >
                  <label
                    className="ant-dropdown-link"
                    style={{ cursor: "pointer" }}
                  >
                    Alternate Career Courses
                  </label>
                </div>
              </Dropdown>
            </div>
            <div className="grid-secondpart">
              <div className="dropdownMenu">
                <div
                  className="filter"
                  style={{
                    cursor: "pointer",
                    height: 40,
                    width: 120,

                    color: this.state.dropdown ? "#8383C5" : "",
                  }}
                  onClick={this.dropdownHandler}
                  onBlur={this.closeHandler}
                  tabIndex="1"
                >
                  <div>{this.props.filterdropdownText}</div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      fill={this.state.dropdown ? "#8383C5" : "#989798"}
                      style={{ marginRight: "35%", marginTop: "2%" }}
                      viewBox="0 0 24 24"
                    >
                      <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
                    </svg>
                  </div>
                </div>
                <div
                  className="dropdown"
                  style={{
                    display: this.state.dropdown ? "block" : "none",
                    zIndex: 1,
                    position: "absolute",
                  }}
                >
                  <div
                    className="listData"
                    onMouseDown={() => {
                      this.dropdownTextHandler(1);
                    }}
                  >
                    All
                  </div>
                  <div
                    className="listData"
                    onMouseDown={() => this.dropdownTextHandler(2)}
                  >
                    Saved
                  </div>
                </div>
              </div>
              <div
                onClick={this.props.addCertificate}
                className="add-certificate"
              >
                <span>
                  <PlusCircleOutlined
                    style={{
                      fontSize: "15px",
                      marginRight: "5px",
                      color: "#303030",
                    }}
                  />
                </span>
                Add Certificate
              </div>
            </div>
          </div>
        </div>
      </MainDiv>
    );
  }
}
