import React, { Component } from "react";
import styled from "styled-components";
import SearchIcon from "../assets/images/search.svg";
import CloseIcon from "../assets/images/close.svg";

const Div = styled.div`
  width: 100%;
  position: relative;
  height: 40px;
  padding: 1.2px;
  display: flex;
  background: #ffffff;
  flex-direction: row;
  font-size: inherit;
  border: ${(props) =>
    props.showOption ? "1px solid" + props.hoverColor : "1px solid #E2E2E2"};
  border-radius: 4px;
  &:hover {
    border: ${(props) => "1px solid" + props.hoverColor};
    box-shadow: 0 2px 6px #eee;
  }

  .searchIcon {
    position: absolute;
    top: 30%;
    left: 10px;
  }
  .caretIcon {
    padding: 9px 4px;
    border-left: 1px solid #ededed;
    background-color: #f6f6f6;
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
    font-size: 1em;
    color: #828282;
    cursor: pointer;
  }

  .inputField {
    height: 100%;
    width: 100%;
    font-size: 0.98em;
    font-family: inherit;
    letter-spacing: 0.05em;
    background-color: #ffffff;
    border: none;
    border-top-left-radius: inherit;
    border-bottom-left-radius: inherit;
    outline: none;
    &::-webkit-search-cancel-button {
      height: 10px;
      width: 10px;
      position: relative;
      right: 5px;
      background-image: url(${CloseIcon});
      -webkit-appearance: none;
      cursor: pointer;
    }
  }
`;

class SearchTextBox extends Component {
  state = { selected: "", showOptions: false };

  exitHandler = () => {
    this.setState({ showOptions: false });
  };
  isClicked = () => {
    this.setState({ showOptions: true });
  };
  caretHandler = () => {
    this.setState({ showOptions: !this.state.showOptions });
  };

  render() {
    return (
      <Div
        className="searchInput"
        onKeyDown={this.props.keybordKeyHandler}
        onBlur={this.exitHandler}
        hoverColor={this.props.style && this.props.style.color.hover}
        showOption={this.state.showOptions}
      >
        <div
          style={{
            flex: 1,
            paddingLeft: 35,
            backgroundColor: "#FFFFFF",
            borderRadius: "inherit",
          }}
          onFocus={this.isClicked}
        >
          <img src={SearchIcon} alt="icon" className="searchIcon" />
          <input
            className="inputField"
            id="searchField"
            value={this.props.value || ""}
            onChange={this.props.searchInputHandler}
            type="search"
            name="search"
            autoComplete="off"
            placeholder={this.props.placeHolder || "Type here"}
          />
        </div>
      </Div>
    );
  }
}

export default SearchTextBox;
