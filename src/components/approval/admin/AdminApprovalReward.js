import React, { Component } from "react";
import styled from "styled-components";
import Approve from "../../../assets/images/approve.svg";
import SearchTextBox from "../../SearchTextBox";
import ApprovalrewardTable from "./approvalRewardTable";
const Div = styled.div`
  color: #303030;
  font-size: 16px;
  font-family: Open Sans Regular;
  background-color: #f8f8f8;
  .approval-title {
    font-family: Open Sans Semibold;
    font-size: 1.125em;
  }
  .approval-navigation {
    margin: 15px 0px;
    height: 58px;
    color: rgb(118, 118, 118);
    background: rgb(255, 255, 255);
    border-radius: 8px;
  }
  .approval-search-with-button-container {
    display: grid;
    grid-template-columns: 1fr 5fr;
    align-items: center;
    padding: 1% 0% 1% 1.23%;
  }
  .approval-button-container {
    flex: 0.3;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    line-height: 1.876em;
    grid-column-gap: 1em;
    text-align: center;
    transition: 0.3s opacity, visibility;
  }
  .button-icon {
    height: 31px;
    width: 31px;
    cursor: pointer;
    &:hover {
      box-shadow: 0px 2px 10px #ccc;
      border-radius: 50%;
      transition: 0.1s;
    }
  }
  .approval-search-container {
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .approval-search {
    width: 28%;
  }
`;
class AdminApprovalReward extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStatus: "",
      rewardTable: [],
      multipleEmployeeSelected: [],
      selectedSubNavLink: { title: "", count: "", status: "" },
      allSelected: false,
      showModal: false,
    };
  }

  componentDidMount() {
    this.props.handleSubNavCount([
      {
        title: "Pending",
        count: "",
        subPath: "rewards/pending",
      },
    ]);
  }

  searchInputHandler = (search) => {
    this.setState({ searchValue: search.target.value });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };
  showModalView = () => {
    this.setState({ showModal: true });
  };
  onStatusClicked = (status) => {
    this.setState({ selectedStatus: status, showModal: false });
  };
  selectedEmployee = (employeeDetails, index) => {
    let rewardTable = this.state.rewardTable;

    let multipleEmployeeSelected = this.state.multipleEmployeeSelected;
    if (rewardTable.length > 0) {
      let rewardIndex = rewardTable.findIndex(
        (employee) => employee.id === employeeDetails.id
      );
      rewardTable[rewardIndex].checkStatus = !rewardTable[rewardIndex]
        .checkStatus;
      if (rewardTable[rewardIndex].checkStatus) {
        multipleEmployeeSelected.push(rewardTable[rewardIndex]);
      } else {
        let multipleIndex = multipleEmployeeSelected.findIndex(
          (employee) => employee.id === employeeDetails.id
        );
        if (multipleIndex >= 0) {
          multipleEmployeeSelected.splice(multipleIndex, 1);
        }
      }
    }
    this.setState({ rewardTable, multipleEmployeeSelected });
  };
  allEmployeeSelected = () => {
    let multipleEmployeeSelected = this.state.multipleEmployeeSelected;
    let rewardTable;
    if (this.state.allSelected) {
      rewardTable = this.props.rewardTable.map((eachEmployee) => {
        eachEmployee.checkStatus = false;
        return eachEmployee;
      });
      multipleEmployeeSelected = [];
    } else {
      rewardTable = this.props.rewardTable.map((eachEmployee) => {
        eachEmployee.checkStatus = true;
        return eachEmployee;
      });
      multipleEmployeeSelected = [...rewardTable];
    }
    let allSelected = !this.state.allSelected;
    this.setState({ rewardTable, allSelected, multipleEmployeeSelected });
  };

  render() {
    return (
      <Div>
        <div className="approval-search-with-button-container">
          <div className="approval-button-container">
            <div>
              <img
                title="Approve"
                src={Approve}
                alt="Approve"
                className="button-icon"
                onClick={() => {
                  this.onStatusClicked(1);
                }}
              />
            </div>
          </div>
          <div className="approval-search-container">
            <div className="approval-search">
              <SearchTextBox
                options={this.state.searchOptions || []}
                placeHolder="Search employee"
                value={this.state.searchValue}
                style={{
                  color: {
                    hover: "#F4A6AE",
                  },
                }}
                keybordKeyHandler={null}
                searchInputHandler={(e) => this.searchInputHandler(e)}
              />
            </div>
          </div>
        </div>
        <ApprovalrewardTable {...this.state} {...this} />
      </Div>
    );
  }
}

export default AdminApprovalReward;
