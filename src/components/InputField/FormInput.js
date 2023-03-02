import React, { Component } from "react";
import Hide from "../../assets/images/hide.svg";
import Show from "../../assets/images/show.svg";
export default class FormInput extends Component {
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
      value: this.props.value || "",
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
  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.value) {
      return {
        value: props.value,
      };
    }
    return null;
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
    this.setState({ enter: false, hoverActive: false });
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
              display: this.props.label ? "" : "none",
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
                onDragStart={this.dropDisabled}
                onDrop={this.dropDisabled}
                onChange={(event) => {
                  if (this.props.onChange) {
                    this.props.onChange(event);
                  }
                  this.setState({ value: event.target.value });
                }}
                onKeyPress={
                  this.props.onKeyPress !== undefined
                    ? this.props.onKeyPress
                    : undefined
                }
                placeholder={this.props.placeHolder}
                tabIndex="0"
                type={this.state.showPassword ? "text" : "password"}
                value={this.state.value || ""}
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
                  backgroundColor: "#fcfcfc",
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
          ) : this.props.type === "textArea" ? (
            <textarea
              onMouseMove={this.mouseOverHandler}
              onMouseLeave={this.mouseLeaveHandler}
              onFocus={this.onFocusHandler}
              onBlur={this.blurHandler}
              onDragStart={this.dropDisabled}
              onDrop={this.dropDisabled}
              onChange={(event) => {
                if (this.props.onChange) {
                  this.props.onChange(event);
                }
                this.setState({ value: event.target.value });
              }}
              id="textArea"
              rows={this.props.rows || "3"}
              placeholder={this.props.placeHolder}
              value={this.state.value || ""}
              style={{
                padding: "10px 15px",
                marginRight: "5px",
                outline: "none",
                color: "#303030",
                borderRadius: "3px",
                background: "#fcfcfc",
                resize: "none",
                width: "100%",
                border:
                  this.state.hoverActive || this.state.enter
                    ? "1px solid" + this.state.color.hover
                    : this.props.borderValid
                    ? "1px solid red"
                    : "1px solid #E2E2E2",
              }}
            ></textarea>
          ) : (
            <input
              onMouseMove={this.mouseOverHandler}
              onMouseLeave={this.mouseLeaveHandler}
              onFocus={this.onFocusHandler}
              onBlur={this.blurHandler}
              onDragStart={this.dropDisabled}
              onDrop={this.dropDisabled}
              onChange={(event) => {
                if (this.props.onChange) {
                  this.props.onChange(event);
                }
                this.setState({ value: event.target.value });
              }}
              placeholder={this.props.placeHolder}
              tabIndex="0"
              value={this.state.value || ""}
              onKeyPress={this.props.onKeyPress ? this.props.onKeyPress : null}
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
                backgroundColor: "#fcfcfc",
              }}
            />
          )}
        </div>
      </div>
    );
  }
}
