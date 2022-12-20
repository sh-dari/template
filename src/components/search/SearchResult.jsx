import React, { useEffect, useRef, useState } from "react";
import Tracks from "./Tracks";
import Albums from "./Albums";
import Artists from "./Artists";

const urlSearch = "http://ws.audioscrobbler.com/2.0/?";
const apiKeySearch = "ee4c7c668d71d0f8fa2e951d88abee0f";
const methods = {
    searchArtists: `method=artist.search&limit=8&api_key=${apiKeySearch}&format=json&artist=`,
    searchAlbums: `method=album.search&limit=8&api_key=${apiKeySearch}&format=json&album=`,
    searchTracks: `method=track.search&limit=10&api_key=${apiKeySearch}&format=json&track=`,
    searchTime: `method=track.getInfo&api_key=${apiKeySearch}&format=json&artist=`
};

const SearchResult = ({changeValue}) => {
    const value = useRef(null);
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [time, setTime] = useState([]);

    const search = (event) => {
        if (value.current.value === "") {
            return;
        }
        if (event.nativeEvent instanceof KeyboardEvent && event.nativeEvent.key != "Enter") {
            return;
        }
        changeValue(value.current.value);
        fetchArtists(value.current.value);
        fetchAlbums(value.current.value);
        fetchTracks(value.current.value);
    }

    /**
     * Getting data about artists
     * @param {string} artist - Name of artist
     * @return {Array<>} - Json data
     */
    const fetchArtists = async (artist) => {
        const response = await fetch(urlSearch + methods.searchArtists + artist);
        if (response.ok) {
            const data = await response.json();
            setArtists(data.results.artistmatches.artist);
        } else {
            throw new Error("Ошибка: " + response.status);
        }
    }

    /**
     * Getting data about albums
     * @param {string} album - Name of album
     * @return {Array<>} - Json data
     */
    const fetchAlbums = async (album) => {
        const response = await fetch(urlSearch + methods.searchAlbums + album);
        if (response.ok) {
            const data = await response.json();
            setAlbums(data.results.albummatches.album);
        } else {
            throw new Error("Ошибка: " + response.status);
        }
    }

    /**
     * Getting data about tracks
     * @param {string} track - Name of track
     * @return {Array<>} - Json data
     */
    const fetchTracks = async (track) => {
        const response = await fetch(urlSearch + methods.searchTracks + track);
        if (response.ok) {
            const data = await response.json();
            setTracks(data.results.trackmatches.track);
        } else {
            throw new Error("Ошибка: " + response.status);
        } 
    }

    /**
     * Converts milliseconds to minutes and seconds
     * @param {number} millis - Number of milliseconds
     * @return {string} - Converted string
     */
    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    /**
     * Getting data about the duration of each track
     * @param {string} track - Name of track
     * @param {string} artist - Name of artist
     * @return {Array<>} - Json data
     */
    const fetchTime = async (track, artist) => {
        const response = await fetch(urlSearch + methods.searchTime + artist + `&track=${track}`);
        if (response.ok) {
            const data = await response.json();
            if(typeof data.track?.duration === 'undefined')
                return millisToMinutesAndSeconds(0);
            return millisToMinutesAndSeconds(parseInt(data.track.duration));
        } else {
            throw new Error("Ошибка: " + response.status);
        }
    }

    const trackAwait = async () => {
        const tracksDuration = await Promise.all(tracks.map(async (track) => 
            await fetchTime(track.name, track.artist)
        ));
        setTime(tracksDuration);
    }

    useEffect(()=>{
        trackAwait() 
    }, [tracks]);

    return (
        <div className="search-result__left">
            <div className="input" onKeyUp={search}>
                <input className="input__field" type="text" ref={value}></input>
                <div className="input__close" onClick={()=>value.current.value = ''}></div>
                <div className="input__search" onClick={search}></div>
            </div>
            <Artists artists={artists}/>
            <Albums albums={albums}/>
            <Tracks tracks={tracks} times={time}/>
        </div>
    );
}

export default SearchResult;