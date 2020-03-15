import convert from "color-convert";

export const RGB = "RGB";
export const HSL = "HSL";
export const HSV = "HSV";

export type ColorSpace = typeof RGB | typeof HSL | typeof HSV;

export interface RGBValues {
  space: typeof RGB;
  r: number;
  g: number;
  b: number;
}

export interface HSVValues {
  space: typeof HSV;
  h: number;
  s: number;
  v: number;
}

export interface HSLValues {
  space: typeof HSL;
  h: number;
  s: number;
  l: number;
}

export interface HexValue {
  space: typeof RGB;
  value: string;
}

export type ColorValues = RGBValues | HSVValues | HSLValues | HexValue;

export class Color {
  private _rgb!: RGBValues;
  private _hsl!: HSLValues;
  private _hsv!: HSVValues;

  constructor(values: ColorValues) {
    this.setValues(values);
  }

  get rgb(): RGBValues {
    return this._rgb;
  }

  get hex(): HexValue {
    return { space: RGB, value: this.toString(RGB, { rgbHex: true }) };
  }

  get hsl(): HSLValues {
    return this._hsl;
  }

  get hsv(): HSVValues {
    return this._hsv;
  }

  get genericName(): string {
    const { h, s, v } = this._hsv;
    return convert.hsv.keyword([h, s, v]);
  }

  setValues(values: ColorValues) {
    switch (values.space) {
      case RGB:
        "value" in values ? this.setHex(values) : this.setRGB(values);
        break;
      case HSL:
        this.setHSL(values);
        break;
      case HSV:
        this.setHSV(values);
        break;
    }
  }

  private setRGB(values: RGBValues) {
    values = {
      space: RGB,
      r: clamp(0, values.r, 255),
      g: clamp(0, values.g, 255),
      b: clamp(0, values.b, 255)
    };

    this._rgb = values;

    let h: number, s: number, v: number, l: number;
    [h, s, l] = convert.rgb.hsl.raw([values.r, values.g, values.b]);
    this._hsl = {
      space: HSL,
      h,
      s,
      l
    };

    [h, s, v] = convert.rgb.hsv.raw([values.r, values.g, values.b]);
    this._hsv = {
      space: HSV,
      h,
      s,
      v
    };
  }

  private setHSL(values: HSLValues) {
    values = {
      space: HSL,
      h: clamp(0, values.h, 360),
      s: clamp(0, values.s, 100),
      l: clamp(0, values.l, 100)
    };

    const [r, g, b] = convert.hsl.rgb.raw([values.h, values.s, values.l]);
    this._rgb = {
      space: RGB,
      r,
      g,
      b
    };

    this._hsl = values;

    const [h, s, v] = convert.hsl.hsv.raw([values.h, values.s, values.l]);
    this._hsv = {
      space: HSV,
      h,
      s,
      v
    };
  }

  private setHSV(values: HSVValues) {
    values = {
      space: HSV,
      h: clamp(0, values.h, 360),
      s: clamp(0, values.s, 100),
      v: clamp(0, values.v, 100)
    };

    const [r, g, b] = convert.hsv.rgb([values.h, values.s, values.v]);
    this._rgb = {
      space: RGB,
      r,
      g,
      b
    };

    const [h, s, l] = convert.hsv.hsl([values.h, values.s, values.v]);
    this._hsl = {
      space: HSL,
      h,
      s,
      l
    };

    this._hsv = values;
  }

  private setHex(hex: HexValue) {
    const [r, g, b] = convert.hex.rgb(hex.value);

    this.setRGB({
      space: RGB,
      r,
      g,
      b
    });
  }

  public perceivedLuminance(): number {
    const r = this._rgb.r / 255;
    const g = this._rgb.g / 255;
    const b = this._rgb.b / 255;

    return 0.299 * r + 0.587 * g + 0.114 * b;
  }

  static randomColor(): Color {
    const r = Math.random() * 255;
    const g = Math.random() * 255;
    const b = Math.random() * 255;

    return new Color({ space: "RGB", r, g, b });
  }

  public toString(
    space: ColorSpace,
    options: { rgbHex: Boolean } = { rgbHex: false }
  ) {
    switch (space) {
      case "RGB": {
        let { r, g, b } = this._rgb;
        r = Math.round(r);
        g = Math.round(g);
        b = Math.round(b);
        return options.rgbHex
          ? convert.rgb.hex([r, g, b])
          : `rgb(${r}, ${g}, ${b})`;
      }
      case "HSL": {
        let { h, s, l } = this._hsl;
        h = Math.round(h);
        s = Math.round(s);
        l = Math.round(l);
        return `hsl(${h}, ${s}%, ${l}%)`;
      }
      case "HSV": {
        let { h, s, v } = this._hsv;
        h = Math.round(h);
        s = Math.round(s);
        v = Math.round(v);
        return `hsv(${h}, ${s}%, ${v}%)`;
      }
    }
  }
}

function clamp(min: number, value: number, max: number) {
  return Math.max(min, Math.min(value, max));
}

const HEX_PATTERN = /#?([0-9a-zA-Z]{3}|[0-9a-zA-Z]{6})/;
export function isValidHex(v: string) {
  return HEX_PATTERN.test(v);
}
