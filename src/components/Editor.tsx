import { Emotion } from "utils/emotion-utils";
import EmotionItem from "./EmotionItem";
import Button, { ButtonType } from "./Button";
import { type } from "../../types/diary-types";

const emotionList = [
  {
    emotion: Emotion.HAPPY,
    emotionName: "행복",
  },
  {
    emotion: Emotion.GOOD,
    emotionName: "좋음",
  },
  {
    emotion: Emotion.NORMAL,
    emotionName: "보통",
  },
  {
    emotion: Emotion.BAD,
    emotionName: "나쁨",
  },
  {
    emotion: Emotion.TERRIBLE,
    emotionName: "끔찍",
  },
];

export default function Editor() {
  const emotion = Emotion.NORMAL;
  return (
    <div className="flex flex-col gap-10">
      <section>
        <h4 className="font-bold text-xl my-7">오늘의 날짜</h4>
        <input className="bg-btnLight rounded-md px-5 py-2" type="date" />
      </section>
      <section>
        <h4 className="font-bold text-xl my-7">오늘의 감정</h4>
        <div className="flex justify-around gap-3 ">
          {emotionList.map((item) => (
            <EmotionItem
              key={item.emotion}
              {...item}
              isSelected={item.emotion === emotion}
            />
          ))}
        </div>
      </section>
      <section>
        <h4 className="font-bold text-xl my-7">오늘의 일기</h4>
        <textarea
          className="bg-btnLight rounded-md p-5 w-full min-h-52 resize-y"
          placeholder="오늘은 어땠나요?"
        />
      </section>
      <section className="flex justify-between">
        <Button text={"취소하기"} />
        <Button text={"작성완료"} type={ButtonType.POSITIVE} />
      </section>
    </div>
  );
}
