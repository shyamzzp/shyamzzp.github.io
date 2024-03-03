import { ReactComponent as GenLTSVG } from "./GenLT.svg";
import { ReactComponent as InterviewPrep } from "./InterviewPrep.svg";
import { ReactComponent as DeepDive } from "./DeepDive.svg";
import React from "react";

function ProjectCarousel() {
  const [active, setActive] = React.useState("interview-prep");
  return (
    <div className="flex flex-col gap-5">
      <DeepDive />
      <GenLTSVG />
      <InterviewPrep />
      <div className="mb-20"></div>
    </div>
  );
}
export default ProjectCarousel;
