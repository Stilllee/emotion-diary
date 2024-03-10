import "./App.css";
import { useReducer, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "pages/Home";
import New from "pages/New";
import Edit from "pages/Edit";
import Diary from "pages/Diary";
import {
  Action,
  ActionType,
  DiaryType,
  onCreateType,
  onDeleteType,
  onUpdateType,
} from "types/diary-types";
import { DiaryDispatchContext, DiaryStateContext } from "context/diary-context";

const mockData = [
  {
    id: 1,
    createdDate: new Date().getTime(),
    emotionId: 1,
    content: "1번 일기 내용",
  },
  {
    id: 2,
    createdDate: new Date().getTime(),
    emotionId: 2,
    content: "2번 일기 내용",
  },
];

function reducer(state: DiaryType[], action: ActionType) {
  switch (action.type) {
    case Action.CREATE:
      return [action.data, ...state];
    case Action.UPDATE:
      return state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
    case Action.DELETE:
      return state.filter((item) => String(item.id) !== String(action.id));
    default:
      return state;
  }
}

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const onCreate: onCreateType = (createdDate, emotionId, content) => {
    dispatch({
      type: Action.CREATE,
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  const onUpdate: onUpdateType = (id, createdDate, emotionId, content) => {
    dispatch({
      type: Action.UPDATE,
      data: {
        id,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  const onDelete: onDeleteType = (id) => {
    dispatch({
      type: Action.DELETE,
      id,
    });
  };

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="edit/:id" element={<Edit />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
