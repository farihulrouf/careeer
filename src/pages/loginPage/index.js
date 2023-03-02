import React, { Component, useEffect } from "react";
import RoleSelect from "./components/roleSelect";
import LoginForm from "./components/LoginForm";
import ForgotPassword from "./components/ForgotPassword";
import ForgotSent from "./components/ForgotSent";
import CreatePassword from "./components/CreatePassword";
import PasswordChanged from "./components/PasswordChanged";
import Logo from "../../assets/images/Social_HR_Logo.png";
import LoginPageImage from "../../assets/images/coverImage.svg";
import "../../assets/css/settings.css";
import Envelop from "../../assets/images/mail.svg";
import CheckIcon from "../../assets/images/tick.svg";

//import Dashboard from "./components/dashboard/admin/AdminDashboardPage";
import "../../assets/css/OpenSans.css";
import { login, loginWithSSO } from "../../core/apiClient/auth";
import { withRouter } from "react-router";
import { message } from "antd";
import { encryptData } from "../../utils/encryptDecrypt";

const className = {
  bgImageContainer: {
    backgroundImage: `url(${LoginPageImage})`,
    height: "100%",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  bgColorContainer: {
    background: "linear-gradient(to right,#8f8feee3,#5a59b9ed)",
    padding: "4% 5% 0% 5%",
    display: "flex",
    flexDirection: "column",
    fontSize: "14px",
    height: "100%",
    overflowY: "auto",
  },
  container: {
    flex: 1,
    borderRadius: "15px",
    display: "flex",
    fontFamily: "Open Sans Regular",
  },
  firstContainer: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    borderTopLeftRadius: "inherit",
    borderBottomLeftRadius: "inherit",
  },
  logoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "9%",
    height: "100%",
  },
  logoDescription: {
    fontSize: "1em",
    width: "85%",
    padding: "1% 15% 1% 0",
    color: "#535353",
    fontFamily: "Open Sans Regular",
  },
  imageContainer: {
    flex: 1,
    display: "flex",
    alignItems: "flex-end",
  },
  title: {
    fontSize: "24px",
    color: "#303030",
    fontFamily: "Open Sans Semibold",
  },
  discriptionLabel: {
    padding: "1% 0 10% 0",
    color: "#8B8B8B",
    fontSize: "14px",
  },
  roleContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "8%",
    paddingTop: "5%",
  },
  secondContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: "inherit",
    borderBottomRightRadius: "inherit",
  },
  LoginPageFooter: {
    display: "flex",
    margin: "1.4% 3.6% ",
    fontSize: "1em",
    fontFamily: "Open Sans Semibold",
    color: "#FFFFFF",
  },
};

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      selectedRole: "",
      isClicked: "login",
      email: "",
      password: "",
      passwordEntered: false,
      validateEmail: false,
      notAllValid: true,
      passwordBorderValid: false,
      emailBorderValid: false,
      emialMsgValid: false,
      forgotEmail: "",
      validForgotEmail: false,
      loggingIn: false,
    };
  }

  componentDidMount() {
    let page_url = new URL(window.location.href);
    let qs1 = page_url.searchParams.get("sso_demo");
    if (qs1 !== null) {
      console.log(qs1);
      this.setSession(JSON.parse(qs1));
    }
  }
  toggleSelection = (name) => {
    this.setState(
      {
        role: name,
      },
      () => this.checkEverythinEntered()
    );
  };
  linkHandler = (name) => {
    if (name === "next") {
      let validateEmail = this.validateEmail(this.state.forgotEmail);
      if (validateEmail) {
        this.setState({ isClicked: name });
      } else {
        this.setState({ isClicked: "forgot", validForgotEmail: true });
      }
    } else {
      this.setState({ isClicked: name });
    }
  };
  checkEmailEntered = (email) => {
    if (email.length > 0) {
      this.setState(
        {
          emialEntered: true,
        },
        () => this.checkEverythinEntered()
      );
    } else {
      this.setState(
        {
          emialEntered: false,
        },
        () => this.checkEverythinEntered()
      );
    }
  };
  emailHandler = (email) => {
    this.setState(
      {
        emailBorderValid: false,
        emialMsgValid: false,
        email: email.target.value,
      },
      () => this.checkEmailEntered(this.state.email)
    );
  };
  forgotemailHandler = (email) => {
    this.setState({
      validForgotEmail: false,
      forgotEmail: email.target.value,
    });
  };

  checkEverythinEntered = () => {
    if (
      this.state.emialEntered &&
      this.state.passwordEntered &&
      this.state.role
    ) {
      this.setState({
        notAllValid: false,
      });
    } else {
      this.setState({
        notAllValid: true,
      });
    }
  };
  checkPasswordEntered = (password) => {
    if (password.length > 0) {
      this.setState(
        {
          passwordEntered: true,
        },
        () => this.checkEverythinEntered()
      );
    } else {
      this.setState(
        {
          passwordEntered: false,
        },
        () => this.checkEverythinEntered()
      );
    }
  };
  passwordHandler = (password) => {
    this.setState(
      {
        passwordBorderValid: false,
        password: password.target.value,
      },
      () => this.checkPasswordEntered(this.state.password)
    );
  };
  validateEmail = (email) => {
    const pattern = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z\-.]+)\.([a-zA-Z]{2,5})$/;
    const result = pattern.test(email);
    if (result) {
      return true;
    } else {
      return false;
    }
  };
  validatePassword = (password) => {
    if (password !== "") {
      this.setState({
        passwordBorderValid: false,
      });
      return true;
    } else {
      this.setState({
        passwordBorderValid: true,
      });
      return false;
    }
  };
  loginHandler = () => {
    let emailValidation = this.validateEmail(this.state.email);
    let passwordValidation = this.validatePassword(this.state.password);
    if (emailValidation) {
      this.setState({
        emailBorderValid: false,
        emialMsgValid: false,
      });
    } else {
      this.setState({
        emailBorderValid: true,
        emialMsgValid: true,
      });
    }
    if (emailValidation && passwordValidation && this.state.role) {
      this.setState({
        selectedRole: this.state.role,
      });
    } else {
      if (this.state.role === "") {
        message.error("Select Role");
      }
      this.setState({
        notAllValid: true,
      });
    }
  };

  setSession = async (data) => {
    console.log(data);

    if (data.employee) {
      let configuration = {
        employee: { hidden: [] },
        manager: { hidden: [] },
        admin: { hidden: [] },
      };
      localStorage.setItem(
        "configurationHidden",
        encryptData(JSON.stringify(configuration))
      );
      // 	if (this.state.role === 'employee' && String(data.employee.onboardingCompleted)) {
      localStorage.setItem(
        "isOnBoardingCompleted",
        encryptData(String(data.employee.onboardingCompleted))
      );
      // 	}
      console.log("role", "employee");
      console.log("authRoles", JSON.stringify(data.employee.roles));
      console.log("session", JSON.stringify(data.session));
      console.log("employeeId", data.employee.id);
      console.log("orgId", data.employee.organizationId);
      console.log("token", data.session.token);
      console.log("rootTier", data.employee.rootTier);
      console.log("userId", data.employee.userId);
      localStorage.setItem("role", encryptData("employee"));
      localStorage.setItem(
        "authRoles",
        encryptData(JSON.stringify(data.employee.roles))
      );
      let role;
      if (
        data.employee.roles.includes("OrgAdmin") ||
        data.employee.roles.includes("Admin")
      ) {
        role = "admin";
      } else if (data.employee.roles.includes("Manager")) {
        role = "manager";
      } else if (data.employee.roles.includes("Employee")) {
        role = "employee";
      }
      localStorage.setItem("role", encryptData(role));
      localStorage.setItem(
        "session",
        encryptData(JSON.stringify(data.session))
      );
      localStorage.setItem("employeeId", encryptData(data.employee.id));
      localStorage.setItem("orgId", encryptData(data.employee.organizationId));
      localStorage.setItem("token", encryptData(data.session.token));
      localStorage.setItem(
        "rootTier",
        encryptData(data.employee.rootTier || "root")
      );
      localStorage.setItem("userId", encryptData(data.employee.userId));
      localStorage.setItem(
        "welComePopUpMsg",
        this.state.role === "employee" ? "true" : "false"
      );
      localStorage.setItem("rowsPerPage", 15);
      localStorage.setItem("page", 1);
      localStorage.setItem("searchValue", "");
      localStorage.setItem("filterValue", JSON.stringify([]));
      localStorage.setItem("adminRowsPerPage", 15);
      localStorage.setItem("adminPage", 1);
      localStorage.setItem("adminSearchValue", "");
      localStorage.setItem("adminFilterValue", JSON.stringify([]));
      this.props.history.push("/");
      message.success("Login success");
    } else {
      // message.error(JSON.stringify(data) + "=================");
    }
  };
  loginFormHandler = async () => {
    try {
      if (
        this.state.email !== "" &&
        this.state.password !== "" &&
        this.state.role !== ""
      ) {
        this.setState({ loggingIn: true });
        let { data, status } = await login({
          role: this.state.role,
          email: this.state.email,
          password: this.state.password,
        });
        this.setState({ loggingIn: false });
        if (status !== 200) message.error(data);
        else {
          if (data.employee) {
            let configuration = {
              employee: { hidden: [] },
              manager: { hidden: [] },
              admin: { hidden: [] },
            };
            localStorage.setItem(
              "configurationHidden",
              encryptData(JSON.stringify(configuration))
            );
            if (
              this.state.role === "employee" &&
              String(data.employee.onboardingCompleted)
            ) {
              localStorage.setItem(
                "isOnBoardingCompleted",
                encryptData(String(data.employee.onboardingCompleted))
              );
            }
            localStorage.setItem("role", encryptData(this.state.role));
            localStorage.setItem(
              "authRoles",
              encryptData(JSON.stringify(data.employee.roles))
            );
            localStorage.setItem(
              "session",
              encryptData(JSON.stringify(data.session))
            );
            localStorage.setItem("employeeId", encryptData(data.employee.id));
            localStorage.setItem(
              "orgId",
              encryptData(data.employee.organizationId)
            );
            localStorage.setItem("token", encryptData(data.session.token));
            localStorage.setItem(
              "rootTier",
              encryptData(data.employee.rootTier)
            );
            localStorage.setItem("userId", encryptData(data.employee.userId));
            localStorage.setItem(
              "welComePopUpMsg",
              this.state.role === "employee" ? "true" : "false"
            );
            localStorage.setItem("rowsPerPage", 15);
            localStorage.setItem("page", 1);
            localStorage.setItem("searchValue", "");
            localStorage.setItem("filterValue", JSON.stringify([]));
            localStorage.setItem("adminRowsPerPage", 15);
            localStorage.setItem("adminPage", 1);
            localStorage.setItem("adminSearchValue", "");
            localStorage.setItem("adminFilterValue", JSON.stringify([]));
            this.props.history.push("/");
            message.success("Login success");
          } else {
            // message.error(JSON.stringify(data) + "=================");
          }
        }
      }
    } catch (error) {
      document.message.error("Please try after sometime");
    }
  };
  handleEnterPress = (e) => {
    if (e.which === 13) {
      this.loginFormHandler();
    }
  };

  render() {
    return (
      <div style={className.bgImageContainer}>
        <div style={className.bgColorContainer}>
          <div style={className.container}>
            <div style={className.firstContainer}>
              <div style={className.logoContainer}>
                <div style={{ width: "100%", display: "contents" }}>
                  <img
                    src={Logo}
                    style={{ width: "190px", marginTop: "12%" }}
                    alt="icons"
                  />
                </div>
                <div style={className.imageContainer}>
                  <img
                    src={LoginPageImage}
                    style={{ height: "230px" }}
                    alt="a"
                  />
                </div>
              </div>
            </div>
            <div style={className.secondContainer} id="demo">
              <div style={{ width: "59.3%" }}>
                {this.state.isClicked === "login" && (
                  <div>
                    <div style={className.title}>Log In</div>
                    <div style={className.roleContainer}>
                      <div style={{ width: "32%" }}>
                        <RoleSelect
                          role="admin"
                          settings={{
                            checkInColor: "#FF808B",
                            fontSize: "12.5px",
                          }}
                          isSelected={this.state.role === "admin"}
                          onClick={() => this.toggleSelection("admin")}
                        />
                      </div>
                      <div style={{ width: "32%" }}>
                        <RoleSelect
                          role="Employee"
                          settings={{
                            checkInColor: "#FF808B",
                            fontSize: "12.5px",
                          }}
                          isSelected={this.state.role === "employee"}
                          onClick={() => {
                            this.toggleSelection("employee");
                          }}
                        />
                      </div>
                      <div style={{ width: "32%" }}>
                        <RoleSelect
                          role="Manager"
                          settings={{
                            checkInColor: "#FF808B",
                            fontSize: "12.5px",
                          }}
                          isSelected={this.state.role === "manager"}
                          onClick={() => {
                            this.toggleSelection("manager");
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <LoginForm
                        selectedRole={this.state.role}
                        loggingIn={this.state.loggingIn}
                        loginHandler={this.loginHandler}
                        loginFormHandler={this.loginFormHandler}
                        emailHandler={this.emailHandler}
                        passwordHandler={this.passwordHandler}
                        emailBorderValid={this.state.emailBorderValid}
                        emialMsgValid={this.state.emialMsgValid}
                        email={this.state.email}
                        handleEnterPress={this.handleEnterPress}
                        password={this.state.password}
                        passwordBorderValid={this.state.passwordBorderValid}
                        notAllValid={this.state.notAllValid}
                        forgot={() => this.linkHandler("forgot")}
                        role={this.state.role}
                      />
                    </div>
                  </div>
                )}
                {this.state.isClicked === "forgot" && (
                  <ForgotPassword
                    title="Forgot Password"
                    subtitle=" Please confirm your registered email address for the link to reset
               your password"
                    buttonName={{ label1: "Back to login", label2: "Next" }}
                    InputField={{
                      label: "Email address",
                      placeHolder: "Enter Email Address",
                    }}
                    forgotemailHandler={this.forgotemailHandler}
                    forgotEmail={this.state.forgotEmail}
                    validForgotEmail={this.state.validForgotEmail}
                    back={() => this.linkHandler("login")}
                    next={() => this.linkHandler("next")}
                  />
                )}
                {this.state.isClicked === "next" && (
                  <ForgotSent
                    icon={{ type: "svg", value: Envelop }}
                    title="Reset link sent successfully"
                    subtitle=" Please check your Email and click on the provided link to reset your
                 password"
                    buttonName=" Back to Login"
                    back={() => this.linkHandler("create new")}
                  />
                )}
                {this.state.isClicked === "create new" && (
                  <CreatePassword
                    title="Create New Password"
                    subtitle=" Please choose a new Password"
                    InputField={{
                      label1: "New Password",
                      label2: "Confirm Password",
                    }}
                    buttonName="Next"
                    next={() => this.linkHandler("success")}
                  />
                )}
                {this.state.isClicked === "success" && (
                  <PasswordChanged
                    title="Password changed successfully"
                    icon={{ type: "svg", value: CheckIcon }}
                    buttonName="Go to Login"
                    back={() => this.linkHandler("login")}
                  />
                )}
              </div>
            </div>
          </div>
          <div style={className.LoginPageFooter}>
            <span style={{ cursor: "pointer" }}>Help1</span>&emsp;&emsp;
            <span style={{ cursor: "pointer" }}>About</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginPage);
