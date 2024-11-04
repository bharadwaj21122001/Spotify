console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('song1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let volumeControl = document.getElementById('volumeControl');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Girl Just(Violin)", filePath: "song1.mp3", coverPath: "cover1.jpg" },
    { songName: "Nammavemo", filePath: "song2.mp3", coverPath: "cover2.jpeg" },
    { songName: "Fear", filePath: "song3.mp3", coverPath: "cover3.jpg" },
    { songName: "All Hail Tiger", filePath: "song4.mp3", coverPath: "cover4.jpg" },
    { songName: "Daavudi", filePath: "song16.mp3", coverPath: "cover16.jpg" },
    { songName: "Anaganaga", filePath: "song8.mp3", coverPath: "cover8.jpg" },
    { songName: "Reddy Ikkada", filePath: "song5.mp3", coverPath: "cover5.jpg" },
    { songName: "Attarintiki", filePath: "song6.mp3", coverPath: "cover6.jpg" },
    { songName: "Hare Rama", filePath: "song7.mp3", coverPath: "cover7.jpg" },
    { songName: "Ekkada Ekkada", filePath: "song9.mp3", coverPath: "cover9.jpg"},
    { songName: "Dum Dumare", filePath: "song10.mp3", coverPath: "cover11.jpg"},
    { songName: "Madhura Meenakshi", filePath: "song11.mp3", coverPath: "cover10.jpg"},
    { songName: "Diwali Holi", filePath: "song12.mp3", coverPath: "cover12.jpg"},
    { songName: "Adaraku", filePath: "song13.mp3", coverPath: "cover13.jpg"},
    { songName: "Pilichina", filePath: "song14.mp3", coverPath: "cover14.jpg"},
    { songName: "Sitara", filePath: "song17.mp3", coverPath: "cover17.webp"},
    { songName: "Nallanchu Thellacheera", filePath: "song15.mp3", coverPath: "cover15.jpeg"},
    { songName: "Proud se Single", filePath: "song18.mp3", coverPath: "cover18.jpg"},
    { songName: "Nuvvu Navvukuntu", filePath: "song19.mp3", coverPath: "cover19.jpg"},
    { songName: "Satte Era Satte", filePath: "song20.mp3", coverPath: "cover20.jpg"},
    { songName: "Madhu", filePath: "song21.mp3", coverPath: "cover21.jpg"}
];

// Display song information
const displaySongs = () => {
    songItems.forEach((element, i) => {
        element.getElementsByTagName("img")[0].src = songs[i].coverPath;
        element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
        element.getElementsByClassName('songItemPlay')[0].setAttribute('id', i);
    });
};
displaySongs();

// Play/Pause button event listener
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        updatePlayPauseIcons(songIndex, false);
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        updatePlayPauseIcons(songIndex, true);
    }
});

// Update progress bar as the song plays
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Seek song using progress bar
myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Reset all play buttons to the play icon
const updatePlayPauseIcons = (index, reset = true) => {
    songItems.forEach((element, i) => {
        let playButton = element.getElementsByClassName('songItemPlay')[0];
        if (i === index && !reset) {
            playButton.classList.remove('fa-play-circle');
            playButton.classList.add('fa-pause-circle');
        } else {
            playButton.classList.remove('fa-pause-circle');
            playButton.classList.add('fa-play-circle');
        }
    });
};

// Add event listeners to song play buttons
const setupPlayButtons = () => {
    songItems.forEach((element, i) => {
        element.getElementsByClassName('songItemPlay')[0].addEventListener('click', (e) => {
            if (songIndex === i && !audioElement.paused) {
                audioElement.pause();
                e.target.classList.remove('fa-pause-circle');
                e.target.classList.add('fa-play-circle');
                masterPlay.classList.remove('fa-pause-circle');
                masterPlay.classList.add('fa-play-circle');
                gif.style.opacity = 0;
            } else {
                songIndex = i;
                audioElement.src = songs[songIndex].filePath;
                masterSongName.innerText = songs[songIndex].songName;
                audioElement.currentTime = 0;
                audioElement.play();
                updatePlayPauseIcons(songIndex, false);
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
                gif.style.opacity = 1;
            }
        });
    });
};
setupPlayButtons();

// Next song
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    updatePlayPauseIcons(songIndex, false);
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
});

// Previous song
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    updatePlayPauseIcons(songIndex, false);
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
});

// Add new songs dynamically
const addNewSong = (songName, filePath, coverPath) => {
    songs.push({ songName, filePath, coverPath });
    
    let newSongIndex = songs.length - 1;
    
    // Create new song item HTML
    let songItemHTML = `
        <div class="songItem">
            <img src="${coverPath}" alt="${songName}">
            <span class="songName">${songName}</span>
            <span class="songListplay">
                <span class="timeStamp">00:00 <i id="${newSongIndex}" class="fas songItemPlay fa-play-circle"></i></span>
            </span>
        </div>
    `;
    
    // Append new song item to the song list
    document.querySelector('.songItemContainer').innerHTML += songItemHTML;
    
    // Reinitialize songItems array and set up new buttons
    songItems = Array.from(document.getElementsByClassName('songItem'));
    setupPlayButtons();
};