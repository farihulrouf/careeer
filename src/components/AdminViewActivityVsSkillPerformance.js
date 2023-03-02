import React from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ResponsiveContainer,
} from "recharts";
import { message } from "antd";
import { getActivities } from "../core/apiClient/organization/organizationClient";
import { decryptData } from "../utils/encryptDecrypt";

import "../assets/css/ActivityVsPerformance.css";

const styles = {
  chartMainDiv: {
    display: "flex",
    height: "100%",
  },
  chartDiv: {
    flex: 1,
    height: "100%",
  },
  chartHeader: {
    display: "flex",
    alignItems: "center",
    paddingLeft: "20px",
    paddingTop: "14px",
  },
  title: {
    width: "50%",
    paddingLeft: "2%",
    color: "#303030",
    fontSize: "16px",
    fontFamily: "Open Sans SemiBold",
  },
  duration: {
    textAlign: "right",
    display: "flex",
  },
  chartContents: {
    fontSize: "14px",
    fontFamily: "Open Sans Regular",
    color: "#303030",
    width: "100%",
    height: 245,
    paddingLeft: "1%",
    margin: "3% 0",
  },
  chartFooter: {
    display: "flex",
    paddingLeft: "12%",
    paddingTop: "5%",
  },
  skills: {
    display: "flex",
    alignItems: "center",
    marginRight: "10%",
  },
  skillDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "#FF6C98",
    marginRight: "10px",
  },
  activityDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "#FFCA32",
    marginRight: "10px",
  },
  activity: {
    display: "flex",
    alignItems: "center",
  },
};

export default class UserProfileActivitySkillsChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: [
        { name: "1 Yr", value: 12 },
        { name: "6 mon", value: 6 },
        { name: "3 mon", value: 3 },
      ],
      noOfMonthsToShow: 6,
      activityData: [
        {
          month: "",
          activity: 0,
        },
      ],
    };
  }

  componentDidMount=()=>{
    this.loadActivities(6)
  }
  loadActivities = async (durationInMonths) => {
    let orgId = decryptData(localStorage.orgId),
      employeeId = decryptData(localStorage.employeeId);
    let token = decryptData(localStorage.token);
    if (orgId && employeeId) {
      try {
        let response = await getActivities(
          orgId,
          "employee",
          this.props.selectedUser || employeeId,
          durationInMonths,
          {
            Authorization: token,
          }
        );
        if (response.status === 200) {
          let data = response.data;
          if(data.length > 0){
            this.setState({ activityData: data })
          }
        }
      } catch (error) {
        message.error("Unable to fetch details, please try after sometime");
      }
    }
  };
  render() {
    return (
      <div style={styles.chartMainDiv}>
        <div style={styles.chartDiv}>
          <div style={styles.chartHeader}>
            <img src={require("../assets/images/chart.svg")} alt="chart" />
            <div style={styles.title}>
              Activity
            </div>
            <div style={styles.duration}>
              {this.state.buttons.map((btn, id) => {
                return (
                  <div
                    key={id}
                    onClick={() => {
                      this.setState({ noOfMonthsToShow: btn.value },
                        ()=>this.loadActivities(btn.value));
                    }}
                    style={{
                      border:
                        this.state.noOfMonthsToShow === btn.value
                          ? "1px solid#FF808B"
                          : "",
                      color:
                        this.state.noOfMonthsToShow === btn.value
                          ? "#FF808B"
                          : "#767676",
                      borderRadius:
                        this.state.noOfMonthsToShow === btn.value ? "20px" : "",
                      width: "60px",
                      padding: "3px 10px 3px 10px",
                      cursor: "pointer",
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "Open Sans Regular",
                    }}
                  >
                    {btn.name}
                  </div>
                );
              })}
            </div>
          </div>
          <div style={styles.chartContents}>
            <ResponsiveContainer>
              <AreaChart
                width={730}
                height={250}
                data={this.state.activityData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="coloractivity"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#FFECA4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#FFD33C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} />
                <YAxis
                  axisLine={false}
                  allowDecimals={false}
                />
                <CartesianGrid vertical={false} horizontal={false} />

                <Tooltip cursor={false} />
                <Area
                  dataKey="activity"
                  stroke="#FFCA32"
                  fillOpacity="20px"
                  fill="url(#coloractivity)"
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
            <div style={styles.chartFooter}>
              <div style={styles.activity}>
                <div style={styles.activityDot}></div>
                <div
                  style={{
                    color: "#303030",
                    fontSize: "14px",
                    fontFamily: "Open Sans Regular",
                  }}
                >
                  Activity
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
