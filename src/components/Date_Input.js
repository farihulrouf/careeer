import React, { Component } from "react";
import DropDownSelector from "./DropDownSelector.js";

var currentYear = new Date().getFullYear();

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
      selectedMonth: this.props.month,
      selectedYear: this.props.year,
      selectedDateOfBirth: "",
      endDate: 31,
      showDates: false,
      Leap: false,
    };
  }
  dateOfBirthHandler = () => {
    this.props.selectedDOBYear(this.state.selectedYear);
    this.setState(
      {
        selectedDateOfBirth:
          this.state.selectedDate +
          "/" +
          this.state.selectedMonth +
          "/" +
          this.state.selectedYear,
      },
      () => this.props.dateInputHandler(this.state.selectedDateOfBirth)
    );
  };

  componentDidMount() {
    if (this.props.value !== undefined) {
      if (this.props.value !== "") {
        let str = this.props.value.split("/");
        if (
          str[0] !== "undefined" &&
          str[1] !== "undefined" &&
          str[2] !== "undefined"
        ) {
          this.setState({
            selectedDate: str[0],
            selectedMonth: str[1],
            selectedYear: str[2],
          });
        }
      }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let dates = [],
      yearData = [],
      j,
      startYear = "",
    for (let i = 1; i <= 31; i++) {
      if (i <= 9) {
        dates.push("0" + i);
      } else {
        dates.push(i);
      }
    }

    if (prevState.dates.length === 0) {
      return { dates: dates };
    } else if (nextProps.endYear !== "" && nextProps.startYear !== "") {
      startYear = nextProps.startYear;
      yearData[0] = nextProps.startYear;
      for (j = 1; startYear < nextProps.endYear; j++) {
        yearData[j] = startYear + 1;
        startYear++;
      }
      return { years: yearData };
    }
  }

  getDates = (maxval) => {
    let dates = [];
    for (let i = 1; i <= maxval; i++) {
      if (i <= 9) {
        dates.push("0" + i);
      } else {
        dates.push(i);
      }
    }
    this.setState({ dates });
  };

  dateHandler = (e, index) => {
    e.preventDefault();
    if (e.keyCode === 13 || e.keyCode === undefined) {
      let dateArray = this.state.dates[index];
      if (this.state.selectedDate !== dateArray) {
        this.setState({ selectedDate: dateArray }, () =>
          this.dateOfBirthHandler()
        );
      }
    }
  };

  checkLeapYear = (year, month) => {
    if (year % 4 === 0) {
      if (year % 100 === 0) {
        if (year % 400 === 0) {
          if (
            month === this.state.months[1] &&
            (this.state.selectedDate === 30 || this.state.selectedDate === 31)
          ) {
            this.setState({ selectedDate: "" });
          }
          this.getDates(29);
          this.setState({ Leap: true });
        } else {
          if (
            month === this.state.months[1] &&
            (this.state.selectedDate === 29 ||
              this.state.selectedDate === 30 ||
              this.state.selectedDate === 31)
          ) {
            this.setState({ selectedDate: "" });
          }
          this.getDates(28);
          this.setState({ Leap: false });
        }
      } else {
        if (
          month === this.state.months[1] &&
          (this.state.selectedDate === 30 || this.state.selectedDate === 31)
        ) {
          this.setState({ selectedDate: "" });
        }
        this.getDates(29);
        this.setState({ Leap: true });
      }
    } else {
      if (
        month === this.state.months[1] &&
        (this.state.selectedDate === 29 ||
          this.state.selectedDate === 30 ||
          this.state.selectedDate === 31)
      ) {
        this.setState({ selectedDate: "" });
      }
      this.getDates(28);
      this.setState({ Leap: false });
    }
  };

  monthHandler = (e, index) => {
    e.preventDefault();
    if (e.keyCode === 13 || e.keyCode === undefined) {
      let monthData = this.state.months;
      if (monthData[index] === this.state.months[1]) {
        this.checkLeapYear(this.state.selectedYear, monthData[index]);
        this.setState(
          {
            selectedMonth: monthData[index],
          },
          () => this.dateOfBirthHandler()
        );
      } else if (
        monthData[index] === monthData[0] ||
        monthData[index] === monthData[2] ||
        monthData[index] === monthData[4] ||
        monthData[index] === monthData[6] ||
        monthData[index] === monthData[7] ||
        monthData[index] === monthData[9] ||
        monthData[index] === monthData[11]
      ) {
        this.getDates(31);
        this.setState({ selectedMonth: monthData[index] }, () =>
          this.dateOfBirthHandler()
        );
      } else {
        if (this.state.selectedDate === 31) {
          this.setState({ selectedDate: "" }, () => this.dateOfBirthHandler());
        }
        this.getDates(30);
        this.setState({ selectedMonth: monthData[index] }, () =>
          this.dateOfBirthHandler()
        );
      }
    }
  };
  yearHandler = (e, index) => {
    e.preventDefault();
    if (e.keyCode === 13 || e.keyCode === undefined) {
      let year = this.state.years[index];
      if (this.state.selectedYear !== year) {
        if (this.state.selectedMonth === this.state.months[1]) {
          this.checkLeapYear(year, this.state.selectedMonth);
        }
        this.setState({ selectedYear: year }, () => this.dateOfBirthHandler());
      }
    }
  };

  render() {
    return (
      <div id="DateInput">
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
