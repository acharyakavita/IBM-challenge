import React from 'react';
import classes from './PhotoDetails.module.css';
import ReactHtmlParser from 'react-html-parser';

const PhotoDetails = props=> {
    let photo = props.location.state.detail;
    return(
        <div className={classes.photoDetail}>
            <img src={photo.url} alt={photo.title}/>
            <div className={classes.description}>
                <div className={classes.title}>
                    <h4>{photo.title} - <span>{photo.ownername}</span></h4>
                    <p>Views : {photo.views}</p>
                </div>
                <p>{ReactHtmlParser(photo.description._content)}</p>    
            </div>
        </div>
    )
}

export default PhotoDetails;