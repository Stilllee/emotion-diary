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
