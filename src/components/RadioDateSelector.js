import React, { Component } from "react";
import styled from "styled-components";
import DateInput from "./InputField/DateInput";

const Div = styled.div`
  .radio-title {
    font-size: 1em;
    text-transform: capitalize;
    padding-bottom: 8px;
  }
  .sub-title {
    display: flex;
    color: #767676;
  }
  .radio-button {
    width: 18px;
    height: 18px;
    background: white;
    border: 1px solid #ff808b;
    border-radius: 50%;
    display: flex;
    align-items: center;
    padding: 3px;
    outline: none;
    cursor: pointer;
    margin-right: 10px;
  }
  .radio-button-container {
    display: flex;
    align-items: center;
  }
`;

const Active = styled.span`
  background: ${(props) => (props.status ? "#ff808b" : "#fff")};
  width: 10px;
  height: 10px;
  border-radius: inherit;
`;

class RadioDateSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: this.props.value || "", selectedDate: null };
  }

  render() {
    let { selectedDate } = this.state;
    let { value, required, error } = this.props;
    return (
      <Div>
        <div className="radio-title">{this.props.label || ""}</div>
        <div className="sub-title">
          <div className="radio-button-container">
            <button
              className="radio-button"
              onClick={() => this.props.onChange("lifeTime")}
            >
              <Active status={String(value).toLowerCase().includes("life")} />
            </button>
            <span style={{ marginRight: 20 }}> Life Time</span>
          </div>
          <div className="radio-button-container">
            <button
              className="radio-button"
              onClick={() => this.props.onChange(selectedDate)}
            >
              <Active status={!String(value).toLowerCase().includes("life")} />
            </button>
            Choose Date
          </div>
        </div>
        {!String(value).toLowerCase().includes("life") && (
          <div style={{ marginTop: 20 }}>
            <DateInput
              label={null}
              required={(value && (value ? false : required)) || "//"}
              startYear={this.props.startYear || 1950}
              endYear={this.props.endYear || 2020}
              value={typeof value !== "string" ? value : selectedDate}
              dateBorderValid={error || false}
              monthBorderValid={error || false}
              yearBorderValid={error || false}
              onView={1990}
              onChange={(e) => {
                this.setState({ selectedDate: e }, () =>
                  this.props.onChange(this.state.selectedDate)
                );
              }}
              style={{
                color: {
                  hover: "#ff808b",
                  selectedBg: "#ff808b",
                  optionHover: "#F8C8CE",
                  selectedFont: "#ffffff",
                },
              }}
            />
          </div>
        )}
      </Div>
    );
  }
}

export default RadioDateSelector;
