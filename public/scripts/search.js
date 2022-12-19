const urlSearch = "http://ws.audioscrobbler.com/2.0/?";
const apiKeySearch = "ee4c7c668d71d0f8fa2e951d88abee0f";
const searchInput = document.querySelector('.input__field');
const methods = {
    searchArtists: `method=artist.search&limit=8&api_key=${apiKeySearch}&format=json&artist=`,
    searchAlbums: `method=album.search&limit=8&api_key=${apiKeySearch}&format=json&album=`,
    searchTracks: `method=track.search&limit=10&api_key=${apiKeySearch}&format=json&track=`,
    searchTime: `method=track.getInfo&api_key=${apiKeySearch}&format=json&artist=`
};
const artistsList = document.querySelector('.tiles__wrapper_of_artists');
const albumsList = document.querySelector('.tiles__wrapper_of_albums');
const tracksList = document.querySelector('.table-tracks');
const closeButton = document.querySelector('.input__close');
const searchButton = document.querySelector('.input__search');
const searchresult = document.querySelector('.search-result__result');

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
 * @constructs SearchArtist
 * @param {string} name - Name of artist
 * @param {number} listeners - Number of listeners
 */
function SearchArtist(name, listeners) {
    this.name = name;
    this.listeners = listeners;
}

/**
 * @constructs SearchAlbum
 * @param {string} name - Name of album
 * @param {number} listeners - Number of listeners
 */
function SearchAlbum(name, listeners) {
    this.name = name;
    this.listeners = listeners;
}

/**
 * @constructs SearchTrack
 * @param {string} name - Name of track
 * @param {string} image - Album's cover
 * @param {number} time - Track duration in milliseconds
 * @param {string} artist - Name of artist
 */
function SearchTrack(name, image, time, artist) {
    this.name = name;
    this.image = image;
    this.time = time;
    this.artist = artist;
}

closeButton.addEventListener('click', () => {
    searchInput.value = "";
});

const mainSearch = async (event) => {
    if (searchInput.value === "") {
        return;
    }
    if (event instanceof KeyboardEvent && event.key != "Enter") {
        return;
    } 
    searchresult.innerHTML = `Search results for ${searchInput.value}`;
    const tilesArtists = document.querySelector('.tiles__wrapper_of_artists');
    tilesArtists.innerHTML = "";
    const tilesAlbums = document.querySelector('.tiles__wrapper_of_albums');
    tilesAlbums.innerHTML = "";
    const tilesTracks = document.querySelector('.table-tracks');
    tilesTracks.innerHTML = "";
    [...document.querySelectorAll('.hidden')].forEach((el) => el.classList.remove('hidden'));
    const artists = await fetchArtists(searchInput.value).catch((error) => {
        alert(error);
        console.log(error);
    });
    artists.forEach(element => {
        const artist = new SearchArtist(element.name, element.listeners);
        addArtistsToUI(artist);
    });
    const albums = await fetchAlbums(searchInput.value).catch((error) => {
        alert(error);
        console.log(error);
    });
    albums.forEach(element => {
        const album = new SearchAlbum(element.name, element.listeners);
        addAlbumsToUI(album);
    });
    const tracks = await fetchTracks(searchInput.value).catch((error) => {
        alert(error);
        console.log(error);
    });
    const timeTracks = await Promise.all(tracks.map(async(track) => 
        await fetchTimeTrack(track.name, track.artist).catch((error) => {
          console.log(error);
        })
    ));
    timeTracks.some((timeTrack) => {
      if (typeof timeTrack === 'undefined') {
          alert("Ошибка");
          return true;
      }
    });
    tracks.forEach((el, i) => {
        const track = new SearchTrack(el.name, el.image[1]["#text"], timeTracks[i], el.artist);
        addTracksToUI(track);
    });
}

/**
 * Getting data about artists
 * @param {string} artist - Name of artist
 * @return {Array<>} - Json data
 */
async function fetchArtists(artist) {
    const response = await fetch(urlSearch + methods.searchArtists + artist);
    if (response.ok) {
        const data = await response.json();
        return data.results.artistmatches.artist;
    } else {
        throw new Error("Ошибка: " + response.status);
    }
}

/**
 * Adds artist details to the html template
 * @param {SearchArtist} artist - Information about the author
 * @return {void}
 */
function addArtistsToUI(artist) {
    const template = `
    <div class="tile">
      <div class="tile__title">${artist.name}</div>
      <div class="tile__subtitle">${artist.listeners}</div>
    </div>
    `;

    artistsList.insertAdjacentHTML('beforeend', template);
}

/**
 * Getting data about albums
 * @param {string} album - Name of album
 * @return {Array<>} - Json data
 */
async function fetchAlbums(album) {
    const response = await fetch(urlSearch + methods.searchAlbums + album);
    if (response.ok) {
        const data = await response.json();
        return data.results.albummatches.album;
    } else {
        throw new Error("Ошибка: " + response.status);
    }
}

/**
 * Adds album details to the html template
 * @param {SearchAlbum} album - Information about the album
 * @return {void}
 */
function addAlbumsToUI(album) {
    const template = `
    <div class="tile-album">
      <div class="tile__title">${album.name}</div>
      <div class="tile__subtitle">${album.listeners}</div>
    </div>
    `;

    albumsList.insertAdjacentHTML('beforeend', template);
}

/**
 * Getting data about tracks
 * @param {string} track - Name of track
 * @return {Array<>} - Json data
 */
async function fetchTracks(track) {
    const response = await fetch(urlSearch + methods.searchTracks + track);
    if (response.ok) {
        const data = await response.json();
        return data.results.trackmatches.track;
    } else {
        throw new Error("Ошибка: " + response.status);
    }
}

/**
 * Getting data about the duration of each track
 * @param {string} track - Name of track
 * @param {string} artist - Name of artist
 * @return {Array<>} - Json data
 */
async function fetchTimeTrack(track, artist) {
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

/**
 * Adds track details to the html template
 * @param {SearchTrack} track - Information about the track
 * @return {void}
 */
function addTracksToUI(track) {
    const template = `
    <tr class="charlist-row">
      <td class="chartlist-play">
        <a href="#" class="charlist-play-button"></a>
      </td>
      <td class="chartlist-image">
        <img src=${track.image} alt="Room on Fire" loading="lazy">
      </td>
      <td class="chartlist-loved">
        <div class="chartlist-love-button"></div>
      </td>
      <td class="chartlist-name">
        <div>${track.name}</div>
      </td>
      <td class="chartlist-artist">
        <div>${track.artist}</div>
      </td>
      <td class="chartlist-buylinks">
        <a href="#"><img src="imgs/save.png" width="17"></a>
      </td>
      <td class="chartlist-more">
        <a href="#"><img src="imgs/more.png" width="17"></a>
      </td>
      <td class="chartlist-duration">
        ${track.time}
      </td>
    </tr>
    `;

    tracksList.insertAdjacentHTML('beforeend', template);
}

searchInput.addEventListener('keyup', mainSearch);

searchButton.addEventListener('click', mainSearch);
