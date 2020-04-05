import React, { Component } from 'react';
import LightGrid from './components/light_grid'
import './App.css';

class App extends Component {
  render(){
    return (
      <div className="App">
        <h1>Lights Out!</h1>
        <LightGrid/>
        <h2>Can you turn all the lights out?</h2>
      </div>
    );
  }
}

export default App;
