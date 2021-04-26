const musisContainer = document.querySelector(".music-container");
const prev = document.querySelector("#prev");
const play = document.querySelector("#play");
const next = document.querySelector("#next");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");
const audio = document.querySelector("#audio");
const progressContainer = document.querySelector(".progress-container");
const progress = document.querySelector(".progress");

const songs = ["hey", "ukulele", "summer"];

var songIndex = 1;

loadSong = (song) => {
    title.innerHTML = song;
    audio.src = `./music/${song}.mp3`
    cover.src = `./images/${song}.jpg`
}

loadSong(songs[songIndex]);

pauseSong = () => {
    musisContainer.classList.remove("play")
    play.querySelector(".fa").classList.add("fa-play")
    play.querySelector(".fa").classList.remove("fa-pause")

    audio.pause()
}

playSong = () => {
    musisContainer.classList.add("play");
    play.querySelector("i.fa").classList.remove("fa-play")
    play.querySelector("i.fa").classList.add("fa-pause")
    
    audio.play()
}

nextSong = () => {
    songIndex++

    if (songIndex > songs.length - 1) {
        songIndex = 0
    }

    loadSong(songs[songIndex]);

    playSong();
}

prevSong = () => {
    songIndex--

    if (songIndex < songs.length - 1) {
        songIndex = 0
    }

    loadSong(songs[songIndex]);

    playSong();
}



updateProgress = (e) => {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

play.addEventListener("click", () => {
    const isPlaying = musisContainer.classList.contains("play");

    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})
next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);
audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", setProgress);