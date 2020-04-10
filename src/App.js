import React, { useState, useEffect } from "react";
import { Row, Col, Button } from 'reactstrap';

import ReactDOM from "react-dom";
import shuffle from "shuffle-array";
import "./App.css";
import { start } from "./confetti.js";
import easter4 from "./images/easter4.PNG"
import easter5 from "./images/easter5.PNG"
import easter6 from "./images/easter6.PNG"
import easter7 from "./images/easter7.PNG"



function Confetti() {
  useEffect(() => {
    start();
  });
  return <canvas id="canvas" />;
}

function Tile({ id, children, onToggle, isSet }) {
  return (
    <div onClick={onToggle} className={`tile ${isSet ? "tile--set" : ""}`}>
      {children}
    </div>
  );
}

const bbb = [
  "1: Ta tre pushups",
  "2: Spis litt påskesnop",
  "3: Si en setning på Fransk ",
  "5: Kryss av din siste rute",
  "6: Snurr rundt i ring i 20 sekunder",
  "7: Dans makarena",
  "8: Ta på en hatt, og ha den på resten av spillet",
  "9: Hopp over en runde",
  "10: Si en setning på tysk",
  "11: Drikk et glass vann",
  "12: Finn noe gult",
  "13: Si ett av valgfagene til Tomas",
  "14: Vis et bilde av deg selv",
  "15: Ta en klappelek med den ved siden av",
  "16: Ha tommelkrig",
  "17: Si navnet til en i familien baklengs",
  "18: Skriv navnet ditt med noe annet en hendene",
  "19: Tegn en flaggermus men feil hånd",
  "20: Tegn et selvportrett på 20 sekunder",
  "21: Stå i planke i 10 sekunder",
  "22: Hold en hånd på hodet til spillet er ferdig",
  "23: Si en vits",
  "24: Si noe fint til Mads & Gina",
  "25: Kast noe i munnen til den ved siden av deg",
  "26: Si noe fint til Ane & Tomas"
];

const data = shuffle(bbb).reduce(
  (data, value, index) => ({ ...data, [index]: value }),
  {}
);

export default function App() {
  const [state, setState] = useState({ checked: {} });
  const isWon = checked => {
    const range = [0, 1, 2, 3, 4];
    return (
      undefined !==
        range.find(row => range.every(column => checked[row * 5 + column])) ||
      undefined !==
        range.find(column => range.every(row => checked[row * 5 + column])) ||
      range.every(index => checked[index * 5 + index]) ||
      range.every(index => checked[index * 5 + 4 - index])
    );
  };
  const toggle = id =>
    setState(state => {
      const checked = { ...state.checked, [id]: !state.checked[id] };
      const won = isWon(checked);
      return {
        ...state,
        checked,
        won
      };
    });

  return (
    <div className="App">
      <div className="header">
      <Row>
       <Col ><img src={easter4} size="200px"alt="Logo"/></Col>
      <Col ><h1 className="headline">Solveig og Tomas sin Påske Bingo!</h1> </Col>
      <Col ><img src={easter7} alt="Logo"/></Col>
      </Row>
      </div>
      <div className="wrapper">
        {Object.keys(data).map(id => (
          <Tile
            key={id}
            id={id}
            isSet={!!state.checked[id]}
            onToggle={() => toggle(id)}
          >
            {data[id]}
          </Tile>
        ))}
      </div>
      {state.won ? <Confetti /> : null}

    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
