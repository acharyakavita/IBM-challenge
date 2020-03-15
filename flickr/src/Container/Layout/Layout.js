import React, { Component } from "react";
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

class Layout extends Component {

/* Initial state*/

  state = {
    searchQueryValue:'',
    photos:{},
    currentpage:0,
    totalPages:0,
    delayFlag:false
    
  };


  onClickHandler=(event)=>{
      event.preventDefault();
        
  }


  onChangeHandler=(event)=>{
    let newSearchVal = event.target.value
    this.setState({searchQueryValue:newSearchVal})
    console.log(this.state.searchQueryValue )
  }

  render() {
    return (
      <div>
        <Header 
            onChange={this.onChangeHandler} 
            value={this.state.searchQueryValue}
            click={this.onClickHandler}
        />
        <main>{this.props.children}</main>
        <Footer/>
      </div>
    );
  }
}

export default Layout;
