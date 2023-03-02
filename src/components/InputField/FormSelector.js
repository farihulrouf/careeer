import React, { Component } from "react";
import "./FormSelector.css";
import { CaretDownOutlined } from "@ant-design/icons";

const className = {
  formSelectorContainer: {
    fontSize: "inherit",
    color: "#303030",
    fontFamily: "inherit",
    minWidth: 100,
  },
  selectorTitle: {
    fontSize: "1em",
    textTransform: "capitalize",
    paddingBottom: "8px",
  },
  multipleSelector: {
    width: "inherit",
    position: "relative",
    background: "#fff",
    outline: "none",
    letterSpacing: "inherit",
  },
  selectedDisplay: {
    flex: 1,
    height: "85%",
    width: "100%",
    fontSize: "1em",
    display: "flex",
    padding: "0 15px",
    color: "#303030",
    borderBottomLeftRadius: "inherit",
    borderTopLeftRadius: "inherit",
    boxShadow: "none",
    border: "none",
    outline: "none",
    cursor: "pointer",
    alignItems: "center",
    backgroundColor: "#F7F7F751",
    letterSpacing: "inherit",
  },
  iconContainer: {
    height: "100%",
    paddingRight: "10px",
    backgroundColor: "#F7F7F751",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  iconCaret: {
    color: "#868686",
    backgroundColor: "inherit",
  },
};
const getYearOptions = (startYear, endYear, tillPresesent) => {
  let options = [];
  if (tillPresesent) {
    options.push("Present");
  }
  while (endYear >= startYear) {
    options.push(endYear);
    endYear--;
  }
  return options;
};
export default class FormSelector extends Component {
  selectorContainer = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      id: Math.random(),
      showOptions: false,
      activeOption:
        this.props.onView !== undefined && this.props.onView !== ""
          ? this.props.option.findIndex(
              (ele) =>
                (typeof ele !== "object" ? ele : ele[this.props.selector]) ===
                this.props.onView
            )
          : 0,
      selected: this.props.value,
      option: this.props.option || [],
      optionLength: "",
      hover: false,
      placeHolder: this.props.placeHolder,
      color: {
        hover: "",
        selectedBg: "",
        optionHover: "",
        selectedFont: "",
      },
      initialLoad: true,
    };
  }
  componentDidMount() {
    this.setState({
      color: {
        hover:
          this.props.style &&
          this.props.style.color &&
          this.props.style.color.hover
            ? this.props.style.color.hover
            : "#ed5796",
        selectedBg:
          this.props.style &&
          this.props.style.color &&
          this.props.style.color.selectedBg
            ? this.props.style.color.selectedBg
            : "#f4b1d1",
        optionHover:
          this.props.style &&
          this.props.style.color &&
          this.props.style.color.optionHover
            ? this.props.style.color.optionHover
            : "#ffeaf4",
        selectedFont:
          this.props.style &&
          this.props.style.color &&
          this.props.style.color.selectedFont
            ? this.props.style.color.selectedFont
            : "#303030",
      },
    });
    if (this.props.startYear && this.props.endYear) {
      let option = getYearOptions(
        this.props.startYear,
        this.props.endYear,
        this.props.tillPresent
      );
      this.setState({ option });
    }
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    let selected = "";
    let option = [];
    let optionLength = 0;
    if (nextProps.option) {
      optionLength = nextProps.option.length;
      option = nextProps.option;
      selected = nextProps.option.includes(nextProps.value)
        ? nextProps.value
        : "";
    }
    if (nextProps.startYear && nextProps.endYear) {
      if (nextProps.label === "Working Till") {
        option.push("Present");
      }
      let endYear = nextProps.endYear;
      while (endYear >= nextProps.startYear) {
        option.push(endYear);
        endYear--;
      }
    }
    if (nextProps.value) {
      selected = nextProps.option
        ? nextProps.option.includes(nextProps.value)
          ? nextProps.value
          : ""
        : nextProps.value;
    }
    return { option, optionLength, selected };
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  showOptionsHandler = (e) => {
    e.preventDefault();
    let toBeScroll = this.props.dropDownScroll
      ? this.props.dropDownScroll
      : false;
    if (toBeScroll) {
      let scroll = document.getElementById(this.props.id);
      scroll.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "end",
      });
    }

    if (this.state.selected === "") {
      this.setState({
        showOptions: !this.state.showOptions,
      });
      if (
        this.state.option.length !== 0 &&
        this.props.onView !== undefined &&
        this.props.onView !== ""
      ) {
        let target2 = document.getElementById(
          "year-" +
            this.state.option[this.state.activeOption] +
            this.state.activeOption +
            this.state.id
        );
        if (target2) {
          target2.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "end",
          });
        }
      }
    } else {
      this.setState({
        showOptions: !this.state.showOptions,
        activeOption: this.state.activeOption,
      });
    }
  };
  handleClickOutside = (event) => {
    if (
      this.selectorContainer.current &&
      !this.selectorContainer.current.contains(event.target)
    ) {
      this.setState({ showOptions: false, hover: false });
    }
  };
  exitHandler = () => {
    this.setState({ showOptions: false, hover: false });
  };
  handleKey = (e) => {
    e.preventDefault();
    let optionLength = this.state.optionLength - 1;
    if (e.keyCode === 40) {
      e.preventDefault();
      if (this.state.activeOption < optionLength) {
        this.setState({ activeOption: this.state.activeOption + 1 });

        var target = document.getElementById(
          "year-" +
            this.state.option[this.state.activeOption] +
            this.state.activeOption +
            this.state.id
        );
        target.parentNode.scrollTop = target.offsetTop;
      } else {
        this.setState({ activeOption: optionLength });
      }
    }
    if (e.keyCode === 38) {
      if (this.state.activeOption > 0) {
        this.setState({ activeOption: this.state.activeOption - 1 });
        var target2 = document.getElementById(
          "year-" +
            this.state.option[this.state.activeOption - 1] +
            [this.state.activeOption - 1] +
            this.state.id
        );
        target2.parentNode.scrollTop = target2.offsetTop;
      } else {
        this.setState({ activeOption: 0 });
      }
    }
    if (e.keyCode === 13) {
      this.setState({
        selected: this.state.option[this.state.activeOption],
        showOptions: false,
      });
      this.props.onClick(this.state.option[this.state.activeOption]);
    }
  };
  mouseMove = (e, index) => {
    e.preventDefault();
    this.setState({ activeOption: index });
  };
  onClick = (e, index) => {
    this.setState({
      selected:
        typeof this.state.option[index] === "string"
          ? this.state.option[index]
          : this.state.option[index][this.props.selector],
      showOptions: false,
    });
    this.props.onClick(this.state.option[index]);
  };
  mouseOverHandler = () => {
    this.setState({ hover: true });
  };
  mouseLeaveHandler = () => {
    this.setState({ hover: false });
  };

  render() {
    let { option } = this.state;
    return (
      <div
        style={className.formSelectorContainer}
        id={this.props.id || ""}
        ref={this.selectorContainer}
      >
        <div
          style={{
            pointerEvents: this.props.disabled ? "none" : "auto",
            opacity: this.props.disabled ? 0.6 : 1,
          }}
        >
          <div style={className.selectorTitle}>
            {this.props.label}
            <sup
              style={{
                display:
                  this.props.msgValid === undefined
                    ? "none"
                    : this.props.msgValid
                    ? ""
                    : "none",
                color: " red",
                fontSize: "1.5em",
                position: "relative",
                top: "-4px",
              }}
            >
              *
            </sup>
          </div>

          <div style={className.multipleSelector}>
            <div
              style={{
                fontFamily: "Open Sans Regular",
                width: "inherit",
                borderRadius: "4px",
                height:
                  this.props.style === undefined ||
                  this.props.style.height === undefined
                    ? "38px"
                    : this.props.style.height,
                cursor: "pointer",
                backgroundColor: "#F7F7F751",
                border:
                  this.state.showOptions || this.state.hover
                    ? "1px solid" + this.state.color.hover
                    : this.props.borderValid
                    ? "1px solid red"
                    : "1px solid #E2E2E2",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                fontSize: "inherit",
                outline: "none",
                letterSpacing: "inherit",
              }}
              onClick={this.showOptionsHandler}
              onMouseOver={this.mouseOverHandler}
              onMouseLeave={this.mouseLeaveHandler}
              onKeyDownCapture={this.handleKey}
              id="selectorField"
              tabIndex="0"
            >
              <div
                style={className.selectedDisplay}
                contentEditable="false"
                data-placeholder={this.props.placeHolder || ""}
                suppressContentEditableWarning={true}
                className="readOnlyInput"
              >
                {this.state.selected}
              </div>
              <div style={className.iconContainer}>
                <div
                  style={{
                    transition: "0.02s,transform 0.3s ease",
                    transform: this.state.showOptions
                      ? "rotate(180deg)"
                      : "none",
                  }}
                >
                  <CaretDownOutlined
                    style={className.iconCaret}
                    id="iconCaret"
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                maxHeight: this.state.showOptions ? "140px" : "20px",
                minHeight: "20px",
                visibility: this.state.showOptions ? "visible" : "hidden",
                boxShadow: "0 6px 8px rgba(0,0,0,0.1), 0 3px 8px rgba(0,0,0,0)",
                zIndex: 1,
                position: "absolute",
                width: "100%",
                backgroundColor: "#FFFFFF",
                borderRadius: "4px",
                transition: this.state.showOptions
                  ? "all 0.25s ease 0.1s "
                  : "",
                paddingTop: "5px",
              }}
              id="optionsList"
              tabIndex="-1"
            >
              <ul
                style={{
                  overflowY: "auto",
                  overflowX: "hidden",
                  padding: "0",
                  fontSize: "inherit",
                  maxHeight: this.state.showOptions ? "128px" : "10px",
                  minHeight: "10px",
                  marginRight: "5px",
                  marginTop: "3px",
                  borderRadius: "inherit",
                  transition: "inherit",
                }}
                tabIndex="-1"
                className="unOrderList1"
              >
                {option.length > 0 ? (
                  option.map((element, index) => {
                    return (
                      <li
                        onMouseDown={(e) => this.onClick(e, index)}
                        onMouseMove={(e) => this.mouseMove(e, index)}
                        onMouseUp={this.exitHandler}
                        onTouchMove={(e) => this.mouseMove(e, index)}
                        value={element}
                        key={index}
                        id={"year-" + element + index + this.state.id}
                        className="no_highlights"
                        style={{
                          transform: "translateY(0)",
                          color:
                            this.state.selected === element
                              ? this.state.color.selectedFont
                              : "#303030",
                          backgroundColor:
                            this.state.selected === element
                              ? this.state.color.selectedBg
                              : this.state.activeOption === index
                              ? this.state.color.optionHover
                              : "",
                          padding: "8px 0 8px 10px",
                          borderRadius: "2px",
                          fontFamily: "inherit",
                          cursor: "pointer",
                        }}
                      >
                        {typeof element !== "object"
                          ? element
                          : element[this.props.selector]}
                      </li>
                    );
                  })
                ) : (
                  <div style={{ textAlign: "center", color: "#767676" }}>
                    No options available!
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
