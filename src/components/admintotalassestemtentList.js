import React, { Component } from "react";
import AdminUserManagement from "./Admin-User-Management";
import "antd/dist/antd.css";
import Styled from "styled-components";
import "../assets/css/Pagination.css";
import DotedMenu from "../assets/svg/dotedMenu.svg";
import Pagination from "./pagination";
import Hold from "../assets/images/hold.svg";
import Deny from "../assets/images/deny.svg";
import Approve from "../assets/images/approve.svg";
import SearchTextBox from "./SearchTextBox";
import Button from "./Button";
import Api from "../components/goals/employee/api"
import { decryptData } from "../../src/utils/encryptDecrypt";
import DisplayPicture from "../../src/components/DisplayPicture";
import { CSVLink, CSVDownload } from "react-csv";
import DefaultPic from "../assets/images/defaultProfile.svg";
import { Select, DatePicker, Space } from 'antd';
import moment from "moment";

const { RangePicker } = DatePicker;
const { Option } = Select;
const styles = {
    mainContainer: {
        height: "50px",
        display: "flex",
        alignItems: "center",
        fontSize: "16px",
        color: "#303030",
        fontFamily: "Open Sans Regular",
    },
    squareIcon: {
        flex: 0.1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    nameAndProfile: { flex: 0.3, display: "flex", alignItems: "left" },
    designation: { flex: 0.5, paddingRight: "30px" },
    department1: { flex: 0.6 },
    department2: { flex: 0.6, paddingLeft: "10px" },
    score: { flex: 0.4 },
    role: { flex: 0.5, display: "flex", fontSize: 14 },
    date: { flex: 0.5 },
    status: { flex: 0.3 },
    dotsIcon: { flex: 0.05, zIndex: 3, outline: "none" },
    rowsSelector: {
        width: "60px",
        borderRadius: "4px",
        color: "#303030",
        marginLeft: "14px",
    },
    checkBox: {
        fontSize: "20px",
        color: "#B2B2B2",
        background: "#F7F7F7",
    },
    paginationContainer: {
        height: "50px",
        display: "flex",
        alignItems: "center",
    },
    pagination: {
        flex: 1,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    checkBoxIcon: {
        flex: 0.1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    CheckBox: {
        fontSize: "20px",
        color: "#B2B2B2",
        background: "#F7F7F7",
    },
    department1: { flex: 0.6 },
    department2: { flex: 0.6, paddingLeft: "10px" },
    department: { flex: 0.5, paddingLeft: "20px" },
    score: { flex: 0.4 },
    role: { flex: 0.5, display: "flex", fontSize: 14 },
    date: { flex: 0.5 },
    status: { flex: 0.3 },
    dotsIcon: { flex: 0.05, zIndex: 3, outline: "none" },
    popUpContainer: {
        position: "absolute",
        right: "2%",
        top: "65%",
        height: "74px",
        width: "121px",
        borderRadius: "8px",
        boxShadow: " 1px 4px 12px #00000027",
        background: "#FFFFFF",
        display: "flex",
        color: "#303030",
        flexDirection: "column",
        justifyContent: " space-evenly",
        paddingLeft: "12px",
        zIndex: 4,
    },
};


class AdminUserManagementTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totolassesmentlist: [],
            NoOfRows: [15, 30, 60],
            rowsFrom: 0,
            page: this.props.page,
            defaultCurrent: this.props.page,
            pageSize: null,
            rowsPerPage: this.props.rowsPerPage,
            rowsUpTo: null,
            errorMsg: '',
            month: 7,
            searchInput: '',

            lastPage: false,
            firstPage: true,
            selectedSubNavLink: {
                title: "approved",
                count: "",
            },
        };
        this.handleChange = this.handleChange.bind(this)
    }

    static getDerivedStateFromProps = (props, state) => {
        return {
            defaultCurrent: props.page,
            page: props.page,
            rowsPerPage: props.rowsPerPage,
            lastPage: props.totalEmployeeCount > state.rowsUpTo ? false : true,
            firstPage: props.page === 1 ? true : false,
        };
    };
    componentDidMount = () => {
        this.setState({
            rowsUpTo: this.state.rowsPerPage,
            pageSize: this.state.rowsPerPage,
        });
        this.getadminassessmentlist()
    };
    getadminassessmentlist = () => {
        let orgId = decryptData(localStorage.orgId)
        let managerId = decryptData(localStorage.employeeId);
        let token = decryptData(localStorage.token);
        Api.getassessmentlistdetsilsforadmin(orgId, managerId, token).then(
            res => {
                console.log(res, "res")
                if (res.status == 200) {
                    console.log(res.data.data, "ddaa")
                    this.setState({
                        totolassesmentlist: res.data.data
                    })
                    console.log(this.state.totolassesmentlist)
                } else {
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

    optionHandler = (e, index) => {
        e.preventDefault();
        let rowsUpTo, option;
        if (this.props.totalEmployeeCount > this.state.NoOfRows[index]) {
            rowsUpTo = this.state.NoOfRows[index];
        } else {
            rowsUpTo = this.props.totalEmployeeCount;
        }
        option = this.state.NoOfRows[index];
        let noOfRecords = this.props.totalEmployeeCount;
        let lastPage = Math.ceil(noOfRecords / option);
        if (this.state.page === lastPage) {
            this.setState(
                {
                    rowsPerPage: option,
                    rowsFrom: 0,
                    rowsUpTo,
                    defaultCurrent: 1,
                    firstPage: true,
                    lastPage: true,
                },
                () => this.props.paginationHandler(option, 1)
            );
        } else {
            this.setState(
                {
                    rowsPerPage: option,
                    rowsFrom: 0,
                    rowsUpTo,
                    defaultCurrent: 1,
                    firstPage: true,
                    lastPage: false,
                },
                () => this.props.paginationHandler(option, 1)
            );
        }
    };
    paginationHandler = (page, pageSize) => {
        let noOfRecords = this.props.totalEmployeeCount;
        let rowsPerPage = this.state.rowsPerPage;
        let lastPage = Math.ceil(noOfRecords / rowsPerPage);
        if (page === 1) {
            this.setState({
                rowsFrom: 0,
                defaultCurrent: page,
                rowsUpTo: this.state.rowsPerPage,
                page: page,
                pageSize: pageSize,
                firstPage: true,
                lastPage: false,
            });
        } else if (lastPage === page) {
            this.setState({
                lastPage: true,
                firstPage: false,
                defaultCurrent: lastPage,
                rowsFrom: (lastPage - 1) * this.state.rowsPerPage,
                rowsUpTo: this.props.totalEmployeeCount,
            });
        } else if (lastPage !== page) {
            this.setState({
                rowsFrom: pageSize * (page - 1),
                rowsUpTo: page * this.state.rowsPerPage,
                page: page,
                defaultCurrent: page,
                pageSize: pageSize,
                firstPage: false,
                lastPage: false,
            });
        }
        this.props.paginationHandler(pageSize, page);
    };
    jumpPageHandler = (value) => {
        if (value === "lastPage") {
            let noOfRecords = this.props.totalEmployeeCount;
            let rowsPerPage = this.state.rowsPerPage;
            let lastPage = Math.ceil(noOfRecords / rowsPerPage);
            this.setState(
                {
                    defaultCurrent: lastPage,
                    rowsFrom: (lastPage - 1) * this.state.rowsPerPage,
                    rowsUpTo: this.props.totalEmployeeCount,
                    firstPage: false,
                    lastPage: true,
                },
                () => this.props.paginationHandler(this.state.rowsPerPage, lastPage)
            );
        } else {
            this.setState(
                {
                    defaultCurrent: 1,
                    rowsFrom: 0,
                    rowsUpTo: this.state.rowsPerPage,
                    firstPage: true,
                    lastPage: false,
                },
                () => this.props.paginationHandler(this.state.rowsPerPage, 1)
            );
        }
    };
    searchInputHandler = (event) => {
        this.setState({ searchInput: event?.target.value })
        let searchstring = event?.target.value ? event?.target.value : this.state.searchInput
        let orgId = decryptData(localStorage.orgId)
        let managerId = decryptData(localStorage.employeeId);
        let token = decryptData(localStorage.token);
        Api.getAssessmentlistsAdminSearch(orgId, managerId, token, this.state.month, searchstring).then(
            res => {
                console.log(res, "res")
                if (res.status == 200) {
                    console.log(res.data.data, "ddaa")
                    this.setState({
                        totolassesmentlist: res.data.data
                    })
                    console.log(this.state.totolassesmentlist)
                } else {
                    document.message.errror("something went wrong");
                }
            }

        ).then(error => {
            console.log(error, "error")
        })
            .catch(error => {
                console.log(error, "error")
                this.setState({ errorMsg: 'No data found', totolassesmentlist: [] })
                console.log(this.state.errorMsg,)
            });
    };
    handleChange = (value) => {
        let searchstring = this.state.searchInput
        let orgId = decryptData(localStorage.orgId)
        let managerId = decryptData(localStorage.employeeId);
        let token = decryptData(localStorage.token);
        Api.getAssessmentlistsAdminSearch(orgId, managerId, token, value, searchstring).then(
            res => {
                console.log(res, "res")
                if (res.status == 200) {
                    console.log(res.data.data, "ddaa")
                    this.setState({
                        totolassesmentlist: res.data.data,
                        month: value
                    })
                    console.log(this.state.totolassesmentlist)
                } else {
                    document.message.errror("something went wrong");
                }
            }

        ).then(error => {
            console.log(error, "error")
        })
            .catch(error => {
                console.log(error, "error")
                this.setState({ errorMsg: 'No data found', totolassesmentlist: [] })
                console.log(this.state.errorMsg,)
            });
    }
    fromToDate = (e) => {
        console.log(e[1]._d, e[0]._d)
        let startDate = moment(e[0]._d).format("YYYY/MM/DD")
        let endDate = moment(e[1]._d).format("YYYY/MM/DD")
        let orgId = decryptData(localStorage.orgId)
        let managerId = decryptData(localStorage.employeeId);
        let token = decryptData(localStorage.token);
        Api.getAssessmentlistsAdminSearchByDate(orgId, managerId, token, startDate, endDate).then(
            res => {
                console.log(res, "res")
                if (res.status == 200) {
                    console.log(res.data.data, "ddaa")
                    this.setState({
                        totolassesmentlist: res.data.data
                    })
                    console.log(this.state.totolassesmentlist)
                } else {
                    document.message.errror("something went wrong");
                }
            }

        ).then(error => {
            console.log(error, "error")
        })
            .catch(error => {
                console.log(error, "error")
                this.setState({ errorMsg: 'No data found', totolassesmentlist: [] })
                console.log(this.state.errorMsg,)
            });
    }
    render() {
        return (

            <div style={{ background: "#F8F8F8" }}>
                <div className="userListTitleContainer daysSearch" >
                    <div id="userFilterContainer" style={{ display: "flex", justifyContent: "flex-end", alignContent: "flex-end", paddingRight: "10px", paddingBottom: "20px" }}>
                        <div
                            style={{
                                width: 200,
                                fontFamily: "Open Sans Regular",
                                fontSize: 14,
                                margin: "0 2%",
                                color: "#303030",
                            }}
                        >
                            <Select defaultValue="7" style={{
                                width: "200px",
                                fontFamily: "Open Sans Regular",
                                fontSize: 14,
                                backgroundColor: "#ffffff",
                                justifyContent: "left",
                                float: "left",
                                margin: "0 2%",
                                color: "#303030",
                            }} onChange={this.handleChange}>
                                <Option value="0" disabled>Select days</Option>
                                <Option value="7">7 Days</Option>
                                <Option value="15">15 Days</Option>
                                <Option value="30">30 Days </Option>
                                <Option value="60">60 Days</Option>
                                <Option value="90">90 Days</Option>
                            </Select>
                        </div>
                        <Space direction="vertical" size={12}>
                            <RangePicker onChange={this.fromToDate} style={{ padding: "8px" }} />
                        </Space>
                        <div
                            style={{
                                width: 327,
                                fontFamily: "Open Sans Regular",
                                fontSize: 14,
                                margin: "0 2%",
                                color: "#303030",
                            }}
                        >
                            <SearchTextBox
                                placeHolder="Search employee"
                                value={this.state.searchInput}
                                style={{
                                    color: {
                                        hover: "#F4A6AE",
                                    },
                                }}
                                keybordKeyHandler={null}
                                // onChange={e => this.searchInputHandler()}
                                searchInputHandler={this.searchInputHandler}
                            />
                        </div>
                        <div style={{ width: 134 }} onClick={this.openDrawer}>
                            {/* <Button
                  label={
                    this.state.userLink === "User" ? "Search" : "Search"
                  }
                  status="enable"
                  styles={{
                    color: "#ffffff",
                    backgroundColor: "#F17E8A",
                    border: "#F39CA6",
                    height: "40px",
                  }}
                /> */}
                            <CSVLink className="csv" styles={{
                                color: "#ffffff",
                                backgroundColor: "#F17E8A",
                                border: "#F39CA6",
                                height: "40px",
                            }} data={this.state.totolassesmentlist}>Download CSV</CSVLink>
                        </div>
                    </div>
                </div>
                <div style={styles.mainContainer}>

                    <div style={styles.squareIcon}></div>
                    <div style={styles.department}>
                        <div><b style={{ left: "1em", position: "relative" }}>Name</b></div>
                    </div>
                    <div style={styles.department}><b style={{ left: "6px", position: "relative" }}>Department</b></div>
                    <div style={styles.department}><b style={{ left: "2px", position: "relative" }}>Technical</b></div>
                    <div style={styles.department}><b style={{ left: "2px", position: "relative" }}>Interpersonal</b></div>
                    <div style={styles.department}><b style={{ left: "3px", position: "relative" }}>Stakeholder</b></div>
                    <div style={styles.department}>
                        <div ><b style={{ left: "15px", position: "relative" }}>Skillscore</b></div>
                    </div>

                    <div style={styles.dotsIcon}></div>
                </div>
                {/* </div>
</div> */}
                <div style={{ height: "480px", overflowY: "auto" }}>
                    {this.state.totolassesmentlist ? this.state.totolassesmentlist.map((ele, index) => (
                        <div style={styles.mainContainer} className="table">
                            <div style={styles.squareIcon}></div>
                            <div style={styles.department}>
                                <td style={{ flex: 0.9, display: "flex", alignItems: "center" }}>
                                    <div
                                        style={{
                                            flex: 0.25,
                                            display: "flex",
                                            justifyContent: "flex-end",
                                        }}
                                    >
                                        <div
                                            style={{
                                                height: 34,
                                                width: 34,
                                                marginRight: "20%",
                                            }}
                                        >
                                            <DisplayPicture profile={ele.profilePicture == "" ? this.props.profilePicture : "https://dk91y438j4an1.cloudfront.net/" + ele.profilePicture ? "https://dk91y438j4an1.cloudfront.net/" + ele.profilePicture : this.props.profilePicture} onError={(e) => { e.target.onerror = null; e.target.src = DefaultPic }} />
                                        </div>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ flex: 1, marginBottom: "1%" }}>
                                            {ele.firstName ? ele.firstName + " " : " "}
                                            {ele.middleName ? ele.middleName + " " : " "}
                                            {ele.lastName ? ele.lastName : " "}
                                        </div>
                                        <div style={{ fontSize: "0.858em", color: "#767676" }}>
                                            {ele.designation ? ele.designation : ele.designation}
                                        </div>
                                    </div>
                                </td>
                            </div>
                            <div style={styles.department}>{ele.department}</div>
                            <div style={styles.department}>{ele.technical ? ele.technical : '--'}</div>
                            <div style={styles.department}>{ele.interpersonal ? ele.interpersonal : '--'}</div>
                            <div style={styles.department}>{ele.stakeholder ? ele.stakeholder : '--'}</div>
                            {/* ÷ <div style={styles.date}>{ele.testSectionWiseReport?.sections[0].sectionName} {ele.testSectionWiseReport.sections[1]?.sectionName ? '/' : ""} {ele.testSectionWiseReport.sections[1]?.sectionName}</div> */}
                            <div style={styles.department}>
                                <div style={{ paddingLeft: "14px" }}><b>{ele.skillScore ? ele.skillScore : 'not available'}</b></div>
                            </div>
                            {/* <div style={styles.dotsIcon}></div> */}
                        </div>
                    )) : this.state.errorMsg}
                </div>

                {/* <div>
<Pagination
rowsPerPage={this.state.rowsPerPage}
rowsFrom={this.props.page === 1 ? 0 : this.state.rowsFrom}
rowsUpTo={
this.props.page === 1
? this.state.rowsPerPage
: this.state.rowsUpTo
}
{...this.state}
{...this.props}
tableData={this.state.userData}
PaginationHandler={this.paginationHandler}
jumpPageHandler={this.jumpPageHandler}
optionHandler={this.optionHandler}
userMgmt={true}
/>
</div> */}
            </div>
        );
    }
}

export default AdminUserManagementTable;
