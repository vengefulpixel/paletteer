import { Color } from "./Color";

export class ColorScale {
  private _colors: { [i: number]: Color } = {};

  constructor(baseColor?: Color) {
    if (!baseColor) return;
    const { h, s } = baseColor.hsl;
    const stops = [
      5,
      10,
      15,
      20,
      25,
      30,
      35,
      40,
      45,
      50,
      55,
      60,
      65,
      70,
      75,
      80,
      85,
      90,
      95
    ];

    for (const stop of stops) {
      const b = 100 - Number(stop);
      let m = 0;
      let M = 100;

      let r;
      let c: Color;

      let iter = 0;
      do {
        const l = m + (M - m) / 2;

        c = new Color({ space: "HSL", h, s, l });
        r = 100 * c.perceivedLuminance();

        if (r < b) {
          m = l;
        } else {
          M = l;
        }
        iter++;
      } while (iter < 50 && r !== b);

      this._colors[stop] = c;
    }
  }

  get indexes() {
    return Object.keys(this._colors).map(i => parseInt(i));
  }

  get colors() {
    return Object.values(this._colors);
  }

  color(index: number) {
    return this._colors[index];
  }
}
