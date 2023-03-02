import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Selector from "../form_selector";

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
    display: grid;
    grid-template-columns: 1fr 0.7fr;
    min-height: 250px;
  }

  .chart-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
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
  .pending-rewards-count {
    font-size: 1.2em;
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

const tempRewadsData = {
  set0: [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 200 },
    { name: "Group C", value: 170 },
    { name: "Group D", value: 235 },
    { name: "Group E", value: 120 },
  ],
  set1: [
    { name: "Group A", value: 210 },
    { name: "Group B", value: 480 },
    { name: "Group C", value: 175 },
    { name: "Group D", value: 340 },
    { name: "Group E", value: 400 },
  ],
  set2: [
    { name: "Group A", value: 420 },
    { name: "Group B", value: 180 },
    { name: "Group C", value: 190 },
    { name: "Group D", value: 215 },
    { name: "Group E", value: 140 },
  ],
};

const COLORS = ["#BDA4FC", "#F47E8A", "#BDA4FC", "#8BA4F9", "#FCC28F"];

const Rewards = (props) => {
  const filterOption = ["1 yr", "6 mon", "3 mon"];
  const [rewards, setRewards] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("6 mon");

  useEffect(() => {
    setRewards(props.rewardsData);
  }, [props.rewardsData]);

  const filterOptionHandler = (eachvalue, i) => {
    if (eachvalue === "1 yr") {
      setRewards(tempRewadsData.set0);
    }
    if (eachvalue === "6 mon") {
      setRewards(tempRewadsData.set1);
    }
    if (eachvalue === "3 mon") {
      setRewards(tempRewadsData.set2);
    }
    setSelectedFilter(eachvalue);
  };
  return (
    <Div>
      <div className="title-container">
        <div className="skill-title">
          <spna style={{ paddingRight: "1em" }}>Rewards</spna>
          {/* <Selector
            placeHolder="Department"
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
              onClick={() => filterOptionHandler(eachvalue, index)}
              style={{
                color: selectedFilter === eachvalue ? "#FF808B" : "#767676",
                margin: "0 0.275em",
                padding: "0.2em 0.575em",
                minWidth: 55,
                border: selectedFilter === eachvalue ? "1px solid #FF808B" : "",
                borderRadius: "50px",
                fontSize: "1em",
                cursor: "pointer",
              }}
              key={index}
            >
              {eachvalue}
            </div>
          ))}
        </div>
      </div>
      <div className="chart-main-container">
        {/* <div className="chart-container">
          <ResponsiveContainer width="60%" height={250}>
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
                  {1505 || 0}
                </tspan>
                <tspan x={"50%"} y={145} fill="#D3D2D2" fontSize="0.8em">
                  Rewards
                </tspan>
              </text>
              <Pie
                style={{ boxShadow: "0px 3px 100px #96ACF9B2" }}
                data={rewards || []}
                dataKey="value"
                labelLine={false}
                innerRadius="65%"
                outerRadius="100%"
                label={renderCustomizedLabel}
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
          <div className="pending-rewards-count">
            Pending Rewards - 305/1000
          </div>
        </div>
        <div className="skill-legend">
          <div className="individual-legend">
            <CustomRadius background="#BDA4FC"></CustomRadius>
            {props.label1}
          </div>
          <div className="individual-legend">
            <CustomRadius background="#F47E8A"></CustomRadius>
            {props.label2}
          </div>
          <div className="individual-legend">
            <CustomRadius background="#BDA4FC"></CustomRadius>
            {props.label3}
          </div>
          <div className="individual-legend">
            <CustomRadius background="#8BA4F9"></CustomRadius>
            {props.label4}
          </div>
          <div className="individual-legend">
            <CustomRadius background="#FCC28F"></CustomRadius>
            {props.label5}
          </div>
        </div> */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            color: "#767676",
          }}
        >
          Coming Soon..
        </div>
      </div>
    </Div>
  );
};

export default Rewards;
