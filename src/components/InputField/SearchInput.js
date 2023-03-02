import React, { Component } from "react";
import "antd/dist/antd.css";
import search from "../../assets/images/search.svg";
import { CaretDownOutlined } from "@ant-design/icons";
import "./SearchInput.css";
class SearchInput extends Component {
  selectorContainer = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      data: this.props.value || [],
      id: Math.random(),
      options: [],
      ShowOptions: false,
      searchKey: "",
    };
  }
  static getDerivedStateFromProps(props, state) {
    let options = props.option;
    let value = props.value;
    let clearToolsSearch = props.clearToolsSearch || false
    return {
      options: options || [],
      data: value || [],
      searchKey: clearToolsSearch === true ? "": state.searchKey
    };
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  isSelectClick = (ele) => {
    let selector = this.props.selector;
    let data = this.state.data;
    let indexOfData = data.findIndex((eachData) => {
      if (selector) {
        return eachData[selector] === ele[selector];
      } else {
        return eachData === ele;
      }
    });
    if (indexOfData < 0) {
      data.push(ele);
    } else {
      data.splice(indexOfData, 1);
    }
    this.setState({ data });
    this.props.onClick(data);
  };
  closeHandler = async (index, propsIndex, element) => {
    if (this.props.handleDeleteOption) {
      let deleteOptionsStatus = await this.props.handleDeleteOption(
        index,
        this.props.index,
        element
      );
      if (deleteOptionsStatus) {
        let data = this.state.data;
        let id = data.findIndex((ele) => {
          if (typeof ele === "string") {
            return ele === element;
          } else {
            return ele[this.props.selector] === element[this.props.selector];
          }
        });
        if (id >= 0) data.splice(id, 1);
        this.setState({ data });
        this.props.onClick(data, propsIndex);
      }
    }
  };

  changeCaretUp = () => {
    this.setState({ ShowOptions: true });
  };

  focusedInput = () => {
    let className = document.getElementsByClassName("scrollContainer")[0];
    if (className !== undefined) {
      let offsetHeight = className.offsetHeight;
      if (this.props.isLastInput) {
        this.props.ScrollToEnd(".scrollContainer", offsetHeight);
      }
    }
  };

  closeOptionHandler = () => {
    this.setState({ ShowOptions: !this.state.ShowOptions });
  };

  searchInputHandler = (e) => {
    this.setState({ searchKey: e.target.value });
  };

  addCustomOption = async () => {
    if (this.props.handleAddCustomOption) {
      let { data, status } = await this.props.handleAddCustomOption(
        this.props.selector
          ? { [this.props.selector]: this.state.searchKey }
          : this.state.searchKey
      );
      if (status >= 200 && status < 300) {
        this.isSelectClick(data);
      }
    }
  };

  handleClickOutside = (event) => {
    if (
      this.selectorContainer.current &&
      !this.selectorContainer.current.contains(event.target)
    ) {
      this.setState({ ShowOptions: false, searchKey: "" });
    }
  };

  render() {
    return (
      <div
        className="multipleInput"
        style={{ fontSize: "inherit", fontFamily: "inherit", color: "inherit" }}
        id={this.props.id || ""}
        ref={this.selectorContainer}
      >
        <div
          style={{
            textTransform: "capitalize",
            paddingBottom: "8px",
            fontSize: "1em",
            fontFamily: "inherit",
            letterSpacing: "0.02em",
            color: "inherit",
          }}
        >
          {this.props.title}
          {this.props.msgValid && (
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
            width: "100%",
            height: "100%",
            position: "relative",
            outline: "none",
          }}
          id={"selector" + this.state.id}
        >
          <div
            id="InputField"
            style={{
              width: "100%",
              height: "40px",
              display: "flex",
              flexDirection: "row",
              fontSize: "inherit",
              borderRadius: "4px",
              border:
                this.state.ShowOptions || this.state.hover
                  ? "1px solid #ff808b"
                  : this.props.borderValid
                  ? "1px solid red"
                  : "1px solid #E2E2E2",
            }}
          >
            <div
              style={{
                flex: 2,
                position: "relative",
                borderTopLeftRadius: "inherit",
                borderBottomLeftRadius: "inherit",
              }}
              onClick={this.changeCaretUp}
            >
              <img
                src={search}
                alt="search"
                style={{
                  position: "absolute",
                  top: "30%",
                  left: "10px",
                }}
              />
              <input
                onChange={(e) => this.searchInputHandler(e)}
                type="text"
                value={this.state.searchKey}
                placeholder={this.props.placeholder}
                id={"mySearch" + this.state.id}
                style={{
                  height: "100%",
                  width: "100%",
                  paddingLeft: "35px",
                  paddingRight: "10px",
                  paddingTop: "1%",
                  fontSize: "0.98em",
                  fontFamily: "inherit",
                  letterSpacing: "0.05em",
                  backgroundColor: "#fcfcfc",
                  border: "none",
                  borderTopLeftRadius: "inherit",
                  borderBottomLeftRadius: "inherit",
                  outline: "none",
                  textTransform: "capitalize",
                }}
              />
            </div>
            <div
              style={{
                padding: "10px",
                borderLeft: "1px solid #EDEDED",
                backgroundColor: "#F6F6F6",
                borderTopRightRadius: "inherit",
                borderBottomRightRadius: "inherit",
                fontSize: "1em",
                color: "#828282",
                cursor: "pointer",
              }}
              onClick={this.closeOptionHandler}
            >
              <CaretDownOutlined
                type="caret-down"
                style={{
                  transition: "0.02s,transform 0.3s ease",
                  transform: this.state.ShowOptions
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                }}
              />
            </div>
          </div>
          <div>
            <div
              style={{
                width: "100%",
                boxShadow: this.state.ShowOptions
                  ? "rgba(0, 0, 0, 0.1) 0px 3px 4px, rgba(0, 0, 0, 0) 0px 3px 6px"
                  : "none",
                height: "auto",
                marginTop: "5px",
              }}
            >
              <div
                style={{
                  textAlign: "end",
                  borderBottom: "1px solid rgb(237, 237, 237",
                  fontSize: "inherit",
                  letterSpacing: "0.02em",
                  color:
                    (this.props.style && this.props.style.checkColor) ||
                    "#F17E8A",
                  padding: "3px 5px",
                  display:
                    this.state.ShowOptions &&
                    this.props.allowCustomAddition &&
                    this.state.options.filter((eachOption) => {
                      if (this.state.searchKey) {
                        return typeof eachOption === "string"
                          ? eachOption
                          : eachOption[this.props.selector]
                              .toLowerCase()
                              .startsWith(this.state.searchKey.toLowerCase());
                      } else {
                        return eachOption;
                      }
                    }).length === 0
                      ? ""
                      : "none",
                }}
              >
                <label
                  onClick={() => this.addCustomOption()}
                  style={{ cursor: "pointer" }}
                >
                  {this.props.label ? this.props.label : "Add"}
                </label>
              </div>
              <div
                className="date-list-container"
                style={{
                  flexWrap: "wrap",
                  display: "flex",
                  padding: "1.2px 0px",
                  overflowY: "auto",
                  maxHeight: "104px",
                }}
              >
                {this.state.data.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="savedOptions"
                      style={{
                        borderRadius: "20px",
                        margin: "3px 3px",
                        display: "flex",
                        fontSize: "14px",
                        fontFamily: "inherit",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "max-content",
                        padding: "5px 6px",
                        border: " 0.8px solid #D7D7EC",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "1em",
                          padding: "0 5px 0 2.5px",
                          color:
                            (this.props.style &&
                              this.props.style.selectedColor) ||
                            "#4D4CAC",
                          cursor: "default",
                          textTransform: "capitalize",
                          letterSpacing: "0.03em",
                          fontWeight: 500,
                        }}
                      >
                        {typeof ele === "string"
                          ? ele
                          : ele[this.props.selector]}
                      </div>
                      <div
                        onClick={() =>
                          this.closeHandler(index, this.props.index, ele)
                        }
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "#ffffff",
                          cursor: "pointer",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 32 32"
                        >
                          <path
                            style={{
                              fill:
                                (this.props.style &&
                                  this.props.style.selectedColor) ||
                                "#4D4CAC",
                              opacity: 0.1,
                            }}
                            className="a"
                            d="M16,0A16,16,0,1,1,0,16,16,16,0,0,1,16,0Z"
                          />
                          <path
                            style={{
                              fill:
                                (this.props.style &&
                                  this.props.style.selectedColor) ||
                                "#4D4CAC",
                              opacity: 0.8,
                            }}
                            className="b"
                            d="M6.908,5.871l4.617-4.617A.734.734,0,1,0,10.487.216L5.87,4.833,1.253.216A.734.734,0,1,0,.215,1.254L4.832,5.871.215,10.487a.734.734,0,1,0,1.038,1.038L5.87,6.909l4.617,4.617a.734.734,0,1,0,1.038-1.038Z"
                            transform="translate(10 10)"
                          />
                        </svg>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              id={"options" + this.state.id}
              style={{
                maxHeight: this.state.ShowOptions ? "210px" : "20px",
                minHeight: "20px",
                padding: "3% 2% 0 0",
                width: "100%",
                visibility: this.state.ShowOptions ? "visible" : "hidden",
                position: "absolute",
                zIndex: 1,
                backgroundColor: "#FFFFFF",
                borderBottomLeftRadius: "5px",
                borderBottomRightRadius: "5px",
                borderTop: "1px solid #ededed",
                boxShadow: "0 6px 8px rgba(0,0,0,0.1), 0 3px 8px rgba(0,0,0,0)",
                transition: this.state.ShowOptions
                  ? "all 0.25s ease 0.1s "
                  : "",
              }}
            >
              <ul
                id={"myMenu" + this.state.id}
                className="unOrderList1"
                style={{
                  listStyleType: "none",
                  paddingLeft: "0",
                  overflowY: "auto",
                  overflowX: "hidden",
                  scrollBehavior: "smooth",
                  maxHeight: this.state.ShowOptions ? "150px" : "10px",
                  minHeight: "10px",
                  transition: this.state.ShowOptions
                    ? "all 0.25s ease 0.1s "
                    : "",
                }}
              >
                {this.state.options &&
                this.state.options.filter((eachOption) => {
                  if (this.state.searchKey) {
                    return typeof eachOption === "string"
                      ? eachOption
                      : eachOption[this.props.selector]
                          .toLowerCase()
                          .startsWith(this.state.searchKey.toLowerCase());
                  } else {
                    return eachOption;
                  }
                }).length ? (
                  this.state.options
                    .filter((eachOption) => {
                      if (this.state.searchKey) {
                        return typeof eachOption === "string"
                          ? eachOption
                          : eachOption[this.props.selector]
                              .toLowerCase()
                              .startsWith(this.state.searchKey.toLowerCase());
                      } else {
                        return eachOption;
                      }
                    })
                    .map((ele, index) => {
                      return (
                        <li
                          id={"list" + this.state.id}
                          onClick={() => this.isSelectClick(ele)}
                          key={index}
                          style={{
                            cursor: "pointer",
                            padding: "0 6%",
                            textTransform: "capitalize",
                          }}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div
                              id="Checkicon1"
                              style={{
                                paddingRight: "5%",
                                paddingTop: "10px",
                                color:
                                  this.state.data.findIndex((eachEle) => {
                                    if (this.props.selector) {
                                      return (
                                        eachEle[this.props.selector] ===
                                        ele[this.props.selector]
                                      );
                                    } else {
                                      return eachEle === ele;
                                    }
                                  }) >= 0
                                    ? (this.props.style &&
                                        this.props.style.checkColor) ||
                                      "#F17E8A"
                                    : "#B5B5B5",
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                              >
                                {this.state.data.findIndex((eachEle) => {
                                  if (this.props.selector) {
                                    return (
                                      eachEle[this.props.selector] ===
                                      ele[this.props.selector]
                                    );
                                  } else {
                                    return eachEle === ele;
                                  }
                                }) >= 0 ? (
                                  <g transform="translate(-521 -442.051)">
                                    <path
                                      style={{
                                        fill:
                                          (this.props.style &&
                                            this.props.style.checkColor) ||
                                          "#F17E8A",
                                      }}
                                      className="a"
                                      d="M2.667,0H17.333A2.667,2.667,0,0,1,20,2.667V17.333A2.667,2.667,0,0,1,17.333,20H2.667A2.667,2.667,0,0,1,0,17.333V2.667A2.667,2.667,0,0,1,2.667,0Z"
                                      transform="translate(521 442.051)"
                                    />
                                    <path
                                      style={{
                                        fill: "none",
                                        stroke: "#fff",
                                        strokeWidth: "2px",
                                      }}
                                      className="b"
                                      d="M-4332.631-8104.32l3.4,4.222,8.6-7.2"
                                      transform="translate(4858.131 8555.85)"
                                    />
                                  </g>
                                ) : (
                                  <g
                                    className="a"
                                    style={{ fill: "#f7f7f7", opacity: 0.7 }}
                                  >
                                    <path
                                      style={{ stroke: "none" }}
                                      className="b"
                                      d="M 17.33333969116211 19.20000076293945 L 2.666670083999634 19.20000076293945 C 1.637380003929138 19.20000076293945 0.800000011920929 18.36261940002441 0.800000011920929 17.33333969116211 L 0.800000011920929 2.666670083999634 C 0.800000011920929 1.637380003929138 1.637380003929138 0.800000011920929 2.666670083999634 0.800000011920929 L 17.33333969116211 0.800000011920929 C 18.36261940002441 0.800000011920929 19.20000076293945 1.637380003929138 19.20000076293945 2.666670083999634 L 19.20000076293945 17.33333969116211 C 19.20000076293945 18.36261940002441 18.36261940002441 19.20000076293945 17.33333969116211 19.20000076293945 Z"
                                    />
                                    <path
                                      style={{
                                        stroke: "none",
                                        fill: "#767676",
                                      }}
                                      className="c"
                                      d="M 2.666669845581055 1.600000381469727 C 2.078510284423828 1.600000381469727 1.600000381469727 2.078510284423828 1.600000381469727 2.666669845581055 L 1.600000381469727 17.33333969116211 C 1.600000381469727 17.92149925231934 2.078510284423828 18.39999961853027 2.666669845581055 18.39999961853027 L 17.33333969116211 18.39999961853027 C 17.92149925231934 18.39999961853027 18.39999961853027 17.92149925231934 18.39999961853027 17.33333969116211 L 18.39999961853027 2.666669845581055 C 18.39999961853027 2.078510284423828 17.92149925231934 1.600000381469727 17.33333969116211 1.600000381469727 L 2.666669845581055 1.600000381469727 M 2.666669845581055 0 L 17.33333969116211 0 C 18.80608940124512 0 20 1.193910598754883 20 2.666669845581055 L 20 17.33333969116211 C 20 18.80608940124512 18.80608940124512 20 17.33333969116211 20 L 2.666669845581055 20 C 1.193910598754883 20 0 18.80608940124512 0 17.33333969116211 L 0 2.666669845581055 C 0 1.193910598754883 1.193910598754883 0 2.666669845581055 0 Z"
                                    />
                                  </g>
                                )}
                              </svg>
                            </div>
                            <label
                              id={"element" + this.state.id}
                              style={{
                                color: "#4A4A4A",
                                paddingTop: "7px",
                                cursor: "pointer",
                                fontFamily: "inherit",
                              }}
                            >
                              {typeof ele.option === "string"
                                ? ele
                                : ele[this.props.selector]}
                            </label>
                          </div>
                        </li>
                      );
                    })
                ) : (
                  <li>
                    <div style={{ textAlign: "center" }}>--No Options--</div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchInput;
