// @ts-ignore
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Help from "./Help";
import Work from "./Work";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/help" element={<Help />} />
        <Route path="/work" element={<Work />} />
      </Routes>
    </Router>
  );
}

export default App;
