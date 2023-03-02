import React from "react";
import Button from "../../../components/Button";
import FormInput from "../../../components/form_input";
const className = {
  forgotContainer: {
    color: "#303030",
    fontFamily: "Open Sans Regular",
    fontSize: "14px",
  },
  title: {
    fontSize: "24px",
    color: "#303030",
    fontFamily: "Open Sans Semibold",
  },
  discriptionLabel: {
    padding: "10px 0 40px 0",
    color: "#707070",
    fontSize: "14px",
  },
  backToLoginContainer: {
    textAlign: "right",
    padding: "20px 0",
  },
  backToLoginLabel: {
    color: "#FF808B",
    textDecoration: "underline",
    cursor: "pointer",
  },
};

const ForgotPassword = (props) => {
  console.log(props)

  return (
    <div>
      <div style={className.forgotContainer}>
        <div style={className.title}>{props.title}</div>
        <div style={className.discriptionLabel}>{props.subtitle}</div>
        <div>
          <FormInput
            label={props.InputField.label}
            placeHolder={props.InputField.placeHolder}
            value={props.forgotEmail}
            borderValid={props.validForgotEmail}
            onChange={props.forgotemailHandler}
            style={{
              color: {
                hover: "#FF808B",
              },
            }}
          />
        </div>
        <div
          style={{
            visibility: props.validForgotEmail ? "visible" : "hidden",
            opacity: props.validForgotEmail ? "1" : "0",
            transition: "opacity 0.3s",
            fontSize: "12px",
            color: "red",
          }}
        >
          Invalid Email
        </div>
        <div style={className.backToLoginContainer}>
          <label onClick={props.back} style={className.backToLoginLabel}>
            {props.buttonName.label1}
          </label>
        </div>
        <div
          onClick={props.next}
          style={{ width: 104, fontFamily: "Open Sans Semibold" }}
        >
          <Button
            label={props.buttonName.label2}
            styles={{
              color: "#ffffff",
              backgroundColor: "#FF808B",
              border: "#F39CA6",
              height: "40px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
