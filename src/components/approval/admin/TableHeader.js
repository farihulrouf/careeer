import React, { Component } from "react";

class TableHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHeadings: this.props.tableHeadings || [],
      styles: this.props.styles,
    };
  }
  render() {
    return (
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
        <tr style={{ display: "flex", height: "100%" }}>
          {this.state.tableHeadings.map((ele, id) => (
            <td key={id} style={{ flex: ele.flex || 1 }}>
              <div
                style={{
                  marginLeft:
                    id === 0 || this.state.tableHeadings.length - 1 === id
                      ? "22px"
                      : 0,
                }}
              >
                {ele.title || ""}
              </div>
            </td>
          ))}
        </tr>
      </table>
    );
  }
}

export default TableHeader;
