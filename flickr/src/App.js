import React, { Component } from "react";
import { Route} from "react-router-dom";
import './App.css';
import Layout from './Container/Layout/Layout';
import Home from '../src/Components/Home/Home';
import Photos from '../src/Container/Photos/Photos';

class App extends Component {
  render(){
    return (
      <div className="App">
        <Layout>
            <Route path="/" exact component={Home} />
            <Route path="/photos" exact component={Photos}/>
          </Layout>
      </div>
    );
  }
}

export default App;
