import Button, { ButtonType } from "components/Button";
import DiaryItem from "components/DiaryItem";

export default function DiaryList() {
  return (
    <div>
      <div className="my-5 flex gap-3">
        <select className="bg-btnLight rounded-md py-3 px-5 cursor-pointer">
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된 순</option>
        </select>
        <Button
          className="flex-1"
          text={"새 일기 쓰기"}
          type={ButtonType.POSITIVE}
        />
      </div>
      <div>
        <DiaryItem />
      </div>
    </div>
  );
}
