import React, { Component } from "react";
import "antd/dist/antd.css";
import { Popover, Checkbox, Modal } from "antd";

const styles = {
  modalTitle: {
    textAlign: "center",
    paddingBottom: "2%",
    color: "#303030",
    fontFamily: "Open Sans Semibold",
    fontSize: "1.715em",
  },
  modalBody: {
    textAlign: "left",
    color: "#767676",
    fontSize: "1.15em",
    fontFamily: "Open Sans Regular",
    paddingLeft: "8%",
    marginBottom: "4%",
  },
  modalFooter: {
    display: "flex",
    paddingLeft: "58%",
  },
  CancelButton: {
    border: "1px solid #FF808B",
    outline: "none",
    borderRadius: "4px",
    backgroundColor: "#ffffff",
    color: "#FF808B",
    fontSize: "1em",
    fontFamily: "Open Sans Semibold",
    padding: "5px 15px",
    marginRight: "10px",
    fontWeight: 700,
    cursor: "pointer",
  },
  okButton: {
    fontSize: "1em",
    outline: "none",
    fontFamily: "Open Sans Semibold",
    border: "1px solid #FF808B",
    borderRadius: "4px",
    backgroundColor: "#FF808B",
    color: "#ffffff",
    padding: "5px 15px",
    fontWeight: 700,
    cursor: "pointer",
  },
  popoverItems: {
    cursor: "pointer",
    color: "#303030",
    fontSize: "14px",
    fontFamily: "Open Sans Regular",
    "&:active": {
      color: "#4D4CAC",
    },
  },
};

class CourseTableHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseTableHeadings: this.props.courseTableHeadings || [],
      styles: this.props.styles,
      approvalVisible: false,
      denyVisible: false,
      holdVisible: false,
      checked: this.props.checked,
      modalTitle: "",
      modalButton: "",
      modalValue: "",
    };
  }

  showModalApproval = (modalTitle, modalButton, modalValue) => {
    this.setState({
      approvalVisible: true,
      modalTitle,
      modalButton,
      modalValue,
    });
  };

  approvehandleOk = (e) => {
    this.setState({
      approvalVisible: false,
      checked: false,
    });
  };

  approvalhandleCancel = (e) => {
    this.setState({
      approvalVisible: false,
      checked: false,
    });
  };

  render() {
    return (
      <div>
        <table
          style={{
            width: "100%",
            minHeight: 38,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            fontFamily: this.state.styles.fontFamily || "Open Sans Regular",
            fontSize: this.state.styles.fontSize || "1em",
          }}
        >
          <thead>
            <tr
              style={{
                display: "grid",
                gridTemplateColumns:
                  this.props.selectedSubNavLink.title !== "approved"
                    ? "1.85fr 1.65fr 1fr 1.34fr 0.8fr"
                    : "1.87fr 1.5fr 1.07fr 1.3fr 0.8fr 0.6fr",
                alignItems: "center",
                flex: 1,
                paddingLeft: "10px",
                marginBottom: "10px",
              }}
            >
              <td
                style={{ display: "flex", alignItems: "center" }}
                id="bulk-check-container"
              >
                <Popover
                  placement="rightTop"
                  getPopupContainer={() =>
                    document.getElementById("bulk-check-container")
                  }
                  overlayStyle={{ zIndex: 1 }}
                  content={
                    <div
                      style={{
                        fontFamily: "Open Sans Regular",
                        borderRadius: "5px",
                      }}
                    >
                      <div
                        style={styles.popoverItems}
                        onClick={() =>
                          this.showModalApproval("Approval", "Approve", 1)
                        }
                      >
                        Approve all
                      </div>
                      <div
                        style={styles.popoverItems}
                        onClick={() =>
                          this.showModalApproval("Deny", "Deny", 0)
                        }
                      >
                        Deny all
                      </div>
                      <div
                        style={{
                          display:
                            this.props.selectedSubNavLink.title === "hold"
                              ? "none"
                              : "",
                          cursor: "pointer",
                          color: "#303030",
                          fontSize: "14px",
                          fontFamily: "Open Sans Regular",
                        }}
                        onClick={() =>
                          this.showModalApproval("Hold", "Hold", 3)
                        }
                      >
                        Hold all
                      </div>
                    </div>
                  }
                  trigger="click"
                  visible={this.props.allSelected}
                >
                  <div
                    onClick={this.props.allEmployeeSelected}
                    style={{
                      marginRight: "10px",
                      display:
                        this.props.selectedSubNavLink.title === "approved"
                          ? "none"
                          : "",
                    }}
                  >
                    <Checkbox
                      checked={this.props.allSelected}
                      className="custom-checkbox"
                    />
                  </div>
                </Popover>
                <div style={{ marginLeft: "25px" }}></div>
                Name
              </td>
              {this.state.courseTableHeadings.map((ele, id) => (
                <td
                  key={id}
                  style={{
                    flex: ele.flex || 1,
                  }}
                >
                  <div>{ele.title || ""}</div>
                </td>
              ))}
              <td
                style={{
                  flex: 0.3,
                  textAlign: "center",
                  marginRight: "30px",
                  display:
                    this.props.selectedSubNavLink.title !== "approved"
                      ? "none"
                      : "",
                }}
              >
                Status
              </td>
            </tr>
          </thead>
        </table>
        <Modal
          onCancel={this.approvalhandleCancel}
          visible={this.state.approvalVisible}
          footer={null}
          closable={false}
        >
          <div
            style={{ paddingLeft: "90%", cursor: "pointer" }}
            onClick={this.approvalhandleCancel}
          >
            <img
              src={require("../../../assets/images/closeImage.svg")}
              alt="close"
            />
          </div>
          <div style={styles.modalTitle}>
            {this.state.modalTitle} Confirmation
          </div>
          <div style={styles.modalBody}>
            Do you want to give {this.state.modalTitle} to all the course
            approval request ?
          </div>
          <div style={styles.modalFooter}>
            <button
              style={styles.CancelButton}
              onClick={this.approvalhandleCancel}
            >
              Cancel
            </button>
            <button
              style={styles.okButton}
              onClickCapture={this.approvalhandleCancel}
              onClick={() =>
                this.props.onStatusClicked(
                  this.state.modalButton,
                  this.state.modalValue
                )
              }
            >
              {this.state.modalButton}
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default CourseTableHeader;
