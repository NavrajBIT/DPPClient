import { useState } from "react";

const Datafield = ({ datafield }) => {
  return (
    <div
      style={{
        background: "var(--accent-10)",
        padding: "var(--padding-light)",
        margin: "var(--padding-main)",
        borderRadius: "var(--border-radius)",
      }}
    >
      <div
        style={{
          color: "var(--text-accent)",
          fontSize: "2.5rem",
          display: "flex",
          justifyContent: "space-between",
          padding: "0 var(--padding-light)",
          alignItems: "center",
          fontFamily: "arial",
        }}
      >
        <div>
          <div>{datafield.name}</div>
          <div style={{ fontSize: "1.5rem", color: "grey" }}>
            {datafield.description}
          </div>
        </div>
      </div>
      <div style={{ padding: "2% 5%" }}>
        <h3 style={{ padding: "10px 0" }}>Data Points</h3>
        {datafield.datapoints == "" ? (
          "No Data Points"
        ) : (
          <ul>
            {datafield.datapoints.map((dp) => {
              return (
                <li
                  style={{
                    background: "#00425a",
                    margin: "10px",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                >
                  <div>
                    <h3>{dp["datapoint Name"]}</h3>
                    <br />
                    <h4>{dp["datapoint Info"]}</h4>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Datafield;
