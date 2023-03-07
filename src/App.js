import React from "react";
import ElCarreiraWeb from "./core/routes/ElCarreiraWeb";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import LoginPage from "./pages/loginPage/index";
import NotAuthorisedPage from "./notAuthorised";
import RegisterOrganisation from "./pages/CareerPath/RegisterOrganisation";
//import Dashnnew from './pages/Dashnew/index'
//import EmployeeCareerPath from "./components/EmployeeCareerPath";
import Career from "./pages/CareerPath/Career";
import "./App.css";
import "antd/dist/antd.css";
import "./assets/css/OpenSans.css";
import { Spin, message } from "antd";
import styled from "styled-components";
let history = createBrowserHistory();

const StyledSpinContainer = styled.div`
  display: flex;
  height: 100%;
  .spinner {
    display: flex;
    height: 100%;
    width: 100%;
    flex: 1;
  }
  & .ant-spin-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
`;

function App() {
  const [isLoading, setLoading] = React.useState(false);
  const toggleLoading = (status = false) => {
    setLoading(status);
  };
  const scrollToElement = (selector) => {
    let element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = (query) => {
    if (query) {
      let element = document.querySelector(query);
      element.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };
  const ScrollToEnd = (query) => {
    if (query) {
      if (query.includes(".")) {
        let element = document.getElementsByClassName(query.replace(".", ""));
        element[0].scrollTop = element[0].scrollHeight;
      } else if (query.includes("#")) {
        let element = document.getElementById(query.replace("#", ""));
        element.scrollToTop = element.scrollHeight;
      }
    } else {
      window.scrollTo({
        top: window.innerHeight,
        left: 0,
        behavior: "smooth",
      });
    }
  };
  document.toggleLoading = toggleLoading;
  document.scrollToElement = scrollToElement;
  document.message = message;
  return (
    
    <StyledSpinContainer>
      <Spin
        spinning={isLoading}
        tip="Loading..."
        wrapperClassName="spinner"
        style={{ maxHeight: "100%" }}
      >
        <div style={{ height: "100%", width: "100%" }}>
          <Router history={history}>
            <Switch>
              <Route exact={true} path="/login">
                <LoginPage />
              </Route>
              <Route  path="/dashboard">
                <Career />
              </Route>
              <Route path="/createaudit">
                <RegisterOrganisation />
              </Route>
              <Route path="/notauthorised">
                <NotAuthorisedPage />
              </Route>
              <Route path="/">
                <ElCarreiraWeb
                  scrollToTop={scrollToTop}
                  ScrollToEnd={ScrollToEnd}
                />
              </Route>
            </Switch>
          </Router>
        </div>
      </Spin>
    </StyledSpinContainer>
  );
}

export default App;
