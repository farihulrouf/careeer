import React from "react";
import styled from "styled-components";
const MainDiv = styled.div`
  width: 100%;
  .grid-container {
    display: grid;
    grid-template-columns: auto;
    background-color: #ffffff;
    overflow: hidden;
    width: 100%;
    height: 58px;
    padding-left: 1%;
    padding-right: 1%;
    font-family: "Open Sans Regular";
    border-radius: 8px;
  }
  .grid-item {
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid #ffffff;
    padding: 0 0.5% 0 1.5%;
    font-size: 30px;
    width: 100%;
    display: flex;
    font-size: 16px;
    border-radius: 5px;
    font-family: "Open Sans Regular";
  }
  .firstpart {
    width: 80%;
    display: flex;
    align-items: center;
    padding-top: 0.2%;
  }
  .secondpart {
    text-align: right;
    width: 20%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .firstpart-items {
    margin-right: 1%;
    margin-left: 1%;
    height: 100%;
    display: flex;
    align-items: center;
    color: #989898;
  }
  .firstpart-items:hover {
    cursor: pointer;
  }
  .secondpart-items {
    border: 1px solid #ff808b;
    width: 75%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Open Sans Semibold";
    /* padding: 5px 40px 5px 40px; */
    border-radius: 5px;
    text-align: center;
    color: #ff808b;
    margin: 0 0 0 5%;
  }
`;

export default class TrainingNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      borderBottom1: true,
      borderBottom2: false,
      borderBottom3: false,
    };
  }
  borderHandler1 = () => {
    this.setState({
      borderBottom1: true,
      borderBottom2: false,
      borderBottom3: false,
    });
  };
  borderHandler2 = () => {
    this.setState({
      borderBottom2: true,
      borderBottom1: false,
      borderBottom3: false,
    });
  };
  borderHandler3 = () => {
    this.setState({
      borderBottom3: true,
      borderBottom2: false,
      borderBottom1: false,
    });
  };
  render() {
    return (
      <MainDiv>
        <div className="grid-container">
          <div className="grid-item">
            <div className="firstpart">
              <div
                className="firstpart-items"
                onClick={this.borderHandler1}
                style={{
                  borderBottom: this.state.borderBottom1
                    ? "3px solid #FF808B"
                    : "3px solid #ffffff",
                  color: this.state.borderBottom1 ? "#303030" : "",
                }}
              >
                Team
              </div>
              <div
                className="firstpart-items"
                onClick={this.borderHandler2}
                style={{
                  borderBottom: this.state.borderBottom2
                    ? "3px solid #FF808B"
                    : "3px solid #ffffff",
                  color: this.state.borderBottom2 ? "#303030" : "",
                }}
              >
                Region
              </div>
              <div
                className="firstpart-items"
                onClick={this.borderHandler3}
                style={{
                  borderBottom: this.state.borderBottom3
                    ? "3px solid #FF808B"
                    : "3px solid #ffffff",
                  color: this.state.borderBottom3 ? "#303030" : "",
                }}
              >
                Global
              </div>
            </div>
          </div>
        </div>
      </MainDiv>
    );
  }
}
