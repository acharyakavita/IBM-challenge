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
    initialStatePhotos:[]
    
  };
  
  componentDidMount=()=>{
      if(this.state.photos.length===0){
        axios.get(
            `https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${Config.api_key}&user_id=${Config.user_id}&per_page=20&extras=description,owner_name,date_upload,date_taken,views&format=json&nojsoncallback=1`
        )
        .then(res => {
            if (res.data.photos) {
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
  }

  onClickHandler=(event)=>{
      event.preventDefault();
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
    this.setState({searchQueryValue:newSearchVal})
    console.log(this.state.searchQueryValue )
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
    axios.get(
        `https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${Config.api_key}&user_id=${Config.user_id}&per_page=20&page=${this.state.currentpage+1}&extras=description,owner_name,date_upload,date_taken,views&format=json&nojsoncallback=1`
    )
    .then(res => {
        if (res.data.photos) {
            console.log(res.data.photos)
            let oldPhotos=this.state.photos
            let newPhotos= oldPhotos.concat(res.data.photos.photo)
            console.log(oldPhotos)
            this.setState({
                           photos      : newPhotos,
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

  render() {
      let url='';
      let photoData='';
      if(!this.state.delayFlag){
        photoData = this.state.photos.map(item=>{
            url=`https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`;
            return <Photo url={url} 
                    key={item.id} 
                    data={item}
                    click={this.photoClickHandler}
                    />
        })
        
      }
      
      
    return (
        <div>
        <Header 
            onChange={this.onChangeHandler} 
            value={this.state.searchQueryValue}
            click={this.onClickHandler}
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
