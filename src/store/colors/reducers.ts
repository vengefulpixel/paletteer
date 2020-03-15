import {
  ColorsState,
  ColorsAction,
  ADD_USER_COLOR,
  UPDATE_USER_COLOR,
  DELETE_USER_COLOR,
  UPDATE_HEX_INPUT
} from "./types";
import { ulid } from "ulid";
import { ColorScale } from "../../utils/ColorScale";
import { Color, HexValue, isValidHex, RGB } from "../../utils/Color";

const initalState: ColorsState = [createEntry(Color.randomColor())];

function createEntry(color: Color) {
  return {
    id: ulid(),

    color,
    scale: new ColorScale(color)
  };
}

export function colors(state = initalState, action: ColorsAction): ColorsState {
  switch (action.type) {
    case ADD_USER_COLOR:
      return [...state, createEntry(action.payload.color)];

    case UPDATE_USER_COLOR:
      return state.map(c =>
        c.id === action.payload.id
          ? {
              id: c.id,
              name: action.payload.name ?? c.name,
              color: action.payload.color ?? c.color,
              scale: new ColorScale(action.payload.color ?? c.color),
              inputs: {
                hex: action.payload.color?.hex.value
              }
            }
          : c
      );

    case UPDATE_HEX_INPUT: {
      let newColor: Color | undefined;

      if (isValidHex(action.payload.hex)) {
        const hex: HexValue = { space: RGB, value: action.payload.hex };
        newColor = new Color(hex);
      }

      return state.map(c => {
        const color = newColor ?? c.color;
        return c.id === action.payload.id
          ? {
              ...c,
              color,
              scale: new ColorScale(color),
              inputs: {
                hex: action.payload.hex
              }
            }
          : c;
      });
    }

    case DELETE_USER_COLOR:
      return state.filter(c => c.id !== action.payload.id);
  }

  return state;
}
