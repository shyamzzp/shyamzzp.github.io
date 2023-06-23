import React from 'react'
import live from '../../img/live.png';
import github from '../../img/github.png';

function ProjectCard(props: any) {
    const styleContainer = {
        marginBottom :props.mb?'20px':'0',
        display: "flex", 
        gap: "20px",
        marginRight:props.mr?'10px':'0',
    }
    return (
        <div style={styleContainer}>
            <div
                className="section"
                style={{
                    color: "black",
                    width: "fit-content",
                    height: "fit-content",
                    borderRadius: ".375rem",    
                    paddingInline: '2rem',
                    paddingBlock: '2rem',
                    backgroundColor:'#f7f6ee',
                    // border: "1px solid rgb(223 223 223)",
                    boxShadow: 'rgba(0, 0, 0, 0.1) 5px 5px 0px 0px'
                    
                }}
            >
                <div
                    className="project-header-title"
                    style={{
                        fontSize: "26px",
                        textAlign: "start",
                        fontWeight: "400",
                        display: "flex", justifyContent: 'space-between'
                    }}
                >
                    <p>{props.header} <span className={props.live_demo?"blink_me":""} style={{ marginLeft: '5px',color:'#45f545' }}> {props.live_demo?'•':'🚧'}</span></p>
                    <div
                        style={{
                            fontSize: "25px",
                            display: "flex",
                            marginLeft: "40px",
                        }}
                    >
                        <a
                            href={props.github_source_code_link}
                            target="_blank"
                            style={{ display: "flex", alignItems: "center" }}
                            rel="noreferrer"
                        >
                            <img
                                src={github}
                                width="25"
                                alt=""
                                style={{ marginRight: "5px"}}
                            />
                        </a>
                        <a
                            href={props.live_demo}
                            target="_blank"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginLeft: "5px",
                            }}
                            rel="noreferrer"
                        >
                            <img
                                src={live}
                                width="25"
                                alt=""
                                style={{ marginRight: "5px" }}
                            />
                        </a>
                    </div>
                </div>
                {/* <p className="project-header-sub-title"
                    style={{ fontSize: "16px", marginTop:'10px' }}>Enhance technical skills by continuously learning and practicing programming languages, algorithms, and data structures.
Prepare for coding interviews by studying common algorithms, data structures, and practicing problem-solving on platforms like LeetCode or HackerRank.
<br/><br/>Adopt a structural approach to tackle challenges by breaking down complex problems, analyzing requirements, and systematically building and testing solutions.
<br/><br/>Deep dive into system design by understanding scalable and efficient software architecture principles, distributed systems, and relevant concepts like caching and load balancing.
<br/><br/>Focus on continuous improvement, staying updated with the latest technologies, and seeking opportunities to apply and enhance your skills through practical projects and real-world scenarios.</p> */}
                {/* <ol
                    className="project-header-sub-title"
                    style={{ fontSize: "16px", marginTop:'10px' }}
                >
                    {props.description.map((item: string) => {
                        return (
                            <li>
                                {item}
                            </li>
                        );
                    })}
               </ol> */}

                <div style={{ marginTop: "5px", display: 'flex', gap: '5px' }}>
                    {props.tags.map((item: string) => {
                        return (
                            <span
                                className="tag is-dark tech-stack"
                                style={{ marginTop: "5px", backgroundColor: "#ffffffa6" }}
                            >
                                {item}
                            </span>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
export default ProjectCard;