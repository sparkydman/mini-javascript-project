const video = document.getElementById("screen");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

const toggleVideoStatus = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};
const changePlayIcon = () => {
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
};
const stopVideoPlayer = () => {
  if (!video.paused) {
    video.currentTime = 0;
    video.pause();
  }
};
const updateVideoProgress = () => {
  progress.value = (video.currentTime / video.duration) * 100;

  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }

  timestamp.innerText = `${mins}:${secs}`;
};

const setProgressBar = () => {
  video.currentTime = (+progress.value * video.duration) / 100;
};

video.addEventListener("click", toggleVideoStatus);
video.addEventListener("play", changePlayIcon);
video.addEventListener("pause", changePlayIcon);
video.addEventListener("timeupdate", updateVideoProgress);

play.addEventListener("click", toggleVideoStatus);
stop.addEventListener("click", stopVideoPlayer);
progress.addEventListener("change", setProgressBar);
