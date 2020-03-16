import React, { Component } from "react";
import axios from 'axios';
import classes from './Photos.module.css';
import Photo from '../../Components/Photo/Photo';
import Config from '../../config';
import Header from '../../Components/Header/Header';
import InfiniteScroll from 'react-infinite-scroller';

class Photos extends Component {

/* Initial state*/

  state = {
    searchQueryValue:'',
    photos:[],
    currentpage:0,
    totalPages:1,
    delayFlag:true,
    initialStatePhotos:[],
    publicPhotos :true,
    searchPhotos:false,
    error:false,
    errMessage:''
  };
  
  componentDidMount=()=>{
        axios.get(
            `https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${Config.api_key}&user_id=${Config.user_id}&per_page=${Config.per_page}&extras=description,owner_name,date_upload,date_taken,views&format=json&nojsoncallback=1`
        )
        .then(res => {
            if (res.data.photos) {
                this.setState({
                               photos      : res.data.photos.photo,
                               currentpage : res.data.photos.page,
                               totalPages  : res.data.photos.pages,
                               delayFlag: false,
                               publicPhotos:true,
                               searchPhotos:false,
                               error:false
                            });
            } 
            if(res.data.photos.photo.length===0){
                this.setState({ error: true, errorMsg: 'No search results found'});   
            }
        })
        .catch(err => {
            this.setState({ error: true, errorMsg: err.toString() });
        });
    
  }

  onClickSearchHandler=(event)=>{
      event.preventDefault();
      axios.get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${Config.api_key}&user_id=${Config.user_id}&per_page=${Config.per_page}&text=${this.state.searchQueryValue}&extras=date_upload,date_taken,views,description,owner_name&format=json&nojsoncallback=1`
    )
    .then(res => {
        if (res.data.photos) {
            this.setState({
            photos      : res.data.photos.photo,
            currentpage : res.data.photos.page,
            totalPages  : res.data.photos.pages,
            delayFlag: false,
            searchPhotos:true,
            publicPhotos:false,
            error:false
            });
        } 
        if(res.data.photos.photo.length===0){
            this.setState({ error: true, errorMsg: 'No search results found'});   
        }
    })
    .catch(err => {
        this.setState({ error: true, errorMsg: err.toString() });
    });


  }

  photoClickHandler=(photo)=>{
    axios.get(`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`)
        .then(res=>{
            if(res){
                photo.url=`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`
                this.props.history.push(
                    {pathname:`/${photo.id}`,
                     state:{detail:photo}
                    })

            }
        })
        .catch(e=>{
            this.props.history.push(
                {pathname:`/${photo.id}`,
                 state:{detail:photo}
                })
        })
  }


  onChangeHandler=(event)=>{
    let newSearchVal = event.target.value
    this.setState({searchQueryValue:newSearchVal},() => {
        //console.log("New state set in ASYNC callback:",this.state.searchQueryValue);
    })
  }

  sortByHandler=(event)=>{
    let sortedPhotos=this.state.photos;
      switch(event.target.value){
          case '1':
              sortedPhotos=this.state.photos.sort((a,b)=>parseInt(a.dateupload)-parseInt(b.dateupload));
              break;
          case '2':
              sortedPhotos=this.state.photos.sort((a,b)=>a.title.localeCompare(b.title));
              break;
          case '3':
              sortedPhotos=this.state.photos.sort((a,b)=>b.views-a.views);
              break;
           default:break;      
      }
      this.setState({photos:sortedPhotos})
  }

  loadMorePages=()=>{
      console.log(this.state.currentpage)
    let url='';
    if(this.state.publicPhotos){
        url=`https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${Config.api_key}&user_id=${Config.user_id}&per_page=${Config.per_page}&page=${this.state.currentpage+1}&extras=description,owner_name,date_upload,date_taken,views&format=json&nojsoncallback=1`
    }
    else {
        console.log("hi")
        url=`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${Config.api_key}&user_id=${Config.user_id}&per_page=${Config.per_page}&page=${this.state.currentpage+1}&text=${this.state.searchQueryValue}&extras=date_upload,date_taken,views,description,owner_name&format=json&nojsoncallback=1`
    }
    axios.get(url)
    .then(res => {
        if (res.data.photos) {
            let oldPhotos=this.state.photos
            let newPhotos= oldPhotos.concat(res.data.photos.photo)
            this.setState({
                           photos      : newPhotos,
                           currentpage : res.data.photos.page,
                           totalPages  : res.data.photos.pages,
                           delayFlag: false,
                           error:false
                        });
        } 
        if(res.data.photos.photo.length===0){
            this.setState({ error: true, errorMsg: 'No search results found'});   
        }
    })
    .catch(err => {
        this.setState({ error: true, errorMsg: err.toString() });
    });
  }

  render() {
      let url='';
      let photoData=(<h5>Loading ....</h5>)
      if(!this.state.delayFlag){
        photoData = this.state.photos.map((item,index)=>{
            url=`https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`;
            return <Photo url={url} 
                    key={index} 
                    data={item}
                    click={this.photoClickHandler}
                    />
        })
      }

      if (this.state.error) {
        photoData = <p className={classes.error}>{this.state.errorMsg}</p>;
      }
      
      
    return (
        <div>
        <Header 
            onChange={this.onChangeHandler} 
            value={this.state.searchQueryValue}
            click={this.onClickSearchHandler}
            displaySearch={true}
            sortByHandler={this.sortByHandler}
        />
        
            <InfiniteScroll
                initialLoad={ false }
                pageStart={1}
                loadMore={this.loadMorePages}
                hasMore={this.state.currentpage<this.state.totalPages}
                loader={<div className="loader" key={1}>Loading ...</div>}>
                <div className={classes.photos}>
                        {photoData}
                        </div>  
            </InfiniteScroll>
        
      </div>
    );
  }
}

export default Photos;
