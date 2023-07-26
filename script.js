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

//Handle play/pause click
masterPlay.addEventListener('click', () => {
  if (audioELement.paused || audioELement.currentTime <= 0) {
    audioELement.play();
    changePlayButtonToPause();
    gif.style.opacity = 1;
  } else {
    audioELement.pause();
    changePauseButtonToPlay();
    gif.style.opacity = 0;
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

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-solid', 'fa-pause');
        element.classList.add('fa-solid', 'fa-play');
    })
}

/*Here, we are converting all the elements with the class name "songItemPlay" into an array using Array.from().
This allows us to loop through these elements using the
forEach() method to attach an event listener to each of them.
Using Array.from() in these cases allows the program to work with the DOM elements conveniently as arrays,
making it easier to perform operations on them using array methods.*/
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) =>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);

        //e.target: This refers to the element that triggered the click event, 
        //in this case, the element that was clicked.
        e.target.classList.remove('fa-solid', 'fa-play');
        e.target.classList.add('fa-solid', 'fa-pause');
        masterSongName.innerText = songs[songIndex].songName;
        audioELement.src = `songs/${songIndex+1}.mp3`;
        gif.style.opacity = 1;
        audioELement.currentTime = 0;
        audioELement.play();
    masterPlay.classList.remove('fa-solid', 'fa-play');
    masterPlay.classList.add('fa-solid', 'fa-pause'); 

    })
})
/* */


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




