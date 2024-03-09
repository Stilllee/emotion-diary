import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "pages/Home";
import New from "pages/New";
import Diary from "pages/Diary";
import Button from "components/Button";
import Header from "components/Header";

function App() {
  return (
    <>
      <Header
        leftChild={<Button text={"<"} onClick={() => console.log("전월")} />}
        title={"타이틀"}
        rightChild={<Button text={">"} onClick={() => console.log("익월")} />}
      />
      <Button text={"버튼"} onClick={() => console.log("디폴트 버튼 클릭")} />
      <Button
        text={"버튼"}
        type={"POSITIVE"}
        onClick={() => console.log("파지티브 버튼 클릭")}
      />
      <Button
        text={"버튼"}
        type={"NEGATIVE"}
        onClick={() => console.log("네거티브 버튼 클릭")}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/diary/:id" element={<Diary />} />
      </Routes>
    </>
  );
}

export default App;
