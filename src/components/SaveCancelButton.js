import React from "react";
import Button from "./Button";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  justify-content: flex-end;
  .individual-button {
    width: 116px;
  }
`;

const saveCancelButton = (props) => {
  return (
    <Div>
      <div className="individual-button" style={{ marginRight: "2vw" }}>
        <Button
          label="Cancel"
          styles={{
            color: "#FF808B",
            backgroundColor: "#ffffff",
            border: "#FF808B",
            height: "40px",
          }}
          onClick={props.cancel || null}
          disabled={props.disabledCancel}
        />
      </div>
      <div className="individual-button">
        <Button
          label="Save"
          styles={{
            color: "#ffffff",
            backgroundColor: "#FF808B",
            border: "#FF808B",
            height: "40px",
          }}
          onClick={props.save || null}
          disabled={props.disabledSave}
        />
      </div>
    </Div>
  );
};

export default saveCancelButton;
