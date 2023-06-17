// @ts-ignore
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Home";
import BlogPost from "./components/BlogPost/BlogPost";

function App() {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<Home/>}/>
            {/* <Route path="/post" element={<BlogPost/>}/> */}
            <Route path="*" element={<Home/>}/>
            </Routes>
        </Router>
    );
}

export default App;
