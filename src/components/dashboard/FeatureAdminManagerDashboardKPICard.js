import React from "react";

export default class FeatureAdminManagerDashboardKPICard extends React.Component {
  render() {
    return (
      <div
        style={{
          background: this.props.cardContent.cardColor,
          width: "100%",
          height: "115px",
          borderRadius: "15px",
          boxShadow: `0px 10px 17px -4px ${this.props.cardContent.cardShadow}`,
          padding: "10px 15px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            color: "#FFFFFF",
            fontFamily: "Open Sans Semibold",
            fontSize: "12px",
            marginBottom: "2%",
            marginTop: "5px",
          }}
        >
          {this.props.cardContent.title}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <div
            style={{
              color: "#FFFFFF",
              fontFamily: "Open Sans Semibold",
              fontSize: "37px",
            }}
          >
            {this.props.cardContent.numContent ? this.props.cardContent.numContent :'0' }
          </div>
          <div style={{ alignSelf: "flex-end" }}>
            <img
              src={this.props.cardContent.icon}
              style={{ width: 40, height: 40 }}
              alt="cardIcon"
            />
          </div>
        </div>
      </div>
    );
  }
}
