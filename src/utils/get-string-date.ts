const formatWithZero = (number: number) =>
  number < 10 ? `0${number}` : number;

export const getStringDate = (targetDate: Date | string) => {
  const dateObj =
    typeof targetDate === "string" ? new Date(targetDate) : targetDate;

  const year = dateObj.getFullYear();
  const month = formatWithZero(dateObj.getMonth() + 1);
  const date = formatWithZero(dateObj.getDate());

  return `${year}-${month}-${date}`;
};
