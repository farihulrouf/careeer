import React, { Component } from "react";
import InputField from "../../../../components/InputField";
import styled from "styled-components";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import PopUpDisplay from "../../../../components/PopUpDisplay";

const Div = styled.div`
  .education-title-container {
    display: flex;
    justify-content: space-between;
    margin: 0 5%;
    margin-right: 6%;
  }
  .education-title {
    font-size: 1.5em;
    font-family: "Open Sans Semibold";
  }

  .education-form-main-container {
    min-height: 322px;
  }
  .education-sub-container {
    margin: 3% 5%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 15%;
    grid-auto-rows: 95px;
  }
  .add-icon-container {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-family: "Open Sans Regular";
  }
  .add-icon {
    margin-right: 5px;
    font-size: 1em;
  }
  .education-inputs {
    margin: 2% 0;
  }
  .cancel-icon {
    margin-top: 5px;
    margin-right: 5%;
    font-size: 1em;
    cursor: pointer;
  }
`;
class EducationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      educationDetails: this.props.educationDetails || {
        degree: "",
        specialization: "",
        completionYear: "",
        course: "",
        institute: "",
      },
      deleteForm: false,
      deleteIndex: "",
    };
  }

  deletFormHandler = (values, deleteIndex, details) => {
    if (details.id) {
      this.setState({ deleteForm: true, deleteIndex });
    } else {
      this.props.cancelFormHandler(values, deleteIndex);
    }
  };

  popUpHandler = (selected) => {
    if (selected) {
      this.props.cancelFormHandler("educationDetails", this.state.deleteIndex);
    }
    this.setState({ deleteForm: false });
  };

  render() {
    return (
      <Div>
        {this.state.deleteForm && (
          <PopUpDisplay
            subTitle="Are you sure to delete this ?"
            width="max-content"
            popUpHandler={this.popUpHandler}
          />
        )}
        <div className="education-title-container">
          <div className="education-title">Education</div>
          <div
            className="add-icon-container"
            onClick={() =>
              this.props.addFormHandler(
                "educationDetails",
                {
                  degree: "",
                  specialization: "",
                  completionYear: "",
                  course: "",
                  institute: "",
                },
                "#education-form"
              )
            }
          >
            <div className="add-icon">
              <PlusCircleOutlined />
            </div>
            <div className="add-title"> Add Education</div>
          </div>
        </div>
        {this.props.educationDetails.map((eachDetails, eachDetailsIndex) => (
          <div
            className="education-form-main-container"
            id={"education-form" + eachDetailsIndex}
            key={eachDetailsIndex + 1}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                borderTop: "1px solid #E2E2E2",
              }}
            >
              <div
                className="cancel-icon"
                onClick={() =>
                  this.deletFormHandler(
                    "educationDetails",
                    eachDetailsIndex,
                    eachDetails
                  )
                }
              >
                <MinusCircleOutlined />
              </div>
            </div>
            <div className="education-sub-container">
              {this.props.educationComponent.map(
                (eachComponent, eachComponentIndex) => (
                  <div className="education-inputs" key={eachComponentIndex}>
                    <InputField
                      id={eachComponent.fieldName + eachDetailsIndex}
                      label={eachComponent.label}
                      placeHolder={eachComponent.placeHolder}
                      type={eachComponent.type}
                      selector={eachComponent.selector || null}
                      value={eachDetails[eachComponent["fieldName"]]}
                      option={eachComponent.option || null}
                      disabled={eachComponent.disabled || false}
                      startYear={eachComponent.startYear}
                      endYear={eachComponent.endYear}
                      error={
                        eachComponent.error &&
                        eachComponent.errorIndex.includes(eachDetailsIndex)
                      }
                      required={eachComponent.required || false}
                      onChange={(e) =>
                        this.props.handleInputForm(
                          e,
                          eachComponent["fieldName"],
                          eachDetailsIndex,
                          eachComponentIndex,
                          "educationDetails",
                          "educationComponent"
                        )
                      }
                      dropDownScroll={this.props.dropDownScroll}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </Div>
    );
  }
}

export default EducationDetails;
