import Button from "components/Button";
import Footer from "components/Footer";
import Header from "components/Header";
import Viewer from "components/Viewer";
import useDiary from "hooks/useDiary";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStringDate } from "utils/get-string-date";
import { GoPaperAirplane } from "react-icons/go";
import { CallGPT } from "api/gpt";
import Letter from "components/Letter";
import { DiaryType } from "types/diary-types";
import usePageTitle from "hooks/usePageTitle";

export default function Diary() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasReceived, setHasReceived] = useState(false);
  const [gptAnswer, setGptAnswer] = useState("");

  const params = useParams();
  const id = Number(params.id);
  usePageTitle(`${id}번 일기`);

  const getDiaries = () => {
    return JSON.parse(localStorage.getItem("diary") || "[]") as DiaryType[];
  };

  useEffect(() => {
    const diaries = getDiaries();
    const currentDiary = diaries.find((diary) => diary.id === id);
    if (currentDiary && currentDiary.gptAnswer) {
      setGptAnswer(currentDiary.gptAnswer);
      setHasReceived(true);
    }
  }, [id]);

  const handleClickAPICall = async () => {
    try {
      setIsLoading(true);
      const message = await CallGPT({
        prompt: JSON.stringify(content),
      });
      setHasReceived(true);

      const parsedMessage = JSON.parse(message);
      if (parsedMessage && parsedMessage.answer) {
        const diaries = getDiaries();
        const diaryIndex = diaries.findIndex((diary) => diary.id === id);
        if (diaryIndex !== -1) {
          diaries[diaryIndex].gptAnswer = parsedMessage.answer;
          localStorage.setItem("diary", JSON.stringify(diaries));
        }
        setGptAnswer(parsedMessage.answer);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const nav = useNavigate();

  const curDiaryItem = useDiary(id);

  if (!curDiaryItem) {
    return <div>데이터 로딩중..</div>;
  }

  const { createdDate, emotion, content } = curDiaryItem;

  return (
    <div className="overflow-hidden">
      <Header
        title={`${getStringDate(createdDate)} 기록`}
        leftChild={<Button text={"< 뒤로가기"} onClick={() => nav(-1)} />}
        rightChild={
          <Button text={"수정하기"} onClick={() => nav(`/edit/${id}`)} />
        }
      />
      <Viewer emotion={emotion} content={content} />
      <div className="pb-24 flex flex-col justify-center">
        <button
          className="bg-[#3498db] dark:bg-[#3498db] text-white p-2 rounded-md mb-5"
          onClick={handleClickAPICall}
          disabled={hasReceived}
        >
          {hasReceived ? (
            "답장이 도착했어요"
          ) : (
            <div className="flex justify-center items-center gap-2">
              답장 받기 <GoPaperAirplane />
            </div>
          )}
        </button>
        <Letter letterData={gptAnswer} isLoading={isLoading} />
      </div>
      <Footer />
    </div>
  );
}
