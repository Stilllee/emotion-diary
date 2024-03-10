import { Emotion } from "utils/get-emotion-image";

export enum Action {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

export interface DiaryType {
  id: number;
  createdDate: number;
  emotion: Emotion;
  content: string;
}

export type onCreateType = (
  createdDate: number,
  emotion: Emotion,
  content: string
) => void;

export type onUpdateType = (
  id: number,
  createdDate: number,
  emotion: Emotion,
  content: string
) => void;

export type onDeleteType = (id: number) => void;

export type ActionType =
  | { type: Action.CREATE; data: DiaryType }
  | { type: Action.UPDATE; data: DiaryType }
  | { type: Action.DELETE; id: number };

export interface DispatchContextType {
  onCreate: onCreateType;
  onUpdate: onUpdateType;
  onDelete: onDeleteType;
}
