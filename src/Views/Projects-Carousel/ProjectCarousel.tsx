import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ReactComponent as GenLTSVG } from "./GenLT.svg";

function ProjectCarousel() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {/* <div
        style={{
          width: "10vw",
        }}
      >
        <ArrowLeft />
      </div> */}
      <div
        style={{
          width: "75vw",
          display: "flex",
        }}
      >
        <GenLTSVG style={{ width: "fit-content" }} />
      </div>
      {/* <div
        style={{
          width: "10vw",
        }}
      >
        <ArrowRight
          style={{
            border: "1px solid black",
            borderRadius: "50%",
            padding: "4px",
            height: "fit-content",
            marginLeft: "20px",
            fontSize: "30px",
          }}
        />
      </div> */}
    </div>
  );
}
export default ProjectCarousel;
