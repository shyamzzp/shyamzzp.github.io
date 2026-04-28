// @ts-ignore
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Blogs from "./Blogs";
import Home from "./Home";
import Help from "./Help";
import VoiceWorkflowBlogPost from "./Views/Blog/VoiceWorkflowBlogPost";
import NoteTakingCaseStudy from "./Views/CaseStudy/NoteTakingCaseStudy";
import RaycastCaseStudy from "./Views/CaseStudy/RaycastCaseStudy";
import TempMailCaseStudy from "./Views/CaseStudy/TempMailCaseStudy";
import WisprFlowCaseStudy from "./Views/CaseStudy/WisprFlowCaseStudy";
import WorkflowyCaseStudy from "./Views/CaseStudy/WorkflowyCaseStudy";
import Projects from "./Views/Projects/Projects";
import Work from "./Work";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route
          path="/voice-automation-workflow-blog"
          element={<VoiceWorkflowBlogPost />}
        />
        <Route path="/help" element={<Help />} />
        <Route
          path="/production-effect-case-study"
          element={<NoteTakingCaseStudy />}
        />
        <Route path="/raycast-case-study" element={<RaycastCaseStudy />} />
        <Route path="/temp-mail-case-study" element={<TempMailCaseStudy />} />
        <Route path="/wispr-flow-case-study" element={<WisprFlowCaseStudy />} />
        <Route path="/workflowy-case-study" element={<WorkflowyCaseStudy />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/work" element={<Work />} />
      </Routes>
    </Router>
  );
}

export default App;
