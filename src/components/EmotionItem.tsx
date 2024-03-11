import { Emotion, emotionBgColor, getEmotionImage } from "utils/emotion-utils";

interface EmotionItemProps {
  emotion: Emotion;
  emotionName: string;
  isSelected: boolean;
}

export default function EmotionItem({
  emotion,
  emotionName,
  isSelected,
}: EmotionItemProps) {
  const selectedColor = isSelected
    ? `${emotionBgColor[emotion]} text-white`
    : "bg-btnLight";
  return (
    <div
      className={`${selectedColor}  p-5 rounded-md cursor-pointer text-center`}
    >
      <img className="w-1/2 mb-3 mx-auto" src={getEmotionImage(emotion)} />
      <div>{emotionName}</div>
    </div>
  );
}
