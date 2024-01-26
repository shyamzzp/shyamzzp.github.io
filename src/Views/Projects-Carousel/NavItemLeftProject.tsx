import React from "react";

export default function NavItemLeftProject(props) {
  return (
    <div
      style={{
        width: "100%",
        border: "1px solid #0000002e",
        padding: "20px",
        cursor: "pointer",
      }}
      className="shadow-google"
    >
      {props.title}
    </div>
  );
}
