import React from "react";

const AlbumItem = ({album}) => {
    return (
        <div className="tile-album">
            <div className="tile__title">{album.name}</div>
            <div className="tile__subtitle">{album.listeners}</div>
        </div>
    );
}

export default AlbumItem;