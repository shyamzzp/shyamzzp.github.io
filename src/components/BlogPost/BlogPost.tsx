import React from "react";
import "./BlogPost.css";

function BlogPost(props:any) {
    return (
        <div style={{ display: "flex", gap: "20px" }} className="blog-post">
            <div
                className="section"
                style={{
                    padding: "1rem 1rem 1rem",
                    color: "rgba(52,53,65)",
                    width: "fit-content",
                    border: "1px solid rgb(223 223 223)",
                    boxShadow: "0px 0px 0px 0 rgba(0,0,0,0.1)",
                    height: 'fit-content'
                }}
            >
                <div
                    style={{
                        display: "flex",
                        textAlign: "start",
                        justifyContent: "space-between",
                        flexDirection:'column',
                        alignItems:'flex-start',
                    }}
                >
                    <p
                        className="project-header-title"
                        style={{
                            fontSize: "1.1rem",
                            fontWeight: "500",
                            textAlign: "start"
                        }}
                    >
                        {props.title}
                    </p>
                    <p style={{
                            fontSize: "0.875rem",textAlign: "start",marginTop:'5px'
                        }}>
                        {props.desc}
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
export default BlogPost;
