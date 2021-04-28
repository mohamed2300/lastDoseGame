import logo from './logo.svg';
import './App.css';
import Menu from './Manu/menu';
import Game from './Game/game';
import React from 'react';
import Script from './Game/script.js'
import NewGame from './newGame/newgame'
import Info from './info/info'

class App extends React.Component {
  constructor(props) {
    localStorage.clear();
    super(props);
    this.state = {
      isHidden: true,
      isReady: false
    }
  }
  componentDidMount() {

    Script();


  }
  SetIsReady() {
    this.setState({ isReady: true })
  }


  start = () => {
    let audio = new Audio("music.mp3");
    audio.volume = .6;
    audio.play()
  }


  newGame = () => {
    this.setState({ isHidden: false })

  }
  isnewGame = () => {
    return this.state.isHidden
  }
  Home = () => {
    window.location.href = '/'

  }

  render() {
    return (

      <div className="App">


        <div className={!this.state.isHidden ? "hidden" : "notHidden"} id='newG'>
          <NewGame start={this.newGame} setIsReady={() => {
            this.setState({ isReady: true })
          }} />


        </div>
        <div className={this.state.isHidden ? "hidden" : "notHidden"} id='Gam'>
          <Menu newGame={this.Home} isnewGame={this.isnewGame} IsReady={this.state.isReady} />
          <Game />
          {/* <Info /> */}
        </div>
      </div>
    );
  }
}
export default App;
