import React, { Component } from "react";
import { Modal } from "antd";
import styled from "styled-components";
import { decryptData } from "../utils/encryptDecrypt";
import { getSkillScore } from "../core/apiClient/assessment";
import Button from "./Button";
import CloseIcon from "../assets/images/closeImage.svg";
import Info from "../assets/images/info.svg";
import ToolTip from "./ToolTipComponent";
import "../assets/css/AntdExternal.css";
const AssessmentWrapper = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
  position: relative;
`;

const Title = styled.div`
  font-size: ${(props) => props.fontSize || "1.2em"};
  font-family: ${(props) => props.fontFamily || " Open Sans Semibold"};
  color: ${(props) => props.color || " #303030"};
  margin-bottom: ${(props) => props.marginBottom || null};
`;

const ButtonContainer = styled.div`
  width: 186px;
  font-family: Open Sans Semibold;
  margin-left: 2em;
`;

const CloseImage = styled.img`
  height: 30px;
  width: 30px;
  position: absolute;
  right: -10px;
  top: -14px;
  cursor: pointer;
`;

class TrainingAssessmentModal extends Component {
  constructor(props) {
    super(props);
    this.state = { showInfo: false };
  }

  componentDidMount() {
    this.loadSkillScore();
  }

  loadSkillScore = async () => {
    try {
      let employeeId = decryptData(localStorage.employeeId),
        token = decryptData(localStorage.token);
      if (employeeId) {
        document.toggleLoading(true);
        let { data, status } = await getSkillScore(employeeId, {
          Authorization: token,
        });
        if (status >= 200 && status < 300) {
          this.setState({ skillScore: data.skillScore });
        }
        document.toggleLoading();
      }
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  handelShowInfo = (showInfo) => {
    this.setState({ showInfo });
  };

  render() {
    return (
      <Modal
        visible={this.props.visible || false}
        closable={false}
        onCancel={this.props.closeModal || null}
        footer={null}
        centered={true}
        width="40%"
        className="training-modal"
      >
        <AssessmentWrapper>
          <Title marginBottom="1em">
            Take a quick test to find out your present skill level <br /> and to
            know the skill level required for your role
          </Title>
          <Title color="#767676" fontSize="0.875em">
            My Skill Score Is
          </Title>
          <Title fontSize="3.125em">
            {Math.round(this.state.skillScore) || 0}
          </Title>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "1em" }}
          >
            <ButtonContainer
              onClick={() =>
                (this.props.assessmentLink &&
                  window.open(this.props.assessmentLink, "_blank")) ||
                null
              }
            >
              <Button
                disabled={!this.props.assessmentLink}
                label={this.props.label || "Take Assessment"}
                status="enable"
                styles={{
                  color: "#ffffff",
                  backgroundColor: this.props.assessmentLink
                    ? "#F17E8A"
                    : "#bbbbbb",
                  border: this.props.assessmentLink ? "#F17E8A" : "#bbbbbb",
                  height: "40px",
                }}
              />
            </ButtonContainer>
            <img
              src={Info}
              alt="icon"
              style={{ marginLeft: 10, cursor: "pointer" }}
              onMouseLeave={() => this.handelShowInfo(false)}
              onMouseOver={() => this.handelShowInfo(true)}
            />
          </div>

          <ToolTip
            style={{
              maxWidth: 133,
              minHeight: 20,
              opacity: this.state.showInfo ? 1 : 0,
              borderRadius: 1,
              transition: "0.5s opacity",
              backgroundColor: "rgb(227, 227, 251)",
              zIndex: 0,
              right: "-15px",
              bottom: "-3px",
            }}
            toolTip={{ placement: "right", width: "5px" }}
          >
            <div
              style={{
                width: "inherit",
                height: "inherit",
                outline: "none",
                display: "flex",
                padding: 8,
                textAlign: "start",
                lineHeight: "1.2em",
              }}
            >
              <div
                style={{
                  fontSize: "0.875em",
                  color: "#4D4CAC",
                }}
              >
                {this.props.assessmentLink
                  ? "Your assessment is ready"
                  : "Your assessment is not yet ready"}
              </div>
            </div>
          </ToolTip>
          <CloseImage
            src={CloseIcon}
            alt="close"
            onClick={this.props.closeModal || null}
          />
        </AssessmentWrapper>
      </Modal>
    );
  }
}

export default TrainingAssessmentModal;
