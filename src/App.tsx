// @ts-ignore
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Work from "./Work";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
      </Routes>
    </Router>
  );
}

export default App;
