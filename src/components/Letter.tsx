interface LetterProps {
  letterData: string;
  isLoading: boolean;
}

export default function Letter({ letterData, isLoading }: LetterProps) {
  return (
    <>
      {isLoading ? (
        <div className="w-full flex justify-center items-center dark:text-lineLight dark:brightness-75 text-lineDark brightness-125">
          답장이 오고있어요📮 잠시만 기다려주세요!
        </div>
      ) : (
        <div className="dark:text-lineLight dark:brightness-75 text-lineDark brightness-125">
          {letterData}
        </div>
      )}
    </>
  );
}
