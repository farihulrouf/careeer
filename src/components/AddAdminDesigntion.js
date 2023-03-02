import React from "react";
import styled from "styled-components";
import { useLocation, Link, useParams } from "react-router-dom";
import { Button, Space, Form, Input, Drawer, Modal, message, Table, Divider, Row, Col, Select, Tag } from 'antd';
import { useState, useEffect, useRef } from 'react';
import 'antd/dist/antd.css';
import { TweenOneGroup } from 'rc-tween-one';
import { MinusCircleOutlined, PlusOutlined, PlusCircleOutlined, EditOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { InboxOutlined } from "@ant-design/icons";
import { decryptData } from "../utils/encryptDecrypt";
import { getUpwordCarrerPath, getAllDepartments, getAllSkills, EditSkills, createSkiils, GetAllupworddetailsByDesigntionID, createdesigntion, getAlldesignctionByID, getAllMetaDataDetails, getLateralCarrerPath } from "../core/apiClient/organization/organizationClient";
const { TextArea } = Input;
const { Option } = Select;
const { Column, ColumnGroup } = Table;
const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [DesignctionList, setDesignctionList] = useState([]);
  const [UpwordCarrerPath, setUpwordCarrerPath] = useState([]);
  const [LateralCarrerPath, setLateralCarrerPath] = useState([]);
  const [AllSkillsList, setAllSkillsList] = useState([]);
  const [MetaData, setMetaData] = useState([]);
  const [competency, setcompetency] = useState([]);
  const [tags, setTags] = useState([]);
  const [skillstype, setskillstype] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [tags1, setTags1] = useState([]);
  const [inputVisible1, setInputVisible1] = useState(false);
  const [inputValue1, setInputValue1] = useState('');
  const inputRef1 = useRef(null);
  const [tags2, setTags2] = useState([]);
  const [inputVisible2, setInputVisible2] = useState(false);
  const [inputValue2, setInputValue2] = useState('');
  const inputRef2 = useRef(null);
  const [desingtionID, SetdesingtionID] = useState('')
  const [tagsAddskills, setTagsAddskills] = useState([]);
  const [inputVisibleAddskills, setInputVisibleAddskills] = useState(false);
  const [inputValueAddskills, setInputValueAddskills] = useState('');
  const inputRefAddskills = useRef(null);
  const [tags3, setTags3] = useState([]);
  const [inputVisible3, setInputVisible3] = useState(false);
  const [inputValue3, setInputValue3] = useState('');
  const inputRef3 = useRef(null);
  const inputRef = useRef(null);
  const [form] = Form.useForm();
  const [editedDetails, seteditedDetails] = useState('')
  const [EditedSklls, setEditedSklls] = useState('')
  const { id } = useParams();
  const [editbleSkills, SeteditbleSkills] = useState([])
  const [designtionname, setdesigntionname] = useState("")
  const [techcomptencyskills, settechcomptencyskills] = useState("")
  const [techcomptencyskillsname, settechcomptencyskillsname] = useState("")
  const [funcomptencyskillsname, setfuncomptencyskillsname] = useState("")
  const [funcomptencyskills, setfuncomptencyskills] = useState("")
  const [Intercomptencyskills, setInteruncomptencyskills] = useState("")
  const [Interuncomptencyskillsname, setInteruncomptencyskillsname] = useState("")
  const [Stakecomptencyskills, setStakecomptencyskills] = useState("")
  const [Stakecomptencyskillsname, setStakecomptencyskillsname] = useState("")
  const [upwordleveldetails, setupwordleveldetails] = useState("")
  const [DepartmentList, setDepartmentList] = useState([])
  const [uplateralDestintion, setuplateralDestintion] = useState([])
  const [laterallevel, setlaterallevel] = useState('')
  const [TheArray, setTheArray] = useState([])
  const [deptlevelID, setdeptlevelID] = useState([]);
  const [technicalSkills, settechnicalSkills] = useState([]);
  const [upwordandlatteraldetails, setupwordandlatteraldetails] = useState([]);
  const [iseditModalVisible, setIeditsModalVisible] = useState(false);
  const [isAddskillsModalVisible, setisAddskillsModalVisible] = useState(false)
  const [SkillTypeID, setSkillTypeID] = useState('')
  const [designtionIDBycarrerpath, setdesigntionIDBycarrerpath] = useState('')
  const styles = {
    mainContainer: {
      height: "100px",
      display: "flex",
      alignItems: "center",
      fontSize: "16px",
      color: "#303030",
      fontFamily: "Open Sans Regular",
    },
    mainContainer1: {
      height: "100px",
      display: "flex",
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
    department: { flex: 0.5, paddingLeft: "20px", },
    department1: { flex: 0.2, paddingLeft: "20px" },
    skillsdepartmet: { flex: 0.5, padding: "20px 0px", height: "100px", overflow: "auto" },
    score: { flex: 0.5 },
    score1: { flex: 0.2 },
    role: { flex: 0.5 },
    date: { flex: "0.5, 1, 1% ", paddingRight: "12px" },
    date1: { flex: "0.2, 1, 1% ", },
    date12: { flex: "0.2, 1, 1% ",left:"35px", position:"inherit"},
    dotsIcon: { flex: 0.15 },
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
      totolassesmentlist: []
    },
  };
  const showModal = async (e) => {
    console.log(e)
    setIsModalVisible(true);
    seteditedDetails(e)
    GetAllSkills(e)
  }
  const GetAllSkills = async (e) => {
    let orgId = decryptData(localStorage.orgId)
    let response = await getAllSkills(orgId, e, {
    });
    console.log(response.data, "skills----", response.data.Technical)
    setAllSkillsList(response.data)
  }
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showModal1 = (e) => {
    console.log(e, "eee")
    setIsModalVisible1(true);
    // getUpwordCareer(e)
    // getLateralCareer(e)
    setdesigntionIDBycarrerpath(e.name)
    getAllupworddetailsByDesigntionIDdetails(e.id)
  };
  const handleOk1 = () => {
    setIsModalVisible1(false);
  };
  const handleCancel1 = () => {
    setIsModalVisible1(false);
  };
  const showModal2 = () => {
    setIsModalVisible2(true);
  };
  const handleOk2 = () => {
    setIsModalVisible2(false);
  };
  const handleCancel2 = () => {
    setIsModalVisible2(false);
  };
  useEffect(() => {
    getAlldesignctionByIDDetais()
    getAllMetaData()
    getAlldepartmentList()
  }, [id]);
  const getAlldesignctionByIDDetais = async () => {
    let orgId = decryptData(localStorage.orgId)
    let response = await getAlldesignctionByID(orgId, id, {
    });
    console.log(response.data, "designtion----")
    setDesignctionList(response.data)
  }
  const getAllupworddetailsByDesigntionIDdetails = async (e) => {
    let orgId = decryptData(localStorage.orgId)
    let response = await GetAllupworddetailsByDesigntionID(orgId, e, {
    });
    console.log(response.data, "upword Details----")
    setupwordandlatteraldetails(response.data)
  }
  const getAlldesignctionByUpwordDept = async (vid) => {
    let orgId = decryptData(localStorage.orgId)
    let response = await getAlldesignctionByID(orgId, vid, {
    });
    console.log(response.data, "designtion----")
    setuplateralDestintion(response.data)
  }
  const getUpwordCareer = async (e) => {
    let levelID = e || 1
    let orgId = decryptData(localStorage.orgId)
    let response = await getUpwordCarrerPath(orgId, id, levelID, {
    })
    console.log(response.data, "getUpwordCareer")
    setUpwordCarrerPath(response.data)
  };
  const getLateralCareer = async (e) => {
    let levelID = e || 1
    let orgId = decryptData(localStorage.orgId)
    let response = await getLateralCarrerPath(orgId, id, levelID, {
    })
    console.log(response.data, "LateralCarrerPath")
    setLateralCarrerPath(response.data)
  };
  const getAllMetaData = async () => {
    let orgId = decryptData(localStorage.orgId)
    let response = await getAllMetaDataDetails(orgId, {
    })
    console.log(response.data, response.data.skillType, response.competency, "Meta data")
    setMetaData(response.data);
    setskillstype(response.data.skillType);
    setcompetency(response.data.competency)
  }
  const onChangetext = (e) => {
    console.log('Change:', e.target.value);
  };
  const onFinish = (values) => {
    console.log('Received values of form:', values);
  }

  const onFinish1 = (values) => {
    console.log('Received values of form:', values);
  }
  const location = useLocation();
  // ===========================================================technical skills =============================
  // const handleClose = (removedTag) => {
  //   const newTags = tags.filter((tag) => tag !== removedTag);
  //   console.log(newTags);
  //   setTags(newTags);
  // };

  // const showInput = () => {
  //   setInputVisible(true);
  // };

  const handleInputChange = (e) => {
    setTags(e.target.value);
  };

  // const handleInputConfirm = () => {
  //   if (inputValue && tags.indexOf(inputValue) === -1) {
  //     setTags([...tags, inputValue]);
  //   }

  //   setInputVisible(false);
  //   setInputValue('');
  // };

  // const forMap = (tag) => {
  //   const tagElem = (
  //     <Tag
  //       closable
  //       onClose={(e) => {
  //         e.preventDefault();
  //         handleClose(tag);
  //       }}
  //     >
  //       {tag}
  //     </Tag>
  //   );
  //   return (
  //     <span
  //       key={tag}
  //       style={{
  //         display: 'inline-block',
  //       }}
  //     >
  //       {tagElem}
  //     </span>
  //   );
  // };
  // const tagChild = tags.map(forMap);
  // ================================================Function skills ===========================================================
  // const handleClose1 = (removedTag) => {
  //   const newTags1 = tags1.filter((tag) => tag !== removedTag);
  //   console.log(newTags1);
  //   setTags1(newTags1);
  // };

  // const showInput1 = () => {
  //   setInputVisible1(true);
  // };

  const handleInputChange1 = (e) => {
    setTags1(e.target.value);
  };

  // const handleInputConfirm1 = () => {
  //   if (inputValue1 && tags1.indexOf(inputValue1) === -1) {
  //     setTags1([...tags1, inputValue1]);
  //   }

  //   setInputVisible1(false);
  //   setInputValue1('');
  // };

  // const forMap1 = (tag) => {
  //   const tagElem = (
  //     <Tag
  //       closable
  //       onClose1={(e) => {
  //         e.preventDefault1();
  //         handleClose1(tag);
  //       }}
  //     >
  //       {tag}
  //     </Tag>
  //   );
  //   return (
  //     <span
  //       key={tag}
  //       style={{
  //         display: 'inline-block',
  //       }}
  //     >
  //       {tagElem}
  //     </span>
  //   );
  // };
  // const tagChild1 = tags1.map(forMap1);
  // useEffect(() => {
  //   console.log(tags, tags1)
  // }, [tags1, tags])
  // ==================================================interpersanal skills =============================================

  // const handleClose2 = (removedTag) => {
  //   const newTags2 = tags2.filter((tag) => tag !== removedTag);
  //   console.log(newTags2, "-----");
  //   setTags2(newTags2);
  // };

  // const showInput2 = () => {
  //   setInputVisible2(true);
  // };

  const handleInputChange2 = (e) => {
    console.log(e.target.value)
    setTags2(e.target.value);
  };

  // const handleInputConfirm2 = () => {
  //   if (inputValue2 && tags2.indexOf(inputValue2) === -1) {
  //     setTags2([...tags2, inputValue2]);
  //   }

  //   setInputVisible2(false);
  //   setInputValue2('');
  // };

  // const forMap2 = (tag) => {
  //   const tagElem = (
  //     <Tag
  //       closable
  //       onClose2={(e) => {
  //         e.preventDefault2();
  //         handleClose2(tag);
  //       }}
  //     >
  //       {tag}
  //     </Tag>
  //   );
  //   return (
  //     <span
  //       key={tag}
  //       style={{
  //         display: 'inline-block',
  //       }}
  //     >
  //       {tagElem}
  //     </span>
  //   );
  // };
  // const tagChild2 = tags2.map(forMap2);
  // ===============================================================stake holder ==============================================

  const handleCloseAddskills = (removedTag) => {
    const newTagsAddskills = tagsAddskills.filter((tag) => tag !== removedTag);
    console.log(newTagsAddskills, "-----");
    setTagsAddskills(newTagsAddskills);
  };

  const showInputAddskills = () => {
    setInputVisibleAddskills(true);
  };

  const handleInputChangeAddskills = (e) => {
    setInputValueAddskills(e.target.value);
  };

  const handleInputConfirmAddskills = () => {
    if (inputValueAddskills && tagsAddskills.indexOf(inputValueAddskills) === -1) {
      setTagsAddskills([...tagsAddskills, inputValueAddskills]);
    }

    setInputVisibleAddskills(false);
    setInputValueAddskills('');
  };

  const forMapAddskills = (tag) => {
    const tagElem = (
      <Tag
        closable
        onCloseAddskills={(e) => {
          e.preventDefaultAddskills();
          handleCloseAddskills(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span
        key={tag}
        style={{
          display: 'inline-block',
        }}
      >
        {tagElem}
      </span>
    );
  };
  const tagChildAddskills = tagsAddskills.map(forMapAddskills);




  // ======================================================addskills =============================================================
  // const handleClose3 = (removedTag) => {
  //   const newTags3 = tags3.filter((tag) => tag !== removedTag);
  //   console.log(newTags3);
  //   setTags3(newTags3);
  // };

  // const showInput3 = () => {
  //   setInputVisible3(true);
  // };

  const handleInputChange3 = (e) => {
    setTags3(e.target.value);
  };

  // const handleInputConfirm3 = () => {
  //   if (inputValue3 && tags3.indexOf(inputValue3) === -1) {
  //     setTags3([...tags3, inputValue3]);
  //   }

  //   setInputVisible3(false);
  //   setInputValue3('');
  // };

  // const forMap3 = (tag) => {
  //   const tagElem = (
  //     <Tag
  //       closable
  //       onClose3={(e) => {
  //         e.preventDefault3();
  //         handleClose3(tag);
  //       }}
  //     >
  //       {tag}
  //     </Tag>
  //   );
  //   return (
  //     <span
  //       key={tag}
  //       style={{
  //         display: 'inline-block',
  //       }}
  //     >
  //       {tagElem}
  //     </span>
  //   );
  // };
  // const tagChild3 = tags3.map(forMap3);
  const getLevelDetails = (e) => {
    console.log(e)
    setdeptlevelID(e)
    getUpwordCareer(e)
  }
  const onsubmitDesigntion = (e) => {
    setdesigntionname(e.target.value)
  }
  const techcomptencyskillsdetails = (e) => {
    settechcomptencyskills(e.id)
    settechcomptencyskillsname(e.name)
  }
  const Funcomptencyskillsdetails = (e) => {
    setfuncomptencyskills(e.id)
    setfuncomptencyskillsname(e.name)
  }
  const Intercomptencyskillsdetails = (e) => {
    setInteruncomptencyskills(e.id)
    setInteruncomptencyskillsname(e.name)
  }
  const stakecomptencyskillsdetails = (e) => {
    setStakecomptencyskills(e.id)
    setStakecomptencyskillsname(e.name)
  }
  const getupwordlevel = (e) => {
    const user = UpwordCarrerPath?.find(u => u.id === e);
    // console.log(e, user)
    setupwordleveldetails(user)
  }
  useEffect(() => {
    // console.log(TheArray, "finalArray", tags, tags1, tags2, tags3,tagsAddskills)
  })
  const getAlldepartmentList = async () => {
    let orgId = decryptData(localStorage.orgId)
    let response = await getAllDepartments(orgId, {
    });
    // console.log(response.data)
    setDepartmentList(response.data)
  }
  const lateralDesigntionList = (e) => {
    let x = []
    const laterallevel = uplateralDestintion.find(u => u.id === e);
    // console.log(e, laterallevel)
    setlaterallevel(laterallevel?.OrganizationDepartmentLevel?.level)
    setTheArray(x => [...x, e]);
    // console.log(x, "cccc", TheArray)
  }
  // ==================================================================tags over ====================================================
  const onsubmit = async () => {
    let orgId = decryptData(localStorage.orgId)
    let data = {
      "name": designtionname,
      "departmentLevelId": deptlevelID,
      "upwardforwardDesignationId": upwordleveldetails.id,
      "lateralforwardDesignationIds": TheArray,
      "skills": [{
        "name": tags,
        "skillTypeId": 1,
        "competencyId": techcomptencyskills
      },
      {
        "name": tags1,
        "skillTypeId": 2,
        "competencyId": funcomptencyskills
      },
      {
        "name": tags2,
        "skillTypeId": 3,
        "competencyId": Intercomptencyskills
      },
      {
        "name": tags3,
        "skillTypeId": 4,
        "competencyId": Stakecomptencyskills
      }
      ]
    }
    // console.log(data);
    let response = await createdesigntion(orgId, id, data, {
    });
    // console.log(response)
    if (response.status == 200) {
      // console.log(response.data)
      handleCancel2()
      getAlldesignctionByIDDetais()
      message.loading({
        content: response.data,
      });
      setTimeout(() => {
        message.success({
          content: 'Done!',
          duration: 2,
        });
      }, 1000);
    } else if (response.status == 300) {
      message.loading({
        content: response.data,
      });
      setTimeout(() => {
        message.success({
          content: 'Done!',
          duration: 2,
        });
      }, 1000);
    } else {
      message.loading({
        content: "something went Wrong",
      });
      setTimeout(() => {
        message.success({
          content: 'Done!',
          duration: 2,
        });
      }, 1000);
    }
  }
  const showeditModal = (e, f) => {
    console.log(e, f)
    SeteditbleSkills(e)
    // setSkillTypeID(e)

    setIeditsModalVisible(true);
  };
  const edithandleOk = () => {
    setIeditsModalVisible(false);
  };
  const handleeditCancel = () => {
    setIeditsModalVisible(false);
  };


  const showAddskillsModal = (e, f) => {
    console.log(e, f)
    setisAddskillsModalVisible(true);
    setSkillTypeID(e)
    SetdesingtionID(f)
  };
  const AddskillshandleOk = () => {
    setisAddskillsModalVisible(false);
  };
  const handleAddskillsCancel = () => {
    setisAddskillsModalVisible(false);
  };



  const SubmitSkills = async (e) => {
    // console.log(e.Skill.id)
    let data = { "name": EditedSklls }
    let orgId = decryptData(localStorage.orgId)
    let response = await EditSkills(orgId, e.id, data, {
    });
    // console.log(response)
    if (response.status == 200) {
      handleeditCancel()
      GetAllSkills(editedDetails)
      message.success({
        content: response.data,
      });
    } else {
      message.error({
        content: "Something Went Wrong ",
      });
    }
  }
  const OnchnageSkills = (e) => {
    // console.log(e.target.value)
    setEditedSklls(e.target.value)
  }
  const submitSkills = async () => {
    let orgId = decryptData(localStorage.orgId)
    let data = {
      "name": tagsAddskills,
      "skillTypeId": SkillTypeID
    }
    let response = await createSkiils(orgId, desingtionID, data, {
    });
    console.log(data, response)
    if (response.status == 200) {
      handleAddskillsCancel()
      setTagsAddskills([])
      GetAllSkills(editedDetails)
      message.success({
        content: response.data,
      });
    } else {
      message.error({
        content: "Something Went Wrong ",
      });
    }
  }
  return (
    <div style={{ padding: "20px 20px 0 20px" }}>
      <div
        style={{
          display: "flex",
          marginTop: "18px",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <div
          style={{
            flex: 1,
            fontSize: "26px",
            fontWeight: "bold",
            color: "#303030",
            fontFamily: "Open Sans SemiBold",
          }}
        >
          {DesignctionList[0]?.OrganizationHierarchy?.name} - Designation
          </div>
        <div
          style={{
            flex: 1,
            fontSize: "26px",
            fontWeight: "bold",
            textAlign: "end",
            color: "#303030",
            fontFamily: "Open Sans SemiBold",
          }}
        >
          <Button style={{
            color: "#ffffff",
            backgroundColor: "#F17E8A",
            border: "#F39CA6",
            height: "40px",
            width: "35%",
            fontSize: "16px"
          }} type="primary"
            onClick={showModal2}>
            Add Designation
      </Button>
        </div>

      </div>
      <div className="table">
        <div style={{ height: "480px", overflowY: "auto" }}>
          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
              minHeight: 58,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              fontFamily: "Open Sans Regular",
              fontSize: "0.875em",
              color: "#303030",
              background: "#FFFFFF",
              borderRadius: "4px",
            }}
          >
            <tr style={{ display: "flex", alignItems: "center", fontSize: "16px", height: "50px", backgroundColor: "#f8f8f8" }}>

              <td style={styles.squareIcon}></td>
              <td style={styles.department}>
                <div><b style={{ marginLeft: "-55px" }}>Designations</b></div>
              </td>
              <td style={styles.score}><b style={{ marginLeft: "-45px" }}>Level</b></td>
              <td style={styles.date}><b style={{ marginLeft: "-35px" }}>Skills</b></td>
              <td style={styles.department}><b style={{ marginLeft: "-20px" }}>Career Path</b></td>
            </tr>
            {DesignctionList.map((ele, index) => (
              <tr>
                <td style={styles.mainContainer} className="table">
                  <div style={styles.department}>
                    <td style={{ flex: 0.9, display: "flex", alignItems: "center" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ flex: 1, marginBottom: "1%" }}>
                          {ele.name}

                        </div>
                      </div>
                    </td>
                  </div>
                  <td style={styles.score}>{ele.OrganizationDepartmentLevel.level}</td>
                  <td style={styles.date}><a onClick={() => showModal(ele.id)}>View</a></td>
                  <td style={styles.department}><a onClick={() => showModal1(ele)}>View</a></td>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
      <Modal title={`${AllSkillsList?.department} - ${AllSkillsList?.designation} - Skills`} footer={false} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            fontFamily: "Open Sans Regular",
            fontSize: "0.875em",
            color: "#303030",
            background: "#FFFFFF",
            borderRadius: "4px",
          }}
        >
          <tr style={{ display: "flex", alignItems: "center", fontSize: "16px", height: "50px", backgroundColor: "#f8f8f8" }}>
            <td style={styles.squareIcon}></td>
            <td style={styles.department1}>
              <div><b style={{ marginLeft: "-85px" }}>Skill Type</b></div>
            </td>
            <td style={styles.score1}><b style={{ marginLeft: "-105px" }}>Competency</b></td>
            <td style={styles.department}><b style={{ marginLeft: "-110px" }}>Skills</b></td>
            <td style={styles.date1}><b style={{ marginLeft: "-111px" }}>Action</b></td>
          </tr>

          <tr>
            <React.Fragment>
              <td style={styles.mainContainer} className="table">
                <div style={styles.department1}>
                  <td style={{ flex: 0.9, display: "flex", alignItems: "center" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ flex: 1, marginBottom: "1%" }}>
                        {AllSkillsList?.Technical?.name}
                      </div>
                    </div>
                  </td>
                </div>
                <td style={styles.score1}>{AllSkillsList?.Technical?.competency}</td>
                <td style={styles.skillsdepartmet}> {AllSkillsList?.Technical?.skills?.map((ele, index) => (<><span >
                  {ele.name + ', '}
                </span></>))}</td>
                <td style={styles.date12}><EditOutlined onClick={() => showeditModal(AllSkillsList?.Technical?.skills)} /> <PlusCircleOutlined style={{ marginLeft: "15px" }} onClick={() => showAddskillsModal(AllSkillsList?.Technical?.id, AllSkillsList.id)} /> </td>
              </td> </React.Fragment>
          </tr>
          <tr>
            <React.Fragment>
              <td style={styles.mainContainer} className="table">
                <div style={styles.department1}>
                  <td style={{ flex: 0.9, display: "flex", alignItems: "center" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ flex: 1, marginBottom: "1%" }}>
                        {AllSkillsList?.Functional?.name}{}
                      </div>
                    </div>
                  </td>
                </div>
                <td style={styles.score1}>{AllSkillsList?.Functional?.competency}</td>
                <td style={styles.skillsdepartmet}> {AllSkillsList?.Functional?.skills?.map((ele, index) => (<> <span >
                  {ele.name + ', '}
                </span></>))}</td>
                <td style={styles.date12}><EditOutlined onClick={() => showeditModal(AllSkillsList?.Functional?.skills)} /> <PlusCircleOutlined style={{ marginLeft: "15px" }} onClick={() => showAddskillsModal(AllSkillsList?.Functional?.id, AllSkillsList.id)} /> </td>
              </td> </React.Fragment>
          </tr>
          <tr>
            <React.Fragment>
              <td style={styles.mainContainer} className="table">
                <div style={styles.department1}>
                  <td style={{ flex: 0.9, display: "flex", alignItems: "center" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ flex: 1, marginBottom: "1%" }}>
                        {AllSkillsList?.Interpersonal?.name}
                      </div>
                    </div>
                  </td>
                </div>
                <td style={styles.score1}>{AllSkillsList?.Interpersonal?.competency}</td>
                <td style={styles.skillsdepartmet}> {AllSkillsList?.Interpersonal?.skills?.map((ele, index) => <>   <span >
                  {ele.name + ', '}
                </span></>)}</td>
                <td style={styles.date12}><EditOutlined onClick={() => showeditModal(AllSkillsList?.Interpersonal?.skills)} /> <PlusCircleOutlined style={{ marginLeft: "15px" }} onClick={() => showAddskillsModal(AllSkillsList?.Interpersonal?.id, AllSkillsList.id)} /></td>

              </td> </React.Fragment>
          </tr>
          <tr>
            <React.Fragment>
              <td style={styles.mainContainer} className="table">
                <div style={styles.department1}>
                  <td style={{ flex: 0.9, display: "flex", alignItems: "center" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ flex: 1, marginBottom: "1%" }}>
                        {AllSkillsList['Stake holder']?.name}
                      </div>
                    </div>
                  </td>
                </div>
                <td style={styles.score1}>{AllSkillsList['Stake holder']?.competency}</td>
                <td style={styles.skillsdepartmet}> {AllSkillsList['Stake holder']?.skills?.map((ele, index) => (<> <span >
                  {ele.name + ', '}
                </span></>))}</td>
                <td style={styles.date12}><EditOutlined onClick={() => showeditModal(AllSkillsList['Stake holder']?.skills)} /><PlusCircleOutlined style={{ marginLeft: "15px" }} onClick={() => showAddskillsModal(AllSkillsList['Stake holder']?.id, AllSkillsList.id)} /></td>
              </td> </React.Fragment>
          </tr>
        </table>
      </Modal>
      <Modal title={`${upwordandlatteraldetails[0]?.OrganizationDesignation?.OrganizationHierarchy?.name} - ${designtionIDBycarrerpath} - Career Path`} footer={false} visible={isModalVisible1} onOk={handleOk1} onCancel={handleCancel1}>
        <div className="careerDesign">
          <h3><b>Upward Career</b></h3>
          {upwordandlatteraldetails.length == 0 ? <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#767676",
            }}
          >
            <span>
              <InboxOutlined style={{ fontSize: "4em" }} />
            </span>
            <span>No Data</span>
          </div> : <div >
              {upwordandlatteraldetails?.map((up) => (<>
                {up.careerpath == "UPWARD" ?
                  <div className="Designt">
                    <h3><b>Department :</b><span>&nbsp;&nbsp;&nbsp; {up?.OrganizationDesignation?.OrganizationHierarchy?.name}</span> </h3>
                    <h3><b>Designation :</b><span>&nbsp;&nbsp;&nbsp; {up?.OrganizationDesignation?.name}</span> </h3>
                    <h3><b>Level :</b><span>&nbsp;&nbsp;&nbsp;{up?.OrganizationDesignation.OrganizationDepartmentLevel?.level}</span> </h3>
                  </div> : ""}
              </>))}
            </div>
          }
        </div>
        <h3><b>Lateral Career</b></h3>
        {upwordandlatteraldetails.length == 0 ? <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#767676",
          }}
        >
          <span>
            <InboxOutlined style={{ fontSize: "4em" }} />
          </span>
          <span>No Data</span>
        </div> : <div >
            {upwordandlatteraldetails?.map((up) => (<>
              {up.careerpath == "LATERAL" ?
                <div className="Designt">
                  <h3><b>Department :</b><span>&nbsp;&nbsp;&nbsp; {up?.OrganizationDesignation?.OrganizationHierarchy?.name}</span> </h3>
                  <h3><b>Designation :</b><span>&nbsp;&nbsp;&nbsp; {up?.OrganizationDesignation?.name}</span> </h3>
                  <h3><b>Level :</b><span>&nbsp;&nbsp;&nbsp;{up?.OrganizationDesignation.OrganizationDepartmentLevel?.level}</span> </h3>
                </div> : ""}
            </>))}
          </div>
        }
      </Modal>
      <Modal title="Add Designation" footer={false} visible={isModalVisible2} onOk={handleOk2} onCancel={handleCancel2}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Form form={form} name="horizontal_login" onFinish={onFinish}>
              <label>Designation</label>
              <Form.Item span={2}
                name="Designation"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Input placeholder="Designation" onChange={onsubmitDesigntion} />
              </Form.Item>
            </Form>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Form form={form} name="horizontal_login" onFinish={onFinish}>
              <label>Level</label>
              <Select
                showSearch
                style={{
                  width: "100%",
                }}
                placeholder="Search to Select"
                optionFilterProp="children"
                onChange={getLevelDetails}
                filterOption={(input, option) => option.children.includes(input)}
                filterSort={(optionA, optionB) =>
                  optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }
              >
                {MetaData?.organisationdepartmentlevel?.map((level) => (<Option value={level.id}>{level.level}</Option>))}
              </Select>
            </Form>
          </Col>

        </Row>
        <Row className="skillsbtn">
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <div className="">
              <h3><b>{skillstype[0]?.name}</b></h3>
              {competency?.map((comp) => (<Button type={comp?.name == techcomptencyskillsname ? 'primary' : ""} onClick={() => techcomptencyskillsdetails(comp)}>{comp.name}</Button>))}
            </div>
          </Col>
          <Col className="skillbox" xs={12} sm={12} md={12} lg={12} xl={12}>
            <div >
              {/* <div
                style={{
                  marginBottom: 16,
                }}
              >
                <TweenOneGroup
                  enter={{
                    scale: 0.8,
                    opacity: 0,
                    type: 'from',
                    duration: 100,
                  }}
                  onEnd={(e) => {
                    if (e.type === 'appear' || e.type === 'enter') {
                      e.target.style = 'display: inline-block';
                    }
                  }}
                  leave={{
                    opacity: 0,
                    width: 0,
                    scale: 0,
                    duration: 200,
                  }}
                  appear={false}
                >
                  {tagChild2}
                </TweenOneGroup>
              </div>
              {inputVisible2 && (
                <Input
                  ref={inputRef2}
                  type="text"
                  size="small"
                  style={{
                    width: 78,
                  }}
                  value={inputValue2}
                  onChange={handleInputChange2}
                  onBlur={handleInputConfirm2}
                  onPressEnter={handleInputConfirm2}
                />
              )}
              {!inputVisible2 && (
                <Tag onClick={showInput2} className="site-tag-plus">
                  <PlusOutlined /> Add Skills
                </Tag>
              )} */}
              <TextArea placeholder="textarea with clear icon" allowClear onChange={handleInputChange} />
            </div>
          </Col>
        </Row>
        <Row className="skillsbtn">
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <div className="">
              <h3><b>{skillstype[1]?.name}</b></h3>
              {competency?.map((comp) => (<Button type={comp?.name == funcomptencyskillsname ? 'primary' : ""} onClick={() => Funcomptencyskillsdetails(comp)}>{comp.name}</Button>))}
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} xl={12} className="skillbox">
            <div>
            <TextArea placeholder="textarea with clear icon" allowClear onChange={handleInputChange1} />
            </div>
            {/* <div
              style={{
                marginBottom: 16,
              }}
            >
              <TweenOneGroup
                enter={{
                  scale: 0.8,
                  opacity: 0,
                  type: 'from',
                  duration: 100,
                }}
                onEnd={(e) => {
                  if (e.type === 'appear' || e.type === 'enter') {
                    e.target.style = 'display: inline-block';
                  }
                }}
                leave={{
                  opacity: 0,
                  width: 0,
                  scale: 0,
                  duration: 200,
                }}
                appear={false}
              >
                {tagChild1}
              </TweenOneGroup>
            </div>
            {inputVisible1 && (
              <Input
                ref={inputRef1}
                type="text"
                size="small"
                style={{
                  width: 78,
                }}
                value={inputValue1}
                onChange={handleInputChange1}
                onBlur={handleInputConfirm1}
                onPressEnter={handleInputConfirm1}
              />
            )}
            {!inputVisible1 && (
              <Tag onClick={showInput1} className="site-tag-plus">
                <PlusOutlined /> Add Skills
              </Tag>
            )} */}
          </Col>
        </Row>
        <Row className="skillsbtn">
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <div className="">
              <h3><b>{skillstype[2]?.name}</b></h3>
              {competency?.map((comp) => (<Button type={comp?.name == Interuncomptencyskillsname ? 'primary' : ""} onClick={() => Intercomptencyskillsdetails(comp)}>{comp.name}</Button>))}
            </div>
          </Col>
          <Col className="skillbox" xs={12} sm={12} md={12} lg={12} xl={12} >
            <div >
              {/* <div
                style={{
                  marginBottom: 16,
                }}
              >
                <TweenOneGroup
                  enter={{
                    scale: 0.8,
                    opacity: 0,
                    type: 'from',
                    duration: 100,
                  }}
                  onEnd={(e) => {
                    if (e.type === 'appear' || e.type === 'enter') {
                      e.target.style = 'display: inline-block';
                    }
                  }}
                  leave={{
                    opacity: 0,
                    width: 0,
                    scale: 0,
                    duration: 200,
                  }}
                  appear={false}
                >
                  {tagChild}
                </TweenOneGroup>
              </div>
              {inputVisible && (
                <Input
                  ref={inputRef}
                  type="text"
                  size="small"
                  style={{
                    width: 78,
                  }}
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputConfirm}
                  onPressEnter={handleInputConfirm}
                />
              )}
              {!inputVisible && (
                <Tag onClick={showInput} className="site-tag-plus">
                  <PlusOutlined /> Add Skills
                </Tag>
              )} */}
<TextArea placeholder="textarea with clear icon" allowClear onChange={handleInputChange2} />
            </div>
          </Col>
        </Row>
        <Row className="skillsbtn">
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <div className="">
              <h3><b>{skillstype[3]?.name}</b></h3>
              {competency?.map((comp) => (<Button type={comp?.name == Stakecomptencyskillsname ? 'primary' : ""} onClick={() => stakecomptencyskillsdetails(comp)}>{comp.name}</Button>))}
            </div>
          </Col>
          <Col className="skillbox" xs={12} sm={12} md={12} lg={12} xl={12}>
            <div >
              {/* <div
                style={{
                  marginBottom: 16,
                }}
              >
                <TweenOneGroup
                  enter={{
                    scale: 0.8,
                    opacity: 0,
                    type: 'from',
                    duration: 100,
                  }}
                  onEnd={(e) => {
                    if (e.type === 'appear' || e.type === 'enter') {
                      e.target.style = 'display: inline-block';
                    }
                  }}
                  leave={{
                    opacity: 0,
                    width: 0,
                    scale: 0,
                    duration: 200,
                  }}
                  appear={false}
                >
                  {tagChild3}
                </TweenOneGroup>
              </div>
              {inputVisible3 && (
                <Input
                  ref={inputRef3}
                  type="text"
                  size="small"
                  style={{
                    width: 78,
                  }}
                  value={inputValue3}
                  onChange={handleInputChange3}
                  onBlur={handleInputConfirm3}
                  onPressEnter={handleInputConfirm3}
                />
              )}
              {!inputVisible3 && (
                <Tag onClick={showInput3} className="site-tag-plus">
                  <PlusOutlined /> Add Skills
                </Tag>
              )} */}
              <TextArea placeholder="textarea with clear icon" allowClear onChange={handleInputChange3} />
            </div>
          </Col>
        </Row>
        <Row className="skillsbtn" >
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <h3><b>Career Path - UPWARD</b></h3>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ marginBottom: "20px" }}>
            <Form form={form} name="horizontal_login" onFinish={onFinish}>
              <label>Designation</label>
              <Select
                showSearch
                style={{
                  width: "100%",
                }}
                placeholder="Select Designation"
                optionFilterProp="children"
                onChange={getupwordlevel}
                filterOption={(input, option) => option.children.includes(input)}
                filterSort={(optionA, optionB) =>
                  optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }
              >
                {UpwordCarrerPath?.map((upword) => (<Option value={upword.id}>{upword.name}</Option>))}
              </Select>
            </Form>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Form form={form} name="horizontal_login" onFinish={onFinish}>
              <label>Level</label>
              <Form.Item span={2}
                name="Levelupword"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Input disabled placeholder={upwordleveldetails?.OrganizationDepartmentLevel?.level || "Enter level"} initialValues={upwordleveldetails?.OrganizationDepartmentLevel?.level} />
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row className="skillsbtn" >
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <h3><b>Career Path - LATERAL</b></h3>
          </Col>
          <div className="table" style={{ width: "100%" }}>
            <Form name="dynamic_form_nest_item" onFinish={onFinish1} autoComplete="off">
              <Form.List name="users">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{
                          display: 'flex',
                          marginBottom: 8,
                          justifyContent: 'space-around',
                          marginTop: '20px'
                        }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, 'To Department']}
                        >
                          <label>Department</label>
                          <Select name="category" onChange={getAlldesignctionByUpwordDept} placeholder="Please select Department">
                            {DepartmentList?.map((dept) => (<Option value={dept.id}>{dept.name}</Option>))}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'Designation']}
                          value={"laterallevel"}
                        >
                          <label>Designation</label>
                          <Select name="category" onChange={lateralDesigntionList} placeholder="Please select Designtioon">
                            {uplateralDestintion?.map((degn) => (<Option value={degn.id}>{degn.name} - {degn.OrganizationDepartmentLevel.level}</Option>))}
                          </Select>
                        </Form.Item>
                        {/* <Form.Item
                          {...restField}
                          name={[name, 'Level']}
                        >
                          <label>Level</label>
                          <Input value={laterallevel} disabled placeholder={laterallevel || "Enter level"} initialValues={laterallevel} />
                        </Form.Item> */}
                        <MinusCircleOutlined onClick={() => remove(name)} />
                        <PlusCircleOutlined onClick={() => add(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add Lateral Carrer path
              </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form>
          </div>
        </Row>
        <Row className="text-center" style={{ justifyContent: "center" }}>
          <Col>
            <Button style={{
              color: "#ffffff",
              backgroundColor: "#F17E8A",
              border: "#F39CA6",
              height: "40px",
              fontSize: "16px"
            }} type="primary"
              onClick={onsubmit}>
              Save And Submit
      </Button>
          </Col>
        </Row>
      </Modal>
      <div >
        <Modal className="smallmodel" footer={false} title="Skill Updates" visible={iseditModalVisible} onOk={edithandleOk} onCancel={handleeditCancel}>
          {editbleSkills.map((ele) => (<>
            <Row>
              <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                <Form form={form} name="horizontal_login" onFinish={onFinish}>
                  <label>Skills</label>
                  <Form.Item span={2}
                    name={ele?.name}
                    value={ele?.name}
                    rules={[
                      {
                        required: true,
                        message: 'Please Enter Skills',
                      },
                    ]}
                  >
                    <Input placeholder={"Enter Skills"} defaultValue={ele?.name} onChange={OnchnageSkills} />
                  </Form.Item>
                </Form>
              </Col>
              <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                <button className="smallbtnd" onClick={() => SubmitSkills(ele)} type="button">Update</button>
              </Col>
            </Row></>))}
        </Modal>
      </div>


      <div >
        <Modal className="smallmodel" footer={false} title="Add Skill " visible={isAddskillsModalVisible} onOk={AddskillshandleOk} onCancel={handleAddskillsCancel}>
          <Col className="skillbox" xs={24} sm={24} md={24} lg={24} xl={24}>
            <div >
              <div
                style={{
                  marginBottom: 16,
                }}
              >
                <TweenOneGroup
                  enter={{
                    scale: 0.8,
                    opacity: 0,
                    type: 'from',
                    duration: 100,
                  }}
                  onEnd={(e) => {
                    if (e.type === 'appear' || e.type === 'enter') {
                      e.target.style = 'display: inline-block';
                    }
                  }}
                  leave={{
                    opacity: 0,
                    width: 0,
                    scale: 0,
                    duration: 200,
                  }}
                  appear={false}
                >
                  {tagChildAddskills}
                </TweenOneGroup>
              </div>
              {inputVisibleAddskills && (
                <Input
                  ref={inputRefAddskills}
                  type="text"
                  size="small"
                  style={{
                    width: 78,
                  }}
                  value={inputValueAddskills}
                  onChange={handleInputChangeAddskills}
                  onBlur={handleInputConfirmAddskills}
                  onPressEnter={handleInputConfirmAddskills}
                />
              )}
              {!inputVisibleAddskills && (
                <Tag onClick={showInputAddskills} className="site-tag-plus">
                  <PlusOutlined /> Add Skills
                </Tag>
              )}
            </div>

          </Col>
          <div
            style={{
              flex: 1,
              fontSize: "26px",
              fontWeight: "bold",
              textAlign: "end",
              color: "#303030",
              fontFamily: "Open Sans SemiBold",
            }}
          >
            <Button style={{
              color: "#ffffff",
              backgroundColor: "#F17E8A",
              border: "#F39CA6",
              height: "30px",
              fontSize: "15px"
            }} type="primary"
              onClick={submitSkills}
            >
              Submit
      </Button>
          </div>
        </Modal>
      </div>
    </div>


  );
};
export default App;











