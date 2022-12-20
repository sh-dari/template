import React from "react";

const ArtistItem = ({artist}) => {
    return (
        <div className="tile">
            <div className="tile__title">{artist.name}</div>
            <div className="tile__subtitle">{artist.listeners}</div>
        </div>
    );
}

export default ArtistItem;