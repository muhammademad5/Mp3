const ad = document.querySelector('.song');
const playing = document.querySelector('.fa-play');
const pauses = document.querySelector('.fa-pause');
const forw = document.querySelector('.fa-forward-step');
const ttl = document.querySelector('.title');
const art_img = document.querySelector('#artist');
const art_name = document.querySelector('#name');
const playSong = document.querySelector('#playsong');
const ProgressEvent = document.querySelector('.line'); 

const artist_name = ['muhammad emad', 'ahmad khaled', 'muhammad ali'];
const artist_title = ['Gods plan', 'The last day', 'The last night'];

playSong.addEventListener('click', effect);

function effect() {
    if (ad.duration === ad.currentTime) {
        x += 1;
        console.log(x);
    }

    if (!playing.classList.contains('none')) {
        ad.play();
        setInterval(Prog, 1000); 
        setInterval(line, 1000); 
        ProgressEvent.addEventListener('click', (e) => {
            const widthbar2 = (e.offsetX / e.target.clientWidth) * ad.duration; 
            ad.currentTime = widthbar2;
        });
    } 
    else {
        ad.pause();
    }

    ttl.classList.toggle('run'); 
    playing.classList.toggle('none');
    pauses.classList.toggle('none');
    art_img.classList.toggle('round');
    dur();
}

function removeEffect() {
    ad.pause();
    ad.currentTime = 0.01; 
    ttl.classList.remove('run');
    playing.classList.remove('none');
    pauses.classList.add('none');
    art_img.classList.remove('round');
}

var x = 0;

function backward() {
    dur(); 
    x -= 1;
    if (x < 0) { 
        x = artist_name.length - 1;
    }
    removeEffect();
    songs(x);
}

function forward() {
    dur(); 
    x += 1;
    if (x >= artist_name.length) { 
        x = 0;
    }
    removeEffect();
    songs(x);
}

function songs(x) {
    art_name.innerHTML = artist_name[x];
    ttl.innerHTML = artist_title[x];
    art_img.src = `assets/${x}.jpg`;
    ad.src = `assets/${x}.mp3`;
}

songs(0);

const lines = document.querySelector('.lineChild');
const progress = document.querySelector('.line');
const strt = document.querySelector('#start');
const end = document.querySelector('#end');

function dur() {
    const dura = ad.duration || 0; 
    const secdu = Math.floor(dura % 60);
    const mindu = Math.floor(dura / 60);
    end.innerHTML = `${mindu}:${secdu < 10 ? '0' : ''}${secdu}`;
}

function Prog() {
    const curtime = ad.currentTime || 0;
    const seccur = Math.floor(curtime % 60);
    const mincur = Math.floor(curtime / 60);
    strt.innerHTML = `${mincur}:${seccur < 10 ? '0' : ''}${seccur}`;
}

function line() {
    const widthbar = (ad.currentTime / ad.duration) * 100 || 0; 
    lines.style.width = `${widthbar}%`;
}
