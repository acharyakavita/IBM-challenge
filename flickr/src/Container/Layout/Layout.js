import React, { Component } from "react";
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Main   from '../../Components/Main/Main';
import axios from 'axios';

class Layout extends Component {

/* Initial state*/

  state = {
    searchQueryValue:'',
    photos:{},
    currentpage:0,
    totalPages:0,
    delayFlag:false
    
  };
  
  componentDidMount=()=>{
    axios.get(
        'https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=a5e95177da353f58113fd60296e1d250&user_id=24662369@N07&format=json&nojsoncallback=1'
    )
    .then(res => {
        if (res.data.photos) {
            console.log(res.data.photos)
            this.setState({
                           photos      : res.data.photos.photo,
                           currentpage : res.data.photo.page,
                           totalPages  : res.data.photo.pages
                        });
        } else {
            this.setState({ delayFlag: true });
        }
    })
    .catch(err => {
        console.log('error',err)
        //this.setState({ showResults: false, error: true });
    });
  }

  onClickHandler=(event)=>{
      event.preventDefault();
        
  }

  startSearchClickHandler =(event)=>{
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
        <Main click={this.startSearchClickHandler}/>
        <Footer/>
      </div>
    );
  }
}

export default Layout;
