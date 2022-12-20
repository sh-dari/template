import React from "react";
import TrackItem from "./TrackItem";

const Tracks = ({tracks, times}) => {
    const hidden = tracks.length === 0 ? "compositions hidden" : "compositions";
    return (
        <div className={hidden}>
            <div className="tiles__title">Tracks</div>
            <table className="table-tracks">
                <tbody>{tracks.map((track, index)=><TrackItem track={track} key={index} time={times[index]}/>)}</tbody>
            </table>
            <a href="https://www.last.fm/search/tracks" className="search-result__other">
                More tracks
                <span className="search-result__other-elem"></span>
            </a>
        </div>
    );
}

export default React.memo(Tracks);;