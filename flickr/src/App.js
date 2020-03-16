import React, { Component } from "react";
import { Route} from "react-router-dom";
import './App.css';
//import Layout from './Container/Layout/Layout';
import Photos from '../src/Container/Photos/Photos';
import PhotoDetails from "./Components/PhotoDetails/PhotoDetails";

class App extends Component {
  render(){
    return (
      <div className="App">
          <Route path="/" exact component={Photos}/>
          <Route path="/:id" exact component={PhotoDetails}/>
      </div>
    );
  }
}

export default App;
