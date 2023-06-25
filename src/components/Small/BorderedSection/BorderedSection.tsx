import React from 'react'
import right from '../../../img/right.svg';

interface IBorderedSectionProps {
    text: string;
    onClick: () => void;
    isBorderedRadius?: boolean;
}

function BorderedSection(props: IBorderedSectionProps) {
    const borderedRadius = props.isBorderedRadius ? ".375rem" : "0px";
    return (
        <div
            className="section cursor-pointer h-fit w-fit"
            style={{
                paddingBlock: ".3rem",
                paddingInline: "1rem",
                color: "rgba(52,53,65)",
                maxWidth: "25rem",
                borderRadius: `${borderedRadius}`,
                // isBorderedRadius?".375rem":"0",
                border: "1px solid rgb(223 223 223)",
                boxShadow: "2px 2px 0px 0 rgba(0,0,0,0.1)",
                backgroundColor:'white',
            }}
            onClick={()=>{
                props.onClick();
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