import React, { Component } from "react";
import "./DropDownSelector.css";
import { CaretDownOutlined } from "@ant-design/icons";

export default class DropDownSelector extends Component {
  selectorContainer = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      id: Math.random(),
      showOptions: false,
      activeOption:
        this.props.onView !== undefined
          ? this.props.option.findIndex((ele) => ele === this.props.onView)
          : 0,
      selected: this.props.selected,
      option: this.props.option,
      optionLength: "",
      hover: false,
      color: {
        hover: "",
        selectedBg: "",
        optionHover: "",
        selectedFont: "",
      },
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
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.option.length !== nextProps.option.length ||
      prevState.selected !== nextProps.selected
    ) {
      return {
        optionLength: nextProps.option.length,
        selected: nextProps.selected,
      };
    } else return { optionLength: prevState.option.length };
  }

  showOptionsHandler = (e) => {
    e.preventDefault();
    if (this.state.selected === "" || this.state.selected === undefined) {
      this.setState({
        showOptions: !this.state.showOptions,
      });

      let target2 = document.getElementById(
        "year-" +
          this.state.option[this.state.activeOption] +
          this.state.id +
          [this.state.activeOption]
      );
      if (target2 !== null) {
        target2.parentNode.scrollTop = target2.offsetTop;
      }
    } else {
      let ind = this.state.option.findIndex(
        (ele) => this.state.selected === ele
      );
      this.setState({
        showOptions: !this.state.showOptions,
        activeOption: ind,
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
    let optionLength = this.state.optionLength - 1;
    if (e.keyCode === 40) {
      if (this.state.activeOption < optionLength) {
        this.setState({ activeOption: this.state.activeOption + 1 });
        let target = document.getElementById(
          "year-" +
            this.state.option[this.state.activeOption] +
            this.state.id +
            this.state.activeOption
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
            this.state.id +
            [this.state.activeOption - 1]
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
    }
  };

  mouseMove = (e, index) => {
    e.preventDefault();
    this.setState({ activeOption: index });
  };
  mouseOverHandler = () => {
    this.setState({ hover: true });
  };
  mouseLeaveHandler = () => {
    this.setState({ hover: false });
  };

  render() {
    const className = {
      multipleSelector: {
        width: "inherit",
        position: "relative",
        outline: "none",
        borderRadius: "inherit",
        color: "inherit",
        fontFamily: "inherit",
      },
      selectorField: {
        fontFamily: "inherit",
        width: "inherit",
        borderRadius: "inherit",
        height: "38px",
        cursor: "pointer",
        backgroundColor: "#FCFCFC",
        border:
          this.state.showOptions || this.state.hover
            ? "1px solid" + this.state.color.hover
            : this.props.borderValid
            ? "1px solid red"
            : "1px solid #E2E2E2",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        fontSize: "14px",
        color: "inherit",
        outline: "none",
      },
      selectedDisplay: {
        flex: 1,
        fontSize: "1em",
        display: "flex",
        justifyContent: "center",
        color: "inherit",
      },
      iconContainer: {
        paddingRight: "10px",
      },
      iconCaret: {
        color: "#868686",
      },
      iconActivator: {
        transition: "0.2s,transform 0.20s ease",
        transform: this.state.showOptions ? "rotate(180deg)" : "none",
      },
      optionsList: {
        height: this.state.showOptions ? "100px" : "20px",
        visibility: this.state.showOptions ? "visible" : "hidden",
        boxShadow: "0 6px 8px rgba(0,0,0,0.1), 0 3px 8px rgba(0,0,0,0)",
        zIndex: 1,
        position: "absolute",
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderBottomLeftRadius: "3px",
        borderBottomRightRadius: "3px",
        transition: this.state.showOptions ? "all 0.18s ease 0.1s " : "",
        marginTop: "8px",
      },
      unOrderList: {
        overflowY: "scroll",
        padding: "0",
        fontSize: "14px",
        height: this.state.showOptions ? "90px" : "10px",
        margin: "0 6% 0 0",
        borderBottomLeftRadius: "inherit",
        borderBottomRightRadius: "inherit",
      },
    };
    return (
      <div
        style={className.multipleSelector}
        ref={this.selectorContainer}
        tabIndex="0"
        id={this.props.id || ""}
      >
        <div
          style={className.selectorField}
          onClick={this.showOptionsHandler}
          onKeyDown={(e) => this.props.getKeyPress(e, this.state.activeOption)}
          onKeyDownCapture={this.handleKey}
          onMouseOver={this.mouseOverHandler}
          onMouseLeave={this.mouseLeaveHandler}
          tabIndex="0"
          id="selectorField"
        >
          <div style={className.selectedDisplay}>
            {this.props.selected || this.props.placeholder}
          </div>
          <div style={className.iconContainer}>
            <div style={className.iconActivator}>
              <CaretDownOutlined style={className.iconCaret} id="iconCaret" />
            </div>
          </div>
        </div>
        <div style={className.optionsList} id="optionsList">
          <ul style={className.unOrderList} className="unOrderList">
            {this.props.option.map((element, index) => {
              return (
                <li
                  onMouseDown={(e) => {
                    this.props.onClick(e, index);
                  }}
                  onClick={(e) => this.props.onClick(e, index)}
                  onMouseMove={(e) => {
                    this.mouseMove(e, index);
                  }}
                  onMouseUp={this.exitHandler}
                  onTouchMove={(e) => {
                    this.mouseMove(e, index);
                  }}
                  value={element}
                  key={index}
                  id={"year-" + element + this.state.id + index}
                  className="no_highlights"
                  style={{
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
                    padding: "3% 0 3% 15%",
                    borderBottomLeftRadius: "inherit",
                    borderBottomRightRadius: "inherit",
                    fontFamily: "inherit",
                  }}
                >
                  {element}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
