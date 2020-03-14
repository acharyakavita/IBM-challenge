import React from 'react';
import classes from './Header.module.css';

const header = props=> {
    let classSearch=['fa','fa-search'];
    let classFlickr=['fab','fa-flickr']
    return(
        <header>
            
            <h3><i className={classFlickr.join(' ')}></i>flickr</h3>
            <form className={classes.searchContainer}>
                <button type="submit" onClick={props.click}>
                    <i className={classSearch.join(' ')}></i>
                </button>
                <input
                    type="text"
                    placeholder="Search photos from the list..."
                    name="search"
                    tabIndex="0"
                    autoFocus
                    autoComplete="off"
                    //className={classes.Input}
                    onChange={props.onChange}
                    value={props.value}
                />
            </form>  
        </header>
    )
}

export default header;