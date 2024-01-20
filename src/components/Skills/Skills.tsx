import React from "react";
import { Drawer } from "rsuite";
import Projects from "../../Views/Projects/Projects";

export default function Skills() {
  const [openProjects, setModalOpenProjects] = React.useState(false);
  return (
    <>
      <div className="tags">
        <span className="tag is-warning">Windows</span>
        <span className="tag is-warning">Linux</span>{" "}
        <span
          className="tag cursor-pointer border"
          onClick={() => {
            setModalOpenProjects(true);
          }}
        >
          Projects
        </span>
      </div>
      <br />
      <div className="tags">
        <span className="tag is-dark">Python</span>
        <span className="tag is-dark">Java - Spring</span>
        <span className="tag is-dark">MongoDB</span>
        <span className="tag is-dark">GraphQL</span>
        <span className="tag is-dark">NodeJS</span>
        <span className="tag is-dark">C# - UWP/WPF</span>
      </div>
      <div className="tags">
        <span className="tag is-success">TypeScript</span>
        <span className="tag is-success">Javascript</span>
        <span className="tag is-success">TailwindCSS</span>
        <span className="tag is-success">NodeJS</span>
        <span className="tag is-success">ReactJS</span>
        <span className="tag is-success">NextJS</span>
        <span className="tag is-success">NestJS</span>
      </div>
      <div className="tags">
        <span className="tag is-link">Github</span>
        <span className="tag is-link">Github - Actions/Workflows</span>
        <span className="tag is-link">JIRA</span>
        <span className="tag is-link">CI/CD</span>
        <span className="tag is-link">AWS - Lambda/EC2</span>
        <span className="tag is-link">Docker</span>
      </div>
      <div className="tags">
        <span className="tag is-link">Figma (Design & Prototype)</span>
        <span className="tag is-link">Sketch</span>
        <span className="tag is-link">Chrome Extensions</span>
        <span className="tag is-link">Postman</span>
      </div>
      <div className="tags">
        <span className="tag is-light-grey-pink">Playwright</span>
        <span className="tag is-light-grey-pink">NightWatch</span>
        <span className="tag is-light-grey-pink">MQTT</span>
        <span className="tag is-light-grey-pink">Mosquito</span>
        <span className="tag is-light-grey-pink">
          D3(Data-Driven Documents)
        </span>
      </div>
      <div className="tags">
        <span className="tag is-js-frameworks">Ant Design (antd)</span>
        <span className="tag is-js-frameworks">Material UI (mui)</span>
        <span className="tag is-js-frameworks">Shadcn UI</span>
        <span className="tag is-js-frameworks">Framework7</span>
        <span className="tag is-js-frameworks">NextUI</span>
      </div>

      <div className="tags">
        <span className="tag is-light-orange">RasberryPi</span>
        <span className="tag is-light-orange">Embedded System - Arduino</span>
      </div>
      <Drawer
        size={"sm"}
        backdrop={"static"}
        open={openProjects}
        onClose={() => setModalOpenProjects(false)}
      >
        <Drawer.Header>
          <Drawer.Title>Projects</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <Projects />
        </Drawer.Body>
      </Drawer>
    </>
  );
}
