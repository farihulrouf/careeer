import React from "react";
import styled from "styled-components";
import EmployeeReceivedGeneralFeedbackItem from "./EmployeeReceivedGeneralFeedbackItem";
const Div = styled.div`
  .rating-list-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 5%;
    margin: 0 1.8em;
    grid-auto-rows: 8em;
    @media (max-width: 959px) {
      grid-template-columns: repeat(4, 1fr);
    }
    @media (max-width: 720px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 500px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;
const EmployeeReceivedGeneralFeedbackList = (props) => {
  const receivedRatingList = props.receivedRatingList;
  return (
    <Div>
      <div style={{ fontSize: "0.875em", fontFamily: "Open Sans Semibold" }}>
        {receivedRatingList.skillType || ""}
      </div>
      <div className="rating-list-container">
        {receivedRatingList.skills &&
          receivedRatingList.skills.map((ratingData, index) => (
            <div
              key={index + "rating" || ratingData.id}
              style={{ width: "100%", margin: "2.7em 0" }}
            >
              <EmployeeReceivedGeneralFeedbackItem
                receivedRating={ratingData}
              />
            </div>
          ))}
      </div>
    </Div>
  );
};
export default EmployeeReceivedGeneralFeedbackList;
