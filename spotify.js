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



/*************************************Register page***********************************************/

const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const username = document.getElementById('username');

form.addEventListener('Register', e => {
	e.preventDefault();
	
	checkInputs();
});

function checkInputs() {
	// trim to remove the whitespaces
  const usernameValue = username.value.trim();
  console.log(username.value)
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();
	const password2Value = password2.value.trim();
	
	if(usernameValue === '') {
		setErrorFor(username, 'Username cannot be blank');
	} else {
		setSuccessFor(username);
	}
	if(emailValue === '') {
		setErrorFor(email, 'Email cannot be blank');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Not a valid email');
	} else {
		setSuccessFor(email);
	}
	
	if(passwordValue === '') {
		setErrorFor(password, 'Password cannot be blank');
	} else {
		setSuccessFor(password);
	}
	
	if(password2Value === '') {
		setErrorFor(password2, 'Password2 cannot be blank');
	} else if(passwordValue !== password2Value) {
		setErrorFor(password2, 'Passwords does not match');
	} else{
		setSuccessFor(password2);
	}
}

function setErrorFor(input, message) {
	const formControl = document.querySelector('.formlogin');
	const small = formControl.querySelector('small');
	formControl.className = 'form-login error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = document.querySelector('.formlogin');
	formControl.className = 'form-login success';
}
	
function isEmail(email) {
	return (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email));
};
// SOCIAL PANEL JS
const floating_btn = document.querySelector('.floating-btn');
const close_btn = document.querySelector('.close-btn');
const social_panel_container = document.querySelector('.social-panel-container');

floating_btn.addEventListener('click', () => {
	social_panel_container.classList.toggle('visible')
});

close_btn.addEventListener('click', () => {
	social_panel_container.classList.remove('visible')
});













// SOCIAL PANEL JS
const floating_btn = document.querySelector('.floating-btn');
const close_btn = document.querySelector('.close-btn');
const social_panel_container = document.querySelector('.social-panel-container');

floating_btn.addEventListener('click', () => {
	social_panel_container.classList.toggle('visible')
});

close_btn.addEventListener('click', () => {
	social_panel_container.classList.remove('visible')
});

//views//

type="application/javascript"
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDDjj2zFad92kEeJCEGe1A9vhCc9JUmsqI",
    authDomain: "spotifyproject-750da.firebaseapp.com",
    databaseURL: "https://spotifyproject-750da.firebaseio.com",
    projectId: "spotifyproject-750da",
    storageBucket: "spotifyproject-750da.appspot.com",
    messagingSenderId: "423082401422",
    appId: "1:423082401422:web:06e7c162d5c444d95c33df",
    measurementId: "G-T4SWSJ5HJ5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  function get_viewers_ip(json){
    viewers_ip = json.ip;
    //count view with ip
    count_view(viewers_ip);
  }
  function count_view(viewers_ip){
    var views;
    var ip_to_string = viewers_ip.toString();
    for (var i, i = 0; i < ip_to_string.length; i++) {
      ip_to_string = ip_to_string.replace(".","-")
    }

    firebase.database().ref().child("page_views/" + ip_to_string).set({
      viewers_ip: viewers_ip
    });
    
    firebase.database().ref().child("page_views").on("value", function(snapshot){
      views = snapshot.numChildren();
      document.getElementById("view_count_text").innerHTML = "<i class='far fa-eye'></i>" + views;  
    });
  }



