import cv from "./img/cv.png";
import "./bulma.min.css";
import "./App.css";
import BorderedSection from "./components/Small/BorderedSection/BorderedSection";
import Skills from "./components/Skills/Skills";
import SocialMedia from "./components/SocialMedia/SocialMedia";
import { Drawer } from 'rsuite';
import React, { useEffect, useState } from "react";
import Projects from "./Views/Projects/Projects";
import Blog from "./Views/Blog/Blog";
import CaseStudy from "./Views/CaseStudy/CaseStudy";
import Glossaries from "./Views/Glossaries/Glossaries";
import ReactMarkdown from "react-markdown";
import { getGlossaryReadMe,getBlogReadMe } from "./ReadMeFiles/Glossaries";
import { createClient } from '@supabase/supabase-js'
import { SUPABASE_ENDPOINT, SUPABASE_PUBLIC_ANON_KEY } from './config'
import { data as GlossaryData } from './Views/Glossaries/data'
const supabase = createClient(SUPABASE_ENDPOINT, SUPABASE_PUBLIC_ANON_KEY)

function Home() {
    const [openProjects, setOpenProjects] = React.useState(false);
    const [openBlogs, setOpenBlogs] = React.useState(false);
    const [openCaseStudies, setOpenCaseStudies] = React.useState(false);
    const [openGlossary, setOpenGlossary] = React.useState(false);
    const [value, setValue] = React.useState('agile-development');
    const [viewForClicked, setViewForClicked] = React.useState('github-site');
    const [tosText, setTosText] = useState('');
    const [tosTextBlog, setTosTextBlog] = useState('');

    const updateDBWithGlossaryData = async () => {
        GlossaryData.forEach(async (item) => {
            const { data, error } = await supabase
                .from('Glossary')
                .insert([item])
                .select();
        });
    }

    useEffect(() => {
        fetch(getGlossaryReadMe(value)).then(res => res.text()).then(text => setTosText(text))
    })

    useEffect(() => {
        fetch(getBlogReadMe(value)).then(res => res.text()).then(text => setTosTextBlog(text))
    })

    const setModalOpenProjects = () => {
        setOpenProjects(true);
    };

    const setModalOpenCaseStudies = () => {
        setOpenCaseStudies(true);
    };

    const setModalOpenBlogs = () => {
        setOpenBlogs(true);
    };

    const setModalOpenGlossary = () => {
        setOpenGlossary(true);
    };

    const setReadMeFileContext = (data: string) => {
        setValue(data)
    }

    const exposedMethod = (data:string) =>{
        setViewForClicked(data)
    }

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
                        {/* <div className="mt-5 flex gap-4">
                            <BorderedSection text="Projects" onClick={setModalOpenProjects} isBorderedRadius />
                            <BorderedSection text="Case Studies" onClick={setModalOpenCaseStudies} isBorderedRadius />
                            <BorderedSection text="Blog" onClick={setModalOpenBlogs} isBorderedRadius />
                            <BorderedSection text="Glossary" onClick={setModalOpenGlossary} isBorderedRadius />
                        </div> */}
                        <>
                            <Drawer size={'sm'} backdrop={'static'} open={openProjects} onClose={() => setOpenProjects(false)}>
                                <Drawer.Header>
                                    <Drawer.Title>Projects</Drawer.Title>
                                </Drawer.Header>
                                <Drawer.Body>
                                    <Projects />
                                </Drawer.Body>
                            </Drawer>
                        </>
                        <>
                            <Drawer size={'full'} backdrop={'static'} open={openBlogs} onClose={() => setOpenBlogs(false)}>
                                <Drawer.Header>
                                    <Drawer.Title style={{ fontSize: '20px' }}>Blogs</Drawer.Title>
                                </Drawer.Header>
                                <Drawer.Body style={{ paddingInline: '2rem', paddingBlock: '1rem' }}>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ width: '35%', paddingRight: '30px', height: '85vh', overflow: 'scroll', paddingBottom:'20px' }}>
                                            <Blog exposedMethod={exposedMethod}/>
                                        </div>
                                        <div style={{ width: '65%', height: '85vh', overflow: 'scroll', paddingInline: '30px' }}>
                                            <p>{viewForClicked}</p>
                                            <ReactMarkdown children={tosTextBlog} />
                                        </div>
                                    </div>
                                </Drawer.Body>
                            </Drawer>
                        </>

                        <>
                            <Drawer size={'full'} backdrop={'static'} open={openCaseStudies} onClose={() => setOpenCaseStudies(false)}>
                                <Drawer.Header>
                                    <Drawer.Title style={{ fontSize: '20px' }}>Case Studies</Drawer.Title>
                                </Drawer.Header>
                                <Drawer.Body style={{ paddingInline: '2rem', paddingBlock: '1rem' }}>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ width: '35%', paddingRight: '30px', height: '85vh', overflow: 'scroll' }}>
                                            <CaseStudy />
                                        </div>
                                        <div style={{ width: '65%', height: '85vh', overflow: 'scroll', paddingInline: '30px' }}>
                                            <p>Default Value for the Bigger Section</p>
                                            {/* <FlightDetails /> */}
                                        </div>
                                    </div>
                                </Drawer.Body>
                            </Drawer>
                        </>

                        <>
                            <Drawer size={'full'} backdrop={'static'} open={openGlossary} onClose={() => setOpenGlossary(false)}>
                                <Drawer.Header>
                                    <Drawer.Title style={{ fontSize: '20px' }}>Glossary</Drawer.Title>
                                    {/* <Drawer.Actions>
                                        <Button onClick={() => updateDBWithGlossaryData()}>Feed Data to DB</Button>
                                    </Drawer.Actions> */}
                                </Drawer.Header>
                                <Drawer.Body style={{ paddingInline: '2rem', paddingBlock: '1rem' }}>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ width: '35%', paddingRight: '30px', height: '85vh', overflow: 'scroll' }}>
                                            <Glossaries setValue={setReadMeFileContext} />
                                        </div>
                                        <div style={{ width: '65%', height: '85vh', overflow: 'scroll', paddingInline: '30px' }} className="readme-section">
                                            <ReactMarkdown children={tosText} />
                                        </div>
                                    </div>
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
