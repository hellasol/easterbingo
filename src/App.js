import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "reactstrap";

import ReactDOM from "react-dom";
import shuffle from "shuffle-array";
import "./App.css";
import { start } from "./confetti.js";
import easter4 from "./images/easter4.PNG";
import easter5 from "./images/easter5.PNG";
import easter6 from "./images/easter6.PNG";
import easter7 from "./images/easter7.PNG";

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
  "1: Førstemann til å ta fem pushups",
  "2: Hva er skostørrelsen til Solveig",
  "3: Førstemann til å si en setning på Fransk",
  "5: Førstemann til å hente antibac",
  "6: Hva var det lykkeligste landet i 2019?",
  "7: Førstemann til å danse makarena",
  "8: Førstemann til å ta på en hatt",
  "9: Hvilket land har den laveste gjennomsnittshøyden",
  "10: Førstemann til å si en setning på tysk",
  "11: Hvilket dyr er det høfligste?",
  "12: Førstemann til å finne noe gult",
  "13: Si ett av valgfagene til Tomas",
  "14: Førstemann til å vise et bilde av seg selv",
  "15: Førstemann til å ta en klappelek med den ved siden av",
  "16: Hva er det fjerde desimalet i Pi?",
  "17: Førstemann til å si navnet til en i familien baklengs",
  "18: Førstemann til å skrive navnet sitt med noe annet en hendene",
  "19: Tegn en flaggermus men feil hånd",
  "20: Hva studerer Solveig egentlig?",
  "21: Hvor mange år må Joe Exotic, AKA Tiger King, sitte i fengsel?",
  "22: Hvilken kopp kan du ikke drikke av?",
  "23: Førstemann til å si en vits",
  "24: I hvilket land kan man ikke kjøpe cola",
  "25: Hvilket tau kan du ikke dra i?",
  "26: Hvor mange er smittet i Norge?",
];

const data = shuffle(bbb).reduce(
  (data, value, index) => ({ ...data, [index]: value }),
  {}
);

export default function App() {
  const [state, setState] = useState({ checked: {} });
  const isWon = (checked) => {
    const range = [0, 1, 2, 3, 4];
    return (
      undefined !==
        range.find((row) =>
          range.every((column) => checked[row * 5 + column])
        ) ||
      undefined !==
        range.find((column) =>
          range.every((row) => checked[row * 5 + column])
        ) ||
      range.every((index) => checked[index * 5 + index]) ||
      range.every((index) => checked[index * 5 + 4 - index])
    );
  };
  const toggle = (id) =>
    setState((state) => {
      const checked = { ...state.checked, [id]: !state.checked[id] };
      const won = isWon(checked);
      return {
        ...state,
        checked,
        won,
      };
    });

  return (
    <div className="App">
      <div className="header">
        <Row>
          <Col>
            <img src={easter4} size="200px" alt="Logo" />
          </Col>
          <Col>
            <h1 className="headline">Solveig og Tomas sin Påske Bingo!</h1>{" "}
          </Col>
          <Col>
            <img src={easter7} alt="Logo" />
          </Col>
        </Row>
      </div>
      <div className="wrapper">
        {Object.keys(data).map((id) => (
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
