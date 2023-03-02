import React, { Component } from "react";
import "antd/dist/antd.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import FormInput from "../../../components/form_input";
import Button from "../../../components/Button";
import { decryptData } from "../../../utils/encryptDecrypt";
import { withRouter } from "react-router";

const styles = {
  loginForm: {
    lineHeight: "20px",
    display: "grid",
    gridRowGap: "10px",
  },
  loginContainer: {
    width: "100%",
    fontSize: "14px",
    color: "#303030",
    paddingBottom: "5px",
  },
  forgotContainer: {
    display: "flex",
    color: "#767676",
    fontSize: "14px",
    justifyContent: "space-between",
  },
  passwordContainer: {
    width: "100%",
    fontSize: "14px",
    color: "#303030",
  },
  forgotpasswordLabel: {
    color: "#767676",
    fontSize: "14px",
    cursor: "pointer",
  },
  loginFooter: {
    display: "flex",
    justifyContent: "center",
    color: "#767676",
  },
};
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  isSelectClick = () => {
    this.setState({ isSelect: !this.state.isSelect });
  };
  componentDidMount() {
    let session = decryptData(localStorage.session);
    if (session) {
      this.props.history.goBack();
    }
  }
  render() {
    return (
      <div style={styles.loginForm}>
        <div style={styles.loginContainer}>
          <FormInput
            label="Email address"
            value={this.props.email}
            borderValid={this.props.emailBorderValid}
            placeHolder="Enter Email Address"
            onChange={this.props.emailHandler}
            onKeyPress={this.props.handleEnterPress}
            style={{
              color: {
                hover: "#FF808B",
              },
            }}
          />
          <span
            style={{
              opacity: this.props.emialMsgValid ? "1" : "0",
              visibility: this.props.emialMsgValid ? "visible" : "hidden",
              fontSize: "12px",
              color: "red",
              transition: "opacity 0.4s",
            }}
          >
            Invalid Email
          </span>
        </div>
        <div style={styles.passwordContainer}>
          <FormInput
            label="Password"
            value={this.props.password}
            borderValid={this.props.passwordBorderValid}
            placeHolder="*********"
            type="password"
            onChange={this.props.passwordHandler}
            onKeyPress={this.props.handleEnterPress}
            style={{
              color: {
                hover: "#FF808B",
              },
            }}
          />
          <span
            style={{
              opacity: this.props.passwordBorderValid ? "1" : "0",
              visibility: this.props.passwordBorderValid ? "visible" : "hidden",
              fontSize: "12px",
              color: "red",
              transition: "opacity 0.4s",
            }}
          >
            Empty Password
          </span>
        </div>
        <div style={styles.forgotContainer}>
          <div onClick={this.isSelectClick}>
            <span
              style={{
                fontSize: "14px",
                cursor: "pointer",
                color: this.state.isSelect ? "#FF808B" : "#CACACA",
              }}
            >
              <FontAwesomeIcon
                icon={this.state.isSelect ? faCheckSquare : faSquare}
              />
            </span>
            <label
              style={{
                paddingLeft: "8px",
                color: "#767676",
                fontSize: "1em",
                fontWeight: "500",
                letterSpacing: "0.02em",
                cursor: "pointer",
              }}
            >
              Remember me
            </label>
          </div>
          <div>
            <span
              style={styles.forgotpasswordLabel}
              onClick={this.props.forgot}
            >
              Forgot password?
            </span>
          </div>
        </div>
        <div id="logIn" onClick={this.props.loginHandler}>
          {!this.props.loggingIn && (
            <Button
              notAllValid={this.props.notAllValid}
              label={"Login"}
              styles={{
                color: "#ffffff",
                backgroundColor: "#FF808B",
                border: "#FF808B",
                height: "40px",
              }}
              onClick={this.props.loginFormHandler}
            />
          )}
          {this.props.loggingIn && (
            <Button
              label="please wait.."
              styles={{
                color: "#ffffff",
                backgroundColor: "#FF808B",
                border: "#FF808B",
                height: "40px",
              }}
              onClick={async () => {}}
            />
          )}
        </div>
        <div style={styles.loginFooter}>
          Don't have an account?&nbsp;
          
          <span style={{ color: "#FF808B", cursor: "pointer" }} onClick={this.props.forgot}>Sign Up</span>
        </div>
      </div>
    );
  }
}
export default withRouter(LoginForm);
