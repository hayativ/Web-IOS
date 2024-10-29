const tracks = [
    { name: "Track 1", src: "Music/1.mp3", cover: "Image/1.jpg" },
    { name: "Track 2", src: "Music/2.mp3", cover: "Image/2.jpg" },
    { name: "Track 3", src: "Music/4.mp3", cover: "Image/4.jpg" },
];

let currentTrackIndex = 0;
let isPlaying = false;
const audio = new Audio(tracks[currentTrackIndex].src);

const coverImage = document.getElementById("cover");
const trackTitle = document.getElementById("track-title");
const playPauseButton = document.getElementById("play-pause-btn");
const nextButton = document.getElementById("next-btn");
const trackListElement = document.getElementById("track-list");

// Load Track
function loadTrack(index) {
    audio.src = tracks[index].src;
    coverImage.src = tracks[index].cover;
    trackTitle.textContent = tracks[index].name;
    audio.load();
}

// Play/Pause
function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        playPauseButton.textContent = "PLAY";
    } else {
        audio.play();
        playPauseButton.textContent = "STOP";
    }
    isPlaying = !isPlaying;
}

// Next
function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) audio.play();
}

// Selecting from list
function selectTrack(index) {
    currentTrackIndex = index;
    loadTrack(currentTrackIndex);
    audio.play();
    isPlaying = true;
    playPauseButton.textContent = "STOP";
}
function populateTrackList() {
    const items = trackListElement.getElementsByClassName("item");
    for (let i = 0; i < items.length; i++) {
        items[i].addEventListener("click", function () {
            const index = parseInt(this.getAttribute("data-index"), 10);
            selectTrack(index);
        });
    }
}

// Event Listeners
playPauseButton.addEventListener("click", togglePlayPause);
nextButton.addEventListener("click", nextTrack);

loadTrack(currentTrackIndex);
populateTrackList();