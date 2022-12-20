import React from "react";

const TrackItem = ({track, time}) => {
    return (
        <tr className="charlist-row">
            <td className="chartlist-play">
                <a href="#" className="charlist-play-button"></a>
            </td>
            <td className="chartlist-image">
                <img src={track.image[3]["#text"]} alt="Room on Fire" loading="lazy"/>
            </td>
            <td className="chartlist-loved">
                <div className="chartlist-love-button"></div>
            </td>
            <td className="chartlist-name">
                <div>{track.name}</div>
            </td>
            <td className="chartlist-artist">
                <div>{track.artist}</div>
            </td>
            <td className="chartlist-buylinks">
                <a href="#"><img src="imgs/save.png" width="17"/></a>
            </td>
            <td className="chartlist-more">
                <a href="#"><img src="imgs/more.png" width="17"/></a>
            </td>
            <td className="chartlist-duration">
                {time}
            </td>
        </tr>
    );
}

export default TrackItem;