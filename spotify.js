const playercontainer = document.getElementById('player-container')
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio-player')
const progress = document.getElementById('progress');

const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');


// Song titles
const songs = ['Point of Authority', 'One step closer', 'Papercut'];


// Keep track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);


// Update song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `imgs/${song}.jpg`;
  }

  // Event listeners
playBtn.addEventListener('click', function(){
    
    if (playercontainer.classList.contains('play')) {
      pauseSong();
    } else {
      playSong();
    }
  });
  
// Play song
function playSong() {
    playercontainer.classList.add('play');
    playBtn.querySelector('i.far').classList.remove('fa-play-circle');
    playBtn.querySelector('i.far').classList.add('fa-pause-circle');
  
    audio.play();
  }

  // Pause song
function pauseSong() {
    playercontainer.classList.remove('play');
    playBtn.querySelector('i.far').classList.add('fa-play-circle');
    playBtn.querySelector('i.far').classList.remove('fa-pause-circle');
  
    audio.pause();
  }

  // Previous song
function prevSong() {
    songIndex--;
  
    if (songIndex < 0) {
      songIndex = songs.length - 1;
    }
  
    loadSong(songs[songIndex]);
  
    playSong();
  }
  
  // Next song
  function nextSong() {
    songIndex++;
  
    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }
  
    loadSong(songs[songIndex]);
  
    playSong();
  }

  
// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
  }

  // Set progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
  
    audio.currentTime = (clickX / width) * duration;
  }
  
  
 

  // Change song with eventlistener
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);
// Click on progress bar
progressContainer.addEventListener('click', setProgress);