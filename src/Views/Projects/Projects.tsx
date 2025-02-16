import React from "react";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

function Projects() {
  const BikeDB = [
    "A Web App for bike rental service.",
    "A REST API using Node.js and Express.js.",
    "Used MongoDB for database.",
    "Used JWT for authentication.",
  ];
  const FindMentor = [
    "A Web App for finding mentors in your field.",
    "Access to Experienced Mentors.",
    "Skill Development and Learning Opportunities.",
    "Trackable Progress and Feedback",
  ];
  const InterviewPreparation = [
    "Enhance technical skills.",
    "Prepare for Coding Interviews.",
    "Structural approach to tackle challenges.",
    "Deep dive into System Design.",
  ];
  const DocsGoto = [
    "A Web App for easy read-on for documentation.",
    "Contains documentation for various technologies.",
    "Easy to read and understand.",
    "Contains code snippets for better understanding.",
  ];
  const OffPay = ["An Offline Payment Solution."];
  const FindMentorTags = ["TypeScript", "PocketBase", "VueJS", "REST"];
  const InterviewPreparationTags = [
    "ReactJS",
    "Docusaurus",
    "TypeScript",
    "Markdown",
  ];
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <div>
        <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
          <ProjectCard
            header="Interview Preparation"
            tags={InterviewPreparationTags}
            description={InterviewPreparation}
            github_source_code_link="https://github.com/shyamzzp/interview"
            live_demo="https://shyamzzp.github.io/interview/"
          />
          <ProjectCard
            header="Off Pay"
            description={OffPay}
            tags={FindMentorTags}
          />
          <ProjectCard
            header="Docs Goto"
            description={DocsGoto}
            tags={FindMentorTags}
          />
          <ProjectCard
            header="Find Mentor"
            description={FindMentor}
            tags={FindMentorTags}
          />
          <ProjectCard
            header="Bike Rental Service"
            description={BikeDB}
            tags={FindMentorTags}
          />
        </div>
      </div>
    </div>
  );
}
export default Projects;
