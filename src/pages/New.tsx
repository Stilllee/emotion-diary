import Button from "components/Button";
import Editor from "components/Editor";
import Header from "components/Header";
import { DiaryDispatchContext } from "context/diary-context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryType } from "types/diary-types";

export default function New() {
  const dispatchContext = useContext(DiaryDispatchContext);
  const nav = useNavigate();

  const onSubmit = (input: DiaryType) => {
    const { createdDate, emotion, content } = input;
    dispatchContext?.onCreate(
      new Date(createdDate).getTime(),
      emotion,
      content
    );
    nav("/", { replace: true });
  };

  return (
    <>
      <Header
        title={"새 일기쓰기"}
        leftChild={<Button text={"< 뒤로 가기"} onClick={() => nav(-1)} />}
      />
      <Editor onSubmit={onSubmit} />
    </>
  );
}
