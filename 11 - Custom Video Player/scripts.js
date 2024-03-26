/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');

// functions

function togglePlay() {
    // Method 1
    // const method = video.paused ? 'play' : 'pause';
    // video[method]();

    // Method 2
    if (video.paused) {
        video.play()
    } else {
        video.pause()
    }
}

function updateButton() {
    const icon = this.paused ? "⏵︎" : "⏸︎";
    toggle.innerHTML = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip) 
}

function handleRangeUpdate() {
    video[this.name] = this.value
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = percent + "%";
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function fullscreenToggle(e) {
    player.classList.toggle('fullscreen')
    if (document.fullscreenElement) {
        document.exitFullscreen()
    }
    player.requestFullscreen();
}

// Listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

skipButtons.forEach(button => button.addEventListener("click", skip));
ranges.forEach(range => range.addEventListener("input", handleRangeUpdate));
toggle.addEventListener("click", togglePlay);

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e)=> mousedown && scrub(e));
progress.addEventListener("mousedown", ()=>mousedown = true);
progress.addEventListener("mouseup", ()=>mousedown = false);
progress.addEventListener("mouseout", ()=>mousedown = false);

fullscreen.addEventListener("click", fullscreenToggle);