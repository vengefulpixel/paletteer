import React from "react";
import { Color, RGB } from "../../utils/Color";

import "./index.css";

interface Props {
  color: Color;
  index: string;
}

export function ColorCard({ color, index }: Props) {
  return (
    <div className="paletteer-color-card">
      <div
        className="paletteer-color-card--swatch"
        style={{ backgroundColor: color.toString(RGB) }}
      />
      <div className="paletteer-color-card--index">{index}</div>
    </div>
  );
}
