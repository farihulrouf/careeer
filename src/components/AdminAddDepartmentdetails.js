import React, { useEffect } from "react";
import styled from "styled-components";
import { useLocation, Link, useHistory } from "react-router-dom";
import { Button, Space, Form, Input, Drawer, Modal } from 'antd';
import { useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import axios from "axios";
import { decryptData } from "../utils/encryptDecrypt";
import { getAllDepartments, createDepartment } from "../core/apiClient/organization/organizationClient";
const Addadmindepat = () => {
    const history = useHistory();
    const [visible, setVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [DepartmentList, setDepartmentList] = useState([]);
    const [inputValue, setInputValue] = useState();
    const showModal = async () => {
        console.log(inputValue)
        let orgId = decryptData(localStorage.orgId)
        let data = {
            "name": inputValue
        }
        let response = await createDepartment(orgId, data, {
        });
        console.log(response)
        setVisible(false);
        setIsModalVisible(true);
        getAlldepartmentList()
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    React.useEffect(() => {
        getAlldepartmentList()
    }, []);

    const getAlldepartmentList = async () => {
        let orgId = decryptData(localStorage.orgId)
        let response = await getAllDepartments(orgId, {
        });
        console.log(response.data)
        setDepartmentList(response.data)
    }
    const onClose = () => {
        setVisible(false);
    };
    const showDrawer = () => {
        setVisible(true);
    };
    const onChange = (e) => {
        console.log(e.target.value);
        setInputValue(e.target.value)
    };

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
                    Departments
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
                        onClick={showDrawer}>
                        Add Department
      </Button>
                </div>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5,1fr)",
                    gap: "30px 30px",
                    justifyItems: "center"
                }}
            >
                {DepartmentList.map((depart) => (
                    <div
                        key={1}
                        style={{
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                            background: "#F8F8F8",
                            borderRadius: "8px",
                        }}
                    >
                        <Link 
                            to={`/admin/org-management/designtion/${depart.id}`}
                            >
                            <div
                                style={{
                                    width: "100%",
                                    height: "140px",
                                    background: "#FFFFFF",
                                    borderRadius: "8px",
                                    padding:"15px",
                                    fontFamily: "sans-serif",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "space-around",
                                    boxShadow: "1px 4px 12px rgba(0, 0, 0, 0.27)",
                                }}
                            >
                                <div
                                    style={{
                                        color: "#252525",
                                        fontSize: "17px",
                                        fontFamily: "Open Sans Semibold",
                                        letterSpacing: "0.77px",
                                        minHeight: "40px",
                                        paddingTop: "30px",
                                        lineHeight: "20px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        textAlign: "center",
                                    }}
                                >
                                    {depart.name}
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        paddingTop: "6px",
                                    }}
                                >
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            {/* </div> */}
            <>


                <Drawer
                    title="ADD NEW DEPARTMENT"
                    placement="right"
                    width={450}
                    onClose={onClose}
                    visible={visible}
                >
                    <Form
                        layout="vertical">
                        <Form.Item label="Department:" >
                            <Input placeholder="Enter Department" allowClear onChange={onChange} />
                        </Form.Item>
                        <Form.Item className="text-center">
                            <Button type="primary" style={{
                                color: "#ffffff",
                                backgroundColor: "#F17E8A",
                                border: "#F39CA6",
                                height: "40px",
                                width: "35%",
                                fontSize: "16px"
                            }} onClick={showModal}>ADD</Button>
                        </Form.Item>
                    </Form>
                </Drawer>
            </>
            <Modal className="text-center" title="Department 5" visible={isModalVisible} onOk={handleOk} footer={[]} onCancel={handleCancel}>
                <p>Step 1. of Org structure is completed successfully</p>
                <h4><b>NEW DEPARTMENT Added successfully</b></h4>
                <p>NOTE: Add Designations and Career Paths For Dept 5</p>
                <Button type="primary" style={{
                    color: "#ffffff",
                    backgroundColor: "#F17E8A",
                    border: "#F39CA6",
                    height: "40px",
                    width: "35%",
                    fontSize: "16px"
                }} >Continue</Button>
            </Modal>
        </div>
    );
};

export default Addadmindepat;
