import React, { Component } from "react";
import FormInput from "../../../components/form_input";
import Button from "../../../components/Button";

const className = {
  createPasswordContainer: {
    display: "grid",
    gridRowGap: "25px",
    fontFamily: " Open Sans Regular",
  },
  title: {
    fontSize: "24px",
    color: "#303030",
    fontFamily: "Open Sans Semibold",
  },
  createPasswrdDescription: {
    padding: "8px 0 15px 0",
    color: "#707070",
    fontSize: "14px",
  },
  passwordContainer: {
    width: "100%",
    fontSize: "14px",
    color: "#303030",
  },
};
var count = 0;
class CreatePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPasswordMsgValid: false,
      newPasswordBorderValid: false,
      validPassword: false,
      newPassword: "",
      confirmedPassword: "",
      notAllValid: true,
    };
  }
  newPasswordHandler = (e) => {
    let password = e.target.value;
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,50}$/;
    const result = pattern.test(password);
    if (count > 0) {
      let result1 = password.localeCompare(this.state.confirmedPassword);
      if (result) {
        if (result1 === 0) {
          this.setState({
            notAllValid: false,
            newPassword: password,
            newPasswordMsgValid: false,
            newPasswordBorderValid: false,
            validPassword: true,
            confirmPasswordBorderValid: false,
            confirmPasswordMsgValid: false,
          });
        } else {
          this.setState({
            notAllValid: true,
            newPassword: password,
            newPasswordMsgValid: false,
            newPasswordBorderValid: false,
            validPassword: true,
            confirmPasswordBorderValid: true,
            confirmPasswordMsgValid: true,
          });
        }
      } else {
        if (result1 === 0) {
          this.setState({
            notAllValid: true,
            newPassword: password,
            newPasswordMsgValid: true,
            newPasswordBorderValid: true,
            validPassword: false,
            confirmPasswordBorderValid: false,
            confirmPasswordMsgValid: false,
          });
        } else {
          this.setState({
            notAllValid: true,
            newPassword: password,
            newPasswordMsgValid: true,
            newPasswordBorderValid: true,
            validPassword: false,
            confirmPasswordBorderValid: true,
            confirmPasswordMsgValid: true,
          });
        }
      }
    } else {
      if (result) {
        this.setState({
          notAllValid: true,
          newPassword: password,
          newPasswordMsgValid: false,
          newPasswordBorderValid: false,
          validPassword: true,
        });
      } else {
        this.setState({
          notAllValid: true,
          newPasswordMsgValid: true,
          newPasswordBorderValid: true,
          validPassword: false,
        });
      }
    }
  };
  confirmPasswordHandler = (e) => {
    count++;
    let password = e.target.value;
    let result = this.state.newPassword.localeCompare(password);
    if (result === 0) {
      if (this.state.validPassword) {
        this.setState({
          notAllValid: false,
          confirmedPassword: password,
          confirmPasswordBorderValid: false,
          confirmPasswordMsgValid: false,
        });
      } else {
        this.setState({
          notAllValid: true,
          confirmedPassword: password,
          confirmPasswordBorderValid: false,
          confirmPasswordMsgValid: false,
        });
      }
    } else {
      this.setState({
        notAllValid: true,
        confirmedPassword: password,
        confirmPasswordBorderValid: true,
        confirmPasswordMsgValid: true,
      });
    }
  };
  render() {
    return (
      <div style={className.createPasswordContainer}>
        <div>
          <label style={className.title}>{this.props.title}</label>
          <div style={className.createPasswrdDescription}>
            {this.props.subtitle}
          </div>
        </div>
        <div style={className.passwordContainer}>
          <FormInput
            label={this.props.InputField.label1}
            onChange={this.newPasswordHandler}
            borderValid={this.state.newPasswordBorderValid}
            placeHolder="********"
            type="password"
            style={{
              color: {
                hover: "#FF808B",
              },
            }}
          />
          {this.state.newPasswordMsgValid && (
            <span style={{ color: "red", fontSize: "12px" }}>
              Must have atleast 8 characters, with one uppercase, one lowercase
              and one special character
            </span>
          )}
        </div>
        <div style={className.passwordContainer}>
          <FormInput
            label={this.props.InputField.label2}
            onChange={this.confirmPasswordHandler}
            borderValid={this.state.confirmPasswordBorderValid}
            placeHolder="********"
            type="password"
            style={{
              color: {
                hover: "#FF808B",
              },
            }}
          />
          {this.state.confirmPasswordMsgValid && (
            <span style={{ color: "red", fontSize: "12px" }}>
              The two passwords that you entered do not match!
            </span>
          )}
        </div>
        <div
          onClick={this.state.notAllValid ? null : this.props.next}
          style={{
            width: "102px",
            fontSize: 14,
            fontFamily: "Open Sans Semibold",
          }}
        >
          <Button
            label={this.props.buttonName}
            notAllValid={this.state.notAllValid}
            styles={{
              color: "#ffffff",
              backgroundColor: "#FF808B",
              border: "#FF808B",
              height: "40px",
            }}
          />
        </div>
      </div>
    );
  }
}
export default CreatePassword;
