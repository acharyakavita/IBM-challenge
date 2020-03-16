import React from 'react';
import classes from './Header.module.css';

const header = props=> {
    let classSearch=['fa','fa-search'];
    let options=''
    if(props.displaySearch){
        options=(
            <div className={classes.searchContainer}>
        <form >
                <button type="submit" onClick={props.click}>
                    <i className={classSearch.join(' ')}></i>
                </button>
                <input
                    type="text"
                    placeholder="Search photos"
                    name="search"
                    tabIndex="0"
                    autoFocus
                    autoComplete="off"
                    onChange={props.onChange}
                    value={props.value}
                />
            </form>
            <select onChange={props.sortByHandler} className={classes.sort}>
                <option value="0">Sort By</option>
                <option value="1">Date Uploaded</option>
                <option value="2">Title</option>
                <option value="3">Most Viewed</option>
            </select>
            </div>)
    }
    return(
        <header>
            <a href='./'><h3>flickr</h3></a>
            {options}
        </header>
    )
}

export default header;