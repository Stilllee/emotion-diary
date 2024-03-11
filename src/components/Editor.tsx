import { Emotion } from "utils/emotion-utils";
import EmotionItem from "./EmotionItem";
import Button, { ButtonType } from "./Button";
import React, { useState } from "react";
import { getStringDate } from "utils/get-string-date";
import { DiaryType } from "types/diary-types";
import { useNavigate } from "react-router-dom";

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

interface EditorProps {
  onSubmit: (input: DiaryType) => void;
}

export default function Editor({ onSubmit }: EditorProps) {
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotion: Emotion.NORMAL,
    content: "",
  });

  const nav = useNavigate();

  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = e;

    setInput((prev) => ({
      ...prev,
      [name]: name === "createdDate" ? getStringDate(new Date(value)) : value,
    }));
  };

  const onChangeEmotion = (newEmotion: Emotion) => {
    setInput((prev) => ({
      ...prev,
      emotion: newEmotion,
    }));
  };

  const onClickSubmitButton = () => {
    onSubmit(input);
  };

  return (
    <div className="flex flex-col gap-10">
      <section>
        <h4 className="font-bold text-xl my-7">오늘의 날짜</h4>
        <input
          className="bg-btnLight rounded-md px-5 py-2 cursor-pointer"
          type="date"
          name="createdDate"
          onChange={onChangeInput}
          value={getStringDate(input.createdDate)}
        />
      </section>
      <section>
        <h4 className="font-bold text-xl my-7">오늘의 감정</h4>
        <div className="flex justify-around gap-3 ">
          {emotionList.map((item) => (
            <EmotionItem
              key={item.emotion}
              {...item}
              isSelected={item.emotion === input.emotion}
              onClick={onChangeEmotion}
            />
          ))}
        </div>
      </section>
      <section>
        <h4 className="font-bold text-xl my-7">오늘의 일기</h4>
        <textarea
          className="bg-btnLight rounded-md p-5 w-full min-h-52 resize-y"
          placeholder="오늘은 어땠나요?"
          name="content"
          value={input.content}
          onChange={onChangeInput}
        />
      </section>
      <section className="flex justify-between">
        <Button text={"취소하기"} onClick={() => nav(-1)} />
        <Button
          text={"작성완료"}
          type={ButtonType.POSITIVE}
          onClick={onClickSubmitButton}
        />
      </section>
    </div>
  );
}
