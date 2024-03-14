import { DiaryStateContext } from "context/diary-context";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DiaryType } from "types/diary-types";

export default function useDiary(id: number) {
  const data = useContext(DiaryStateContext);
  const [curDiaryItem, setCurDiaryItem] = useState<DiaryType>();

  const nav = useNavigate();

  useEffect(() => {
    const currentDiaryItem = data.find((item) => item.id === id);

    if (!currentDiaryItem) {
      toast.error("존재하지 않는 일기입니다 🫢");
      nav("/", { replace: true });
    }

    setCurDiaryItem(currentDiaryItem);
  }, [id, data, nav]);

  return curDiaryItem;
}
