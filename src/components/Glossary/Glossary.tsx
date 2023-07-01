import React from "react";
import "./Glossary.css";

function Glossary({ setReadMeFileContext, title, reference, level }: any) {
    const levelStyle = {
        backgroundColor: level,
        width: '2px'
    }
    console.log(levelStyle);
    
    return (
        <div style={{ display: "flex", gap: "5px", width: '100%' }} className="glossary-section" onClick={() => { setReadMeFileContext(reference) }}>
            <div
                style={{
                    color: "rgba(52,53,65)",
                    width: "100%",
                    border: "1px solid rgb(223 223 223)",
                    height: 'fit-content',
                    display: 'flex',
                }}
            >
                <div style={levelStyle}></div>
                <div
                    style={{
                        display: "flex",
                        paddingBlock: '0.7rem',
                        marginLeft: "1rem",
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
