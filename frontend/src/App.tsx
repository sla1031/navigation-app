import * as React from 'react';
import './App.css';

import { Link } from './components/link/';
import { Navigation } from './components/navigation/';

import logoSvg from './logo.svg';

class App extends React.Component {
    public testsave() {
        // tslint:disable-next-line
        console.log('save');
    }
    public testdelete() {
        // tslint:disable-next-line
        console.log('delete');
    }

    public testnew() {
        // tslint:disable-next-line
        console.log('new');
    }


  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logoSvg} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Navigation
            navigation_name="local"
            max_length={10}
            min_length={0}
            has_image={true}
            handleNew={this.testnew}
        >
            <Link
                id='akdsfhasadjsfha;'
                title='Home'
                link_url='https://www.google.com'
                navigation_name='local'
                order={5}
                canHaveImage={true}
                image_url='https://www.google.com/1.jpg'
                handleSave={this.testsave}
                handleDelete={this.testdelete}
            />
        </Navigation>
      </div>
    );
  }
}




export default App;
