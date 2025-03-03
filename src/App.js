import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Folders from "./pages/folders";
import SubFolder from "./pages/subfolder";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Folders />}></Route>
        <Route path="/:id" element={<SubFolder />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
