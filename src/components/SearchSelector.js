import React, { Component } from "react";
import Styled from "styled-components";
import DefaultPic from "../assets/images/defaultProfile.svg";
import SearchIcon from "../assets/images/search.svg";
import CloseIcon from "../assets/images/close.svg";
import { CaretDownOutlined } from "@ant-design/icons";

const StyledDiv = Styled.div`
font-size:inherit;
font-family:inherit;
outline:none;

.searchSelectorContainer{
  width: 100%;
  height: 100%;
  position: relative;
  outline: none;
}
.searchIcon{
  position: absolute;
  top: 30%;
  left: 10px;
}
.caretIcon{
  padding: 10px 4px;
  border-left: 1px solid #EDEDED;
  background-color:#F6F6F6;
  border-top-right-radius:inherit;
  border-bottom-right-radius: inherit;
  font-size:1em;
  color: #828282;
  cursor:pointer;
}
.searchInput{
  width: 100%;
  position:relative;
  height: 40px;
  display: flex;
  flex-direction: row;
  font-size: inherit;
  border:${(props) =>
    props.showOption ? "1px solid" + props.hoverColor : "1px solid #E2E2E2"};
  border-radius: 4px;

  &:hover{
    border:${(props) => "1px solid" + props.hoverColor};
    box-shadow: 0 2px 6px #eee;
  }
}
.inputField{
  height: 100%;
  width: 100%;
  font-size: 0.98em;
  font-family: inherit;
  letter-spacing: 0.05em;
  background-color:#FFFFFF;
  border: none;
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
  outline:none;
  &::-webkit-search-cancel-button {
    height: 10px;
    width: 10px;
    position:relative;
    right:5px;  
    background-image: url(${CloseIcon});
    -webkit-appearance: none;
    cursor:pointer;
  }

}
.multipleOptionContainer{
  border:1px solid #ffffff;
  border-radius:8px;
  margin-top:5px;
  box-shadow:0px 2px 10px #00000029;
  position:absolute;
  width:100%;
  background-color:#ffffff;
  z-index:5;
}
.unorderList{
  margin:10px 10px 10px 0px;
  min-height:25px;
  max-height: 200px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 3px;
    background-color: #ffffff;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #bbb9b9;
    border-radius: 20px;
  }
  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }

}
.listData{
display:flex;
align-items:center;
padding:7px 0 7px 10px;
cursor:pointer;
}

.personImage{
  height:${(props) =>
    props.square === undefined ? "40px" : props.square.height};
  width:${(props) =>
    props.square === undefined ? "40px" : props.square.width};
  border-radius:${(props) =>
    props.square === undefined ? "50%" : props.square.borderRadius}
}
.nameContainer{
  padding-left:8px
}

.designationLabel{
  font-size:1.1em;
 
}
.close{
  position: absolute;
  overflow:hidden;
  right: 9%;
  top: 32%;
  font-size: 14px;
  color:#707070;
  cursor:pointer;
}

`;

