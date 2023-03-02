import React, { Component } from "react";
import { Popover, Checkbox, Modal } from "antd";
import "antd/dist/antd.css";

const styles = {
  modalTitle: {
    padding: "4% 0% 4% 25%",
    color: "#303030",
    fontFamily: "Open Sans Semibold",
    fontSize: "24px",
  },
  modalBody: {
    textAlign: "left",
    color: "#767676",
    fontSize: "18px",
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
    borderRadius: "4px",
    backgroundColor: "#ffffff",
    color: "#FF808B",
    fontSize: "14px",
    fontFamily: "Open Sans Semibold",
    padding: "5px 15px",
    marginRight: "10px",
    cursor: "pointer",
    outline: "none",
  },
  okButton: {
    fontSize: "14px",
    fontFamily: "Open Sans Semibold",
    border: "1px solid #FF808B",
    borderRadius: "4px",
    backgroundColor: "#FF808B",
    color: "#ffffff",
    padding: "5px 15px",
    cursor: "pointer",
    outline: "none",
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

class RewardTableHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rewardTableHeadings: this.props.rewardTableHeadings || [],
      styles: this.props.styles,
      checked: this.props.checked,
    };
  }

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
            <tr style={{ display: "flex", height: "100%", padding: "10px" }}>
              <Popover
                placement="rightTop"
                content={
                  <div
                    style={{
                      fontFamily: "Open Sans Regular",
                      borderRadius: "5px",
                    }}
                  >
                    <div
                      style={styles.popoverItems}
                      onClick={this.props.showModalView}
                    >
                      Approve all
                    </div>
                  </div>
                }
                trigger="click"
                visible={this.props.allSelected}
              >
                <td onClick={this.props.allEmployeeSelected}>
                  <Checkbox
                    checked={this.props.allSelected}
                    className="custom-checkbox"
                  />
                </td>
              </Popover>
              {this.state.rewardTableHeadings.map((ele, id) => (
                <td key={id} style={{ flex: ele.flex || 1 }}>
                  <div
                    style={{
                      marginLeft:
                        id === 0 ||
                        this.state.rewardTableHeadings.length - 1 === id
                          ? "30px"
                          : 0,
                    }}
                  >
                    {ele.title || ""}
                  </div>
                </td>
              ))}
            </tr>
          </thead>
        </table>
        <Modal
          onCancel={this.props.closeModal}
          visible={this.props.showModal}
          footer={null}
          closable={false}
        >
          <div style={styles.modalTitle}>Approval Confirmation</div>
          <div style={styles.modalBody}>
            Do you want to give approval to all the course approval <br />
            request ?
          </div>
          <div style={styles.modalFooter}>
            <button style={styles.CancelButton} onClick={this.props.closeModal}>
              Cancel
            </button>
            <button
              style={styles.okButton}
              onClick={() => this.props.onStatusClicked(1)}
            >
              Approve
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default RewardTableHeader;
