import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";

// 정렬 옵션 리스트 정의
const sortOptionList = [
  { value: "lastest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

// 필터 옵션 리스트 정의
const filterOptionList = [
  { value: "all", name: "전체" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안 좋은 감정만" },
];

// ControlMenu 컴포넌트는 현재 선택된 정렬 옵션을 보여주고, 선택할 수 있도록 함
const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("lastest"); // 현재 선택된 정렬 타입을 상태로 관리 (기본값은 "최신순")
  const [filter, setFilter] = useState("all"); // 현재 선택된 필터 타입을 상태로 관리 (기본값은 "전체")

  const getProcessedDiaryList = () => {
    // filterCallback 함수는 필터링을 위한 콜백 함수로, filter에 따라 좋은 감정만 또는 안 좋은 감정만 필터링한다.
    const filterCallback = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    // compare 함수는 정렬을 위한 비교 함수로, sortType에 따라 최신순 또는 오래된 순으로 정렬한다.
    const compare = (a, b) => {
      if (sortType === "lastest") {
        return parseInt(b.date) - parseInt(a.date); // 최신순 정렬 (날짜 내림차순)
      } else {
        return parseInt(a.date) - parseInt(b.date); // 오래된 순 정렬 (날짜 오름차순)
      }
    };

    const copyList = JSON.parse(JSON.stringify(diaryList)); // 배열을 복사 (깊은 복사)

    const filteredList =
      filter === "all" ? copyList : copyList.filter((it) => filterCallback(it)); // 필터링된 배열을 반환

    const sortedList = filteredList.sort(compare); // 정렬된 배열을 반환
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType} // 정렬 타입을 변경하는 함수
            optionList={sortOptionList} // 정렬 옵션 리스트
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"새 일기쓰기"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>
      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
      {/* 정렬된 일기 목록을 순회하며 일기 내용을 출력 */}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
