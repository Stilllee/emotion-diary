import { emotionBgColor, getEmotionImage } from "utils/emotion-utils";
import Button from "components/Button";
import { useNavigate } from "react-router-dom";
import { DiaryType } from "types/diary-types";

export default function DiaryItem({
  id,
  createdDate,
  emotion,
  content,
}: DiaryType) {
  const nav = useNavigate();
  const bgColor = emotionBgColor[emotion];
  return (
    <div className="flex gap-4 justify-between py-4 border-b border-bgLight">
      <div
        onClick={() => nav(`/diary/${id}`)}
        className={`${bgColor} min-w-32 h-20 flex justify-center cursor-pointer rounded-md`}
      >
        <img className="w-1/2" src={getEmotionImage(emotion)} />
      </div>
      <div
        onClick={() => nav(`/diary/${id}`)}
        className="flex-1 cursor-pointer"
      >
        <div className="font-bold text-xl">
          {new Date(createdDate).toLocaleDateString()}
        </div>
        <div>{content}</div>
      </div>
      <div className="min-w-20">
        <Button onClick={() => nav(`/edit/${id}`)} text={"수정하기"} />
      </div>
    </div>
  );
}
