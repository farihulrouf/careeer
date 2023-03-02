import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import styled from "styled-components";
const Div = styled.div`
  width: 100%;
  color: #303030;
  box-shadow: 1px 4px 12px #00000027;
  border-radius: 8px;
  height: inherit;
  padding: 3%;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  .title-container {
    display: flex;
  }
  .skill-title {
    flex: 1;
    font-family: Open Sans Semibold;
    font-size: 1em;
  }
  .year-filter {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    font-size: 0.8em;
  }
  .chart-main-container {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 0.7fr;
    margin-top: 3%;
  }

  .chart-container {
    display: flex;
    justify-content: center;
  }

  .skill-legend {
    font-size: 0.875em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 3em;
  }
  .individual-legend {
    display: flex;
    align-items: center;
  }
`;
const CustomRadius = styled.div`
  height: 15px;
  width: 15px;
  border-radius: 50%;
  margin-right: 15px;
  background: ${(props) => props.background};
`;

const AdminManagerDashboardSkillPerformance = (props) => {
  return (
    <Div>
      <div className="title-container">
        <div className="skill-title">Overall Skill Improvement</div>
        <div className="year-filter">
          {props.filterOption.map((eachvalue, index) => (
            <div
              onClick={() =>
                props.filterOptionHandler(eachvalue.label, eachvalue.months)
              }
              style={{
                color:
                  props.selectedFilter === eachvalue.label
                    ? "#FF808B"
                    : "#767676",
                margin: "0 0.275em",
                padding: "0.2em 0.575em",
                minWidth: 55,
                border:
                  props.selectedFilter === eachvalue.label
                    ? "1px solid #FF808B"
                    : "",
                borderRadius: "50px",
                fontSize: "1em",
                cursor: "pointer",
              }}
              key={index}
            >
              {eachvalue.label}
            </div>
          ))}
        </div>
      </div>
      <div className="chart-main-container">
        <div className="chart-container">
          <ResponsiveContainer width="55%" height={221}>
            <PieChart>
              <text
                dominantBaseline="middle"
                textAnchor="middle"
                fontFamily="Open Sans Regular"
              >
                <tspan
                  x={"50%"}
                  y={105.5}
                  fill="#303030"
                  fontFamily="Open Sans Semibold"
                  fontSize="2em"
                  width="100px"
                >
                  {(props.skillPerformanceData[1].value).toString().slice(0, 5) || 0}%
                </tspan>
                <tspan x={"50%"} y={135.5} fill="#767676">
                  Skill gap covered
                </tspan>
              </text>
              <Pie
                style={{ boxShadow: "0px 3px 100px #96ACF9B2" }}
                data={props.skillPerformanceData || []}
                dataKey="value"
                innerRadius="90%"
                outerRadius="100%"
                fill="#96ACF9"
                startAngle={-270}
                endAngle={90}
                paddingAngle={0}
                strokeWidth={10}
                blendStroke
              >
                <Cell key="test" fill="#ff8c96" strokeWidth={1} />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="skill-legend">
          <div className="individual-legend">
            <CustomRadius background="#96ACF9"></CustomRadius>

            {props.label1}
          </div>
          <div className="individual-legend">
            <CustomRadius background="#ff8c96"></CustomRadius>
            {props.label2}
          </div>
        </div>
      </div>
    </Div>
  );
};

export default AdminManagerDashboardSkillPerformance;
