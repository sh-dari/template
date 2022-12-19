const url = "http://ws.audioscrobbler.com/2.0/?";
const apiKey = "ee4c7c668d71d0f8fa2e951d88abee0f";
const methods = {
    topArtists: `method=chart.gettopartists&limit=12&api_key=${apiKey}&format=json`,
    tagsArtist: `method=artist.gettoptags&api_key=${apiKey}&format=json&artist=`,
    topTracks: `method=chart.gettoptracks&limit=18&api_key=${apiKey}&format=json`,
    tagsTrack: `method=track.gettoptags&api_key=${apiKey}&format=json&artist=`
};
const musicianList = document.querySelector('.musicians__wrapper');
const trackList = document.querySelector('.tracks__wrapper');

/**
 * @constructs Artist
 * @param {string} name - Name of artist
 * @param {string} image - Album's cover
 * @param {Array<Object>} tags - Information about tags of artist
 * @param {string} url - Url leading to the author's page
 */
function Artist(name, image, tags, url) {
    this.name = name;
    this.image = image;
    this.tags = tags;
    this.url = url;
}

/**
 * @constructs Track
 * @param {string} name - Name of track
 * @param {string} image - Album's cover
 * @param {string} artist - Name of artist
 * @param {Array<Object>} tags - Information about tags of track
 * @param {string} url - Url leading to the track's page
 */
function Track(name, image, artist, tags, url) {
    this.name = name;
    this.image = image;
    this.artist = artist;
    this.tags = tags;
    this.url = url;
}

/**
 * Getting data about the top of artists
 * @return {Array<>} - Json data
 */
async function fetchTopArtists() {
    const response = await fetch(url + methods.topArtists);
    if (response.ok) {
        const data = await response.json();
        return data.artists.artist;
    } else {
        throw new Error("Ошибка: " + response.status);
    }
}

/**
 * Getting data about the tags of artists
 * @param {string} name - Name of artist
 * @return {Array<>} - Json data
 */
async function fetchTagArtist(name) {
    const response = await fetch(url + methods.tagsArtist + name);
    if (response.ok) {
        const data = await response.json();
        return data.toptags.tag;
    } else {
        throw new Error("Ошибка: " + response.status);
    }
}

/**
 * Adds artist details to the html template
 * @param {Artist} artist - Information about the artist
 * @return {void}
 */
function addArtistToUI(artist) {
    const template = `
    <div class="musician">
        <a href="${artist.url}">
            <img class="musician__img" src=${artist.image}></img>
        </a>
        <a href="${artist.url}" class="musician__name">${artist.name}</a>
        <ul class="tags">
            <li class="tag"><a href="${artist.tags[0].url}">${artist.tags[0].name}</a></li>
            <li class="tag"><a href="${artist.tags[1].url}">${artist.tags[1].name}</a></li>
            <li class="tag"><a href="${artist.tags[2].url}">${artist.tags[2].name}</a></li>
        </ul>
    </div>
    `;

    musicianList.insertAdjacentHTML('beforeend', template);
}

/**
 * Getting data about the top of tracks
 * @return {Array<>} - Json data
 */
async function fetchTopTracks() {
    const response = await fetch(url + methods.topTracks);
    if (response.ok) {
        const data = await response.json();
        return data.tracks.track;
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
async function fetchTagTrack(artist, track) {
    const response = await fetch(url + methods.tagsTrack + artist + "&track=" + track);
    if (response.ok) {
        const data = await response.json();
        return data.toptags.tag;
    } else {
        throw new Error("Ошибка: " + response.status);
    }
}

/**
 * Adds track details to the html template
 * @param {Track} track - Information about the track
 * @return {void}
 */
function addTrackToUI(track) {
    const template = `
    <div class="track">
      <a class="track__link" href="${track.url}">
        <img class="track__img" src=${track.image}>
        <span class="track__hover-elem"></span>
      </a>
      <div>
        <div class="track__title">${track.name}</div>
        <div class="track__group">${track.artist}</div>
        <ul class="tags">
          <li class="tag"><a href="${track.tags[0].url}">${track.tags[0].name}</a></li>
          <li class="tag"><a href="${track.tags[1].url}">${track.tags[1].name}</a></li>
          <li class="tag"><a href="${track.tags[2].url}">${track.tags[2].name}</a></li>
        </ul>
      </div>
    </div>
    `;

    trackList.insertAdjacentHTML('beforeend', template);
}

/**
 * The main function that performs the main actions on the page
 * @return {void}
 */
async function main() {
    const topArtists = await fetchTopArtists().catch((error) => {
        alert(error);
        console.log(error);
    });
    const tagsArtists = await Promise.all(topArtists.map(async(artist) => 
        await fetchTagArtist(artist.name).catch((error) => {
            console.log(error);
        })
    ));
    tagsArtists.some((tagArtist) => {
        if (typeof tagArtist === 'undefined') {
            alert("Ошибка");
            return true;
        }
    });
    topArtists.forEach((topArtist, i) => {
        const artist = new Artist(topArtist.name, topArtist.image[1]["#text"], tagsArtists[i], topArtist.url);
        addArtistToUI(artist);
    });

    const topTracks = await fetchTopTracks().catch((error) => {
        alert(error);
        console.log(error);
    });
    const tagsTracks = await Promise.all(topTracks.map(async(track) => 
        await fetchTagTrack(track.artist.name, track.name).catch((error) => {
            console.log(error);
        })
    ));
    tagsTracks.some((tagTrack) => {
        if (typeof tagTrack === 'undefined') {
            alert("Ошибка");
            return true;
        }
    });
    topTracks.forEach((topTrack, i) => {
        const track = new Track(topTrack.name, topTrack.image[1]["#text"], topTrack.artist.name, tagsTracks[i], topTrack.url);
        addTrackToUI(track);
    });
}

main();
