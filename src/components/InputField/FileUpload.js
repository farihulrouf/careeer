import React from "react";
import PinIcon from "../../assets/images/pin.svg";
import styled from "styled-components";
const StyledDiv = styled.div`
  background: #fdf3f4;
  border-radius: 4px;
  border: 1px solid #fdf3f4;
  height: 30px;
  width: 121px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    border: 1px solid #ff808b;
  }
`;
export default class fileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
    };
  }
  handleFileUpload = (file) => {
    this.setState({ file });
  };
  getFormattedFileName = (name) => {
    if (name.includes("/certificates/"))
      name = name.substring(
        name.indexOf("/certificates/") + "/certificates/".length,
        name.length
      );
    name =
      name.length > 17
        ? name.substring(0, 10) +
          "..." +
          name.substring(name.length - 6, name.length)
        : name;
    return name;
  };
  render() {
    let props = this.props;
    return (
      <div id={this.props.id || ""}>
        <div style={{ padding: "0 0 8px 0" }}>
          {props.label}
          {this.props.required && (
            <sup
              style={{
                color: "red",
                fontSize: "1.5em",
                position: "relative",
                top: "-4px",
                left: "4px",
              }}
            >
              *
            </sup>
          )}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border:
              this.props.error || this.props.borderValid ? "1px solid red" : "",
            borderRadius: 3,
          }}
        >
          <input
            type="file"
            accept={props.accept ? props.accept : "image/*"}
            style={{ display: "none" }}
            onChange={(event) => {
              if (props.onChange) props.onChange(event.target.files[0]);
              this.handleFileUpload(event.target.files[0]);
            }}
            onClick={(event) => {
              event.target.value = null;
            }}
            id={"fileUpload" + this.props.id}
            name={"fileUpload" + this.props.id}
          />
          <label htmlFor={"fileUpload" + this.props.id}>
            <StyledDiv>
              <img src={PinIcon} alt="pinIcon" />
              <span
                style={{
                  paddingLeft: 10,
                  fontSize: 12,
                  letterSpacing: "0.01em",
                }}
              >
                Choose File
              </span>
            </StyledDiv>
          </label>
          <div>
            <label
              htmlFor={"fileInput1"}
              id={"upload"}
              style={{
                marginLeft: 5,
                fontSize: "14px",
                color: "#767676",
                letterSpacing: "0.02em",
              }}
            >
              {this.props.value && typeof this.props.value === "string"
                ? this.getFormattedFileName(this.props.value)
                : this.state.file
                ? this.getFormattedFileName(this.state.file.name)
                : "No file Chosen"}
            </label>
          </div>
        </div>
      </div>
    );
  }
}