class SearchSelector extends Component {
  searchContainer = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      selected: "",
      showOptions: false,
      index: -1,
      activeOption: "",
      selectedIndex: "",
      clicked: true,
      optionList: [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    const update = {};
    if (props.options !== state.optionList) {
      update.optionList = props.options;
      update.options = props.options;
    }
    if (props.value !== undefined && props.value !== state.selected) {
      update.selected = props.value;
      update.activeOption = "";
      update.selectedIndex = "";
    }
    return update;
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    console.log(this.state.options)
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  searchInputHandler = (e) => {
    this.setState({
      selected: e.target.value,
      showOptions: true,
      selectedIndex: "",
      clicked: false,
    });
    this.props.onChangeInput(e);
  };

  selectedOption = (index) => {
    let optionObject = this.state.options[index];
    let name = optionObject.firstName
      ? (optionObject.firstName || "") +
          " " +
          `${optionObject.middleName || ""}` +
          " " +
          (optionObject.lastName || "") || ""
      : optionObject.name;
    this.setState({
      selected: name,
      index: index,
      showOptions: false,
      selectedIndex: index,
      clicked: true,
    });
    this.props.onChange(this.state.options[index]);
  };

  handleClickOutside = (event) => {
    if (
      this.searchContainer.current &&
      !this.searchContainer.current.contains(event.target)
    ) {
      this.setState({ showOptions: false, selected: "" });
    }
  };

  isClicked = () => {
    this.setState({ showOptions: true });
  };

  keybordKeyHandler = (e) => {
    let idx;
    if (e.keyCode === 40) {
      idx = this.state.index + 1;
      if (idx < this.state.options.length) {
        this.setState({ index: idx });
        let target = document.getElementById(idx + "selectorElement");
        target.parentNode.scrollTop = target.offsetTop;
      } else {
        idx = this.state.options.length - 1;
      }
    }
    if (e.keyCode === 38) {
      idx = this.state.index - 1;
      if (idx >= 0) {
        this.setState({ index: idx });
        let target2 = document.getElementById(idx + "selectorElement");
        target2.parentNode.scrollTop = target2.offsetTop;
      } else {
        idx = 0;
      }
    }
    if (e.keyCode === 13) {
      if (this.state.index !== null && this.state.index !== -1) {
        let optionObject = this.state.options[this.state.index];
        let name = optionObject.firstName
          ? (optionObject.firstName || "") +
              " " +
              `${optionObject.middleName || ""}` +
              " " +
              (optionObject.lastName || "") || ""
          : optionObject.name;

        this.setState({
          selected: name,
          showOptions: false,
          selectedIndex: this.state.index,
          index: -1,
          clicked: true,
        });
        return this.props.onChange(this.state.options[this.state.index]);
      } else {
        return this.props.onChange(e.target.value);
      }
    }
  };

  caretHandler = () => {
    this.setState({ showOptions: !this.state.showOptions });
  };
  onMouseOverHandler = (e) => {
    this.setState({ index: e });
  };
  onMouseLeaveHandler = () => {
    this.setState({ index: -1 });
  };
  render() {
    return (
      <StyledDiv
        ref={this.searchContainer}
        hoverColor={this.props.style.color.hover}
        showOption={this.state.showOptions}
        square={this.props.style.square}
        status={this.state.selected}
      >
        <div className="searchSelectorContainer">
          <div className="searchInput" onKeyDown={this.keybordKeyHandler}>
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
                value={this.state.selected}
                onChange={this.searchInputHandler}
                type="search"
                name="search"
                placeholder={this.props.placeHolder}
                autoComplete="off"
              />
            </div>
            <div className="caretIcon" onClick={this.caretHandler}>
              <CaretDownOutlined
                style={{
                  transform: this.state.showOptions ? "rotate(180deg)" : "",
                  transition: "0.5s,transform 0.3s ease",
                }}
              />
            </div>
          </div>
          {(this.state.options.length && (
            <div
              className="multipleOptionContainer"
              style={{
                display:
                  this.state.showOptions && this.state.selected ? "" : "none",
              }}
            >
              <div id="list" className="unorderList">
                {this.state.options.map((element, index) => {
                  let name = element.firstName
                    ? (element.firstName || "") +
                        " " +
                        `${element.middleName || ""}` +
                        " " +
                        (element.lastName || "") || ""
                    : element.name;
                  return (
                    <div
                      key={index}
                      id={index + "selectorElement"}
                      className="listData"
                      onMouseDown={() => this.selectedOption(index)}
                      onMouseOver={() => this.onMouseOverHandler(index)}
                      onMouseLeave={this.onMouseLeaveHandler}
                      style={{
                        backgroundColor:
                          this.state.selectedIndex === index
                            ? this.props.style.color.selectedBg
                            : this.state.index === index
                            ? this.props.style.color.optionHover
                            : "",
                        color:
                          this.state.selectedIndex === index
                            ? "#ffffff"
                            : "#303030",
                      }}
                    >
                      <img
                        src={
                          element.img || element.profilePicture || DefaultPic
                        }
                        className="personImage"
                        alt="pic"
                      />
                      <div className="nameContainer">
                        <div className="nameLabel">
                          <label
                            style={{
                              fontFamily: this.state.clicked
                                ? "Open Sans Semibold"
                                : "",
                            }}
                          >
                            {(name &&
                              name.substring(0, this.state.selected.length)),"" ||
                              ""}
                          </label>
                          <label style={{ fontFamily: "Open Sans Semibold" }}>
                            {(name &&
                              name.substring(
                                this.state.selected.length,
                                name.length
                              )),"" ||
                              ""}
                          </label>
                        </div>
                        <div
                          className="designationLabel"
                          style={{
                            color:
                              this.state.selectedIndex === index
                                ? "#ffffff"
                                : "#767676",
                            display:
                              element.userName === undefined ? "none" : "",
                          }}
                        >
                          {element.userName}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )) ||
            ""}
        </div>
      </StyledDiv>
    );
  }
}

export default SearchSelector;
