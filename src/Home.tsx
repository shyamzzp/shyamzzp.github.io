import cv from "./img/cv.png";
import "./bulma.min.css";
import "./App.css";
import BorderedSection from "./components/Small/BorderedSection/BorderedSection";
import Skills from "./components/Skills/Skills";
import SocialMedia from "./components/SocialMedia/SocialMedia";
import { Drawer, RadioGroup, Radio, ButtonToolbar, Button, Placeholder } from 'rsuite';
import React from "react";
import Projects from "./Views/Projects/Projects";
import Blog from "./Views/Blog/Blog";
import CaseStudy from "./Views/CaseStudy/CaseStudy";

const styles = {
    radioGroupLabel: {
        padding: '8px 12px',
        display: 'inline-block',
        verticalAlign: 'middle'
    }
};

function Home() {
    const [openProjects, setOpenProjects] = React.useState(false);
    const [openBlogs, setOpenBlogs] = React.useState(false);
    const [openCaseStudies, setOpenCaseStudies] = React.useState(false);
    const setModalOpenProjects = () => {
        setOpenProjects(true);
    };

    const setModalOpenCaseStudies = () => {
        setOpenCaseStudies(true);
    };

    const setModalOpenBlogs = () => {
        setOpenBlogs(true);
    };

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
                            <BorderedSection text="Projects" link="/projects" onClick={setModalOpenProjects} />
                            <BorderedSection text="Case Studies" link="/casestudy" onClick={setModalOpenCaseStudies} />
                            <BorderedSection text="Blog" link="/blog" onClick={setModalOpenBlogs} />
                        </div>
                        <>
                            <Drawer backdrop={'static'} open={openProjects} onClose={() => setOpenProjects(false)}>
                                <Drawer.Header>
                                    <Drawer.Title>Projects</Drawer.Title>
                                </Drawer.Header>
                                <Drawer.Body>
                                    <Projects />
                                </Drawer.Body>
                            </Drawer>
                        </>
                        <>
                            <Drawer backdrop={'static'} open={openBlogs} onClose={() => setOpenBlogs(false)}>
                                <Drawer.Header>
                                    <Drawer.Title>Blogs</Drawer.Title>
                                </Drawer.Header>
                                <Drawer.Body>
                                    <Blog />
                                </Drawer.Body>
                            </Drawer>
                        </>
                        <>
                            <Drawer backdrop={'static'} open={openCaseStudies} onClose={() => setOpenCaseStudies(false)}>
                                <Drawer.Header>
                                    <Drawer.Title>Case Studies</Drawer.Title>
                                </Drawer.Header>
                                <Drawer.Body>
                                    <CaseStudy />
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
