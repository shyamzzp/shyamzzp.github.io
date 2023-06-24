import React from "react";
import { Drawer } from 'rsuite';

function Glossary(props: any) {
    const [open, setOpen] = React.useState(false);
    const [opens, setOpens] = React.useState(false);
    const handleClose = () => setOpen(false);
    return (
        <div style={{ display: "flex", gap: "10px", maxWidth:'100%' }}>
            <div
                style={{
                    paddingBlock: ".2rem",
                    paddingInline: ".8rem",
                    color: "rgba(52,53,65)",
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
                            fontSize: "1rem",
                            fontWeight: "500",
                            textAlign: "center",
                        }}
                    >
                        {props.title}
                    </p>
                </div>
            </div>
        </div>
    );
}
export default Glossary;
