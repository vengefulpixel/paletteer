import { Color } from "../../utils/Color";
import { ColorScale } from "../../utils/ColorScale";

export interface ColorEntry {
  id: string;
  name?: string;
  color: Color;
  scale: ColorScale;
  inputs?: {
    hex?: string;
  };
}

export type ColorsState = ColorEntry[];

export const ADD_USER_COLOR = "ADD_USER_COLOR";
export const DELETE_USER_COLOR = "DELETE_USER_COLOR";
export const UPDATE_USER_COLOR = "UPDATE_USER_COLOR";
export const UPDATE_HEX_INPUT = "UPDATE_HEX_INPUT";

interface AddUserColorAction {
  type: typeof ADD_USER_COLOR;
  payload: {
    name: string;
    color: Color;
  };
}

interface DeleteUserColorAction {
  type: typeof DELETE_USER_COLOR;
  payload: {
    id: string;
  };
}

interface UpdateUserColorAction {
  type: typeof UPDATE_USER_COLOR;
  payload: {
    id: string;
    name?: string;
    color?: Color;
  };
}

interface UpdateHexInput {
  type: typeof UPDATE_HEX_INPUT;
  payload: {
    id: string;
    hex: string;
  };
}

export type ColorsAction =
  | AddUserColorAction
  | DeleteUserColorAction
  | UpdateUserColorAction
  | UpdateHexInput;
