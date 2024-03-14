import Button from "components/Button";
import Header from "components/Header";
import Viewer from "components/Viewer";
import useDiary from "hooks/useDiary";
import { useNavigate, useParams } from "react-router-dom";
import { getStringDate } from "utils/get-string-date";

export default function Diary() {
  const params = useParams();
  const id = Number(params.id);
  const nav = useNavigate();

  const curDiaryItem = useDiary(id);

  if (!curDiaryItem) {
    return <div>데이터 로딩중..</div>;
  }

  const { createdDate, emotion, content } = curDiaryItem;

  return (
    <>
      <Header
        title={`${getStringDate(createdDate)} 기록`}
        leftChild={<Button text={"< 뒤로가기"} onClick={() => nav(-1)} />}
        rightChild={
          <Button text={"수정하기"} onClick={() => nav(`/edit/${id}`)} />
        }
      />
      <Viewer emotion={emotion} content={content} />
    </>
  );
}
