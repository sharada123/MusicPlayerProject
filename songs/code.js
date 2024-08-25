console.log('welcome to MusicMix');
//initialize the variables
let songIndex=0;
let audioElement=new Audio('songs/1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let audioStartTime=document.getElementById('audioStartTime');
let audioEndTime=document.getElementById('audioEndTime');
let masterSongName=document.getElementById('masterSongName');
let songItems=Array.from(document.getElementsByClassName('songItem'));
let gif1=document.getElementsByClassName('gif');
let songs=[
    {songName:"Nase Ekti Mi",filePath:"songs/1.mp3", coverPath:"covers/1.jpg"},
    {songName:"Kevdyach Pan",filePath:"songs/2.mp3", coverPath:"covers/2.jpg"},
    {songName:"Aise Na Mujhe Tum Dekho",filePath:"songs/3.mp3", coverPath:"covers/3.jpg"},
    {songName:"Kaise Tujhse Dil Na Lagaye",filePath:"songs/4.mp3", coverPath:"covers/4.jpg"},
    {songName:"Nase Ekti mi",filePath:"songs/5.mp3", coverPath:"covers/5.jpg"},
    {songName:"Khairiyat Pucho",filePath:"songs/6.mp3", coverPath:"covers/6.jpg"},
    {songName:"Pal Ek Pal ",filePath:"songs/7.mp3", coverPath:"covers/7.jpg"},
    {songName:"Tere Liye-Veer Jara",filePath:"songs/8.mp3", coverPath:"covers/8.jpg"},
    {songName:"Mere Haat Mein Tere Hath Ho",filePath:"songs/9.mp3", coverPath:"covers/9.jpg"},
    {songName:"Dil Meri Na Sune-Genius",filePath:"songs/10.mp3", coverPath:"covers/10.jpg"},
    {songName:"Tu Hai To Mujhe Phir Aur Kya Chahiye",filePath:"songs/11.mp3", coverPath:"covers/6.jpg"},
    {songName:"Kevdyach Pan ",filePath:"songs/12.mp3", coverPath:"covers/7.jpg"},
    {songName:"Tere Samane Aa Jaane Se",filePath:"songs/13.mp3", coverPath:"covers/8.jpg"},
    {songName:"Kasariya ",filePath:"songs/14.mp3", coverPath:"covers/9.jpg"},
    {songName:"Nase Ekti Mi",filePath:"songs/15.mp3", coverPath:"covers/10.jpg"},
    {songName:"Khairiyat Pucho",filePath:"songs/2.mp3", coverPath:"covers/10.jpg"},
]
songItems.forEach((element,i)=>{
    //console.log(element,i);
    element.getElementsByTagName('img')[0].src=songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText=songs[i].songName;
})



//handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
       
        audioElement.play();
        
        audioEndTime.innerHTML=formatTime(audioElement.duration);
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
        document.getElementsByClassName('gif')[songIndex].style.opacity = 1;
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
            element.classList.remove('fa-circle-play');
            element.classList.add('fa-circle-pause');

        })
    }
    else{
        
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
        document.getElementsByClassName('gif')[songIndex].style.opacity = 0;
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
            element.classList.remove('fa-circle-pause');
            element.classList.add('fa-circle-play');

        })
    }
})


// Time format function 

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
//listean to events
audioElement.addEventListener('timeupdate',()=>{
    //console.log('timeupdate');
    //update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    //console.log(progress);
    myProgressBar.value=progress;
    audioStartTime.innerHTML=formatTime(audioElement.currentTime);
    const remainingTime=audioElement.duration-audioElement.currentTime;
    audioEndTime.innerHTML=formatTime(remainingTime);
})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
    
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
    Array.from(document.getElementsByClassName('gif')).forEach((gif) => {
        gif.style.opacity = 0;
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        const clickedSongIndex = parseInt(e.target.id);
        if (audioElement.paused || songIndex !== clickedSongIndex) {
            makeAllPlays();
            
            songIndex = clickedSongIndex;
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = `songs/${songIndex + 1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            document.getElementsByClassName('gif')[songIndex].style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        } else {
            // If the song is already playing, pause it and update UI accordingly
            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            gif.style.opacity = 0;
            document.getElementsByClassName('gif')[songIndex].style.opacity = 0;
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
        }
    });
});
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=15){
        songIndex=0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    document.getElementsByClassName('gif')[songIndex].style.opacity = 0;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    document.getElementsByClassName('gif')[songIndex].style.opacity = 0;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

