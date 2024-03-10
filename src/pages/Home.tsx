import Button from "components/Button";
import DiaryList from "components/DiaryList";
import Header from "components/Header";

export default function Home() {
  return (
    <>
      <Header
        title={"2024년 3월"}
        leftChild={<Button text={"<"} />}
        rightChild={<Button text={">"} />}
      />
      <DiaryList />
    </>
  );
}
