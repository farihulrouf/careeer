import React from "react";
import { Progress } from "antd";
import "antd/dist/antd.css";
class LeaderboardMilestoneLoadingBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 0,
      points: this.props.points || 0,
      earnPoints: 0,
    };
  }
  static getDerivedStateFromProps(nextProps) {
    return {
      points: nextProps.points,
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.points !== this.state.points && !isNaN(this.state.points)) {
      let n = Math.ceil(this.state.points / 250);
      let onePercent = 100 / 250;
      if (n !== 0) {
        this.setState({
          percent: (this.state.points - 250 * (n - 1)) * onePercent,
          earnPoints: 250 - (this.state.points - 250 * (n - 1)),
        });
      }
    }
    return;
  }
  render() {
    return (
      <div style={{ width: "100%" }}>
        <Progress
          percent={this.state.percent}
          showInfo={false}
          strokeWidth={7}
          strokeColor={"#4E52AC"}
        />
        <div
          style={{
            marginTop: 8,
            fontFamily: "Open Sans Regular",
            fontSize: "0.875em",
          }}
        >
          {this.state.earnPoints !== 0
            ? "Hey, earn" +
              " " +
              this.state.earnPoints +
              " " +
              "more points to win rewards and badges"
            : "Hey, earn more points to win rewards and badges"}
        </div>
      </div>
    );
  }
}

export default LeaderboardMilestoneLoadingBar;
