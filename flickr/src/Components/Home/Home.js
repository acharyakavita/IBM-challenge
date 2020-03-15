import React from 'react';
import classes from './Home.module.css';

function Home(props){
    return(
        <div className={classes.imageOverlay}>
            <h1>Find your Inspiration.</h1>
            <h4>Search for millions of photos</h4>
            <button><a href="/photos">Start for free</a></button>
        </div>
    )
}

export default Home;