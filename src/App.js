import React from "react";
import DrumMachine from "./components/drum-machine";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div>You can press the keys on the keyboard to play the sound</div>
      <DrumMachine />
    </div>
  );
}

export default App;
