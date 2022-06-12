// Some Variables
const music = document.querySelector(".music");
const volume = document.querySelector(".volume");
const musicController = document.querySelector(".musicController");
const input = musicController.querySelectorAll("input");
const seekBar = document.querySelector('.seekBar');
let audio;
let seekBarValue;
let currentPlayingMusic = true;
let musicIndex = 0;

for (let i of input) {
    i.setAttribute('disabled', "")
}

//  Creating Element On HTML by Fetch the music json file

// Fetching File Using Async Await Function;

async function fetchMusic() {
    const data = await fetch("index.json");
    const mainData = await data.json()

    createElement(mainData);
    playMusic()
}

// This Function Create element on html document according to music length
function createElement(value) {
    for (let i of value) {
        const musicElementParent = document.createElement("div");
        const titleElem = document.createElement("p");
        titleElem.innerHTML = i.title;
        musicElementParent.append(titleElem)
        musicElementParent.classList.add("musicElemContainer");
        const musicElement = document.createElement("audio");
        musicElement.setAttribute("src", i.music)
        musicElementParent.appendChild(musicElement)
        music.appendChild(musicElementParent);
        audio = document.querySelectorAll("audio")

    }
    updateSeekBar(audio)
    increaseDuration(audio);

}

fetchMusic()

// For Play Music
function playMusic() {
    currentPlayingMusic = false;
    const musicContainer = document.querySelectorAll(".musicElemContainer");
    musicContainer.forEach((val, index) => {
        val.addEventListener('click', () => {
            musicIndex = index;
            playPause.src = "./Images/pause.png";
            for (let i of audio) {
                i.pause()
            }
            for (let i of input) {
                i.removeAttribute("disabled", "")
            }
            play(val)
        })

    })
}


function play(val) {
    val.childNodes[1].play();
    val.childNodes[1].currentTime = 0;
    musicTitle.innerHTML = "Current Playing: " + val.childNodes[0].innerText;
    playPause.classList.add("play")
}
  // For Play And Pause The Music
  playPause.addEventListener("click", () => {
    if(currentPlayingMusic != true){
       
        for (let i of audio) {
            i.pause()
        }
        playPause.src = "./Images/play.png";
        playPause.classList.add("play");
        currentPlayingMusic = true
        
    }
    else{
        for (let i of input) {
            i.removeAttribute("disabled", "")
        }
        const musicElemContainer = document.querySelectorAll(".musicElemContainer")
        musicElemContainer[musicIndex].childNodes[1].play()
        playPause.src = "./Images/pause.png";
        currentPlayingMusic = false;
        musicTitle.innerHTML = "Current Playing: " + musicElemContainer[musicIndex].childNodes[0].innerText;
    }
   
})

// For Previous Music Play
previous.addEventListener("click", () => {
   
    const musicElemContainer = document.querySelectorAll(".musicElemContainer")
    for(let i of audio){
        i.pause()
    }
    if(musicIndex > 0){
     musicIndex--;
    musicElemContainer[musicIndex].childNodes[1].play()
    musicElemContainer[musicIndex].childNodes[1].currentTime = 0
    }
    else{
        musicIndex = musicElemContainer.length -1;
        console.log(musicElemContainer.length)
        musicElemContainer[musicIndex].childNodes[1].play()
    }
    musicTitle.innerHTML = "Current Playing: " + musicElemContainer[musicIndex].childNodes[0].innerText;
    
})

// For Next Music Play
next.addEventListener("click", () => {
   
    const musicElemContainer = document.querySelectorAll(".musicElemContainer")
    for(let i of audio){
        i.pause();
    }
    if(musicIndex == musicElemContainer.length - 1){
     musicIndex = 0;
    musicElemContainer[musicIndex].childNodes[1].play()
   
    }
    else{
        musicIndex++;
        // musicIndex = musicElemContainer.length;
        musicElemContainer[musicIndex].childNodes[1].play();
        musicElemContainer[musicIndex].childNodes[1].currentTime = 0
    }
    musicTitle.innerHTML = "Current Playing: " + musicElemContainer[musicIndex].childNodes[0].innerText;
    
})

// Volume Control

volume.addEventListener("input", () => {
    for (let i of audio) {
        i.volume = volume.value;
    }
})

// Update Seek Bar When Music Is Playing
function updateSeekBar(val) {
    for (let i of val) {
        i.addEventListener("timeupdate", () => {
            const currentMusicTime = i.currentTime / i.duration * 100;
            seekBar.value = currentMusicTime;

            seekBarValue = currentMusicTime;
        })
    }
}
// When Music End Play Another Music



// If user want to increase the music duration

function increaseDuration(value) {
    seekBar.addEventListener("input", () => {
        for (let i of value) {
            i.currentTime = seekBar.value * i.duration / 100;

        }
    })
}   


//  Animation
const animation = document.querySelector(".animation");
for(let i = 0; i <= 20; i++){
    const img = document.createElement('img');
    img.classList.add("animationImg")
    img.src = './Images/heart.png'
    animation.appendChild(img);
}

function animationHeart(){
    const animationImg = document.querySelectorAll(".animationImg");
    console.log("run")
    let randomImg = Math.floor(Math.random() * 20);
    animationImg[randomImg].classList.add("animateHeart");
    setInterval(()=>{
        animationImg[randomImg].classList.remove("animateHeart");
    }, 3000)
    }
setInterval('animationHeart()', 800)