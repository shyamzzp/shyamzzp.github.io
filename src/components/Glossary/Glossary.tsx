import React from "react";
import "./Glossary.css";

function Glossary({setReadMeFileContext, title, reference}: any) {
    return (
        <div style={{ display: "flex", gap: "10px", width:'100%' }} className="glossary-section" onClick={()=>{setReadMeFileContext(reference)}}>
            <div
                style={{
                    padding: "1rem",
                    color: "rgba(52,53,65)",
                    width: "100%",
                    border: "1px solid rgb(223 223 223)",
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
                            fontSize: "1rem",
                            fontWeight: "500",
                            textAlign: "center",
                        }}
                    >
                        {title}
                    </p>
                </div>
            </div>
        </div>
    );
}
export default Glossary;
