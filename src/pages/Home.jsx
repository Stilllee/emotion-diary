import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import DiaryList from "../components/DiaryList";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`; // JavaScript의 Date 객체는 월을 0부터 시작하므로 1을 더해줌

  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime(); // 현재 월의 1일을 타임스탬프로 변환

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime(); // 현재 월의 마지막 일을 타임스탬프로 변환

      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay) // 현재 월에 해당하는 일기만 필터링
      );
    }
  }, [diaryList, curDate]); // diaryList와 curDate가 변경될 때마다 실행

  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate()) // 현재 날짜에서 월만 1 증가
    );
  };

  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate()) // 현재 날짜에서 월만 1 감소
    );
  };

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={diaryList} />
    </div>
  );
};

export default Home;
