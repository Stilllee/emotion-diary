import Button from "components/Button";
import Footer from "components/Footer";
import Header from "components/Header";
import Viewer from "components/Viewer";
import useDiary from "hooks/useDiary";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStringDate } from "utils/get-string-date";
import { GoPaperAirplane } from "react-icons/go";
import { CallGPT } from "api/gpt";
import Letter from "components/Letter";

export default function Diary() {
  const [gptData, setGptData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClickAPICall = async () => {
    try {
      setIsLoading(true);
      const message = await CallGPT({
        prompt: JSON.stringify(content),
      });
      setGptData(JSON.parse(message).action);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const params = useParams();
  const id = Number(params.id);
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
          className="bg-[#3498db] dark:bg-[#3498db] text-white p-2 rounded-lg mb-5 flex justify-center items-center gap-2"
          onClick={handleClickAPICall}
        >
          <span>답장 받기</span>
          <GoPaperAirplane />
        </button>
        <Letter letterData={gptData} isLoading={isLoading} />
      </div>
      <Footer />
    </div>
  );
}
