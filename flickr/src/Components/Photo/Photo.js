import React from 'react';
import classes from './Photo.module.css';

const Photo = props=> {
    return(
        <div className={classes.photo} onClick={()=>props.click(props.data)}>
            <img src={props.url} alt={props.data.title}/>
            <div className={classes.photoOverlay}>
                <h4>{props.data.title}</h4>
            </div>
        </div>
    )
}

export default Photo;