import MyButton from "./MyButton";

const DiaryItem = ({ id, emotion, content, date }) => {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || ""; // 배포 환경에서는 PUBLIC_URL이 설정되지 않으므로, 설정되지 않았을 때를 대비해 기본값을 설정

  const strDate = new Date(parseInt(date)).toLocaleDateString(); // 타임스탬프를 Date 객체로 변환한 후, 날짜 형식에 맞게 변환

  return (
    <div className="DiaryItem">
      <div
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img
          src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`}
          alt=""
        />
      </div>
      <div className="info_wrapper">
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrapper">
        <MyButton text={"수정하기"} />
      </div>
    </div>
  );
};

export default DiaryItem;
