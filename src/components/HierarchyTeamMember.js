import React, { Component } from "react";
import styled from "styled-components";
import Icon from "../assets/images/ic_more_vert.svg";
import DefaultImage from "../assets/images/defaultProfile.svg";
import { COLORS } from "../theme";
const Div = styled.div`
  display: flex;
  box-shadow: 0px 2px 5px #00000012;
  background:  ${(props) => (props.background )};
  border-radius: 10px;
  height: inherit;
  align-items: center;
  position: relative;
  outline: none;
  padding: 3% 0;
  &:hover {
    box-shadow: 0px 2px 7px #0000002e;
    transition: 0.2s;
  }
  #profilePicture {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    margin: 0 8%;
    font-size: 0.76em;
    background: ${COLORS.GREY_T_96};
  }
  .profileContainer {
    line-height: 1.2em;
    padding-top: 2px;
    padding-right: 20px;
    font-size: 0.98em;
  }
  .title {
    font-family: "Open Sans Semibold";
    font-size: 1em;
    color: #303030;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .subtitle {
    margin-top: 5px;
    font-family: "Open Sans Regular";
    color: #767676;
    font-size: 0.88em;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  #Icon {
    position: absolute;
    right: 8px;
    top: 10px;
    width: 12px;
    height: 24px;
    cursor: pointer;
  }
  #dropDownContainer {
    width: 121px;
    position: absolute;
    right: 18px;
    top: 17px;
    min-height: 75px;
    box-shadow: 1px 4px 12px #00000027;
    background: #ffffff;
    z-index: 1;
    border-radius: 10px;
    display: flex;
    align-items: center;
  }
  #dropDown {
    flex: 1;
    line-height: 27px;
    color: #303030;
    font-size: 0.88em;
    font-family: "Open Sans Regular";
  }
  .dropDownItems {
    cursor: pointer;
    padding-left: 15px;
    &:hover {
      background: #e2e2e2;
    }
  }
`;

class HierarchyTeamMember extends Component {
  state = { isClicked: false, selected: "" };
  clickHandler = (e) => {
    console.log(e.target.title)
    if (e.target.title === "Remove") {
      this.setState(
        { selected: "", isClicked: false },
        this.props.onClick(e.target.title)
      );
    } else {
      this.setState(
        { selected: e.target.title, isClicked: false },
        this.props.onClick(e.target.title)
      );
    }
  };

  showDropDownHandler = () => {
    this.setState({ isClicked: !this.state.isClicked });
  };
  onBlurDropDown = (e) => {
    e.preventDefault();
    this.setState({ isClicked: false, selected: "" });
  };
  render() {
    return (
      <Div background={this.props.memberData.isManager ? "#1890ff":"#ffffff"} onBlur={this.onBlurDropDown} tabIndex="1">
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
          }}
          onClick={() =>
            (this.props.loadHierarchyDetails &&
              this.props.loadHierarchyDetails(this.props.memberData)) ||
            null
          }
        >
          <img
            src={this.props.memberData.profilePicture || DefaultImage}
            id="profilePicture"
            alt="profile_pic"
          />
          <div className="profileContainer">
            <div className="title">
              {(this.props.memberData.firstName || "") +
                " " +
                `${this.props.memberData.middleName || ""}` +
                " " +
                ((this.props.memberData.firstName.length > 5 &&
                this.props.memberData.lastName.length > 6
                  ? this.props.memberData.lastName.substring(0, 1)
                  : this.props.memberData.lastName) || "") || ""}
            </div>
            <div className="subtitle">
              {this.props.memberData.designationTitle || ""}
            </div>
          </div>
        </div>
        <div>
          <img
            src={Icon}
            id="Icon"
            onClick={this.showDropDownHandler}
            alt="icon"
          />
          <div
            id="dropDownContainer"
            style={{ display: this.state.isClicked ? "flex" : "none" }}
          >
            <div id="dropDown" onClick={this.clickHandler}>
              {this.props.dropDownOptions &&
                this.props.dropDownOptions.map(
                  (eachOption, eachOptionIndex) => (
                    <div
                      className="dropDownItems"
                      key={eachOptionIndex}
                      title={eachOption}
                      style={{
                        color:
                          this.state.selected === eachOption
                            ? "#4D4CAC"
                            : "#303030",
                      }}
                    >
                      {eachOption}
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
      </Div>
    );
  }
}

export default HierarchyTeamMember;
