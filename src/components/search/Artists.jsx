import React from "react";
import ArtistItem from "./ArtistItem";

const Artists = ({artists}) => {
    const hidden = artists.length === 0 ? "hidden" : "";
    console.log(artists);
    return (
        <div className={hidden}>
            <div className="tiles">
                <a href="https://www.last.fm/search/artists" className="tiles__title">Artists</a>
                <div className="tiles__wrapper tiles__wrapper_of_artists">
                    {artists.map((artist, index)=><ArtistItem artist={artist} key={index}/>)}
                </div>
            </div>
            <a href="https://www.last.fm/search/artists" className="search-result__other">
                More artists
                <span className="search-result__other-elem"></span>
            </a>
        </div>
    );
}

export default React.memo(Artists);