import React from 'react';
import classes from './Main.module.css';

function Main(props){
    return(
        <main>
            <div className={classes.imageOverlay}>
                <h1>Find your Inspiration.</h1>
                <h4>Search for millions of photos</h4>
                <button onClick={props.click}>Start for free</button>
            </div>
            
        </main>
    )
}

export default Main;