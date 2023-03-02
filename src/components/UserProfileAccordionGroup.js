import React, { Component } from "react";
import UserProfileAccordion from "./UserProfileAccordion";
import "../assets/css/OpenSans.css";
class UserProfileAccordionGroup extends Component {
  render() {
    return (
      <div>
        {this.props.accordionOptions.map((ele, index) => (
          <UserProfileAccordion key={index} {...ele} />
        ))}
      </div>
    );
  }
}

export default UserProfileAccordionGroup;
