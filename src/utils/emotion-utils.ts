import emotion1 from "assets/emotion1.png";
import emotion2 from "assets/emotion2.png";
import emotion3 from "assets/emotion3.png";
import emotion4 from "assets/emotion4.png";
import emotion5 from "assets/emotion5.png";

export enum Emotion {
  HAPPY = "happy",
  GOOD = "good",
  NORMAL = "normal",
  BAD = "bad",
  TERRIBLE = "terrible",
}

export const emotionInfo = {
  [Emotion.HAPPY]: {
    bgColor: "bg-green",
    name: "행복",
  },
  [Emotion.GOOD]: {
    bgColor: "bg-yellowGreen",
    name: "좋음",
  },
  [Emotion.NORMAL]: {
    bgColor: "bg-yellow",
    name: "보통",
  },
  [Emotion.BAD]: {
    bgColor: "bg-orange",
    name: "나쁨",
  },
  [Emotion.TERRIBLE]: {
    bgColor: "bg-red",
    name: "끔찍",
  },
};

export function getEmotionImage(emotion: Emotion) {
  switch (emotion) {
    case Emotion.HAPPY:
      return emotion1;
    case Emotion.GOOD:
      return emotion2;
    case Emotion.NORMAL:
      return emotion3;
    case Emotion.BAD:
      return emotion4;
    case Emotion.TERRIBLE:
      return emotion5;
    default:
      return undefined;
  }
}
