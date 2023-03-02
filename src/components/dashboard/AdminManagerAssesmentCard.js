import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Empty } from "antd";
// import Selector from "../form_selector";

const Div = styled.div`
  .skill-title {
    flex: 1;
    font-family: Open Sans Semibold;
    font-size: 1em;
    display: flex;
    align-items: center;
  }
  .title-container {
    display: flex;
  }
  .year-filter {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    font-size: 0.8em;
    align-items: center;
  }
  .chart-main-container {
    flex: 1;
    display: flex;
    // grid-template-columns: 1fr 0.7fr;
    height: 260px;
    margin-top: 20px;
  }

  .chart-container {
    flex: 1
    // display: flex;
    // justify-content: center;
    // flex-direction: column;
  }

  .skill-legend {
    flex: 0.7 1 0%;
    overflow-y: auto;
    margin-top: 20px;
  }
  .individual-legend {
    display: flex;
    align-items: center;
    padding: 12px 10px 0px 0px;
  }
  .pending-rewards-count {
    font-size: 1.2em;
  }
  .remaining {
    font-family: Open Sans Regular;
    color: #303030;
    font-size: 16px
  }
`;
const CustomRadius = styled.div`
  height: 15px;
  width: 15px;
  border-radius: 50%;
  margin-right: 15px;
  background: ${(props) => props.background};
`;

const RADIAN = Math.PI / 179;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  value,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      fontFamily="Open Sans Regular"
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize="1em"
    >
      {`${value}`}
    </text>
  );
};

const COLORS = ["#BDA4FC", "#F47E8A", "#96ACC9", "#8BA4F9", "#FCC28F"];

const Rewards = (props) => {
  const filterOption = [
    { label: "1 yr", months: 12 },
    { label: "6 mon", months: 6 },
    { label: "3 mon", months: 3 },
  ];
  const [rewards, setRewards] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("6 mon");

  useEffect(() => {
    setRewards(props.assessments);
  }, [props.assessments]);

  const filterOptionHandler = (eachvalue, months) => {
    props.filterHandler(months);
    setSelectedFilter(eachvalue);
  };
  return (
    <Div>
      <div className="title-container">
        <div className="skill-title">
          <spna style={{ paddingRight: "1em" }}>Assessments</spna>
          {/* <Selector
            placeHolder="Team A"
            value={props.selectedDepartment}
            onClick={props.onSelectDepartment}
            option={[]}
            style={{
              color: {
                hover: "#FF808B",
                selectedBg: "#FF808B",
                optionHover: "#fbe7e9",
                selectedFont: "#ffffff",
              },
            }}
          /> */}
        </div>
        <div className="year-filter">
          {filterOption.map((eachvalue, index) => (
            <div
              onClick={() =>
                filterOptionHandler(eachvalue.label, eachvalue.months)
              }
              style={{
                color:
                  selectedFilter === eachvalue.label ? "#FF808B" : "#767676",
                margin: "0 0.275em",
                padding: "0.2em 0.575em",
                minWidth: 55,
                border:
                  selectedFilter === eachvalue.label ? "1px solid #FF808B" : "",
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
      {rewards.length > 0 ? (
        <div className="chart-main-container">
          <div className="chart-container">
            <ResponsiveContainer width="60%" height={240}>
              <PieChart>
                <text
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fontFamily="Open Sans Regular"
                >
                  <tspan
                    x={"50%"}
                    y={125}
                    fill="#303030"
                    fontFamily="Open Sans Semibold"
                    fontSize="1.2em"
                    fontWeight={500}
                  >
                    {props.totalAssessments || 0}
                  </tspan>
                  <tspan x={"50%"} y={145} fill="#D3D2D2" fontSize="0.8em">
                    Total Assessments
                  </tspan>
                </text>
                <Pie
                  style={{ boxShadow: "0px 3px 100px #96ACF9B2" }}
                  data={rewards || []}
                  dataKey="count"
                  labelLine={false}
                  innerRadius="65%"
                  outerRadius="100%"
                  // label={renderCustomizedLabel}
                  fill="#8884d8"
                  paddingAngle={3}
                  blendStroke
                >
                  {rewards.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <span className="remaining">Remaining: {props.remainingAssessments || 0}</span>
          </div>
          <div className="skill-legend">
            {rewards.map((prop, id) => (
              <div key={id} className="individual-legend">
                <CustomRadius
                  background={COLORS[id % COLORS.length]}
                ></CustomRadius>
                {prop.name}: {prop.count}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Empty style={{ marginTop: "8%" }} />
      )}
    </Div>
  );
};

export default Rewards;
