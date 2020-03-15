import React, { useState, createRef, useEffect } from "react";
import { Color, RGB, ColorSpace, ColorValues, HSV } from "../../utils/Color";
import { DragArea } from "../utils/DragArea";
import { ColorEntry } from "../../store/colors/types";
import classnames from "classnames";

import "./index.css";

interface Props {
  value: ColorEntry;
  onChange(color: Color): void;
  expanded?: boolean;
}

export default function Picker({ value, onChange, expanded }: Props) {
  const { h, s, v } = value.color.hsv;
  const hp = (h / 360) * 100;

  const svDrag = (x: number, y: number, bcr: ClientRect) => {
    const s = (x * 100) / bcr.width;
    const v = 100 - (y * 100) / bcr.height;

    console.log({ h, s, v, width: bcr.width, height: bcr.height });
    onChange(new Color({ space: HSV, h, s, v }));
  };

  const hueDrag = (x: number, y: number, bcr: ClientRect) => {
    const h = (y * 360) / bcr.height;

    onChange(new Color({ space: HSV, h, s, v }));
  };

  const classes = classnames("paletteer-colour-picker", {
    expanded
  });

  return (
    <div className={classes}>
      <div className="content">
        <DragArea handler={svDrag}>
          <div
            className="paletteer-colour-input--sat-val"
            style={{ backgroundColor: `hsl(${h}, 100%, 50%)` }}
          >
            <svg className="paletteer-colour-input--selection">
              {lines(value.scale.colors)}
              {value.scale.colors.map(c => circle(c.hsv.s, c.hsv.v, 6, c))}
              {circle(s, v, 8, value.color)}
            </svg>
          </div>
        </DragArea>
        <DragArea handler={hueDrag}>
          <div className="paletteer-colour-input--hue">
            <div
              className="paletteer-colour-input--selection"
              style={{ top: `${hp}%`, left: "50%" }}
            />
          </div>
        </DragArea>
      </div>
    </div>
  );
}

function circle(s: number, v: number, r: number, fill: Color) {
  const cx = `${s}%`;
  const cy = `${100 - v}%`;
  return (
    <>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        stroke="rgba(0,0,0,0.5)"
        strokeWidth={3}
        fill={fill.toString(RGB)}
      />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        stroke="rgba(255,255,255,0.8)"
        strokeWidth={1.5}
        fill={fill.toString(RGB)}
      />
    </>
  );
}

function lines(colors: Color[]) {
  const coordinates: { x1: string; y1: string; x2: string; y2: string }[] = [];

  colors.forEach((c1, i) => {
    if (i < colors.length - 1) {
      const c2 = colors[i + 1];
      const { s: s1, v: v1 } = c1.hsv;
      const { s: s2, v: v2 } = c2.hsv;

      const x1 = `${s1}%`;
      const y1 = `${100 - v1}%`;
      const x2 = `${s2}%`;
      const y2 = `${100 - v2}%`;
      coordinates.push({ x1, y1, x2, y2 });
    }
  });

  return (
    <>
      {coordinates.map(l => (
        <>
          <line stroke="rgba(0,0,0,0.5)" strokeWidth={3} {...l} />
          <line stroke="rgba(255,255,255,0.8)" strokeWidth={1.5} {...l} />
        </>
      ))}
    </>
  );
}
