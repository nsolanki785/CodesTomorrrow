import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Folders from "./pages/folders";
import Folder from "./pages/folder";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Folders />}></Route>
        <Route path="/:id" element={<Folder />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
