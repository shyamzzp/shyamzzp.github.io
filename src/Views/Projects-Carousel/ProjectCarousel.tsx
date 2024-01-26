import { ReactComponent as GenLTSVG } from "./GenLT.svg";
import NavItemLeftProject from "./NavItemLeftProject";
import InterviewPrep from "./InterviewPrep.png";
import React from "react";

function ProjectCarousel() {
  const [active, setActive] = React.useState("genlt");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "start",
      }}
    >
      <div
        style={{
          minWidth: "18vw",
          maxHeight: "80vh",
          marginRight: "30px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          overflow: "auto",
          paddingRight: "10px",
          paddingBottom: "10px",
        }}
      >
        <div
          onClick={() => {
            setActive("interview-prep");
          }}
        >
          <NavItemLeftProject title="Interview Preparation" />
        </div>
        <div
          onClick={() => {
            setActive("genlt");
          }}
        >
          <NavItemLeftProject title="GenLT - NodeJS Module" />
        </div>
        {/*<NavItemLeftProject title="GenLT - NodeJS Module" />
        <NavItemLeftProject title="GenLT - NodeJS Module" />
        <NavItemLeftProject title="GenLT - NodeJS Module" />
        <NavItemLeftProject title="GenLT - NodeJS Module" />
        <NavItemLeftProject title="GenLT - NodeJS Module" />
        <NavItemLeftProject title="GenLT - NodeJS Module" />
        <NavItemLeftProject title="GenLT - NodeJS Module" />
        <NavItemLeftProject title="GenLT - NodeJS Module" />
        <NavItemLeftProject title="GenLT - NodeJS Module" />
        <NavItemLeftProject title="GenLT - NodeJS Module" /> */}
      </div>
      <div
        style={{
          width: "75vw",
          display: "flex",
        }}
      >
        {active === "genlt" ? (
          <GenLTSVG style={{ width: "fit-content" }} />
        ) : null}
        {active === "interview-prep" ? (
          <img src={InterviewPrep} alt="" style={{ width: "match-parent" }} />
        ) : null}
      </div>
    </div>
  );
}
export default ProjectCarousel;
