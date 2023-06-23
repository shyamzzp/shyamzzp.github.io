import React from "react";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

function Projects() {
    const BikeDB = ["A Web App for bike rental service.", "A REST API using Node.js and Express.js.", "Used MongoDB for database.", "Used JWT for authentication."];
    const FindMentor = ["A Web App for finding mentors in your field.", "Access to Experienced Mentors.", "Skill Development and Learning Opportunities.", "Trackable Progress and Feedback"];
    const InterviewPreparation = ["Enhance technical skills.", "Prepare for Coding Interviews.", "Structural approach to tackle challenges.", "Deep dive into System Design."];
    const DocsGoto = ["A Web App for easy read-on for documentation.", "Contains documentation for various technologies.", "Easy to read and understand.", "Contains code snippets for better understanding."];
    const OffPay = ["An Offline Payment Solution.", "Contains documentation for various technologies.", "Easy to read and understand.", "Contains code snippets for better understanding."];
    
    
    const FindMentorTags = ["TypeScript", "PocketBase", "VueJS", "REST"];
    const InterviewPreparationTags = ["ReactJS", "Docusaurus", "TypeScript", "Markdown"];
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '100px', flexDirection: 'column' }} className="container">
            <div>
                {/* <p style={{ fontSize: '22px', color: '#4a4a4a', marginBottom: '0px', }}>🚀 Projects</p>
                <p style={{ fontSize: '16px', color: '#4a4a4a', marginBottom: '20px', marginTop: '0' }}>Below projects exemplify my expertise, technical skills, and contributions as a senior software engineer.</p> */}
                <div style={{ display: 'flex', gap: '20px', flexWrap:'wrap'}}>
                    <ProjectCard
                        header="Interview Preparation"
                        tags={InterviewPreparationTags}
                        description={InterviewPreparation}
                        github_source_code_link="https://github.com/shyamzzp/interview"
                        live_demo="https://shyamzzp.github.io/interview/" />
                    <ProjectCard
                        header="Off Pay"
                        description={OffPay}
                        tags={FindMentorTags}
                        mb />
                    <ProjectCard
                        header="Docs Goto"
                        description={DocsGoto}
                        tags={FindMentorTags}
                        mb />
                    <ProjectCard
                        header="Find Mentor"
                        description={FindMentor}
                        tags={FindMentorTags} />
                    <ProjectCard
                        header="Bike Rental Service"
                        description={BikeDB}
                        tags={FindMentorTags}
                        mb
                        mr />
                </div>
            </div>
        </div>
    );
}
export default Projects;