type ButtonProps = {
  text: string;
  type: "DEFAULT" | "POSITIVE" | "NEGATIVE";
  onClick: () => void;
};

export default function Button({ text, type, onClick }: ButtonProps) {
  const btnColor =
    type === "DEFAULT"
      ? "bg-btnLight"
      : type === "POSITIVE"
      ? "bg-green text-white"
      : type === "NEGATIVE"
      ? "bg-red text-white"
      : "";

  return (
    <button
      className={`${btnColor} rounded-md py-2 px-5 whitespace-nowrap`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

Button.defaultProps = {
  type: "DEFAULT",
};
