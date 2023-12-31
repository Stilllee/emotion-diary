import "./App.css";
import React, { useReducer, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

const reducer = (state, action) => {
  let newState = []; // 새로운 상태를 담을 변수 선언
  switch (
    action.type // 액션의 유형에 따라 분기 처리
  ) {
    case "INIT": {
      return action.data; // 받은 데이터로 상태 초기화
    }
    case "CREATE": {
      newState = [action.data, ...state]; // 새 항목을 상태 배열의 처음에 추가
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId); // 특정 id를 가진 항목 제외
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      ); // 특정 id를 가진 항목을 찾아 수정
      break;
    }
    default:
      return state; // 알 수 없는 액션 유형은 상태 그대로 반환
  }
  return newState; // 새로운 상태 반환
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의 일기 1번",
    date: 1692688305303,
  },
  {
    id: 2,
    emotion: 2,
    content: "오늘의 일기 2번",
    date: 1692688334459,
  },
  {
    id: 3,
    emotion: 3,
    content: "오늘의 일기 3번",
    date: 1692688338822,
  },
  {
    id: 4,
    emotion: 4,
    content: "오늘의 일기 4번",
    date: 1692688342466,
  },
  {
    id: 5,
    emotion: 5,
    content: "오늘의 일기 5번",
    date: 1692688346829,
  },
];

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);

  const dataId = useRef(0); // 항목에 부여할 고유 id

  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current, // id 값은 useRef로 관리
        date: new Date(date).getTime(), // 날짜는 타임스탬프로 변환하여 저장
        content,
        emotion,
      },
    });
    dataId.current += 1; // 다음 항목에 사용할 id 값에 1 더하기
  };

  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId }); // 제거할 항목의 id를 액션에 담아 전달
  };

  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
