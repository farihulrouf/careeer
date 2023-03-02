import React, { Component } from "react";
import InputField from "../../../../components/InputField";

class SkillsDetails extends Component {
  render() {
    return (
      <div>
        <div style={{ fontSize: "1.5em", fontFamily: "Open Sans Semibold" }}>
          Skills
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridColumnGap: "20px",
            gridRowGap: "20px",
            marginTop: "4%",
            marginBottom: "10%",
          }}
        >
          {this.props.skillsComponent.map(
            (eachComponent, eachComponentIndex) => (
              <div
                key={eachComponentIndex}
                style={{ width: "80%", minHeight: "120px" }}
              >
                <InputField
                  id={eachComponent.fieldName + eachComponentIndex}
                  label={eachComponent.label}
                  title={eachComponent.title || ""}
                  allowCustomAddition={eachComponent.allowCustomAddition}
                  index={eachComponentIndex}
                  placeHolder={eachComponent.placeHolder}
                  type={eachComponent.type}
                  selector={eachComponent.selector || null}
                  handleAddCustomOption={(skill) =>
                    this.props.handleAddCustomSkill(
                      skill,
                      eachComponent.title.replace("Skills", "").trim()
                    )
                  }
                  option={eachComponent.option || null}
                  error={eachComponent.error || false}
                  handleDeleteOption={this.props.handleDeleteOption}
                  required={eachComponent.required || false}
                  value={
                    this.props.skillsdetails[eachComponent["fieldName"]] || []
                  }
                  onChange={(e) =>
                    this.props.handleInputForm(
                      e,
                      eachComponent["fieldName"],
                      eachComponentIndex
                    )
                  }
                />
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}

export default SkillsDetails;
