import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button, { ButtonType } from "components/Button";
import Editor from "components/Editor";
import Header from "components/Header";
import { DiaryDispatchContext } from "context/diary-context";
import { DiaryType } from "types/diary-types";
import useDiary from "hooks/useDiary";
import Footer from "components/Footer";
import usePageTitle from "hooks/usePageTitle";

export default function Edit() {
  const params = useParams();
  const id = Number(params.id);
  const nav = useNavigate();
  const dispatchContext = useContext(DiaryDispatchContext);

  const curDiaryItem = useDiary(id);
  usePageTitle(`${id}번 일기 수정`);

  const onClickDelete = () => {
    if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")) {
      dispatchContext?.onDelete(id);
      nav("/", { replace: true });
    }
  };

  const onSubmit = (input: DiaryType) => {
    const { id, createdDate, emotion, content } = input;
    if (window.confirm("일기를 수정할까요?")) {
      dispatchContext?.onUpdate(
        id,
        new Date(createdDate).getTime(),
        emotion,
        content
      );
    }
    nav("/", { replace: true });
  };

  return (
    <>
      <Header
        title={"일기 수정하기"}
        leftChild={<Button text={"< 뒤로가기"} onClick={() => nav(-1)} />}
        rightChild={
          <Button
            text={"삭제하기"}
            type={ButtonType.NEGATIVE}
            onClick={onClickDelete}
          />
        }
      />
      <Editor initData={curDiaryItem} onUpdate={onSubmit} />
      <Footer />
    </>
  );
}
