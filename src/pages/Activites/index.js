import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import styled from "styled-components";
import getBoldText from "../../core/lib/GetBoldText";
import { getEmployeeActivities } from "../../core/apiClient/assessment";
import { decryptData } from "../../utils/encryptDecrypt";

const ActivityWrapper = styled.div`
  padding: 1% 2%;
  border-radius: 5px;
  background-color: rgb(248, 248, 248);
`;

const Title = styled.div`
  color: rgb(48, 48, 48);
  font-size: ${({ fontSize }) => fontSize || "1.5em"};
  font-family: Open Sans Semibold;
`;

const SubWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: ${(props) => props.margin || "1% 0"};
  padding: ${(props) => props.padding || null};
  justify-content: ${(props) => props.justifyContent || null};
  background: ${(props) => props.background || null};
  border-radius: 10px;
`;

const Year = styled.div`
  border: ${(props) =>
    props.active ? "1px solid #FF808B" : "1px solid transparent"};
  color: ${(props) => (props.active ? "#FF808B" : "#767676")};
  border-radius: 25px;
  margin-right: 10px;
  padding: 5px 15px;
  font-size: 12px;
  font-family: Open Sans SemiBold;
  cursor: pointer;
`;

const RadioButton = styled.button`
  width: 10px;
  height: 10px;
  background-color: rgb(172, 174, 216);
  border-radius: 50%;
  margin-right: 10px;
  border: none;
  padding: 0;
`;

const SubTitle = styled.span`
  color: rgb(48, 48, 48);
  font-size: 1em;
  font-family: ${(props) => props.fontFamily || "Open Sans Regular"};
`;

class FeatureEmployeeActivityList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: [
        { name: "1 yr", value: 12 },
        { name: "6 mon", value: 6 },
        { name: "3 mon", value: 3 },
      ],
      noOfMonthsToShow: 6,
      activities: [],
      loading: false,
      hasMore: true,
    };
  }

  componentDidMount() {
    this.loadActivityList(0, 15, (result) => {
      this.setState({ activities: result.data, count: result.count });
    });
  }

  loadActivityList = async (offset, limit, callback) => {
    let orgId = decryptData(localStorage.orgId),
      token = decryptData(localStorage.token),
      employeeId = decryptData(localStorage.employeeId);
    if (orgId && employeeId) {
      try {
        let { data, status } = await getEmployeeActivities(
          employeeId,
          offset,
          limit,
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          callback(data);
        } else if (status === 404) {
          this.setState({
            activities: [],
            count: 0,
          });
        }
        document.toggleLoading();
      } catch (error) {
        document.message.error(
          "Unable to fetch details, please try after sometime"
        );
        document.toggleLoading();
      }
    }
  };

  getFormattedDate = (timestamp) => {
    let date = new Date(timestamp);
    let splittedDate = date.toDateString().toUpperCase().split(" ");
    let formattedDate = `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[3]}`;
    let formattedTime = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return `${formattedDate}, ${formattedTime}`;
  };

  handleInfiniteOnLoad = (page) => {
    let { activities, count } = this.state;
    this.setState({
      loading: true,
    });
    if (activities.length > count) {
      document.message.warning("Infinite List loaded all");
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    this.loadActivityList(page * 15, 15 * (page + 1), (res) => {
      activities = activities.concat(res.data);
      this.setState({
        activities,
        loading: false,
        count: res.count,
      });
    });
  };

  render() {
    return (
      <ActivityWrapper>
        <Title>Activities</Title>
        <SubWrapper justifyContent="space-between">
          <Title fontSize="1.125em">My Activities</Title>
          <div>
            <div style={{ display: "flex" }}>
              {this.state.buttons.map((btn, id) => {
                return (
                  <Year
                    key={id}
                    onClick={() => {
                      this.setState({ noOfMonthsToShow: btn.value });
                    }}
                    active={this.state.noOfMonthsToShow === btn.value}
                  >
                    {btn.name}
                  </Year>
                );
              })}
            </div>
          </div>
        </SubWrapper>
        <div style={{ marginBottom: "1px" }}>
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={this.handleInfiniteOnLoad}
            hasMore={!this.state.loading && this.state.hasMore}
          >
            {this.state.activities.map((activity, id) => {
              return (
                <SubWrapper
                  key={id}
                  justifyContent="space-between"
                  background="#ffffff"
                  padding="0.5% 2% 0.5% 2%"
                  margin="0.5% 0"
                >
                  <SubWrapper>
                    <RadioButton />
                    <div>
                      <SubTitle
                        dangerouslySetInnerHTML={{
                          __html: getBoldText(activity.description),
                        }}
                      ></SubTitle>
                    </div>
                  </SubWrapper>
                  <div>
                    <SubTitle>
                      {this.getFormattedDate(activity.createdAt)}
                    </SubTitle>
                  </div>
                </SubWrapper>
              );
            })}
          </InfiniteScroll>
        </div>
      </ActivityWrapper>
    );
  }
}

export default FeatureEmployeeActivityList;
