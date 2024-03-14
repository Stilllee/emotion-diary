import "./App.css";
import { useReducer, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
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
import { Emotion } from "utils/emotion-utils";
import NotFound from "pages/NotFound";
import { ThemeProvider } from "context/theme-context";

const mockData = [
  {
    id: 1,
    createdDate: new Date("2024-03-10").getTime(),
    emotion: Emotion.HAPPY,
    content: "1번 일기 내용",
  },
  {
    id: 2,
    createdDate: new Date("2024-03-09").getTime(),
    emotion: Emotion.GOOD,
    content: "2번 일기 내용",
  },
  {
    id: 3,
    createdDate: new Date("2024-02-14").getTime(),
    emotion: Emotion.NORMAL,
    content: "3번 일기 내용",
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

  const onCreate: onCreateType = (createdDate, emotion, content) => {
    dispatch({
      type: Action.CREATE,
      data: {
        id: idRef.current++,
        createdDate,
        emotion,
        content,
      },
    });
    toast.success("일기가 작성되었어요 🎉");
  };

  const onUpdate: onUpdateType = (id, createdDate, emotion, content) => {
    dispatch({
      type: Action.UPDATE,
      data: {
        id,
        createdDate,
        emotion,
        content,
      },
    });
    toast.success("일기가 수정되었어요 😸");
  };

  const onDelete: onDeleteType = (id) => {
    dispatch({
      type: Action.DELETE,
      id,
    });
    toast.success("일기가 삭제되었어요 😺");
  };

  return (
    <>
      <ToastContainer />
      <ThemeProvider>
        <DiaryStateContext.Provider value={data}>
          <DiaryDispatchContext.Provider
            value={{ onCreate, onUpdate, onDelete }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/diary/:id" element={<Diary />} />
              <Route path="edit/:id" element={<Edit />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </DiaryDispatchContext.Provider>
        </DiaryStateContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
