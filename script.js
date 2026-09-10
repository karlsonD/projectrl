const envelope = document.getElementById('envelope');
const confirm = document.getElementById('confirm');
const index = document.getElementById('index');
const particlesContainer = document.getElementById('particles');

const videoPage = document.getElementById('video-page');
const outroVideo = document.getElementById('outro-video');
let letterTimer = null;

envelope.addEventListener('click', () => {
  envelope.style.display = 'none';
  confirm.classList.add('visible');

  const music = document.getElementById('bg-music');
  music.volume = 0.35;
  music.currentTime = 113;   // 1:52 in seconds (1*60 + 52)
  music.play();
});

document.getElementById('confirm-yes').addEventListener('click', () => {
  confirm.classList.remove('visible');
  index.classList.add('visible');
 startLetterTimer();

  const music = document.getElementById('bg-music');
  music.volume = 0.35;   // 0 = silent, 1 = full volume — 0.3–0.4 is a good quiet background level
  music.play();
});

document.getElementById('confirm-no').addEventListener('click', () => {
  confirm.classList.remove('visible');
  envelope.style.display = 'block';

  const music = document.getElementById('bg-music');
  music.pause();
  music.currentTime = 0;
});
                                                                                       
document.getElementById('back-btn').addEventListener('click', () => {
  index.classList.remove('visible');
  envelope.style.display = 'block';

  const music = document.getElementById('bg-music');
  music.pause();
  music.currentTime = 112;
});

const muteBtn = document.getElementById('mute-btn');
let muted = false;

muteBtn.addEventListener('click', () => {
  const music = document.getElementById('bg-music');
  muted = !muted;
  music.muted = muted;
  muteBtn.innerHTML = muted ? '<span>&#128263;</span>' : '<span>&#128266;</span>';
});

function createParticle(){
  const heart = document.createElement('div');
  heart.classList.add('particle');
  heart.textContent = '♥';

  const startX = Math.random() * 100;
  const drift = (Math.random() - 0.5) * 200;
  const duration = 6 + Math.random() * 6;

  heart.style.left = startX + 'vw';
  heart.style.setProperty('--drift', drift + 'px');
  heart.style.animationDuration = duration + 's';

  particlesContainer.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}

setInterval(createParticle, 400);

function startLetterTimer(){
  clearTimeout(letterTimer);
  letterTimer = setTimeout(goToVideo, 180000); // 3 minutes
}

function cancelLetterTimer(){
  clearTimeout(letterTimer);
  letterTimer = null;
}

function goToVideo(){
  cancelLetterTimer();
  index.classList.add('fading-out');

  setTimeout(() => {
    index.classList.remove('visible', 'fading-out');
    videoPage.classList.add('visible');
    outroVideo.currentTime = 0;
    outroVideo.play();
  }, 800); // matches the 0.8s fade transition
}

document.getElementById('next-to-video').addEventListener('click', () => {
  goToVideo();
});

document.getElementById('video-back-btn').addEventListener('click', () => {
  outroVideo.pause();
  videoPage.classList.remove('visible');
  index.classList.add('visible');
  startLetterTimer();
});