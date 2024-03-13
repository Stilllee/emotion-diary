import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button, { ButtonType } from "components/Button";
import Editor from "components/Editor";
import Header from "components/Header";
import { DiaryDispatchContext, DiaryStateContext } from "context/diary-context";
import { toast } from "react-toastify";
import { DiaryType } from "types/diary-types";

export default function Edit() {
  const params = useParams();
  const id = Number(params.id);
  const nav = useNavigate();
  const dispatchContext = useContext(DiaryDispatchContext);
  const data = useContext(DiaryStateContext);
  const [curDiaryItem, setCurDiaryItem] = useState<DiaryType>();

  useEffect(() => {
    const currentDiaryItem = data.find((item) => item.id === id);

    if (!currentDiaryItem) {
      toast.error("존재하지 않는 일기입니다 🫢");
      nav("/", { replace: true });
    }

    setCurDiaryItem(currentDiaryItem);
  }, [id, data, nav]);

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
    </>
  );
}
