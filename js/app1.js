const ad = document.querySelector('.song');
const playing = document.querySelector('.fa-play');
const pauses = document.querySelector('.fa-pause');
const forw = document.querySelector('.fa-forward-step');
const ttl = document.querySelector('.title');
const art_img = document.querySelector('#artist');
const art_name = document.querySelector('#name');
const $playButton = document.querySelector('#playsong');
const ProgressEvent = document.querySelector('.line'); 
const lines = document.querySelector('.lineChild');
const progress = document.querySelector('.line');
const strt = document.querySelector('#start');
const end = document.querySelector('#end');

const artist_name = ['نجيب محفوظ', 'نجيب محفوظ', 'نجيب محفوظ', 'نجيب محفوظ'];
const artist_title = ['00. العنوان', '001. مقدمة', '002. الفصل الأول الجزء الأول', '003. الفصل الأول الجزء الثاني'];

ProgressEvent.addEventListener('click', (e) => {
    const widthbar2 = (e.offsetX / e.target.clientWidth) * ad.duration; 
    ad.currentTime = widthbar2;
    updateProgress();
    updateTimer();
});

$playButton.addEventListener('click', playSong);

function playSong() {
    let lineInterval = null
    let progInterval = null

    if (ad.duration === ad.currentTime) {
        x += 1;
        console.log(x);
    }

    if (!playing.classList.contains('none')) {
        ad.play();
        lineInterval = setInterval(updateProgress, 1000);
        progInterval = setInterval(updateTimer, 1000); 
    } 
    else {
        clearInterval(lineInterval);
        clearInterval(progInterval);
        ad.pause();
    }

    ttl.classList.toggle('run'); 
    playing.classList.toggle('none');
    pauses.classList.toggle('none');
    art_img.classList.toggle('round--pause');
    displaySongDuration();
}

function removeEffect() {
    ad.pause();
    ad.currentTime = 0.01; 
    ttl.classList.remove('run');
    playing.classList.remove('none');
    pauses.classList.add('none');
    art_img.classList.remove('round--pause');
}

var x = 0;

function backward() {
    x -= 1;
    if (x < 0) { 
        x = artist_name.length - 1;
    }
    removeEffect();
    setSong(x);
}

function forward() {
    x += 1;
    if (x >= artist_name.length) { 
        x = 0;
    }
    removeEffect();
    setSong(x);
}

function setSong(x) {
    art_name.innerHTML = artist_name[x];
    ttl.innerHTML = artist_title[x];
    /*const extensions = ['jpg', 'jpeg', 'png'];*/
    art_img.src = `assets/${x}.jpg`;
    ad.src = `assets/${x}.mp3`;
    ad.addEventListener('loadedmetadata', displaySongDuration);
}

setSong(0);

function displaySongDuration() {
    const duration = ad.duration || 0; 
    console.log(ad.duration)
    const seconds = Math.floor(duration % 60);
    const minutes = Math.floor(duration / 60);
    end.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function updateTimer() {
    const curtime = ad.currentTime || 0;
    const seccur = Math.floor(curtime % 60);
    const mincur = Math.floor(curtime / 60);
    strt.innerHTML = `${mincur}:${seccur < 10 ? '0' : ''}${seccur}`;
}

function updateProgress() {
    const widthbar = (ad.currentTime / ad.duration) * 100 || 0; 
    lines.style.width = `${widthbar}%`;
}
