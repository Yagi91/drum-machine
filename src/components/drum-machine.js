import React from "react";
// import long from "./long.mp3";

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
  },
];
class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: String.fromCharCode(160),
      power: true,
      volume: 5,
    };
    this.playRef = React.createRef();
    this.playAudio = this.playAudio.bind(this);
    this.power = this.power.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
    this.clearPlaying = this.clearPlaying.bind(this);
  }
  playAudio(val) {
    if (this.state.power === true) {
      this.playRef.current.src = val.url;
      this.playRef.current.play();
      this.setState({
        playing: val.id,
        source: val.url,
      });
    } else {
      return;
      // this.playRef.current.src = "";
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentDidUpdate() {
    document.removeEventListener("keydown", this.handleKeyPress.bind(this));
  }
  handleKeyPress = (e) => {
    for (let i = 0; i < bankOne.length; i++) {
      if (e.keyCode === bankOne[i].keyCode) {
        this.playAudio(bankOne[i]);
        return;
      }
    }
  };
  power() {
    this.setState((state) => {
      return { power: !state.power, playing: String.fromCharCode(160) };
    });
  }
  handleVolume(e) {
    this.playRef.current.volume = e.target.value;
    if (this.state.power) {
      this.setState({
        volume: e.target.value,
        playing: `Volume ${Math.round(e.target.value * 100)}`,
      });
      setTimeout(this.clearPlaying, 1000);
    }
  }
  clearPlaying() {
    this.setState({ playing: String.fromCharCode(160) });
  }
  render() {
    return (
      <div id="drum-machine" className="container-fluid ">
        <audio id="audio" ref={this.playRef} />
        <div className="row border container">
          <div className="row border py-1 col-3">
            {bankOne.map((val, i, audioArr) => {
              return (
                <ButtonPlayer
                  key={i}
                  KeyID={val.id}
                  playAudio={() => this.playAudio(val)}
                  keyTrigger={val.keyTrigger}
                />
              );
            })}
          </div>
          <div className="col-2 ">
            <DisplayAudio currentAudio={this.state.playing} />
            <div>
              <label for="customRange2" class="form-label h5">
                Volume Slider
              </label>
              <input
                type="range"
                class="form-range"
                min="0"
                max="1"
                step="0.01"
                value={this.state.volume}
                onChange={this.handleVolume}
              />
            </div>
            <PowerButton
              power={this.power}
              turnOn={this.state.power ? "bg-success" : "bg-white"}
              turnOff={!this.state.power ? "bg-danger" : "bg-white"}
            />
          </div>
        </div>
      </div>
    );
  }
}

class ButtonPlayer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="drum-pad bg-primary py-4 px-1 text-center rounded shadow col-4 border"
        id={this.props.keyID}
        onClick={this.props.playAudio}
        style={{ cursor: "pointer" }}
      >
        {this.props.keyTrigger}
      </div>
    );
  }
}

function DisplayAudio(props) {
  return (
    <div className="bg-dark text-white text-center shadow">
      <div>{props.currentAudio}</div>
    </div>
  );
}
function PowerButton(props) {
  return (
    <div
      className={`power-button p-1 rounded d-inline-flex border shadow`}
      onClick={props.power}
      style={{ cursor: "pointer" }}
    >
      <div className={`text-center ${props.turnOn} p-2`}>
        {String.fromCharCode(160)}ON
      </div>
      <div className={`text-center ${props.turnOff} p-2 `}>
        {String.fromCharCode(160)}OFF
      </div>
    </div>
  );
}
// const DrumMachine = (props) => {
//   return (
//     <div>
//       <p>Hello</p>
//     </div>
//   );
// };
// onClick={() => this.playAudio(this.props.keyTrigger)}
export default DrumMachine;
