// @ts-ignore
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Blogs from "./Blogs";
import Home from "./Home";
import Help from "./Help";
import NoteTakingCaseStudy from "./Views/CaseStudy/NoteTakingCaseStudy";
import WorkflowyCaseStudy from "./Views/CaseStudy/WorkflowyCaseStudy";
import Projects from "./Views/Projects/Projects";
import Work from "./Work";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/help" element={<Help />} />
        <Route
          path="/production-effect-case-study"
          element={<NoteTakingCaseStudy />}
        />
        <Route path="/workflowy-case-study" element={<WorkflowyCaseStudy />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/work" element={<Work />} />
      </Routes>
    </Router>
  );
}

export default App;
