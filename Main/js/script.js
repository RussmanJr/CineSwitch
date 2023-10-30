// Function to fetch the video list
function getVideoList() {
    return fetch('get_video_list.php')
        .then((response) => response.json())
        .catch((error) => {
            console.error('Error fetching video list:', error);
        });
}

// Function to create the playlist with video file names (without extensions)
function createPlaylist(videoList) {
    const playlist = document.getElementById('video-playlist');
    playlist.innerHTML = ''; // Clear the playlist

    videoList.forEach((videoFileName) => {
        // Remove the file extension (e.g., .mp4) from the video file name
        const videoNameWithoutExtension = videoFileName.replace(/\..+$/, '');

        const listItem = document.createElement('li');
        listItem.textContent = videoNameWithoutExtension; // Display the name without the extension
        listItem.className = 'list-group-item';
        listItem.onclick = () => loadVideo(videoFileName); // Add click event to load and play video

        playlist.appendChild(listItem);
    });

    // Load the first video without playing it
    if (videoList.length > 0) {
        loadVideo(videoList[0], false);
    }
}

// Function to load and play the selected video
function loadVideo(videoFileName, autoPlay = true) {
    const videoPlayer = videojs('video-player');
    videoPlayer.src(`videos/${videoFileName}`); // Update the video source with the 'videos' directory
    videoPlayer.load();

    if (autoPlay) {
        videoPlayer.play(); // Play the video automatically if autoPlay is true
    }
}

// Fetch the video list and create the playlist
getVideoList()
    .then((videoList) => createPlaylist(videoList))
    .catch((error) => {
        console.error('Error creating playlist:', error);
    });

    