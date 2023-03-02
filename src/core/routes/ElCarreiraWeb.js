import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
import EmployeeOnboarding from "../../pages/EmployeeOnboardingFlow/index.js";
import Admin from "../../components/AdminRoute";
import Manager from "../../components/ManagerRoute";
import HeaderNavigation from "../../components/Header_Navigation";
import Training from "../../pages/Training";
import "../../assets/css/root.css";
import Dashboard from "../../pages/Dashboard/Employee";
import PageNotFound from "../../pageNotFound";
import CareerPath from "../../components/EmployeeCareerPath";
import Leaderboard from "../../pages/leaderboard/EmployeeLeaderboardRoute";
import Goals from "../../pages/goals/EmployeeGoalsPage";
import Profile from "../../pages/Dashboard/Employee/Profile";
import EmployeeFeedback from "../../pages/Feedback/EmployeeFeedback";
import GoalsFeedback from "../../components/goals/employee/ViewFeedbacksPage";
import { currentUser } from "../../core/apiClient/auth";
import { decryptData } from "../../utils/encryptDecrypt";
import Activites from "../../pages/Activites";
import { logout } from "../apiClient/auth"
import AdminAdddesigntiondetails from "../../components/AddAdminDesigntion"
let count = 1
class ElCarreiraWeb extends Component {
  state = { proffessional: "", profileUrl: "" };
  componentDidMount() {
    
    let session = decryptData(localStorage.session);
    if (session) {
      this.setInterval();
      this.getCurrentEmployeeDetails();
      this.checkTheRoleBasedAccess();
    } else {
      this.props.history.push("/login");
    }
  }
  componentDidUpdate(prevProps) {
    let pathname = this.props.location.pathname;
    if (prevProps.location.pathname !== pathname) {
      this.getCurrentEmployeeDetails();
      this.checkTheRoleBasedAccess();
    }
  }
  getCurrentEmployeeDetails = async () => {
    try {
      document.toggleLoading(true);
      let token = decryptData(localStorage.token);
      let { data, status } = await currentUser(token);
      if (status >= 200 && status < 300) {
        this.setState({ currentUser: data });
      } else {
        document.message.error(
          "Your session is expired! Please login again to continue."
        );
        localStorage.clear();
        this.props.history.push("/login");
      }
      document.toggleLoading();
    } catch (error) {
      console.log("error", error);
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };
  checkTheRoleBasedAccess = () => {
    let pathname = this.props.location.pathname;
    let role = decryptData(localStorage.role);
    let authRoles = decryptData(localStorage.authRoles) || "";
    if (role === "admin") {
      if (pathname.includes("employee")) {
        if (!authRoles.toLowerCase().includes("employee"))
          this.props.history.push("/notauthorised");
      } else if (pathname.includes("manager")) {
        if (!authRoles.toLowerCase().includes("manager"))
          this.props.history.push("/notauthorised");
      }
    } else if (role === "manager") {
      if (pathname.includes("employee")) {
        if (!authRoles.toLowerCase().includes("employee"))
          this.props.history.push("/notauthorised");
      } else if (pathname.includes("admin")) {
        if (!authRoles.toLowerCase().includes("admin"))
          this.props.history.push("/notauthorised");
      }
    } else {
      let isOnBoardingCompleted = decryptData(
        localStorage.isOnBoardingCompleted
      );
      if (pathname.includes("manager")) {
        if (!authRoles.toLowerCase().includes("manager"))
          this.props.history.push("/notauthorised");
      } else if (pathname.includes("admin")) {
        if (!authRoles.toLowerCase().includes("admin"))
          this.props.history.push("/notauthorised");
      } else if (pathname.includes("/employee/onboarding")) {
        if (isOnBoardingCompleted === "true")
          window.open("/employee/dashboard", "_self");
      } else if (
        pathname.includes("/employee") &&
        !pathname.includes("onboarding")
      ) {
        if (isOnBoardingCompleted === "false") {
          window.open("/employee/onboarding", "_self");
        }
      }
    }
  };
  getRoute = () => {
    const pathname = window.location.pathname
    if(!pathname.includes("/admin/user-management/user")){
      localStorage.setItem("rowsPerPage", 15);
      localStorage.setItem("page", 1);
      localStorage.setItem("searchValue", "");
      localStorage.setItem("filterValue", JSON.stringify([]));
    }
    if(!pathname.includes("/admin/user-management/admin")){
      localStorage.setItem("adminRowsPerPage", 15);
      localStorage.setItem("adminPage", 1);
      localStorage.setItem("adminSearchValue", "");
      localStorage.setItem("adminFilterValue", JSON.stringify([]));
    }
    let role = decryptData(localStorage.role);
    let route = "/employee/onboarding";
    if (role === "admin") route = "/admin/dashboard";
    else if (role === "manager") route = "/manager/dashboard";
    else {
      let isOnBoardingCompleted = decryptData(
        localStorage.isOnBoardingCompleted
      );
      if (isOnBoardingCompleted === "true") route = "/employee/dashboard";
    }
    return route;
  };

  profileChangeHandler = (proffessional) => {
    this.setState({ proffessional });
  };
  profilePicUpload = (profileUrl) => {
    this.setState({ profileUrl });
  };
  getViewDetailsRoute = (type) => {
    let route = "/employee/dashboard";
    if (type === "training") route = "/employee/training";
    else if (type === "leaderboard") route = "/employee/leaderboard";
    else if (type === "careerPath") route = "/employee/career-path";
    else route = "/employee/goals";
    window.open(route, "_self");
  };
  setInterval = () => {
    var timer = setInterval( async() => {
      count += 1;
      if (count===7200) {
        clearInterval(timer);
        document.message.error("Time Out");
        try {
          let token = decryptData(localStorage.token);
          localStorage.clear();
          if (token) {
            await logout(token);
          }
          window.open("/login", "_self");
        } catch (error) {
          window.open("/login", "_self");
        }
      }
    }, 1000);
  };

  checkUserActivity=()=>{
    count = 1
  }
  render() {
    return (
      <div 
        style={{ height: "100%" }} className="web-route"
        onMouseOver={()=>this.checkUserActivity()}
      >
        <Router>
          <Switch>
            <Redirect exact={true} from="/" to={this.getRoute()}></Redirect>
            <Route exact path="/employee/onboarding" {...this.props}>
              <EmployeeOnboarding />
            </Route>
            <Route path="/404">
              <PageNotFound />
            </Route>
            <Route path="/employee">
              <HeaderNavigation
                view="employee"
                {...this.props}
                {...this.state}
              />
              <Route exact path="/employee/dashboard">
                <Dashboard {...this.props} {...this} {...this.state} />
              </Route>
              <Route exact path="/employee/dashboard/profile">
                <Profile
                  {...this.props}
                  {...this}
                  {...this.state}
                  viewProfileFrom={"Dashboard"}
                />
              </Route>
              <Route path="/employee/training" component={Training} />

              <Route path="/employee/career-path">
                <CareerPath {...this.props} />
              </Route>
              <Route exact path="/employee/feedback">
                <EmployeeFeedback {...this.props} />
              </Route>
              <Route exact path="/employee/learning-goals">
                <Goals {...this.props} {...this} {...this.state} />
              </Route>
              <Route exact path="/employee/goals/feedback">
                <GoalsFeedback {...this.props} />
              </Route>
              <Route exact path="/employee/goals/profile">
                <Profile
                  {...this.props}
                  {...this}
                  {...this.state}
                  viewProfileFrom={"Goals"}
                />
              </Route>
              <Route path="/employee/leaderboard">
                <Leaderboard {...this.props} role="Employee" />
              </Route>
              <Route path="/employee/activities">
                <Activites />
              </Route>
            </Route>
            <Route path="/admin">
              <Admin {...this.props} />
            </Route>
            <Route path="/manager">
              <Manager {...this.props} />
            </Route>
            <Redirect to="/404"></Redirect>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default withRouter(ElCarreiraWeb);
