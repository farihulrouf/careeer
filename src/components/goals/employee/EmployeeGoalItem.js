import React, { Component } from "react";
import GoalCard from "../../GoalCard";
import calendar from "../../../assets/images/calendar.svg";
import clock from "../../../assets/images/clock-circular.svg";
import "../../../assets/css/EmployeeGoalItem.css";
import InputField from "../../InputField";
import Approve from "../../../assets/images/approve.svg";
import Deny from "../../../assets/images/deny.svg";
import buzzicon from "../../../assets/images/business1.svg";
import PopUpDisplay from "../../PopUpDisplay";
import { decryptData } from "../../../utils/encryptDecrypt";
import { Drawer } from "antd";
import {
  getGoalTypes,
  saveManagerGoalDetails,
  getEmployeeDetails,
} from "../../../core/apiClient/organization/organizationClient";
import Business from "../../../assets/images/business.svg";
import Learning from "../../../assets/images/learning.svg";
import Implementation from "../../../assets/images/implementation.svg";
import SoftSkill from "../../../assets/images/softSkill.svg";
import Stakeholder from "../../../assets/images/stakeholder.svg";
import Styled from "styled-components";
import FormSelector from "../../../components/form_selector";
import SearchSelector from "../../../components/SearchSelector";
import closeImage from "../../../assets/images/closeImage.svg";
import Info from "../../../assets/images/info.svg";
import ToolTip from "../../../components/ToolTipComponent";
import Button from "../../../components/Button";
import { DatePicker } from "antd";
import moment from "moment";
import Api from "./api"
// import ManagerAddTeamEmployeeDrawer from "../manager/ManagerAddTeamEmployeeDrawer";
import timeStampToDateTime from "../../../core/lib/TimeStampToDateTime";
import Icon from "../../../assets/images/ic_more_vert.svg";
const STYLES = {
  imgAndDate: { display: "flex", paddingBottom: 6 },
  dateAndTime: {
    marginLeft: 4,
  },
};
const Div = Styled.div`
    font-family: "Open Sans Regular";
    font-size: 14px;
    width: 100%;
    color:#303030;
    background-color: rgb(255, 255, 255);
    height: inherit;
    position:relative;
    .container{
      display: flex;
      flex-direction:column;
      padding:4% 4%; 
    }
    .title{
      font-family:Open Sans Semibold;
      font-size:16px;
      color:#252525;
    }
    #errorMessage{
      visibility:hidden;
      color:red;
      padding-top:2px;
      font-size:12px;
    }

    .manager-team-selector{
      width: 100%;
      font-size: 14px;
      color: rgb(48, 48, 48);
      margin-top: 8.5%;
    }
    .drawer-info-icon{
      height:12px;
      width:12px;
    }
`;
class EmployeeGoalItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      showpopup: false,
      showeditdrawer: false,
      description: '',
      selected: "",
      startDate: '',
      endDate: "",
      title: "",
      employeeGoalList: [],
      goalType: '',
      value: '',
      goalTypes: [],
      selecedgoal: this.props.goalTypeId,
      type: '',
      role : decryptData(localStorage.role),
      endDatenew: new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).format(this.props.endDate),
      startDatenew: new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).format(this.props.startDate)
    };
    this.goalInputHandler = this.goalInputHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.clickEditHandeler = this.clickEditHandeler.bind(this);
    // this.getdate = this.getdate.bind(this)
  }
  componentDidMount() {
    // this.getgoalstrpes();
    console.log(this.state.role)
    this.loadEmployeeAssignedGoalTypes()

  }


  clickHandler = (event) => {
    console.log(event.target.textContent)
    if (event.target.textContent == "Delete") {
      console.log(event.target.textContent, "ffe", this.props);
      this.setState(
        { selected: "", showpopup: true, isClicked: false },
        // this.props.onClick(event.target.textContent)
      );
    }
    else {
      this.setState(
        { selected: event.target.textContent, showpopup: true, isClicked: false },
        // this.props.onClick(event.target.textContent)
      );
    }
  };

  clickEditHandeler (event) {
    console.log(event.target.textContent)
    if (event.target.textContent == "Edit") {
      setTimeout(() => {
        this.setState({ showeditdrawer: true, isClicked: false,selecedgoal:this.props.goalTypeId})
      }, 1000);
      console.log(event.target.textContent, "ffe", this.props.goalTypeId,this.state.selecedgoal)
    }
    else {
      this.setState(
        { selected: event.target.textContent, showeditdrawer: true, isClicked: false,},
      );
    }
    console.log(this.state.selecedgoal, "selecedgoal")
  };

  showDropDownHandler = () => {
    this.setState({ isClicked: !this.state.isClicked });
  };
  onBlurDropDown = (e) => {
    e.preventDefault();
    this.setState({ isClicked: false, selected: "" });
  };
  removeExistingReportee = async (bool, selected, index) => {
    console.log(bool, selected, index)
    if (bool) {
      let orgId = decryptData(localStorage.orgId),
        managerId = decryptData(localStorage.employeeId),
        token = decryptData(localStorage.token);
      if (orgId && managerId) {
        document.toggleLoading(true);
        try {
          console.log("removed")
          let orgId = decryptData(localStorage.orgId)
          let managerId = decryptData(localStorage.employeeId);
          let token = decryptData(localStorage.token);
          Api.deletegoletype(orgId, managerId, this.props.id, token).then(
            res => {
              console.log(res, "res")
              if (res.status == 200) {
                console.log(res.data, "ddaa")
                document.message.success(res.data);
                this.setState({
                  isClicked: false,
                  showpopup: false
                })
                window.location.reload();
              } else {
                console.log("error",)
              }
            }

          ).then(error => {
            console.log(error, "error")
          })
            .catch(error => {
              console.log(error, "error")

            });
        } catch (error) {
          document.message.error(
            "Unable to process details at this time, please try after sometime"
          );
        }
        document.toggleLoading();
      }
      this.setState({ removeEmployee: { showpopup: false, name: "" } });
    } else {
      return this.setState({ showpopup: false, });
    }
  };
  closeAddEmployeeDrawer = () => {
    console.log("clicked")
    this.setState({
      showeditdrawer: false,
      showDrawer: false,
    });
  };
  goalInputHandler = (event, e) => {
    this.setState({
      selecedgoal: e
    })
    console.log(event, e, this.state.selecedgoal)
  }
  dateInputHandler = (event) => {
    console.log(event)
  }
  handleChange(event) {
    this.setState({ title: event.target.value });
    console.log(event.target.value)
  }
  handleChangedescription = (event) => {
    this.setState({ description: event.target.value });
    console.log(event.target.value)
  }
  handlestartChange = (event) => {
    this.setState({
      type: "date"
    })
    console.log(this.state.type, "type")
    const result = Date.parse(event.target.value)
    this.setState({ startDate: result });
    console.log(event.target.value, this.state.startDate)

  }
  handleendChange = (event) => {
    this.setState({
      type1: "date"
    })
    const end = Date.parse(event.target.value)
    this.setState({ endDate: end });
    console.log(event.target.value, this.state.endDate)
  }
  handleChangegoaltype = (event) => {
    this.setState({ goalType: event.target.value });
    console.log(event.target.value)
  }
  loadEmployeeAssignedGoalTypes = async () => {
    try {
      let orgId = decryptData(localStorage.orgId),
        managerId = decryptData(localStorage.employeeId),
        token = decryptData(localStorage.token);
      if (orgId && managerId) {
        let goalTypes = [];
        document.toggleLoading(true);
        let { data, status } = await getGoalTypes(orgId, managerId, {
          Authorization: token,
        });
        if (status >= 200 && status < 300) {
          for (let i = 0; i < data.length; i++) {
            let object = { id: "", title: "", status: "", image: "" };
            if (data[i].title === "Learning") {
              object.image = Learning;
            } else if (data[i].title === "Implementation") {
              object.image = Implementation;
            } else if (data[i].title === "Business") {
              object.image = Business;
            } else if (data[i].title === "Soft Skill") {
              object.image = SoftSkill;
            } else {
              object.image = Stakeholder;
            }
            object.title = data[i].title;
            object.id = data[i].id;
            object.status = data[i].status;
            goalTypes.push(object);
          }
          this.setState({ goalTypes });

        }
        document.toggleLoading();
      }
      console.log(this.state.goalTypes, "goalTypes")
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  getgoalstrpes = () => {
    let orgId = decryptData(localStorage.orgId)
    let managerId = decryptData(localStorage.employeeId);
    let token = decryptData(localStorage.token);
    Api.getgoaltypes(orgId, managerId, token).then(
      res => {
        console.log(res, "res")
        if (res.status == 200) {
          console.log(res.data, "ddaa", this.props)
          this.setState({
            goalTypes: res.data
          })
          console.log(this.state.goalTypes)
        } else {
          console.log("error",)
        }
      }

    ).then(error => {
      console.log(error, "error")
    })
      .catch(error => {
        console.log(error, "error")

      });
  }
  submitdata = () => {

    console.log(this.state.endDate, this.props.endDate, "end")
    console.log(this.state.startDate, this.props.startDate, "startDate")
    console.log(this.props.goalType)
    let orgId = decryptData(localStorage.orgId)
    let managerId = decryptData(localStorage.employeeId);
    let token = decryptData(localStorage.token);
    let data = {
      "title": this.state.title ? this.state.title : this.props.title,
      "description": this.state.description ? this.state.description : this.props.description,
      "startDate": this.state.startDate ? this.state.startDate : this.props.startDate,
      "endDate": this.state.endDate ? this.state.endDate : this.props.endDate,
      "goalType": this.state.selecedgoal ? this.state.selecedgoal : this.props.goalTypeId,
      "goalId": this.state.goalId ? this.state.goalId : this.props.id
    }
    Api.updategoal(orgId, managerId, data, token).then(
      res => {
        console.log(res, "res")
        if (res.status == 201) {
          console.log(res.data, "ddaa")
          document.message.success(res.data);
          this.setState({
            showeditdrawer: false
          })
          window.location.reload();
          document.message.error("something went wrong");
        } else {
          console.log("error",)
          document.message.errror("something went wrong");
        }
      }

    ).then(error => {
      console.log(error, "error")
    })
      .catch(error => {
        console.log(error, "error")

      });

  }
  render() {
    return (
     <div>
       {this.state.role == 'employee' ?
      <div
      onClick={this.props.onClickGoal}
        style={{
          minHeight: 138,
          display: "flex",
          fontFamily: "Open Sans Regular",
          boxShadow: "2px 5px 8px #80808057",
          borderRadius: 8,
          zIndex: 3,
          cursor: this.props.cursor ? "pointer" : "default",
          background: "#FFFFFF",
        }}
      >
        <div style={{ flex: 0.12 }}>
          <GoalCard {...this.props} />
        </div>

        <div
          className="descriptionContainer"
          style={{
            flex: 1,
            display: "flex",
          }}
        >
          <div
            style={{
              flex: 1,
              marginLeft: 30,
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "16px 16px 16px 0px",
                alignItems: "center",
              }}
            >
             <div
                style={{
                  fontSize: "1em",
                  color: "#303030",
                }}
              >
                {this.props.title || this.props.goalTitle}
              </div> 
              <div>
                <div
                  style={{
                    padding: "5px 10px",
                    background: "#F4F4FE",
                    fontSize: "0.75em",
                    borderRadius: 4,
                    marginLeft: 14,
                    color: "#7676C1",
                  }}
                >
                  {this.props.type || this.props.goalType}
                </div>
              </div>
            </div>
            <div
              style={{
                padding: "0 10% 6px 0",
                fontSize: "0.875em",
                color: "#828282",
              }}
            >
              {this.props.description || this.props.goalDescription}
            </div>
          </div>
          <div className="timeDateContainer">
            <div className="startDateContainer">
              <div className="dateTitle">Started on</div>
              <div>
                <div style={STYLES.imgAndDate}>
                  <img src={calendar} alt="date" />
                  <div style={STYLES.dateAndTime}>
                    {timeStampToDateTime(this.props.startDate).date}
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <img src={clock} alt="date" />
                  <div style={STYLES.dateAndTime}>
                    {timeStampToDateTime(this.props.startDate).time}
                  </div>
                </div>
              </div>
            </div>
            <div className="endingDateContainer">
              <div className="dateTitle">Ending on1</div>


              <div>
                <div style={STYLES.imgAndDate}>
                  <img src={calendar} alt="date" />
                  <div style={STYLES.dateAndTime}>
                    {timeStampToDateTime(this.props.endDate).date}
                  </div>

                </div>
                <div style={{ display: "flex" }}>
                  <img src={clock} alt="date" />
                  <div style={STYLES.dateAndTime}>
                    {timeStampToDateTime(this.props.endDate).time}
                  </div>
                </div>
              </div>
            </div>
          {this.state.role == 'manager' ?  <div>
              <img
                src={Icon}
                id="Icon"
                onClick={this.showDropDownHandler}
                alt="icon"
                style={{ cursor: "pointer" }}
              />
              <div className="exrtradrop"
                id="dropDownContainer exrtradrop"
                style={{ display: this.state.isClicked ? "flex" : "none" }}
              >
                <div className="lmgauo">
                  <div

                    id="dropDownContainer exrtradrop"
                    style={{ display: this.state.isClicked ? "flex" : "none", top: "0px", right: "0px" }}
                  >
                    <div id="dropDown" >

                      <div className="dropDownItems" onClick={event => this.clickEditHandeler(event)}>Edit</div>
                      <div className="dropDownItems" onClick={event => this.clickHandler(event)}> Delete</div>

                    </div>
                  </div>
                </div>
              </div>
            </div>:''}
            {this.state.showpopup === true && (
              <PopUpDisplay
                popUpHandler={(bool) =>
                  this.removeExistingReportee(
                    bool,
                    this.state.selectedEmployee,
                    this.state.reporteeIndex
                  )
                }
                subTitle={`Are you sure want to Delete `}
              />
            )}

            <Drawer
              title={null}
              placement="right"
              closable={true}
              onClose={this.closeAddEmployeeDrawer}
              visible={this.state.showeditdrawer}
              key="right"
              width="450px"
            >
              <div style={{ width: "100%", height: "100%" }}>
                <div >
                  <div className="container">
                   
                    <div className="title">Edit Goal </div>

                    <div
                      style={{
                        width: "100%",
                        fontSize: "14px",
                        color: "#303030",
                        marginBottom: "7%",
                        marginTop: "10%",
                      }}
                    >

                    </div>
                    <form onSubmit={this.handleSubmit}>
                      <div className="goal-type-container">
                        <div className="sub-title pd-13">
                          Goal Type<span style={{ color: "red" }}>*</span>
                        </div>
                        <div className="goals-icon-container" style={{ display: "flex" }} draggable={false}>
                          {this.state.goalTypes &&
                            this.state.goalTypes.map((eachgoal, index) => (
                              <div

                                className={
                                   this.state.selecedgoal === eachgoal.id
                                    ? "goal-icon-card goal-icon-card-active"
                                    : "goal-icon-card"
                                }
                                key={index}
                                onClick={() =>
                                  this.goalInputHandler("selectedGoalType", eachgoal.id)
                                }
                                draggable={false}
                              >
                                <div>
                                  <img
                                    draggable={false}
                                    src={eachgoal.image}
                                    alt={eachgoal.title}
                                    className={
                                       this.state.selecedgoal === eachgoal.id
                                        ? "goal-type-icon goal-type-icon-active"
                                        : "goal-type-icon"
                                    }
                                  />
                                </div>
                                <div className="goal-icon-title">{eachgoal.title}</div>
                              </div>
                            ))}
                        </div>
                      </div>
                      <div className="sub-title pd-13" >
                        <label>
                          Goal Title:</label><br />
                        <input className="form-control" placeholder="Add Title" type="text" defaultValue={this.props.title ? this.props.title : this.state.title} onChange={this.handleChange} />
                      </div>
                      <div class="sub-title pd-13">
                        <label>
                          Description:</label><br />
                        <textarea className="form-textarea" placeholder="Add Title" type="textArea" defaultValue={this.props.description ? this.props.description : this.state.description} onChange={this.handleChangedescription} />
                      </div>
                      <div className="sub-title pd-13">
                        <label>
                          Start Date: </label><br />
                        <input name="requested_order_ship_date" type={this.state.type}
                          defaultValue={this.state.startDatenew ? this.state.startDatenew : this.props.startDate}
                          className="form-control" onChange={this.handlestartChange} />
                      </div>
                      <div className="sub-title pd-13">
                        <label>
                          End Date:</label><br />
                        <input name="requested_order_ship_date" type={this.state.type1}
                          defaultValue={this.state.endDatenew ? this.state.endDatenew : this.props.endDate}
                          className="form-control" onChange={this.handleendChange} />
                      </div>
                    </form>
                    <div
                      style={{
                        width: "100%",
                        fontFamily: "Open Sans Regular",
                        fontSize: 14,
                        height: "40px",
                      }}
                    >

                    </div>
                    <div id="errorMessage">
                    </div>
                    <div
                      style={{ fontFamily: "Open Sans Semibold", marginTop: "5%" }}
                    >
                      <Button
                        label="Update Goal"
                        status="enable"
                        styles={{
                          color: "#ffffff",
                          backgroundColor: "#FF808B",
                          border: "#F39CA6",
                          height: "40px",
                        }}
                        onClick={this.submitdata}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Drawer> 
          </div>
        </div>
      </div>:<div
        style={{
          minHeight: 138,
          display: "flex",
          fontFamily: "Open Sans Regular",
          boxShadow: "2px 5px 8px #80808057",
          borderRadius: 8,
          zIndex: 3,
          cursor: this.props.cursor ? "pointer" : "default",
          background: "#FFFFFF",
        }}
      >
        <div style={{ flex: 0.12 }}>
          <GoalCard {...this.props} />
        </div>

        <div
          className="descriptionContainer"
          style={{
            flex: 1,
            display: "flex",
          }}
        >
          <div
            style={{
              flex: 1,
              marginLeft: 30,
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "16px 16px 16px 0px",
                alignItems: "center",
              }}
            >
             <div
                style={{
                  fontSize: "1em",
                  color: "#303030",
                }}
              >
                {this.props.title || this.props.goalTitle}
              </div> 
              <div>
                <div
                  style={{
                    padding: "5px 10px",
                    background: "#F4F4FE",
                    fontSize: "0.75em",
                    borderRadius: 4,
                    marginLeft: 14,
                    color: "#7676C1",
                  }}
                >
                  {this.props.type || this.props.goalType}
                </div>
              </div>
            </div>
            <div
              style={{
                padding: "0 10% 6px 0",
                fontSize: "0.875em",
                color: "#828282",
              }}
            >
              {this.props.description || this.props.goalDescription}
            </div>
          </div>
          <div className="timeDateContainer">
            <div className="startDateContainer">
              <div className="dateTitle">Started on</div>
              <div>
                <div style={STYLES.imgAndDate}>
                  <img src={calendar} alt="date" />
                  <div style={STYLES.dateAndTime}>
                    {timeStampToDateTime(this.props.startDate).date}
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <img src={clock} alt="date" />
                  <div style={STYLES.dateAndTime}>
                    {timeStampToDateTime(this.props.startDate).time}
                  </div>
                </div>
              </div>
            </div>
            <div className="endingDateContainer">
              <div className="dateTitle">Ending on1</div>


              <div>
                <div style={STYLES.imgAndDate}>
                  <img src={calendar} alt="date" />
                  <div style={STYLES.dateAndTime}>
                    {timeStampToDateTime(this.props.endDate).date}
                  </div>

                </div>
                <div style={{ display: "flex" }}>
                  <img src={clock} alt="date" />
                  <div style={STYLES.dateAndTime}>
                    {timeStampToDateTime(this.props.endDate).time}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src={Icon}
                id="Icon"
                onClick={this.showDropDownHandler}
                alt="icon"
                style={{ cursor: "pointer" }}
              />
              <div className="exrtradrop"
                id="dropDownContainer exrtradrop"
                style={{ display: this.state.isClicked ? "flex" : "none" }}
              >
                <div className="lmgauo">
                  <div

                    id="dropDownContainer exrtradrop"
                    style={{ display: this.state.isClicked ? "flex" : "none", top: "0px", right: "0px" }}
                  >
                    <div id="dropDown" >

                      <div className="dropDownItems" onClick={event => this.clickEditHandeler(event)}>Edit</div>
                      <div className="dropDownItems" onClick={event => this.clickHandler(event)}> Delete</div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            {this.state.showpopup === true && (
              <PopUpDisplay
                popUpHandler={(bool) =>
                  this.removeExistingReportee(
                    bool,
                    this.state.selectedEmployee,
                    this.state.reporteeIndex
                  )
                }
                subTitle={`Are you sure want to Delete `}
              />
            )}

            <Drawer
              title={null}
              placement="right"
              closable={true}
              onClose={this.closeAddEmployeeDrawer}
              visible={this.state.showeditdrawer}
              key="right"
              width="450px"
            >
              <div style={{ width: "100%", height: "100%" }}>
                <div >
                  <div className="container">
                   
                    <div className="title">Edit Goal </div>

                    <div
                      style={{
                        width: "100%",
                        fontSize: "14px",
                        color: "#303030",
                        marginBottom: "7%",
                        marginTop: "10%",
                      }}
                    >

                    </div>
                    <form onSubmit={this.handleSubmit}>
                      <div className="goal-type-container">
                        <div className="sub-title pd-13">
                          Goal Type<span style={{ color: "red" }}>*</span>
                        </div>
                        <div className="goals-icon-container" style={{ display: "flex" }} draggable={false}>
                          {this.state.goalTypes &&
                            this.state.goalTypes.map((eachgoal, index) => (
                              <div

                                className={
                                   this.state.selecedgoal === eachgoal.id
                                    ? "goal-icon-card goal-icon-card-active"
                                    : "goal-icon-card"
                                }
                                key={index}
                                onClick={() =>
                                  this.goalInputHandler("selectedGoalType", eachgoal.id)
                                }
                                draggable={false}
                              >
                                <div>
                                  <img
                                    draggable={false}
                                    src={eachgoal.image}
                                    alt={eachgoal.title}
                                    className={
                                       this.state.selecedgoal === eachgoal.id
                                        ? "goal-type-icon goal-type-icon-active"
                                        : "goal-type-icon"
                                    }
                                  />
                                </div>
                                <div className="goal-icon-title">{eachgoal.title}</div>
                              </div>
                            ))}
                        </div>
                      </div>
                      <div className="sub-title pd-13" >
                        <label>
                          Goal Title:</label><br />
                        <input className="form-control" placeholder="Add Title" type="text" defaultValue={this.props.title ? this.props.title : this.state.title} onChange={this.handleChange} />
                      </div>
                      <div class="sub-title pd-13">
                        <label>
                          Description:</label><br />
                        <textarea className="form-textarea" placeholder="Add Title" type="textArea" defaultValue={this.props.description ? this.props.description : this.state.description} onChange={this.handleChangedescription} />
                      </div>
                      <div className="sub-title pd-13">
                        <label>
                          Start Date: </label><br />
                        <input name="requested_order_ship_date" type={this.state.type}
                          defaultValue={this.state.startDatenew ? this.state.startDatenew : this.props.startDate}
                          className="form-control" onChange={this.handlestartChange} />
                      </div>
                      <div className="sub-title pd-13">
                        <label>
                          End Date:</label><br />
                        <input name="requested_order_ship_date" type={this.state.type1}
                          defaultValue={this.state.endDatenew ? this.state.endDatenew : this.props.endDate}
                          className="form-control" onChange={this.handleendChange} />
                      </div>
                    </form>
                    <div
                      style={{
                        width: "100%",
                        fontFamily: "Open Sans Regular",
                        fontSize: 14,
                        height: "40px",
                      }}
                    >

                    </div>
                    <div id="errorMessage">
                    </div>
                    <div
                      style={{ fontFamily: "Open Sans Semibold", marginTop: "5%" }}
                    >
                      <Button
                        label="Update Goal"
                        status="enable"
                        styles={{
                          color: "#ffffff",
                          backgroundColor: "#FF808B",
                          border: "#F39CA6",
                          height: "40px",
                        }}
                        onClick={this.submitdata}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Drawer> 
          </div>
        </div>
      </div>}
      </div>
    );
  }
}

export default EmployeeGoalItem;
