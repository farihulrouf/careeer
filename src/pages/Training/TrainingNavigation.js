import React from "react";
import styled from "styled-components";
import { decryptData } from "../../utils/encryptDecrypt";
import { Link, useLocation } from "react-router-dom";
const MainDiv = styled.div`
  width: 100%;
  .title {
    font-family: Open Sans Semibold;
    font-size: 18px;
    color: #303030;
  }
  .grid-container {
    display: grid;
    grid-template-columns: auto;
    background-color: #ffffff;
    overflow: hidden;
    width: 100%;
    height: 58px;
    padding-left: 1%;
    padding-right: 1%;
    font-family: "Open Sans Regular";
    border-radius: 8px;
  }
  .grid-item {
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid #ffffff;
    padding: 0 0.5% 0 1.5%;
    font-size: 30px;
    width: 100%;
    display: flex;
    font-size: 16px;
    border-radius: 5px;
    font-family: "Open Sans Regular";
  }
  .firstpart {
    width: 80%;
    display: flex;
    align-items: center;
    padding-top: 0.2%;
    text-transform: capitalize;
  }
  .secondpart {
    text-align: right;
    width: 20%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .firstpart-items {
    margin-right: 1%;
    margin-left: 1%;
    height: 100%;
    display: flex;
    align-items: center;
    color: #989898;
  }
  .firstpart-items:hover {
    cursor: pointer;
  }
  .secondpart-items {
    border: 1px solid #ff808b;
    width: 75%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Open Sans Semibold";
    /* padding: 5px 40px 5px 40px; */
    border-radius: 5px;
    text-align: center;
    color: #ff808b;
    margin: 0 0 0 5%;
    cursor: pointer;
  }
  .functional-button {
    border: 1px solid #ff808b;
    width: 14%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Open Sans Semibold";
    /* padding: 5px 40px 5px 40px; */
    border-radius: 5px;
    text-align: center;
    color: #ff808b;
    margin: 0 0 0 4%;
    cursor: pointer;
  }
`;
const TrainingNavBar = (props) => {
  const { title, routeLinks, path, selector } = props;
  const location = useLocation();
  let orgId = decryptData(localStorage.orgId);
  return (
    <MainDiv>
      <div className="title">{title || ""}</div>
      <div className="grid-container">
        <div className="grid-item">
          <div className="firstpart">
            {routeLinks.length
              ? routeLinks.map((eachRoute, routeIndex) => (
                  <Link
                    to={`${path}/${eachRoute.id}/${eachRoute[selector]}`}
                    key={routeIndex}
                    className="firstpart-items"
                    style={{
                      borderBottom: location.pathname.includes(
                        eachRoute[selector]
                      )
                        ? "3px solid #FF808B"
                        : "3px solid #ffffff",
                      color: location.pathname.includes(eachRoute[selector])
                        ? "#303030"
                        : "",
                    }}
                  >
                    {eachRoute[selector]}
                  </Link>
                ))
              : ""}
         {orgId =='5' ? 
           <div
              className="functional-button"
              onClick={() =>
                window.open(
                  "https://academy.anthology.com/lms/my/admin-dashboard.php"
                )
              }
            >
              Functional
            </div>
             :""} 
          </div>
          {orgId =='5' ?  
          <div className="secondpart">
            <div
              className="secondpart-items"
              onClick={() =>
                window.open(
                  "https://academy.anthology.com/lms/calendar/view.php?view=month"
                )
              }
            >
              Upcoming Events
            </div>
          </div> 
           :""} 
        </div>
      </div>
    </MainDiv>
  );
};

export default TrainingNavBar;
