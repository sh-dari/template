import React, { useEffect, useState } from "react";
import PopularMusicians from "./PopularMusicians";
import PopularTracks from "./PopularTracks";

const url = "http://ws.audioscrobbler.com/2.0/?";
const apiKey = "ee4c7c668d71d0f8fa2e951d88abee0f";
const methods = {
    topArtists: `method=chart.gettopartists&limit=12&api_key=${apiKey}&format=json`,
    tagsArtist: `method=artist.gettoptags&api_key=${apiKey}&format=json&artist=`,
    topTracks: `method=chart.gettoptracks&limit=18&api_key=${apiKey}&format=json`,
    tagsTrack: `method=track.gettoptags&api_key=${apiKey}&format=json&artist=`
};

const Popular = () => {
    const [musicians, setMusicians] = useState([]);
    const [tagsMusicians, setTagsMusicians] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [tagsTracks, setTagsTracks] = useState([]);

    useEffect(()=>{
        fetchMusicians().catch((error) => {
            alert(error);
            console.log(error);
        })
        fetchTracks().catch((error) => {
            alert(error);
            console.log(error);
        })
    }, []);

    useEffect(()=>{
        getTagsMusicians();
    }, [musicians]);

    useEffect(()=>{
        getTagsTracks();
    }, [tracks]);

    /**
     * Getting data about the top of artists
     * @return {Array<>} - Json data
     */
    const fetchMusicians = async () => {
        const response = await fetch(url + methods.topArtists);
        if (response.ok) {
            const data = await response.json();
            setMusicians(data.artists.artist);
        } else {
            throw new Error("Ошибка: " + response.status);
        }
    }

    /**
     * Getting data about the tags of artists
     * @param {string} name - Name of artist
     * @return {Array<>} - Json data
     */
    const fetchTagsMusicians = async (name) => {
        const response = await fetch(url + methods.tagsArtist + name);
        if (response.ok) {
            const data = await response.json();
            return data.toptags.tag.slice(0,3);
        } else {
            throw new Error("Ошибка: " + response.status);
        }
    }

    /**
     * Getting data about the top of tracks
     * @return {Array<>} - Json data
     */
    const fetchTracks = async () => {
        const response = await fetch(url + methods.topTracks);
        if (response.ok) {
            const data = await response.json();
            setTracks(data.tracks.track);
        } else {
            throw new Error("Ошибка: " + response.status);
        }
    }

    /**
     * Getting data about the tags of tracks
     * @param {string} artist - Name of artist
     * @param {string} track - Name of track
     * @return {Array<>} - Json data
     */
    const fetchTagsTracks = async (artist, track) => {
        if (track.includes('&')){
            return []
        }
        const response = await fetch(url + methods.tagsTrack + artist + "&track=" + track);
        if (response.ok) {
            const data = await response.json();
            return data.toptags.tag.slice(0,3);
        } else {
            throw new Error("Ошибка: " + response.status);
        }
    }

    const getTagsMusicians = async () => {
        const tags = await Promise.all(musicians.map(async(musician) => 
            await fetchTagsMusicians(musician.name)
        ));
        setTagsMusicians(tags);
    }

    const getTagsTracks = async () => {
        const tags = await Promise.all(tracks.map(async(track) => 
            await fetchTagsTracks(track.artist.name, track.name)
        ));
        setTagsTracks(tags);
    }

    return (
        <main className="content">
            <div className="container">
                <div className="musicians">
                    <h1>Music</h1>
                    <div className="subtitle">Hot right now</div>
                    <PopularMusicians musicians={musicians} tagsMusicians={tagsMusicians}/>
                </div>
                <div className="tracks">
                    <div className="subtitle">Popular tracks</div>
                    <PopularTracks tracks={tracks} tagsTracks={tagsTracks}/>
                </div>
            </div>
        </main>
    );
}

export default Popular;