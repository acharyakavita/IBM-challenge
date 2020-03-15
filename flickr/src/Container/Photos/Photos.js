import React, { Component } from "react";
import axios from 'axios';
import classes from './Photos.module.css';
import Photo from '../../Components/Photo/Photo';

class Photos extends Component {

/* Initial state*/

  state = {
    searchQueryValue:'',
    photos:[],
    currentpage:0,
    totalPages:0,
    delayFlag:true
    
  };
  
  componentWillMount=()=>{
    axios.get(
        'https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=a5e95177da353f58113fd60296e1d250&user_id=24662369@N07&format=json&nojsoncallback=1'
    )
    .then(res => {
        if (res.data.photos) {
            console.log(res.data.photos)
            this.setState({
                           photos      : res.data.photos.photo,
                           currentpage : res.data.photos.page,
                           totalPages  : res.data.photos.pages,
                           delayFlag: false
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


  onChangeHandler=(event)=>{
    let newSearchVal = event.target.value
    this.setState({searchQueryValue:newSearchVal})
    console.log(this.state.searchQueryValue )
  }

  render() {
      let url='';
      let photoData='';
      if(!this.state.delayFlag){
        photoData = this.state.photos.map(item=>{
            url=`https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`;
            return <Photo url={url} key={item.id} data={item}/>
        })
        
      }
      
      
    return (
      <div className={classes.photos}>
        {photoData}
      </div>
    );
  }
}

export default Photos;
