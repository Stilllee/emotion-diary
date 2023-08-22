import { useState } from "react";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

const Home = () => {
  const [curDate, setCurDate] = useState(new Date());

  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`; // JavaScript의 Date 객체는 월을 0부터 시작하므로 1을 더해줌

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
    </div>
  );
};

export default Home;
