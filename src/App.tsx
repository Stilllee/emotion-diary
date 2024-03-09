import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "pages/Home";
import New from "pages/New";
import Diary from "pages/Diary";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<New />} />
      <Route path="/diary" element={<Diary />} />
    </Routes>
  );
}

export default App;
