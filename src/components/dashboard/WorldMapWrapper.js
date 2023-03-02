import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";
import "../../components/css/mapStyles.css";

import MapChart from "./AdminManagerDashboardWorldMap";

const WorldMapWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 2em;
`;

const ToolTipWrapper = styled.span`
  background: white;
  color: black;
`;

const Div = styled.div`
  .title-container {
    display: flex;
    font-weight: 600;
  }
  .skill-title {
    flex: 1;
    font-family: Open Sans Semibold;
    font-size: 1em;
  }
`;

const MapWrapper = () => {
  const [content, setContent] = useState("");
  return (
    <WorldMapWrapper className="dashboard-world-map">
      <div className="title-container">
        <div
          className="skill-title"
          style={{
            fontWeight: 600,
            fontFamily: "Open Sans Semibold",
          }}
        >
          Global Map
        </div>
      </div>
      <div style={{ height: 350 }}>
        <MapChart setTooltipContent={setContent} />
        <ReactTooltip backgroundColor="white" textColor="black">
          {content}
        </ReactTooltip>
      </div>
    </WorldMapWrapper>
  );
};
export default MapWrapper;
