import React from 'react';
import classes from './PhotoDetails.module.css';
import ReactHtmlParser from 'react-html-parser';
import Header from '../Header/Header'


/* component to display the photo details*/
const PhotoDetails = props=> {

    let photo = props.location.state.detail;
    let date=new Date(parseInt(photo.dateupload)*1000)
    let formattedDate=date.getUTCDate() + '/' + (date.getUTCMonth() + 1)+ '/' + date.getUTCFullYear();
    
    return(
        <div>
            <Header displaySearch={false}/>
            <div className={classes.photoDetail}>
                <img src={photo.url} alt={photo.title}/>
                <div className={classes.description}>
                    <div className={classes.title}>
                        <h4>{photo.title} <span> by {photo.ownername}</span></h4>
                    </div>
                    <p className={classes.views}>Views : <span>{photo.views}</span></p>
                    <p className={classes.date}>Uploaded on: <span>{formattedDate}</span></p>
                    <p>{ReactHtmlParser(photo.description._content)}</p>    
                </div>
            </div>
        </div>
    )
}

export default PhotoDetails;