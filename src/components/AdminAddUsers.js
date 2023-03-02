import React from "react";
import { useState, useEffect, useRef } from 'react';
import { useLocation, Link,Router,useHistory, Route  } from "react-router-dom";
import moment from "moment";
import { Button, Form, Input, Select, Col, Row, DatePicker,message } from 'antd';
import { decryptData } from "../utils/encryptDecrypt";
import { GetAllCitiesList, GetAllLocationList, GetManagerList,GetAllorgRole, AddOrgEmployee, getAllDepartments, getAlldesignctionByID } from "../core/apiClient/organization/organizationClient";
const { Option } = Select;

const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const App = () => {
  let history = useHistory()
  const [AllCitiesList, setAllCitiesList] = useState([]);
  const [AllLocationList, setAllLocationList] = useState([]);
  const [AllManagerList, setAllManagerList] = useState([]);
  const [managerId, setmanagerId] = useState([]);
  const [DesignctionList, setDesignctionList] = useState([])
  const [DepartmentList, setDepartmentList] = useState([]);
  const [designationdetails, setdesignationdetails] = useState('')
  const [form] = Form.useForm();
  const [EmployeeId, setEmployeeId] = useState('')
  const [Lastname, setLastname] = useState('');
  const [phonenumber, setphonenumber] = useState('');
  const [DOB, setDOB] = useState('');
  const [Role, setRole] = useState('');
  const [EmployeeEmailId, setEmployeeEmailId] = useState('');
  const [CityID, SetCityID] = useState('');
  const [DateOfJoining, setDateOfJoining] = useState('')
  const [MiddleName, setMiddleName] = useState('')
  const [EmailId, setEmailId] = useState('')
  const [Location, setLocation] = useState('')
  const [ReportId, setReportId] = useState('')
  const [Level, setLevel] = useState('')
  const [Gender, setGender] = useState('')
  const [FirstNmae, setFirstNmae] = useState('')
  const [RoleList, setRoleList] = useState([])
  React.useEffect(() => {
    GetAllCities()
    GetManagerListdetails()
    getAlldepartmentList()
    GetAllorgRoleDetails()

  }, []);
  const onFinish = (values) => {
    console.log(values);
  };
  const onReset = () => {
    form.resetFields();
  };
  const GetAllCities = async () => {
    let orgId = decryptData(localStorage.orgId)
    let response = await GetAllCitiesList(orgId, {
    });
    console.log(response.data, "citiesList----")
    setAllCitiesList(response.data)
  }
  
  const GetAllorgRoleDetails = async () => {
    let orgId = decryptData(localStorage.orgId)
    let response = await GetAllorgRole(orgId, {
    });
    console.log(response.data, "Role----")
    setRoleList(response.data)
  }
  const getCitiesList = (e) => {
    GetAlllocation(e)
    SetCityID(e)
  }
  const GetAlllocation = async (e) => {
    let orgId = decryptData(localStorage.orgId)
    let response = await GetAllLocationList(orgId, e, {
    });
    console.log(response.data, "LocationList----")
    setAllLocationList(response.data)
  }
  const GetManagerListdetails = async () => {
    let orgId = decryptData(localStorage.orgId)
    let response = await GetManagerList(orgId, {
    });
    console.log(response.data, "managerList----")
    setAllManagerList(response.data)
  }
  const managerLIst = (e) => {
    setmanagerId(e)
  }
  const getAlldepartmentList = async () => {
    let orgId = decryptData(localStorage.orgId)
    let response = await getAllDepartments(orgId, {
    });
    console.log(response.data)
    setDepartmentList(response.data)
  }
  const getDepartmentdetails = async (e) => {
    let orgId = decryptData(localStorage.orgId)
    let response = await getAlldesignctionByID(orgId, e, {
    });
    console.log(response.data, "designtion----")
    setDesignctionList(response.data)
  }
  const designationdetailsd = (e) => {
    const designation = DesignctionList?.find(u => u.id === e);
    console.log(e, designation)
    setdesignationdetails(designation)
  }

  const onchnageEmployeeId = (e) => {
    console.log(e.target.value)
    setEmployeeId(e.target.value)
  }
  const onchnageLastName = (e) => {
    setLastname(e.target.value)
  }
  const onchangePhoneNumber = (e) => {
    setphonenumber(e.target.value)
  }
  const onchnageDateogBirth = (e) => {
    console.log(e._d)
    let startDate = moment(e._d).format("YYYY-MM-DD")
    setDOB(startDate)
  }
  const onchnageRole = (e, values) => {
    var numberArray = [];
    e.forEach(ele => numberArray.push(+ele))
    setRole(numberArray)

  }
  const onchnageFirstName = (e) => {
    setFirstNmae(e.target.value)
  }
  const OnchnageEmployeeEmailId = (e) => {
    setEmployeeEmailId(e.target.value)
  }
  const onchnageDateOfJoining = (e) => {
    let startDate = moment(e._d).format("YYYY-MM-DD")
    setDateOfJoining(startDate)
  }
  const onchnageMiddleName = (e) => {
    setMiddleName(e.target.value)
  }
  const onchnagepersnalEmailID = (e) => {
    setEmailId(e.target.value)
  }
  const onchangeLocation = (e) => {
    console.log(e)
    setLocation(e)
  }
  const onchnageReportID = (e) => {
    setReportId(e.target.value)
  }
  const onchnageLevel = (e) => {
    setLevel(e.target.value)
  }
  const onchangeGender = (e) => {
    setGender(e)
  }
  const SubmitDetail = async (e) => {
    let orgId = decryptData(localStorage.orgId)
    let data = {
      "employee": {
        "email": EmployeeEmailId,
        "phone": phonenumber,
        "organizationEmployeeId": null,
        "designation": designationdetails.name,
        "employeeTypeId": 2,
        "designationId": designationdetails.id,
        "dateOfJoining": DateOfJoining,
        "probationaryPeriod": 120,
        "dateOfProbationCompletion": "2022-04-20",
        "onboardingCompleted": 0
      },
      "user": {
        "firstName": FirstNmae,
        "lastName": Lastname,
        "middleName": MiddleName,
        "email": EmailId,
        "dob": DOB,
        "phone": phonenumber,
        "gender": Gender
      },
      "config": {
        "managerId": managerId,
        "roleIds": Role,
        "tierId": Location
      }
    }
    console.log(data)
    let response = await AddOrgEmployee(orgId, data, {
    });
    console.log(response)
    if (response.status == 200) {
      message.success({
        content: response.data,
      });
      history.push("./users");
    } else {
      message.error({
        content: "Something Went Wrong ",
      });
    }
  }
  return (
    <div className="MainsideContainer">
      <div >
        <Form form={form} onFinish={onFinish}>
          <Row>

            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
              <Form form={form} name="horizontal_login" >
                <label>Employee Id :</label>
                <Form.Item span={2}
                  name="EmployeeId"
                  rules={[
                    {
                      required: true,
                      message: 'Please Employee Id',
                    },
                  ]}
                >
                  <Input name="EmployeeId" placeholder="Eneter Employee Id" onChange={onchnageEmployeeId} />
                </Form.Item>
                <label>Last Name : </label>
                <Form.Item span={2}
                  name="LastName"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Last Name',
                    },
                  ]}
                >
                  <Input placeholder="Please Enter Last Name" name="LastName" onChange={onchnageLastName} />
                </Form.Item>

                <label>Phone No :</label>
                <Form.Item span={2}
                  name="PhoneNo"
                  rules={[
                    {
                      required: true,
                      message: 'Please Phone No',
                    },
                  ]}
                >
                  <Input placeholder="Enter Phone No" name="PhoneNo" onChange={onchangePhoneNumber} />
                </Form.Item>
                <label>Department :</label>
                <Form.Item>
                  <Select onChange={getDepartmentdetails} placeholder="Select Department">
                    {DepartmentList.map((ele, index) => (<Select.Option value={ele.id}>{ele.name}</Select.Option>))}
                  </Select>
                </Form.Item>
                <label>DOB : </label>
                <Form.Item span={2}>
                  <DatePicker onChange={onchnageDateogBirth} disabledDate={(current) => current.isAfter(moment())} style={{ width: "100%" }} />
                </Form.Item>
                <label>Role :</label>
                <Form.Item>
                  {/* <Select
                    mode="multiple"
                    showArrow
                    onChange={onchnageRole}
                    placeholder="Select Role"
                    style={{
                      width: '100%',
                    }}
                    options={options}
                  /> */}
                  <Select mode="multiple" onChange={onchnageRole} placeholder="Select Department">
                    {RoleList.map((ele, index) => (<Select.Option disabled={ele.name === "OrgAdmin"} value={ele.id}>{ele.name}</Select.Option>))}
                  </Select>
                </Form.Item>

              </Form>
            </Col>




            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
              <Form form={form} name="horizontal_login" >
                <label>First Name :</label>
                <Form.Item span={2}
                  name="Firstname"
                  rules={[
                    {
                      required: true,
                      message: 'Please First Name',
                    },
                  ]}
                >
                  <Input placeholder="Enter First Name" name="Firstname" onChange={onchnageFirstName} />
                </Form.Item>
                <label>Employee Email Id :</label>
                <Form.Item span={2}
                  name="EmailId"
                  rules={[
                    {
                      required: true,
                      message: 'Please Email Id',
                    },
                  ]}
                >
                  <Input placeholder="Enter Email Id" name="EmplyoeeEmailID" onChange={OnchnageEmployeeEmailId} />
                </Form.Item>

                <label>City :</label>
                <Form.Item>
                  <Select onChange={getCitiesList} placeholder="Select City">
                    {AllCitiesList.map((ele, index) => (<Select.Option value={ele.id}>{ele.name}</Select.Option>))}
                  </Select>
                </Form.Item>
                <label>Designation :</label>
                <Form.Item>
                  <Select onChange={designationdetailsd} placeholder="Select Designation">
                    {DesignctionList.map((ele, index) => (<Select.Option value={ele.id}>{ele.name}</Select.Option>))}
                  </Select>
                </Form.Item>
                <label>Date of Joining : </label>
                <Form.Item span={2}>
                  <DatePicker name="doj" onChange={onchnageDateOfJoining} disabledDate={(current) => current.isAfter(moment())} style={{ width: "100%" }} />
                </Form.Item>

                <label>Report To me :</label>
                <Form.Item>
                  <Select onChange={managerLIst} placeholder="Select Manager">
                    {AllManagerList.map((ele, index) => (<Select.Option value={ele.id}>{ele.managerName}</Select.Option>))}

                  </Select>
                </Form.Item>
              </Form>
            </Col>

            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
              <Form form={form} name="horizontal_login" >
                <label>Middle Name :</label>
                <Form.Item span={2}
                  name="MiddleName"
                  rules={[
                    {
                      required: true,
                      message: 'Please Middle Name',
                    },
                  ]}
                >
                  <Input name="middlename" onChange={onchnageMiddleName} placeholder="Please Enter Middle Name" />
                </Form.Item>
                <label>Personal Email ID :</label>
                <Form.Item span={2}
                  name="EmailID"
                  rules={[
                    {
                      required: true,
                      message: 'Please Email ID',
                    },
                  ]}
                >
                  <Input placeholder="Please Enter Email ID" name="peEmailID" onChange={onchnagepersnalEmailID} />
                </Form.Item>
                <label>Location :</label>
                <Form.Item>
                  <Select placeholder="Select Location" onChange={onchangeLocation} showSearch>

                    {AllLocationList.map((ele, index) => (<Select.Option value={ele.id}>{ele.name}</Select.Option>))}

                  </Select>
                </Form.Item>

                <label>Level :</label>
                <Form.Item span={2}
                  name="ReportID"
                  rules={[
                    {
                      required: false,
                      message: 'Please Report Id',
                    },
                  ]}
                >
                  <Input onChange={onchnageLevel} disabled placeholder={designationdetails?.OrganizationDepartmentLevel?.level || 'Enter Level'} initialValues={designationdetails?.OrganizationDepartmentLevel?.level} />
                </Form.Item>

                <label>Gender :</label>
                <Form.Item>
                  <Select placeholder="Select Gender" onChange={onchangeGender}>
                    <Select.Option value="M">Male</Select.Option>
                    <Select.Option value="F">Female </Select.Option>
                  </Select>
                </Form.Item>
                <label>Report To Id :</label>
                <Form.Item span={2}
                  name="ReportID"
                  rules={[
                    {
                      required: false,
                      message: 'Please Report Id',
                    },
                  ]}
                >
                  <Input onChange={onchnageReportID} disabled placeholder={managerId} initialValues={managerId} />
                </Form.Item>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item {...tailLayout}>
                <Button className="mainbtns" type="primary" onClick={SubmitDetail} htmlType="submit">
                  Submit
        </Button>
        
                <Button htmlType="button" className="mainbtnss" onClick={onReset}>
                  Reset
        </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default App;
