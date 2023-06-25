import React from 'react'
import live from '../../img/live.png';
import github from '../../img/github.png';
import "./ProjectCard.css";

function ProjectCard(props: any) {
    const styleContainer = {
        marginBottom :props.mb?'20px':'0',
        display: "flex", 
        gap: "20px",
        marginRight:props.mr?'10px':'0',
    }
    return (
        <div style={styleContainer} className="project-card">
            <div
                className="section"
                style={{
                    color: "black",
                    width: "100%",
                    height: "fit-content",
                    paddingInline: '2rem',
                    paddingBlock: '2rem',
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                }}
            >
                <div
                    className="project-header-title"
                    style={{
                        fontSize: "20px",
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
                <p className="project-header-sub-title"
                    style={{ fontSize: "16px", marginTop:'10px' }}>
                    {props.description.map((item: string) => {
                        return (
                            <li key={item}>
                                {item}
                            </li>
                        );
                    })}
                    </p>

                <div style={{ marginTop: "5px", display: 'flex', gap: '5px' }}>
                    {props.tags.map((item: string) => {
                        return (
                            <span key={item}
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