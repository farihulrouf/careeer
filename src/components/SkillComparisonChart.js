import React, { Component } from "react";
import CustomizedXAxisTick from "./CustomizedXAxisTick.js";
import CustomizedBarLabel from "./CustomizedBarLabel";
import styled from "styled-components";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  display,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomSquare = styled.div`
  width: 16px;
  height: 16px;
  background: ${(props) => props.background};
  margin-right: 15px;
  border-radius: 4px;
`;

const Div = styled.div`
  .chart-legend {
    font-size: 1em;
    display: flex;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    padding: 0px 15%;
  }
  .legend-label {
    display: flex;
    margin: 0 10px;
  }
`;

class SkillComparisonChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  dataFormater = (number) => {
    if (number === 100) {
      return "C1";
    } else if (number === 200) {
      return "C2";
    } else if (number === 300) {
      return "C3";
    } else if (number === 0) {
      return number;
    }
  };

  toolTipData = (value, name, props) => {
    return [
      name === "gainedSkillsPercentage"
        ? props.payload.gainedSkills
        : props.payload.requiredSkills,
      name === "gainedSkillsPercentage" ? "Present Skills" : "Required Skills"
    ];
  };

  render() {
    console.log(this.props.skillsChartData, "skillchard")
    return (
      <>
        {this.props.skillsChartData && (
          <Div
            style={{
              color: "#303030",
              fontFamily: "Open Sans Regular",
              height: "inherit",
              width: "inherit",
            }}
          >
          <div
              style={{
                color: "#303030",
                fontFamily: "Open Sans Regular",
                height: this.props.height || "300px",
                width: "inherit",
              }}
            >
             <ResponsiveContainer>
                  <BarChart
                  width={300}
                  height={300}
                  data={this.props.skillsChartData}
                  margin={{ top: 30, right: 100, left: 0, bottom: 10 }}
                  barSize={30}
                >
                  <CartesianGrid vertical={false} stroke="#c1c1c1" />
                  <XAxis
                    dataKey="skillType"
                    height={60}
                    width={30}
                    tick={<CustomizedXAxisTick />}
                    interval={0}
                    axisLine={{ stroke: "#c1c1c1", strokeWidth: 0 }}
                  />
                  <YAxis
                    ticks={[0, 100, 200, 300]}
                    tickFormatter={this.dataFormater}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: "#F4F4FE" }}
                    wrapperStyle={{ top: -50, left: 0 }}
                    contentStyle={{
                      color: "#303030",
                      fontFamily: "Open Sans Semibold",
                    }}
                    itemStyle={{ color: "#303030", fontSize: "0.875em" }}
                    formatter={(value, name, props) =>
                      this.toolTipData(value, name, props)
                    }
                  />
                 <Bar
                    dataKey="gainedSkillsPercentage" 
                    stackId="a"
                    fill="#C6B1FC"
                    radius={[4, 4, 0, 0]}
                  /> 
                  <Bar
                    dataKey="requiredSkillsPercentage"
                    stackId="a"
                    fill="#EDE6FE"
                    label={
                      <CustomizedBarLabel {...this.props.skillsChartData} />
                    }
                  />
                </BarChart>
              </ResponsiveContainer>
            </div> 
            <div className="chart-legend">
              <div className="legend-label">
                <CustomSquare background="#C6B1FC" />
                Present Skills
              </div>
              <div className="legend-label">
                <CustomSquare background="#EDE6FE" />
                Required Skills1
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 15%",
                fontSize: "14px",
              }}
            >
              <div>C3 = Expert</div>
              <div>C2 = Intermediate</div>
              <div>C1 = Beginner</div>
            </div> 
          </Div>
        )}
      </>
    );
  }
}

export default SkillComparisonChart;
