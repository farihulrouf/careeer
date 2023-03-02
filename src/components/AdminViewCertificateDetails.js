import React, { Component } from "react";
import {
  getEmployeeCertificatesDetails,
  viewCertificates,
} from "../core/apiClient/organization/organizationClient";
import { decryptData } from "../utils/encryptDecrypt";
import { Modal, Empty } from "antd";
import "antd/dist/antd.css";
import UserGroup from "../assets/images/userGroup.svg";
class AdminViewCertificateDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      certificateVisible: false,
      certificateImage: "",
      certificateDetails: "",
    };
  }
  componentDidMount = () => {
    this.loadCertificatesData();
  };

  loadCertificatesData = async () => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId);
      let employeeId = this.props.selectedUser;
      let token = decryptData(localStorage.token);
      let { data, status } = await getEmployeeCertificatesDetails(
        orgId,
        employeeId,
        { Authorization: token }
      );
      if (status >= 200 && status < 300) {
        if (data.length) this.setState({ certificateDetails: data });
      } else {
        document.message.error(JSON.stringify(data));
      }
      document.toggleLoading();
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  viewCertificatesData = async (ImageKey) => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId);
      let employeeId = this.props.selectedUser;
      let token = decryptData(localStorage.token);
      let { data, status } = await viewCertificates(
        orgId,
        employeeId,
        ImageKey,
        { Authorization: token }
      );
      if (status >= 200 && status < 300) {
        this.setState({
          certificateVisible: true,
          certificateImage: data,
        });
      } else {
        document.message.error(JSON.stringify(data));
      }
      document.toggleLoading();
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  certificateHandleCancel = () => {
    this.setState({
      certificateVisible: false,
    });
  };
  render() {
    const { certificateDetails, certificateImage } = this.state;
    return (
      <div
        style={{
          display: "flex",
          height: "100%",
          background: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
          fontSize: "16px",
        }}
      >
        <div
          style={{
            flex: 1,
            width: "100%",
            display: "block",
            padding: "4% 2% 4% 4%",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              paddingBottom: "2%",
            }}
          >
            <img
              src={require("../assets/images/adminViewCertificate.svg")}
              alt="icon"
            />
            <div
              style={{
                paddingLeft: "15px",
                color: "#303030",
                fontSize: "1em",
                fontFamily: "Open Sans SemiBold",
              }}
            >
              Certificates
            </div>
            <div
              style={{
                width: "80%",
                border: "0.5px solid #f5f6f7",
              }}
            ></div>
          </div>
          <div
            style={{
              display: "block",
              paddingLeft: "10%",
              minHeight: "60%",
              maxHeight: "60%",
              overflowY: "auto",
              overflowX: "hidden",
              paddingBottom: "0px",
              marginBottom: "0px",
            }}
          >
            {certificateDetails.length ? (
              certificateDetails.map((ele, id) => (
                <div
                  style={{
                    padding: "1.5%",
                    paddingLeft: "16px",
                    display: "flex",
                    width: "100%",
                    backgroundColor: "#f8f9fd",
                    marginBottom: "5px",
                    minHeight: 55,
                  }}
                  key={id}
                >
                  ​​
                  <div
                    style={{
                      width: "13px",
                      height: "13px",
                      borderRadius: "50%",
                      border: "1px solid #acaed8",
                      backgroundColor: "#acaed8",
                      marginTop: 6,
                    }}
                  ></div>
                  <div
                    style={{
                      flex: 1,
                      paddingLeft: "5%",
                      paddingRight: "10%",
                      width: "40%",
                    }}
                  >
                    <div
                      style={{
                        color: "#303030",
                        fontFamily: "Open Sans Semibold",
                        fontSize: "0.875em",
                        display: "flex",
                      }}
                    >
                      {ele.name || ""}
                    </div>
                    <div
                      style={{
                        color: "#8e8e8e",
                        fontFamily: "Open Sans Regular",
                        fontSize: "0.875em",
                      }}
                    >
                      {ele.institute || ""}
                    </div>
                  </div>
                  <div
                    onClick={() => ele.image && this.viewCertificatesData(ele.image || "")}
                    style={{
                      color: ele.image ? "#f46773" : "gray",
                      fontFamily: "Open Sans Regular",
                      fontSize: "14px",
                      cursor: ele.image ? "pointer" : "not-allowed",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    View Certificate
                  </div>
                </div>
              ))
            ) : (
              <div>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </div>
            )}
          </div>
        </div>
        {this.state.certificateVisible && (
          <Modal
            visible={this.state.certificateVisible}
            footer={null}
            onCancel={this.certificateHandleCancel}
            width={600}
          >
            <div style={{ height: "398px", width: "100%", padding: "2.5%" }}>
              {certificateImage ? (
                <img
                  src={certificateImage}
                  alt="certificate"
                  style={{
                    border: "4px solid #7d7575",
                    height: "100%",
                    width: "100%",
                  }}
                />
              ) : (
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <img src={UserGroup} alt="userGroup" />
                    <p
                      style={{
                        fontFamily: "Open Sans Semibold",
                        fontSize: "1.5em",
                      }}
                    >
                      There is no certificate
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

export default AdminViewCertificateDetails;
