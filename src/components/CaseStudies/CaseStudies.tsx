import React from "react";
import zerodha from "../../img/zerodha.png";
import pinterest from "../../img/pinterest.png";
import git from "../../img/git.png";
import "./CaseStudies.css";

function CaseStudies(props: any) {
    let srcLogo; 
    if(props.logo==='zerodha'){
        srcLogo = zerodha;
    }
    if(props.logo==='pinterest'){
        srcLogo = pinterest;
    }
    if(props.logo==='git'){
        srcLogo = git;   
    }

    return (
        <div style={{ display: "flex", gap: "10px", maxWidth:'100%' }}>
            <div
                className="section"
                style={{
                    paddingBlock: ".4rem",
                    paddingInline: "1rem",
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
                    <span style={{display:'flex'}}><img src={srcLogo} alt="" width="25" /></span>
                    <p
                        className="project-header-title"
                        style={{
                            fontSize: "1rem",
                            fontWeight: "500",
                            textAlign: "center",
                            marginLeft:'10px'
                        }}
                    >
                        {props.title}
                    </p>
                </div>


                {/* <div style={{ fontSize: ".875rem", display: "flex" }}>
                    {props.desc}
                </div> */}
            </div>
        </div>
    );
}
export default CaseStudies;
