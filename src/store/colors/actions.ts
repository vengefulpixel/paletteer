import {
  ColorsAction,
  ADD_USER_COLOR,
  DELETE_USER_COLOR,
  UPDATE_USER_COLOR,
  UPDATE_HEX_INPUT
} from "./types";
import { Color } from "../../utils/Color";

export function addColor(color: Color): ColorsAction {
  return {
    type: ADD_USER_COLOR,
    payload: {
      name: color.genericName,
      color
    }
  };
}

export function deleteColor(id: string): ColorsAction {
  return {
    type: DELETE_USER_COLOR,
    payload: {
      id
    }
  };
}

export function updateHexInput(id: string, hex: string): ColorsAction {
  return {
    type: UPDATE_HEX_INPUT,
    payload: {
      id,
      hex
    }
  };
}

export function updateColor(
  id: string,
  { name, color }: { name?: string; color?: Color }
): ColorsAction {
  return {
    type: UPDATE_USER_COLOR,
    payload: {
      id,
      name,
      color
    }
  };
}
