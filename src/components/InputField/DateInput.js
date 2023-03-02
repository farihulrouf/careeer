import React, { Component } from "react";
import DropDownSelector from "./DropDownSelector.js";
class DateInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: [],
      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
      years: [],
      selectedDate: this.props.date,
      selectedMonth: "",
      selectedYear: "",
      selectedDateOfBirth: "",
      endDate: 31,
      showDates: false,
      Leap: false,
    };
  }
  dateOfBirthHandler = () => {
    this.setState(
      {
        selectedDateOfBirth:
          this.state.selectedDate +
          "/" +
          this.state.selectedMonth +
          "/" +
          this.state.selectedYear,
      },
      () => {
        this.props.onChange(new Date(this.state.selectedDateOfBirth).getTime());
      }
    );
  };

  componentDidMount() {
    if (this.props.value && typeof this.props.value !== "string") {
      let { day, month, year } = this.getFormattedDate(this.props.value);
      this.setState({
        selectedDate: day,
        selectedMonth: month,
        selectedYear: year,
      });
    }
    let years = [];
    let startYear = this.props.startYear || new Date().getFullYear() - 20,
      endYear = this.props.endYear || new Date().getFullYear() + 20;
    while (startYear < endYear) {
      years.push(startYear);
      startYear++;
    }
    this.setState({ years });
  }
  getFormattedDate = (timestamp) => {
    let date = new Date(timestamp);
    let splittedDate = date.toDateString().split(" ");
    return {
      day: splittedDate[2],
      month: splittedDate[1],
      year: splittedDate[3],
    };
  };
  static getDerivedStateFromProps(props, state) {
    let selectedDate = {};
    let maxDate = 31;
    if (props.value && !state.selectedDate && typeof props.value !== "string") {
      let date = new Date(props.value).toDateString().split(" ");
      selectedDate = {
        selectedDate: date[2],
        selectedMonth: date[1],
        selectedYear: date[3],
      };
      maxDate = new Date(
        date[3],
        new Date(props.value).getMonth() + 1,
        0
      ).getDate();
    }
    let dates = [],
      yearData = [],
      startYear = props.startYear || new Date().getFullYear(),
      endYear = props.endYear || new Date().getFullYear() + 20;
    for (let i = 1; i <= parseInt(maxDate); i++) {
      if (i <= 9) {
        dates.push("0" + i);
      } else {
        dates.push("" + i);
      }
    }
    if (state.dates.length === 0) {
      return { dates: dates };
    } else if (props.endYear !== "" && props.startYear !== "") {
      while (startYear < endYear) {
        yearData.push(startYear);
        startYear++;
      }
      return { years: yearData, ...selectedDate };
    }

    return null;
  }

  getDates = (month, year) => {
    let maxDate = new Date(
      year ? year : new Date().getFullYear(),
      month ? parseInt(month) : new Date().getMonth() + 1,
      0
    ).getDate();
    let dates = [];
    let i = 1;
    while (i <= maxDate) {
      if (i <= 9) {
        dates.push("0" + i);
      } else {
        dates.push("" + i);
      }
      i++;
    }
    if (!dates.includes(String(this.state.selectedDate)))
      this.setState({ selectedDate: "01" }, () => this.dateOfBirthHandler());
    this.setState({ dates });
  };

  dateHandler = (e, index) => {
    e.preventDefault();
    if (e.keyCode === 13 || !e.keyCode) {
      let dateArray = this.state.dates[index];
      this.setState({ selectedDate: dateArray }, () =>
        this.dateOfBirthHandler()
      );
    }
  };

  monthHandler = (e, index) => {
    e.preventDefault();
    if (e.keyCode === 13 || !e.keyCode) {
      let monthData = this.state.months;
      this.getDates(index + 1, this.state.selectedYear);
      this.setState({ selectedMonth: monthData[index] }, () =>
        this.dateOfBirthHandler()
      );
    }
  };
  yearHandler = (e, index) => {
    e.preventDefault();
    if (e.keyCode === 13 || !e.keyCode) {
      let year = this.state.years[index];
      let months = this.state.months;
      let monthIdex = months.findIndex(
        (eachMonth) => eachMonth === this.state.selectedMonth
      );
      this.getDates(monthIdex + 1, year);
      this.setState({ selectedYear: year }, () => this.dateOfBirthHandler());
    }
  };

  render() {
    return (
      <div id={this.props.id || ""}>
        <div
          style={{
            display: this.props.label ? "" : "none",
            textTransform: "capitalize",
            paddingBottom: "6px",
            letterSpacing: "0.02em",
          }}
        >
          {this.props.label}
          {this.props.required && (
            <sup
              style={{
                color: "red",
                fontSize: "1.5em",
                position: "relative",
                top: "-4px",
                left: "4px",
              }}
            >
              *
            </sup>
          )}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gridColumnGap: "5%",
          }}
        >
          <div style={{ width: "100%", borderRadius: "4px", color: "#303030" }}>
            <DropDownSelector
              option={this.state.dates}
              borderValid={this.props.dateBorderValid}
              selected={this.state.selectedDate}
              onClick={this.dateHandler}
              placeholder="Day"
              getKeyPress={this.dateHandler}
              style={{
                color: {
                  hover: this.props.style.color.hover,
                  selectedBg: this.props.style.color.selectedBg,
                  optionHover: this.props.style.color.optionHover,
                  selectedFont: this.props.style.color.selectedFont,
                },
              }}
            />
          </div>
          <div
            style={{
              borderRadius: "4px",
              color: "#303030",
            }}
          >
            <DropDownSelector
              onView="Jan"
              option={this.state.months}
              borderValid={this.props.monthBorderValid}
              selected={this.state.selectedMonth}
              onClick={this.monthHandler}
              getKeyPress={this.monthHandler}
              placeholder="Month"
              style={{
                color: {
                  hover: this.props.style.color.hover,
                  selectedBg: this.props.style.color.selectedBg,
                  optionHover: this.props.style.color.optionHover,
                  selectedFont: this.props.style.color.selectedFont,
                },
              }}
              dateHandler
            />
          </div>
          <div
            style={{
              borderRadius: "4px",
              color: "#303030",
            }}
          >
            <DropDownSelector
              onView={1990}
              option={this.state.years}
              borderValid={this.props.yearBorderValid}
              selected={this.state.selectedYear}
              onClick={this.yearHandler}
              getKeyPress={this.yearHandler}
              placeholder="Year"
              style={{
                color: {
                  hover: this.props.style.color.hover,
                  selectedBg: this.props.style.color.selectedBg,
                  optionHover: this.props.style.color.optionHover,
                  selectedFont: this.props.style.color.selectedFont,
                },
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default DateInput;
