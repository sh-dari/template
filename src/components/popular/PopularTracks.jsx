import React from "react";
import PopularTracksItem from "./PopularTracksItem";

const PopularTracks = ({tracks, tagsTracks}) => {
    return (
        <div className="tracks__wrapper">
            {tracks.map((track, index)=>
                <PopularTracksItem track={track} key={index} tags={tagsTracks[index]}/>
            )}
        </div>
    );
}

export default PopularTracks;