import React from "react";

export const SearchInput = ({placeholder, searchHandler, changeHandler, value, name}) => {
    return (
        <form className="gb-search-form" onSubmit={(e)=>searchHandler(e, value)}>
            <input type="text" className="search-input" placeholder={placeholder} value={value}
                   onChange={changeHandler} name={name}/>
            <input type="submit" value="Search" className="search-btn gb-background-green"/>
        </form>
    );
};
