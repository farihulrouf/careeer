import React, { Component } from "react";
import InputField from "../../../../components/InputField";
import styled from "styled-components";

const Div = styled.div`
  .professional-title {
    font-size: 1em;
    font-family: "Open Sans Semibold";
  }
  .professional-container {
    font-size: 0.875em;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 15%;
    grid-row-gap: 10%;
    margin: 3% 0;
  }
`;

class ProfessionalDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      professionalDetails: this.props.professionalDetails || [],
      professionalComponent: this.props.professionalComponent || [],
    };
  }

  render() {
    const professionalDetails = this.state.professionalDetails;
    return (
      <Div>
        <div className="professional-title">Professional Details</div>
        <div className="professional-container">
          {this.state.professionalComponent.map(
            (eachComponent, eachComponentIndex) => (
              <InputField
                id={eachComponent.fieldName}
                label={eachComponent.label}
                placeHolder={eachComponent.placeHolder}
                type={eachComponent.type}
                selector={eachComponent.selector}
                key={eachComponentIndex}
                value={professionalDetails[eachComponent["fieldName"]]}
                option={eachComponent.option || null}
                disabled={eachComponent.disabled || false}
                error={eachComponent.error || false}
                required={eachComponent.required || false}
                countryCodeSelector={(e) =>
                  this.props.countryCodeSelector(
                    e,
                    eachComponent["fieldName"],
                    eachComponentIndex
                  )
                }
                onChange={(e) =>
                  this.props.handleInputForm(
                    e,
                    eachComponent["fieldName"],
                    eachComponentIndex,
                    "professionalDetails",
                    "professionalComponent"
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

export default ProfessionalDetails;
