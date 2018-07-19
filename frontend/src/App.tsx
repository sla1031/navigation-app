import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import { NavigationPage } from './containers/navigationWithLinks';

import logoSvg from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logoSvg} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <Route path="/" component={NavigationPage} />
        </div>
      </Router>
    );
  }
}




export default App;
