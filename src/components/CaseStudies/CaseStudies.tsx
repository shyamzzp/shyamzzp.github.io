import React from "react";
import "./CaseStudies.css";

function CaseStudies(props:any) {
    return (
        <div style={{ display: "flex", gap: "20px" }}>
            <div
                className="section"
                style={{
                    padding: "1rem 1rem 1rem",
                    color: "rgba(52,53,65)",
                    maxWidth: "25rem",
                    width: "fit-content",
                    borderRadius: ".375rem",
                    border: "1px solid rgb(223 223 223)",
                    boxShadow: "5px 5px 0px 0 rgba(0,0,0,0.1)",
                    height: 'fit-content'
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <p
                        className="project-header-title"
                        style={{
                            fontSize: "1.1rem",
                            fontWeight: "500",
                            textAlign: "center",
                        }}
                    >
                        {props.title}
                    </p>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "8px",
                        color: "#00000069",
                    }}
                >
                    <div style={{ fontSize: ".75rem", display: "flex" }}>{props.lang}</div>
                    <div style={{ fontSize: ".75rem", display: "flex" }}>
                        {props.date}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CaseStudies;
