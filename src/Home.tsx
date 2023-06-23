import cv from "./img/cv.png";
import "./bulma.min.css";
import "./App.css";
import BorderedSection from "./components/Small/BorderedSection/BorderedSection";
import Skills from "./components/Skills/Skills";
import SocialMedia from "./components/SocialMedia/SocialMedia";
import { Drawer, RadioGroup, Radio, ButtonToolbar, Button, Placeholder } from 'rsuite';
import React from "react";

const styles = {
    radioGroupLabel: {
        padding: '8px 12px',
        display: 'inline-block',
        verticalAlign: 'middle'
    }
};

function Home() {
    const [open, setOpen] = React.useState(false);
    return (
        <div id="app">
            <section className="hero is-info is-fullheight">
                <div className="hero-body" style={{ backgroundColor: '#f7f6ee' }}>
                    <div className="container">
                        <h4 className="title flex items-center !mb-2">
                            Shyam Suthar{" "}
                            <span className="ml-2">
                                <a
                                    href="https://github.com/shyamzzp/shyamzzp.github.io/raw/master/resume/ShyamSS-resume.pdf"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <img src={cv} width="40" className="mr-1" alt="" />
                                </a>
                            </span>
                        </h4>
                        <h3
                            className="title title-sub"
                            style={{ fontSize: "25px", marginBottom: "10px" }}
                        >
                            Sen. Software Development Engineer (6+)
                        </h3>

                        <SocialMedia />
                        <Skills />
                        <div className="mt-5 flex gap-4">
                            <BorderedSection text="Projects" link="/projects" />
                            <BorderedSection text="Case Studies" link="/casestudy" />
                            <BorderedSection text="Blog" link="/blog" />
                        </div>
                        <>
                            <ButtonToolbar>
                                <Button onClick={() => setOpen(true)}>Open</Button>
                            </ButtonToolbar>
                            <Drawer backdrop={'static'} open={open} onClose={() => setOpen(false)}>
                                <Drawer.Header>
                                    <Drawer.Title>Drawer Title</Drawer.Title>
                                    <Drawer.Actions>
                                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                                        <Button onClick={() => setOpen(false)} appearance="primary">
                                            Confirm
                                        </Button>
                                    </Drawer.Actions>
                                </Drawer.Header>
                                <Drawer.Body>
                                    <Placeholder.Paragraph />
                                </Drawer.Body>
                            </Drawer>
                        </>
                    </div>
                </div>
            </section>

        </div>
    );
}
export default Home;
