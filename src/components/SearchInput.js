import React from "react";

export const SearchInput = ({ placeholder, searchHandler }) => {
    return (
        <form className="gb-search-form" onSubmit={searchHandler}>
            <input type="text" className="search-input" placeholder={placeholder}/>
            <input type="submit" value="Search" className="search-btn gb-background-green"/>
        </form>
    );
};
