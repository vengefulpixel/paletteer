import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ColourScale } from "../ColorScale";
import { CSS } from "../CSS";
import { userColors } from "../../store/colors/selectors";

import "./index.css";
import { addColor } from "../../store/colors/actions";
import { Color } from "../../utils/Color";

function App() {
  const colors = useSelector(userColors);
  const dispatch = useDispatch();

  const scales = colors.map(c => <ColourScale entry={c} />);

  const newColor = () => {
    dispatch(addColor(Color.randomColor()));
  };

  return (
    <div className="paletteer-app">
      <div className="paletteer-app--scales">
        {scales}
        <button className="add" onClick={newColor}>
          Add Color
        </button>
      </div>

      <CSS />
    </div>
  );
}

export default App;
