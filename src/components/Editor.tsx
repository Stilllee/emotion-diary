import { Emotion, emotionInfo } from "utils/emotion-utils";
import EmotionItem from "./EmotionItem";
import Button, { ButtonType } from "./Button";
import React, { useEffect, useState } from "react";
import { getStringDate } from "utils/get-string-date";
import { CreateDiaryType, DiaryType } from "types/diary-types";
import { useNavigate } from "react-router-dom";

interface EditorProps {
  initData?: DiaryType;
  onCreate?: (input: CreateDiaryType) => void;
  onUpdate?: (input: DiaryType) => void;
}

export default function Editor({ onCreate, onUpdate, initData }: EditorProps) {
  const [input, setInput] = useState<DiaryType | CreateDiaryType>({
    createdDate: new Date().getTime(),
    emotion: Emotion.NORMAL,
    content: "",
  });

  const nav = useNavigate();

  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
      });
    }
  }, [initData]);

  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = e;

    setInput((prev) => ({
      ...prev,
      [name]: name === "createdDate" ? new Date(value).getTime() : value,
    }));
  };

  const onChangeEmotion = (newEmotion: Emotion) => {
    setInput((prev) => ({
      ...prev,
      emotion: newEmotion,
    }));
  };

  const onClickSubmitButton = () => {
    if (onCreate && !("id" in input)) {
      onCreate(input as CreateDiaryType);
    } else if (onUpdate && "id" in input) {
      onUpdate(input as DiaryType);
    }
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
          {Object.values(Emotion).map((emotion) => (
            <EmotionItem
              key={emotion}
              emotion={emotion}
              emotionName={emotionInfo[emotion].name}
              isSelected={emotion === input.emotion}
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
