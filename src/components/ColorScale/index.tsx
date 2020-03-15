import { Color, RGB } from "../../utils/Color";
import { ColorCard } from "../ColorCard";
import React, { useState } from "react";

import "./index.css";
import { ColorEntry } from "../../store/colors/types";
import { useDispatch } from "react-redux";
import {
  updateColor,
  updateHexInput,
  deleteColor
} from "../../store/colors/actions";
import ColorPicker from "../ColorPicker";

interface Props {
  entry: ColorEntry;
}

export function ColourScale({ entry }: Props) {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();

  const setName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;

    dispatch(updateColor(entry.id, { name }));
  };

  const setColor = (color: Color) => {
    dispatch(updateColor(entry.id, { name: entry.name, color }));
  };

  const setHex = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateHexInput(entry.id, e.target.value));
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const deleteEntry = () => {
    dispatch(deleteColor(entry.id));
  };

  const name = entry.name ?? entry.color?.genericName;

  return (
    <div className="paletteer-scale">
      <div className="paletteer-scale--title">
        <input value={name} onChange={setName} className="title" />
        <label>#</label>
        <input
          value={entry.inputs?.hex}
          onChange={setHex}
          width={6}
          className="hex"
        />
        <button
          type="button"
          onClick={toggleExpanded}
          className="paletteer-scale--baseColor"
          style={{
            backgroundColor: entry?.color?.toString(RGB) ?? "transparent"
          }}
        ></button>
        <button className="paletteer-scale--delete" onClick={deleteEntry}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z" />
          </svg>
        </button>
      </div>
      <ColorPicker value={entry} onChange={setColor} expanded={expanded} />
      <div className="paletteer-scale--cards">
        {entry.scale.indexes.map(i => (
          <ColorCard
            key={`${i}`}
            color={entry.scale.color(i)}
            index={i.toString()}
          />
        ))}
      </div>
    </div>
  );
}
