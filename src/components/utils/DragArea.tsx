import React, { useState, createRef } from "react";

interface Props {
  children: React.ReactElement;
  handler(x: number, y: number, clientRect: ClientRect): void;
}

export function DragArea({ handler, children }: Props) {
  const [dragging, setDragging] = useState(false);
  const upHandler = createRef<typeof handler>();

  const informHandler = (
    event: React.MouseEvent | MouseEvent,
    element?: Element
  ) => {
    if (!element) return;

    console.log({ element });
    const bcr = element.getBoundingClientRect();
    const x = event.clientX - bcr.x;
    const y = event.clientY - bcr.y;

    handler(x, y, bcr);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    const element = e.currentTarget;

    informHandler(e, element);

    const move = (f: MouseEvent) => {
      informHandler(f, element);
    };

    const up = () => {
      document.removeEventListener("mouseup", up);
      document.removeEventListener("mousemove", move);
      setDragging(false);
    };

    document.addEventListener("mouseup", up);
    document.addEventListener("mousemove", move);
    e.preventDefault();
  };

  return React.cloneElement(children, {
    style: {
      ...children.props.style,
      userSelect: "none",
      cursor: dragging ? "none" : undefined
    },
    onMouseDown
  });
}
