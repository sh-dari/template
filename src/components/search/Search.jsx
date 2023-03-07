import React, { useState } from "react";
import SearchResult from "./SearchResult";
import Tabs from "./Tabs";

const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    return (
        <main className="content">
            <div className="search-result">
                <div className="search-result__top">
                    <div className="container">
                        <h1 className="search-result__result">Search results for {searchValue}</h1>
                        <Tabs/>
                    </div>
                </div>
                <div className="search-result__bottom">
                    <div className="container">
                        <div className="search-result__wrapper">
                            <SearchResult changeValue={setSearchValue}/>
                            <div className="search-result__right">
                                <p>Don't want to see ads?<a className="search-result__right-link" href="#">Upgrade Now</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Search;