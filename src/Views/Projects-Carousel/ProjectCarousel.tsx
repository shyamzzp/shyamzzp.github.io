import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import GenLT from "./GenLT.svg";

function ProjectCarousel() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
      }}
    >
      <div>
        <ArrowLeft />
      </div>
      <div>
        <img src={GenLT} alt="GenLT" />
      </div>
      <div>
        <ArrowRight />
      </div>
    </div>
  );
}
export default ProjectCarousel;
