import React from "react";
import ReactDOM from "react-dom";

var sounds = [
  {
    key: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    key: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    key: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },

  {
    key: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    key: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    key: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    key: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    key: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    key: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
];

const activeStyle = {
  backgroundColor: "orange",
  boxShadow: "0 3px orange",
  height: 77,
  marginTop: 13
};

const inactiveStyle = {
  backgroundColor: "grey",
  marginTop: 10,
  boxShadow: "3px 3px 5px black"
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "",
      soundBank: sounds
    };

    this.displaySoundName = this.displaySoundName.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
  }
  displaySoundName(name) {
    this.setState({
      display: name
    });
  }
  clearDisplay() {
    this.setState({
      display: ""
    });
  }
  render() {
    return (
      <div id="drum-machine" className="drum-machine">
        <Display display={this.state.display} />
        <DrumPads
          soundBank={this.state.soundBank}
          updateDisplay={this.displaySoundName}
          clearDisplay={this.clearDisplay}
        />
      </div>
    );
  }
}

function Display(props) {
  return <div id="display">{props.dislpay}</div>;
}
class DrumPads extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var drumPads = this.props.soundBank.map(sound => {
      return (
        <DrumPad
          key={sound.key}
          char={sound.key}
          clip={sound.url}
          clipId={sound.id}
          updateDisplay={this.props.updateDisplay}
          clearDisplay={this.props.clearDisplay}
        />
      );
    });
    return <div className="pad-bank">{drumPads}</div>;
  }
}

class DrumPad extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      style: inactiveStyle
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.activatePad = this.activatePad.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }
  handleKeyPress(event) {
    if (event.key.toUpperCase() === this.props.char) {
      this.props.updateDisplay(this.props.clipId);
      this.playSound();
    }
  }
  activatePad() {
    this.setState({
      style:
        this.state.style.backgroundColor === "orange"
          ? inactiveStyle
          : activeStyle
    });
  }
  playSound() {
    var audio = document.getElementById(this.props.clipId);

    audio.currentTime = 0;
    audio.play();
    this.activatePad();
    setTimeout(() => {
      this.activatePad();
    }, 1000);
  }
  render() {
    return (
      <div
        onClick={this.playSound}
        className="drump-pad"
        style={this.state.style}
      >
        <audio
          id={this.props.clipId}
          className="clip"
          src={this.props.clip}
          preload="auto"
        />
        {this.props.key}
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
