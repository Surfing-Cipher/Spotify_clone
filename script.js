console.log("welcome ");
//Initialize the variables
let songIndex = 0;
let audioELement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');

let songItems = Array.from(document.getElementsByClassName('songItem'));
/*document.getElementsByClassName('songItem') returns a collection of elements with the class name "songItem". 
However, this collection is not a standard array;
 it is an array-like object called an HTMLCollection. By using Array.from(),
 we convert this HTMLCollection into a proper array, which allows us to use array methods like forEach() on it.*/


let songs = [
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/0.png"}
    ,{songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/1.jpg"}
    ,{songName: "DEAF KEV - Invincible [NCS Release]", filePath: "songs/3.mp3", coverPath: "covers/2.jpg"}
    ,{songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/3.jpg"}
    ,{songName: "Janji-Heroes-Tonight[NCS-Release]", filePath: "songs/5.mp3", coverPath: "covers/4.jpg"}
    ,{songName: "Body of Water - TrackTribe", filePath: "songs/6.mp3", coverPath: "covers/5.jpg"}
    ,{songName: "Rains Of Meghalaya - Hanu Dixit", filePath: "songs/7.mp3", coverPath: "covers/6.jpg"}
    ,{songName: "The Charmer's Call - Hanu Dixit", filePath: "songs/8.mp3", coverPath: "covers/7.jpg"}
    ,{songName: "U & Cloud -Hiroyuki Sawano", filePath: "songs/9.mp3", coverPath: "covers/8.jpg"}
]


songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

function changePlayButtonToPause() {
  masterPlay.classList.remove('fa-solid', 'fa-play');
  masterPlay.classList.add('fa-solid', 'fa-pause');
}

// Function to change pause button to play button
function changePauseButtonToPlay() {
  masterPlay.classList.remove('fa-solid', 'fa-pause');
  masterPlay.classList.add('fa-solid', 'fa-play');
}

masterPlay.addEventListener('click', () => {
  if (audioELement.paused || audioELement.currentTime <= 0) {
    audioELement.play();
    changePlayButtonToPause();
    gif.style.opacity = 1;
    // Update the play icon of the currently playing song
    const songItemPlays = document.querySelectorAll('.songItemPlay');
    for (let i = 0; i < songItemPlays.length; i++) {
      if (i === songIndex) {
        songItemPlays[i].classList.remove('fa-play');
        songItemPlays[i].classList.add('fa-pause');
      }
    }
  } else {
    audioELement.pause();
    changePauseButtonToPlay();
    gif.style.opacity = 0;
    // Update the pause icon of the currently playing song
    const songItemPlays = document.querySelectorAll('.songItemPlay');
    for (let i = 0; i < songItemPlays.length; i++) {
      if (i === songIndex) {
        songItemPlays[i].classList.remove('fa-pause');
        songItemPlays[i].classList.add('fa-play');
      }
    }
  }
});



//Listen to Event
audioELement.addEventListener('timeupdate', ()=> {
    //Update seekbar
    progress = parseInt((audioELement.currentTime/audioELement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioELement.currentTime = (myProgressBar.value * audioELement.duration)/100;

})

const makeAllPlays = (currentSongIndex) => {
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, i) => {
    if (i !== currentSongIndex) {
      element.classList.remove('fa-solid', 'fa-pause');
      element.classList.add('fa-solid', 'fa-play');
    }
  });
};



Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
  element.addEventListener('click', (e) => {
    songIndex = parseInt(e.target.id);

    // Toggle play and pause icons using classList.contains()
    if (e.target.classList.contains('fa-play')) {
      e.target.classList.remove('fa-play');
      e.target.classList.add('fa-pause');
      masterPlay.classList.remove('fa-play');
      masterPlay.classList.add('fa-pause');
      audioELement.src = `songs/${songIndex + 1}.mp3`;
      audioELement.currentTime = 0;
      audioELement.play();
      gif.style.opacity = 1;
      masterSongName.innerText = songs[songIndex].songName;
    } 
    else if (e.target.classList.contains('fa-pause')) {
      e.target.classList.remove('fa-pause');
      e.target.classList.add('fa-play');
      masterPlay.classList.remove('fa-pause');
      masterPlay.classList.add('fa-play');
      audioELement.pause();
      gif.style.opacity = 0;
    }

    makeAllPlays(songIndex);
  });
});




document.getElementById('next').addEventListener('click', ()=> {
    if(songIndex>=9){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    masterSongName.innerText = songs[songIndex].songName;
    audioELement.src = `songs/${songIndex+1}.mp3`;
    audioELement.currentTime = 0;
    audioELement.play();
    masterPlay.classList.remove('fa-solid', 'fa-play');
    masterPlay.classList.add('fa-solid', 'fa-pause'); 

})

document.getElementById('previous').addEventListener('click', ()=> {
    if(songIndex<=0){
        songIndex = 9;
    }
    else{
        songIndex -= 1;
    }
    audioELement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioELement.currentTime = 0;
    audioELement.play();
    masterPlay.classList.remove('fa-solid', 'fa-play');
    masterPlay.classList.add('fa-solid', 'fa-pause'); 

})









