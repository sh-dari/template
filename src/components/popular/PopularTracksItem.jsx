import React from "react";
import TagItem from "./TagItem";

const PopularTracksItem = ({track, tags}) => {
    if (typeof tags === 'undefined') {
        return (<div></div>);
    }
    return (
        <div className="track">
            <a className="track__link" href={track.url}>
                <img className="track__img" src={track.image[3]['#text']}/>
                <span className="track__hover-elem"></span>
            </a>
            <div>
                <div className="track__title">{track.name}</div>
                <div className="track__group">{track.artist.name}</div>
                <ul className="tags">
                    {tags.map((tag, index)=>
                        <TagItem tag={tag} key={index}/>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default PopularTracksItem;