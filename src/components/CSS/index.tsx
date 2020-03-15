import { useSelector } from "react-redux";
import { userColors } from "../../store/colors/selectors";
import React, { useState } from "react";
import { Color, RGB, HSL, HSV } from "../../utils/Color";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import css from "react-syntax-highlighter/dist/esm/languages/hljs/css";
import theme from "react-syntax-highlighter/dist/esm/styles/hljs/obsidian";

import "./index.css";

SyntaxHighlighter.registerLanguage("css", css);
function cssEscape(text: string) {
  return text ? `${text.toLocaleLowerCase().replace(/ +/g, "-")}` : "";
}

function variableDeclaration(
  color: Color,
  name: string,
  prefix?: string,
  index?: number
) {
  prefix = prefix ? `${prefix}-` : "";
  const suffix = index !== undefined ? `-${index}` : "";

  return `   --${prefix}color-${name}${suffix}: ${color.toString(RGB)};`;
}

export function CSS() {
  const [prefix, setPrefix] = useState("");
  const colors = useSelector(userColors);

  const variablePrefix = cssEscape(prefix);

  const css = [];
  css.push(":root {");
  css.push("   /* === Color Variables === */");

  for (const color of colors) {
    const name = color.name ?? color.color.genericName;
    css.push("");
    css.push(`   /* ${name} */`);

    const cssName = cssEscape(name);

    for (const index of color.scale.indexes) {
      css.push(
        variableDeclaration(
          color.scale.color(index),
          cssName,
          variablePrefix,
          index
        )
      );
    }
  }

  css.push("}");

  return (
    <div className="paletteer-css">
      <label>Prefix: </label>
      <input value={prefix} onChange={e => setPrefix(e.target.value)}></input>
      <SyntaxHighlighter language="css" style={theme}>
        {css.join("\n")}
      </SyntaxHighlighter>
    </div>
  );
}
