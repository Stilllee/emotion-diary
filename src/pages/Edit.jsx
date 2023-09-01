import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const [originData, setOriginData] = useState(); // 상태 정의: 선택된 일기의 원본 데이터
  const navigate = useNavigate();
  const { id } = useParams(); // 현재 라우트의 파라미터(일기의 id)를 가져옴

  const diaryList = useContext(DiaryStateContext);

  useEffect(() => {
    // 일기가 있는 경우만 처리
    if (diaryList.length >= 1) {
      // 선택된 ID와 일치하는 일기 찾기
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      console.log(targetDiary);

      // 일기가 있으면 상태에 설정, 없으면 홈으로 리디렉션
      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        navigate("/", { replace: true }); // 뒤로가기 방지
      }
    }
  }, [id, diaryList]);

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
      {/* 선택된 일기데이터가 있으면 DiaryEditor를 렌더링 */}
    </div>
  );
};

export default Edit;
