import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import { NavigationPage } from './containers/navigationWithLinks';

class App extends React.Component {
  public render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="style1">Navigation Management</h1>
          </header>
          <Route path="/" component={NavigationPage} />
        </div>
      </Router>
    );
  }
}




export default App;
