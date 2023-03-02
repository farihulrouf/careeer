import React, { Component } from "react";
import FormInput from "./FormInput";
import FormSelector from "./FormSelector";
import { countryCodes } from "../../utils/CountryCodes";
import PhoneNumber from "./PhoneNumberSelector";
import SearchInput from "./SearchInput";
import GenderSelector from "./GenderSelector";
import DateInput from "./DateInput";
import RadioSelctor from "../RadioDateSelector";
import FileInput from "./FileUpload";
class InputField extends Component {
  render() {
    const { type, value, required } = this.props;
    return (
      <>
        {type === "selector" ? (
          <FormSelector
            {...this.props}
            onClick={this.props.onChange}
            msgValid={required || false}
            borderValid={this.props.error || false}
          />
        ) : type === "number" ? (
          <PhoneNumber
            {...this.props}
            countryCodes={countryCodes}
            msgValid={required || false}
            onChange={(e) => this.props.onChange(e.target.value)}
            number={value.number}
            code={value.code}
            borderValid={this.props.error || false}
            countryCodeSelector={this.props.countryCodeSelector || null}
          />
        ) : type === "tools" ? (
          <SearchInput
            {...this.props}
            title={this.props.title}
            label={this.props.label}
            msgValid={required || false}
            onClick={this.props.onChange}
            borderValid={this.props.error || false}
            placeholder={this.props.placeHolder}
          />
        ) : type === "gender" ? (
          <GenderSelector
            onClick={this.props.onChange}
            {...this.props}
            required={required || false}
          />
        ) : type === "date" ? (
          <DateInput
            {...this.props}
            required={required || false}
            startYear={this.props.startYear || 1950}
            endYear={this.props.endYear}
            value={value || "//"}
            dateBorderValid={this.props.dateBorderValid}
            monthBorderValid={this.props.monthBorderValid}
            yearBorderValid={this.props.yearBorderValid}
            onView={1990}
            dateInputHandler={(e) => this.props.onChange(e)}
            style={{
              color: {
                hover: "#ff808b",
                selectedBg: "#ff808b",
                optionHover: "#F8C8CE",
                selectedFont: "#ffffff",
              },
            }}
          />
        ) : type === "radio" ? (
          <RadioSelctor {...this.props} {...this} />
        ) : type === "file" ? (
          <FileInput {...this.props} />
        ) : (
          <FormInput
            {...this.props}
            onChange={(e) => this.props.onChange(e.target.value)}
            msgValid={required || false}
            borderValid={this.props.error || false}
          />
        )}
      </>
    );
  }
}

export default InputField;
