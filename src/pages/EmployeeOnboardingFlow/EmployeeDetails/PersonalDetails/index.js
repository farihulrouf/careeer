import React, { Component } from "react";
import InputField from "../../../../components/InputField";
import styled from "styled-components";

const Div = styled.div`
  .personal-title {
    font-size: 1em;
    font-family: "Open Sans Semibold";
  }
  .personal-container {
    font-size: 0.875em;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 15%;
    grid-row-gap: 10%;
    margin: 3% 0;
  }
`;

class PersonalDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personalDetails: this.props.personalDetails || [],
      personalComponent: this.props.personalComponent || [],
    };
  }

  render() {
    let personalDetails = this.state.personalDetails;
    return (
      <Div>
        <div className="personal-title">Personal Details</div>
        <div className="personal-container">
          {this.state.personalComponent.map(
            (eachComponent, eachComponentIndex) => (
              <InputField
                {...eachComponent}
                id={eachComponent.fieldName}
                label={eachComponent.label}
                placeHolder={eachComponent.placeHolder}
                type={eachComponent.type}
                key={eachComponentIndex}
                startYear={eachComponent.startYear || null}
                endYear={eachComponent.endYear || null}
                selector={eachComponent.selector}
                value={personalDetails[eachComponent["fieldName"]]}
                option={eachComponent.option || null}
                disabled={eachComponent.disabled || false}
                error={eachComponent.error || false}
                required={eachComponent.required || false}
                onChange={(e) =>
                  this.props.handleInputForm(
                    e,
                    eachComponent["fieldName"],
                    eachComponentIndex,
                    "personalDetails",
                    "personalComponent"
                  )
                }
              />
            )
          )}
        </div>
      </Div>
    );
  }
}

export default PersonalDetails;
