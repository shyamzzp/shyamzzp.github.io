import React from 'react'
import right from '../../../img/right.svg';

function BorderedSection(props: any) {
    return (
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
                height: "fit-content",
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
                    {props.text}
                </p><span className="ml-3" style={{display:'flex', color:'grey'}}><img src={right} alt="" width="15" /></span>
            </div>
        </div>
    )
};

export default BorderedSection;