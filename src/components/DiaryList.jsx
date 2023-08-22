import { useState } from "react";

// 정렬 옵션 리스트 정의
const sortOptionList = [
  { value: "lastest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

// ControlMenu 컴포넌트는 현재 선택된 정렬 옵션을 보여주고, 선택할 수 있도록 함
const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const [sortType, setSortType] = useState("lastest"); // 현재 선택된 정렬 타입을 상태로 관리 (기본값은 "최신순")

  const getProcessedDiaryList = () => {
    // compare 함수는 정렬을 위한 비교 함수로, sortType에 따라 최신순 또는 오래된 순으로 정렬한다.
    const compare = (a, b) => {
      if (sortType === "lastest") {
        return parseInt(b.date) - parseInt(a.date); // 최신순 정렬 (날짜 내림차순)
      } else {
        return parseInt(a.date) - parseInt(b.date); // 오래된 순 정렬 (날짜 오름차순)
      }
    };
    const copyList = JSON.parse(JSON.stringify(diaryList)); // 배열을 복사 (깊은 복사)
    const sortedList = copyList.sort(compare); // 복사한 배열을 정렬
    return sortedList;
  };

  return (
    <div>
      <ControlMenu
        value={sortType}
        onChange={setSortType} // 정렬 타입을 변경하는 함수
        optionList={sortOptionList} // 정렬 옵션 리스트
      />
      {getProcessedDiaryList().map((it) => (
        <div key={it.id}>{it.content}</div>
      ))}
      {/* 정렬된 일기 목록을 순회하며 일기 내용을 출력 */}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
