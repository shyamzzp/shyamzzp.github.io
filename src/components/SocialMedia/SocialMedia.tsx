import React from 'react'
import skype from './../../../src/img/skype.png'
import whatsapp from "./../../../src/img/whatsapp.png";
import linkedin from "./../../../src/img/linkedin.png";
import stackoverflow from "./../../../src/img/stack-overflow.png";
import github from "./../../../src/img/github.png";

export default function SocialMedia() {
  return (
    <div
                            style={{
                                fontSize: "25px",
                                marginBottom: "30px",
                                display: "flex",
                                gap: "10px",
                            }}
                        >
                            <a
                                href="https://join.skype.com/invite/vS8AjAHY3sZx"
                                target="_blank"
                                rel="noreferrer"
                            >
                                {" "}
                                <img src={skype} alt="" width="25" />
                            </a>
                            <a
                                href="https://api.whatsapp.com/send?phone=9501891381"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img src={whatsapp} alt="" width="25" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/shyamzzp/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img src={linkedin} alt="" width="25" />
                            </a>
                            <a
                                href="https://github.com/shyamzzp"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img src={github} width="25" alt="" />
                            </a>
                            <a
                                href="https://stackoverflow.com/users/5853122/shyamzzp"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img src={stackoverflow} width="25" alt="" />
                            </a>
                        </div>
  )
}
