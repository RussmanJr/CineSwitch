// JavaScript to handle video viewing modes
document.getElementById("small-view").addEventListener("click", function () {
    // Set a smaller size for the video player
    document.querySelector(".video-container").style.maxWidth = "400px";
});

document.getElementById("theater-mode").addEventListener("click", function () {
    // Set a larger size for the video player (theater mode)
    document.querySelector(".video-container").style.maxWidth = "800px";
});

document.getElementById("full-screen").addEventListener("click", function () {
    const videoPlayer = document.getElementById("video-player");

    if (videoPlayer.requestFullscreen) {
        videoPlayer.requestFullscreen();
    } else if (videoPlayer.mozRequestFullScreen) { // Firefox
        videoPlayer.mozRequestFullScreen();
    } else if (videoPlayer.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        videoPlayer.webkitRequestFullscreen();
    } else if (videoPlayer.msRequestFullscreen) { // IE/Edge
        videoPlayer.msRequestFullscreen();
    }
});
