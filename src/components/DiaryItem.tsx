import { Emotion, getEmotionImage } from "utils/get-emotion-image";
import Button from "components/Button";

export default function DiaryItem() {
  const emotion = Emotion.HAPPY;
  const emotionBgColor =
    emotion === Emotion.HAPPY
      ? "bg-green"
      : emotion === Emotion.GOOD
      ? "bg-yellowGreen"
      : emotion === Emotion.NORMAL
      ? "bg-yellow"
      : emotion === Emotion.BAD
      ? "bg-orange"
      : emotion === Emotion.TERRIBLE
      ? "bg-red"
      : "";
  return (
    <div className="flex gap-4 justify-between py-4 border-b border-bgLight">
      <div
        className={`${emotionBgColor} min-w-32 h-20 flex justify-center cursor-pointer rounded-md`}
      >
        <img className="w-1/2" src={getEmotionImage(emotion)} />
      </div>
      <div className="flex-1 cursor-pointer">
        <div className="font-bold text-xl">
          {new Date().toLocaleDateString()}
        </div>
        <div>일기 컨텐츠</div>
      </div>
      <div className="min-w-20">
        <Button text={"수정하기"} />
      </div>
    </div>
  );
}
