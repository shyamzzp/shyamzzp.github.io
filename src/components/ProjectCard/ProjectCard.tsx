import React from 'react'
import live from '../../img/live.png';
import github from '../../img/github.png';

function ProjectCard(props: any) {
    const styleContainer = {
        marginBottom :props.mb?'20px':'0',
        display: "flex", 
        gap: "20px"
    }
    return (
        <div style={styleContainer}>
            <div
                className="section"
                style={{
                    padding: "1rem 1rem 1rem",
                    color: "rgba(52,53,65)",
                    width: "22rem",
                    height: "fit-content",
                    borderRadius: ".375rem",
                    border: "1px solid rgb(223 223 223)",
                    boxShadow: 'rgba(0, 0, 0, 0.1) 5px 5px 0px 0px'
                }}
            >
                <div
                    className="project-header-title"
                    style={{
                        fontSize: "1.1rem",
                        textAlign: "start",
                        fontWeight: "500",
                        display: "flex", justifyContent: 'space-between'
                    }}
                >
                    <p>{props.header} <span className={props.live_demo?"blink_me":""} style={{ marginLeft: '5px' }}> {props.live_demo?'•':'🚧'}</span></p>
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
                                style={{ marginRight: "5px" }}
                            />
                        </a>
                        <a
                            href={props.live_link}
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
                <p
                    className="project-header-sub-title"
                    style={{ fontSize: ".875rem", textAlign: "start", marginTop:'10px' }}
                >
                    {props.description.map((item: any) => {
                        return (
                            <span>
                                {item}
                                <br />
                            </span>
                        );
                    })}
                </p>

                <div style={{ marginTop: "5px", display: 'flex', gap: '5px' }}>
                    {props.tags.map((item: any) => {
                        return (
                            <span
                                className="tag is-dark tech-stack"
                                style={{ marginTop: "5px", backgroundColor: "#3636367d" }}
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