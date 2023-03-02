import React, { Component } from "react";
import "../assets/css/CountryCodeSelector.css";
import { CaretDownOutlined } from "@ant-design/icons";
import CountryCodes from "./CountryCodes";
import SearchIcon from "../assets/images/search.svg";
export default class DropDownSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: Math.random(),
      value: "",
      style: {
        color: {
          hover: "#ff808b",
        },
      },
      inputHover: false,
      clickInput: false,
      showOptions: false,
      selectedCode: this.props.selectedCountryCode,
      activeOption: "",
      countryCodes: this.props.countryCodes,
      selected: "",
      hover: false,
      color: {
        hover: "",
        selectedBg: "",
        optionHover: "",
        selectedFont: "",
      },
    };
  }
  componentDidMount() {
    this.setState({
      color: {
        hover:
          this.props.style &&
          this.props.style.color &&
          this.props.style.color.hover
            ? this.props.style.color.hover
            : "#ed5796",
        selectedBg:
          this.props.style &&
          this.props.style.color &&
          this.props.style.color.selectedBg
            ? this.props.style.color.selectedBg
            : "#f4b1d1",
        optionHover:
          this.props.style &&
          this.props.style.color &&
          this.props.style.color.optionHover
            ? this.props.style.color.optionHover
            : "#ffeaf4",
        selectedFont:
          this.props.style &&
          this.props.style.color &&
          this.props.style.color.selectedFont
            ? this.props.style.color.selectedFont
            : "#303030",
      },
      selectedCode: this.props.codeSelected,
    });
  }

  clickHandler = (e) => {
    e.preventDefault();
    this.setState({ showOptions: false, hover: false });
  };
  exitHandler = () => {
    this.setState({ showOptions: false, hover: false });
  };
  mouseOverHandler = () => {
    this.setState({ hover: true });
  };
  inputMouseLeaveHandler = () => {
    this.setState({ inputHover: false, clickInput: false });
  };
  inputMouseOverHandler = () => {
    this.setState({ inputHover: true });
  };
  inputClickHandler = () => {
    this.setState({
      clickInput: true,
    });
  };
  mouseLeaveHandler = () => {
    this.setState({ hover: false });
  };
  showOptionsHandler = (e) => {
    e.preventDefault();
    this.setState({
      showOptions: !this.state.showOptions,
    });
  };
  optionMouseLeaveHandler = () => {
    this.setState({
      showOptions: false,
    });
  };
  countryCodeHandler = (index) => {
    this.setState(
      {
        selectedCode: this.state.countryCodes[index].dial_code,
        showOptions: false,
      },
      () => this.props.countryCodeSelector(this.state.selectedCode)
    );
  };
  clickHandler = () => {
    this.setState({
      showOptions: false,
    });
  };
  inputHandler = (e) => {
    let value = parseInt(e.target.value, 10);
    let array = this.props.countryCodes;
    let filtered = this.props.countryCodes;
    if (Number.isInteger(value) && !/^\+/.test(e.target.value.charAt(0))) {
      filtered = array.filter((element) =>
        element.dial_code
          .slice(1, element.dial_code.length)
          .startsWith(e.target.value)
      );
    } else if (/^\+/.test(e.target.value)) {
      filtered = array.filter((element) =>
        element.dial_code.startsWith(e.target.value)
      );
    } else {
      let incomming = e.target.value.toLowerCase();
      filtered = array.filter((element) =>
        element.name.toLowerCase().startsWith(incomming)
      );
    }
    this.setState({
      value: e.target.value,
      countryCodes: filtered,
    });
  };
  render() {
    const className = {
      multipleSelector: {
        width: "inherit",
        height: "100%",
        position: "relative",
        outline: "none",
        borderRadius: "3px",
        color: "inherit",
      },
      selectorField: {
        fontFamily: "Open Sans Regular",
        borderLeftRadius: "inherit",
        height: "100%",
        width: "54px",
        cursor: "pointer",
        backgroundColor: "#FCFCFC",
        borderRight: "1px solid #E2E2E2",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        fontSize: "14px",
        color: "inherit",
        outline: "none",
      },
      selectedDisplay: {
        flex: 1,
        fontSize: "1em",
        display: "flex",
        justifyContent: "center",
        color: "inherit",
      },
      iconContainer: {
        paddingRight: "6px",
      },
      iconCaret: {
        color: "#868686",
      },
      iconActivator: {
        transition: "0.2s,transform 0.20s ease",
        transform: this.state.showOptions ? "rotate(180deg)" : "none",
      },
    };
    return (
      <div style={className.multipleSelector} tabIndex="0">
        <div
          style={className.selectorField}
          onClick={this.showOptionsHandler}
          onMouseOver={this.mouseOverHandler}
          onMouseLeave={this.mouseLeaveHandler}
          tabIndex="0"
          id="selectorField"
        >
          <div style={className.selectedDisplay}>{this.props.codeSelected}</div>
          <div style={className.iconContainer}>
            <div style={className.iconActivator}>
              <CaretDownOutlined style={className.iconCaret} id="iconCaret" />
            </div>
          </div>
        </div>
        <div
          onMouseLeave={this.optionMouseLeaveHandler}
          style={{
            transition: this.state.showOptions ? "all 0.18s ease 0.1s " : "",
            visibility: this.state.showOptions ? "visible" : "hidden",
            position: "absolute",
            zIndex: 1,
            top: "40pxz",
            display: "flex",
            flexDirection: "column",
            width: "320px",
            height: "220px",
            borderRadius: "3px",
            background: "#FFFFFF",
            boxShadow: "0px 0px 8px 0 #ccc0c0",
          }}
        >
          <img
            src={SearchIcon}
            alt="icon"
            style={{ position: "absolute", top: "13px", left: "12px" }}
          />
          <input
            onMouseOver={this.inputMouseOverHandler}
            onMouseLeave={this.inputMouseLeaveHandler}
            onFocus={this.inputClickHandler}
            type="text"
            value={this.state.value}
            onChange={this.inputHandler}
            placeholder="Search"
            style={{
              flex: 0.2,
              width: "100%",
              borderRadius: "3px",
              outline: "none",
              paddingLeft: "40px",
              border:
                this.state.clickInput || this.state.inputHover
                  ? "1px solid" + this.state.color.hover
                  : "1px solid #E2E2E2",
            }}
          />
          <div
            style={{ flex: 1, width: "100%", overflowY: "auto" }}
            className="code-list"
          >
            {this.state.countryCodes.map((ele, index) => (
              <CountryCodes
                style={this.state.style}
                key={index}
                country={ele}
                onClick={() => this.countryCodeHandler(index)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
