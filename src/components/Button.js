import React, { Component } from "react";
class Button extends Component {
  state = { buttonHover: false };
  buttonHover = () => {
    this.setState({ buttonHover: true });
  };
  buttonHoverMove = () => {
    this.setState({ buttonHover: false });
  };

  render() {
    return (
      <button
        onMouseEnter={this.buttonHover}
        onMouseLeave={this.buttonHoverMove}
        onClick={this.props.onClick ? this.props.onClick : null}
        disabled={this.props.disabled}
        style={{
          cursor:
            this.props.disabled || this.props.notAllValid
              ? "not-allowed"
              : "pointer",
          width: "100%",
          fontFamily: "inherit",
          borderRadius: "4px",
          color: this.props.styles.color,
          fontSize: "inherit",
          margin: 0,
          padding: 0,
          backgroundColor: this.props.styles.backgroundColor,
          outline: "none",
          border: "1px solid" + this.props.styles.border,
          opacity:
            this.state.buttonHover ||
            this.props.disabled ||
            this.props.notAllValid
              ? 0.7
              : 1,
          height: this.props.styles.minHeight ? null : this.props.styles.height,
          minHeight: this.props.styles.minHeight || null,
        }}
      >
        {this.props.label}
      </button>
    );
  }
}

export default Button;
