import { Emotion, emotionInfo, getEmotionImage } from "utils/emotion-utils";

interface ViewerProps {
  emotion: Emotion;
  content: string;
}

export default function Viewer({ emotion, content }: ViewerProps) {
  const bgColor = emotionInfo[emotion].bgColor;

  return (
    <>
      <section className="w-full mb-28 flex flex-col items-center text-center">
        <h4 className="font-bold text-xl my-7">오늘의 감정</h4>
        <div
          className={`${bgColor} w-64 h-64 rounded-md flex flex-col items-center justify-around text-white`}
        >
          <img src={getEmotionImage(emotion)} />
          <div className="font-semibold text-xl">
            {emotionInfo[emotion].name}
          </div>
        </div>
      </section>
      <section className="w-full mb-28 flex flex-col items-center text-center">
        <h4 className="font-bold text-xl my-7">오늘의 일기</h4>
        <div className="w-full bg-btnLight rounded-md break-words break-keep">
          <p className="p-5 text-left text-lg">{content}</p>
        </div>
      </section>
    </>
  );
}
