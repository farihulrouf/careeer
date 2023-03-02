import React from "react";
import Datamap from "./Datamap";
import styled from "styled-components";
import axios from "axios";

const GlobalMapWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 2em 0.75em 2em 0em;

  .title {
    font-family: "Open Sans Semibold";
    font-size: 1em;
  }
`;

export default class GlobalMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }
  componentDidMount = () => {
    this.getGeoInfo();
  };
  getGeoInfo = () => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let responseData = response.data;
        let country_ISO_code = responseData.country_code_iso3;
        let mapData = {
          [country_ISO_code]: { fillKey: "pink" },
        };
        this.setState({
          data: mapData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <GlobalMapWrapper>
        <div className="title">Global Map</div>
        <Datamap
          data={this.state.data}
          fills={{
            defaultFill: "#E0E0E0",
            violet: "#C8AEF6",
            purpel: "#A5B5F6",
            pink: "#F28A96",
            orange: "#F8B87C",
          }}
          projection="mercator"
          updateChoroplethOptions={{ reset: false }}
          style={{ width: "500px", height: "400px", marginLeft: "4em" }}
        />
      </GlobalMapWrapper>
    );
  }
}
