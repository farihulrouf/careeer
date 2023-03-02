import React, { Component } from "react";
import AdminLeaderboardUserCard from "./AdminLeaderboardUserCard";
import styled from "styled-components";

const Div = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-column-gap: 1%;
  grid-row-gap: 1.4em;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(6, 1fr);
  }
  @media (max-width: 728px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 479px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

class AdminLeaderboardEmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderboardEmployeeLists: this.props.leaderboardEmployeeLists,
      hiddenEmployeeImages: [],
      hidden: true,
      dataLength: 15,
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.leaderboardEmployeeLists) {
      return {
        leaderboardEmployeeLists: props.leaderboardEmployeeLists,
      };
    }
  }

  componentDidMount() {
    let images = [];
    let employeeList = this.props.leaderboardEmployeeLists;
    let startIndex = 15;
    let xs = window.matchMedia("(max-width:479px)");
    let md = window.matchMedia("(max-width:728px)");
    let lg = window.matchMedia("(max-width:1024px)");
    if (xs.matches) {
      startIndex = 5;
      this.setState({ dataLength: 5 });
    } else if (md.matches) {
      startIndex = 7;
      this.setState({ dataLength: 7 });
    } else if (lg.matches) {
      startIndex = 11;
      this.setState({ dataLength: 11 });
    }
    if (employeeList) {
      images = employeeList.filter(
        (ele, index) => index >= startIndex && index <= startIndex + 3
      );
      let arrayImages = images.map((ele) => ele.profilePicture);
      this.setState({ hiddenEmployeeImages: arrayImages });
    }
  }

  render() {
    return (
      <Div>
        {(this.state.leaderboardEmployeeLists &&
          this.state.leaderboardEmployeeLists
            .slice(5)
            .filter((employee, empIndex) => empIndex <= this.state.dataLength)
            .map((employee, index) => (
              <div
                style={{
                  fontSize: "1em",
                  width: "96%",
                  height: 170,
                }}
                key={index}
              >
                <AdminLeaderboardUserCard cardDetails={employee} />
              </div>
            ))) ||
          ""}
      </Div>
    );
  }
}

export default AdminLeaderboardEmployeeList;
