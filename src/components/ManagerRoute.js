import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../assets/css/OpenSans.css";
import HeaderNavigation from "./Header_Navigation";
import UserManagement from "./UserManagementMain";
import Leaderboard from "../pages/leaderboard/ManagerLeaderboardRoute";
import Approval from "../pages/Approval/Manager";
import ManagerGoal from "../pages/goals/Manager";
import Teams from "../components/teams/ManagerTeamsPage";
import ManagerDashboard from "../components/dashboard/manager/ManagerDashboardPage";
import ManagerFeedback from "../pages/Feedback/ManagerFeedbackRoute";
import { decryptData } from "../utils/encryptDecrypt";
import managerassessment from "./managerAssessmentlist"
import Demo from "./demo"
export default function AdminRoute(props) {
  useEffect(() => loadConfiguration(), []);
  const [configurationHidden, setConfigurationHidden] = useState([]);
  const loadConfiguration = () => {
    const configurationHidden = JSON.parse(
      decryptData(localStorage.configurationHidden)
    ).manager
      ? JSON.parse(decryptData(localStorage.configurationHidden)).manager.hidden
      : [];
    setConfigurationHidden(configurationHidden);
  };
  return (
    <Router>
      <div style={{ height: "100%" }}>
        <Switch>
          <Route path="/">
            <HeaderNavigation view="manager" {...props} />
            <Route path="/manager/dashboard">
              <ManagerDashboard />
            </Route>
            <Route path="/manager/leaderboard">
              <Leaderboard userRole="Manager" />
            </Route>
            <Route path="/admin/user-Management" component={UserManagement} />
            <Route path="/manager/teams" component={Teams} />
            {!configurationHidden.includes("Goals") && (
              <Route path="/manager/learning-goals" component={ManagerGoal} />
            )}
            {!configurationHidden.includes("Feedback") && (
              <Route path="/manager/feedback">
                <ManagerFeedback />
              </Route>
            )}
            {!configurationHidden.includes("Approval") && (
              <Route path="/manager/approval" component={Approval} />
            )}
             {!configurationHidden.includes("Analytics") && (
              <Route path="/manager/reports" component={Demo} />
            )}
            {/* <Route path="/manager/analytics/assessment" component={managerassessment} />  
            <Route path="/manager/analytics/activities" component={manageractivatydetails} />   */}
          </Route>
          
        </Switch>
      </div>
    </Router>
  );
}
