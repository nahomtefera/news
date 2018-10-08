import React, { Component } from 'react';
// Components
import News from './components/news/news';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <News/>
      </div>
    );
  }
}

export default App;
