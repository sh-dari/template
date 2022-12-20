import React from "react";
import AlbumItem from "./AlbumItem";

const Albums = ({albums}) => {
    const hidden = albums.length === 0 ? "hidden" : "";
    return (
        <div className={hidden}>
            <div className="tiles">
                <a href="https://www.last.fm/search/albums" className="tiles__title">Albums</a>
                <div className="tiles__wrapper tiles__wrapper_of_albums">
                    {albums.map((album, index)=><AlbumItem album={album} key={index}/>)}
                </div>
            </div>
            <a href="https://www.last.fm/search/albums" className="search-result__other">
                More albums
                <span className="search-result__other-elem"></span>
            </a>
        </div>
    );
}

export default React.memo(Albums);