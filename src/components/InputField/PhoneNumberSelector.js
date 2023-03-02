import React, { Component } from "react";
import CountryCodeSelector from "./EditCountryCodeSelector";
export default class PhoneNumberSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverActive: false,
      color: {
        hover: "",
      },
      enter: false,
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

  render() {
    return (
      <div
        style={{
          fontSize: "inherit",
          fontFamily: "inherit",
          color: "inherit",
        }}
        id={this.props.id || ""}
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
                codeSelected={this.props.code || ""}
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
              maxLength={13}
              minLength={4}
              onMouseMove={this.mouseOverHandler}
              onMouseLeave={this.mouseLeaveHandler}
              onFocus={this.onFocusHandler}
              onBlur={this.blurHandler}
              onChange={this.props.onChange}
              placeholder={this.props.placeHolder}
              tabIndex="0"
              value={this.props.number || ""}
              type="text"
              style={{
                width: "100%",
                height: "36px",
                borderRadius: "3px",
                fontSize: "1em",
                outline: "none",
                border: "none",
                padding:
                  this.state.selectedCode === "" ? "0 15px 0 15px" : "0px",
                letterSpacing: "0.03em",
                color: "inherit",
                backgroundColor: "#F7F7F751",
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
