import React, { Component } from "react";
import Hide from "../assets/images/hide.svg";
import Show from "../assets/images/show.svg";
import CountryCodeSelector from "./EditCountryCodeSelector";
export default class Form_Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverActive: false,
      color: {
        hover: "",
      },
      enter: false,
      showPassword: false,
      selectedCode: "",
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
      },
    });
  }
  mouseOverHandler = () => {
    this.setState({ hoverActive: true });
  };
  mouseLeaveHandler = () => {
    this.setState({ hoverActive: false });
  };
  onFocusHandler = () => {
    this.setState({ enter: true });
  };
  blurHandler = () => {
    this.setState({ enter: false });
  };
  passwordHandler = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  dropDisabled = (e) => {
    e.preventDefault();
    return false;
  };

  render() {
    return (
      <div
        style={{
          fontSize: "inherit",
          fontFamily: "inherit",
          color: "inherit",
        }}
      >
        <div
          style={{
            pointerEvents: this.props.disabled ? "none" : "auto",
            opacity: this.props.disabled ? 0.6 : 1,
          }}
        >
          <div
            style={{
              fontSize: "1em",
              textTransform: "capitalize",
              paddingBottom: "6px",
              letterSpacing: "0.02em",
            }}
          >
            {this.props.label}
            {this.props.msgValid && (
              <sup
                style={{
                  color: "red",
                  fontSize: "1.5em",
                  position: "relative",
                  top: "-4px",
                }}
              >
                *
              </sup>
            )}
          </div>
          {this.props.type === "password" ? (
            <div style={{ position: "relative" }}>
              <input
                onMouseMove={this.mouseOverHandler}
                onMouseLeave={this.mouseLeaveHandler}
                onFocus={this.onFocusHandler}
                onBlur={this.blurHandler}
                onChange={this.props.onChange}
                onDragStart={this.dropDisabled}
                onDrop={this.dropDisabled}
                onKeyPress={
                  this.props.onKeyPress !== undefined
                    ? this.props.onKeyPress
                    : undefined
                }
                placeholder={this.props.placeHolder}
                tabIndex="0"
                type={this.state.showPassword ? "text" : "password"}
                value={this.props.value}
                style={{
                  width: "100%",
                  height: "36px",
                  borderRadius: "3px",
                  fontSize: "1em",
                  outline: "none",
                  border:
                    this.state.hoverActive || this.state.enter
                      ? "1px solid" + this.state.color.hover
                      : this.props.borderValid
                      ? "1px solid red"
                      : "1px solid #E2E2E2",
                  padding: "0 15px",
                  letterSpacing: "0.03em",
                  color: "inherit",
                  backgroundColor: "#F7F7F751",
                }}
              />
              <div
                onClick={this.passwordHandler}
                style={{
                  position: "absolute",
                  top: "18%",
                  right: "15px",
                  cursor: "pointer",
                }}
              >
                <img
                  src={this.state.showPassword ? Show : Hide}
                  alt="password"
                  style={{ height: 15, width: 20 }}
                />
              </div>
            </div>
          ) : (
            <div>
              {this.props.label === "phone Number" && (
                <div
                  style={{
                    display: "flex",
                    borderRadius: "3px",
                    border:
                      this.state.hoverActive || this.state.enter
                        ? "1px solid" + this.state.color.hover
                        : this.props.borderValid
                        ? "1px solid red"
                        : "1px solid #E2E2E2",
                  }}
                >
                  <div
                    style={{
                      flex: 0.1,
                    }}
                  >
                    <CountryCodeSelector
                      countryCodeSelector={this.props.countryCodeSelector}
                      countryCodes={this.props.countryCodes}
                      codeSelected={this.props.codeSelected}
                      style={{
                        color: {
                          hover: "#ff808b",
                          selectedBg: "#8359C1",
                          optionHover: "#C4B0E2",
                          selectedFont: "#ffffff",
                        },
                      }}
                    />
                  </div>
                  <input
                    maxlength="14"
                    minLength="4"
                    onMouseMove={this.mouseOverHandler}
                    onMouseLeave={this.mouseLeaveHandler}
                    onFocus={this.onFocusHandler}
                    onBlur={this.blurHandler}
                    onDragStart={this.dropDisabled}
                    onDrop={this.dropDisabled}
                    onChange={this.props.onChange}
                    placeholder={this.props.placeHolder}
                    tabIndex="0"
                    value={this.props.value}
                    type={this.props.type !== "" ? this.props.type : "text"}
                    style={{
                      width: "100%",
                      height: "36px",
                      borderRadius: "3px",
                      fontSize: "1em",
                      outline: "none",
                      border: "none",
                      padding:
                        this.state.selectedCode === ""
                          ? "0 15px 0 15px"
                          : "0px",
                      letterSpacing: "0.03em",
                      color: "inherit",
                      backgroundColor: "#F7F7F751",
                    }}
                  />
                </div>
              )}
              {this.props.label === "alternate Phone Number" && (
                <div
                  style={{
                    display: "flex",
                    borderRadius: "3px",
                    border:
                      this.state.hoverActive || this.state.enter
                        ? "1px solid" + this.state.color.hover
                        : this.props.borderValid
                        ? "1px solid red"
                        : "1px solid #E2E2E2",
                  }}
                >
                  <div
                    style={{
                      flex: 0.1,
                    }}
                  >
                    <CountryCodeSelector
                      countryCodeSelector={this.props.countryCodeSelector}
                      countryCodes={this.props.countryCodes}
                      codeSelected={this.props.codeSelected}
                      style={{
                        color: {
                          hover: "#ff808b",
                          selectedBg: "#8359C1",
                          optionHover: "#C4B0E2",
                          selectedFont: "#ffffff",
                        },
                      }}
                    />
                  </div>
                  <input
                    maxlength="14"
                    minLength="4"
                    onMouseMove={this.mouseOverHandler}
                    onMouseLeave={this.mouseLeaveHandler}
                    onFocus={this.onFocusHandler}
                    onBlur={this.blurHandler}
                    onDragStart={this.dropDisabled}
                    onDrop={this.dropDisabled}
                    onChange={this.props.onChange}
                    placeholder={this.props.placeHolder}
                    tabIndex="0"
                    value={this.props.value}
                    type={this.props.type !== "" ? this.props.type : "text"}
                    style={{
                      width: "100%",
                      height: "36px",
                      borderRadius: "3px",
                      fontSize: "1em",
                      outline: "none",
                      border: "none",
                      padding:
                        this.state.selectedCode === ""
                          ? "0 15px 0 15px"
                          : "0px",
                      letterSpacing: "0.03em",
                      color: "inherit",
                      backgroundColor: "#F7F7F751",
                    }}
                  />
                </div>
              )}
              {this.props.label !== "phone Number" &&
                this.props.label !== "alternate Phone Number" && (
                  <input
                    onMouseMove={this.mouseOverHandler}
                    onMouseLeave={this.mouseLeaveHandler}
                    onFocus={this.onFocusHandler}
                    onBlur={this.blurHandler}
                    onChange={this.props.onChange}
                    onDragStart={this.dropDisabled}
                    onDrop={this.dropDisabled}
                    placeholder={this.props.placeHolder}
                    tabIndex="0"
                    value={this.props.value === null ? "" : this.props.value}
                    onKeyPress={
                      this.props.onKeyPress !== undefined
                        ? this.props.onKeyPress
                        : undefined
                    }
                    type={this.props.type !== "" ? this.props.type : "text"}
                    style={{
                      flex: 1,
                      width: "100%",
                      height: "36px",
                      borderRadius: "3px",
                      fontSize: "1em",
                      outline: "none",
                      border:
                        this.state.hoverActive || this.state.enter
                          ? "1px solid" + this.state.color.hover
                          : this.props.borderValid
                          ? "1px solid red"
                          : "1px solid #E2E2E2",
                      padding: "0 15px",
                      letterSpacing: "0.03em",
                      color: "inherit",
                      backgroundColor: "#F7F7F751",
                    }}
                  />
                )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
