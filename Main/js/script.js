// Function to fetch the video list
function getVideoList() {
    return fetch('get_video_list.php')
        .then((response) => response.json())
        .catch((error) => {
            console.error('Error fetching video list:', error);
        });
}

// Function to create the playlist with video file names (without extensions)
function createPlaylist(videoListSubset) {
    const playlist = document.getElementById('video-playlist');
    playlist.innerHTML = ''; // Clear the playlist

    // Check if the video list is empty
    if (videoListSubset.length === 0) {
        const message = document.createElement('li');
        message.textContent = 'No videos available at the moment.';
        message.className = 'list-group-item text-center';
        playlist.appendChild(message);
        return; // Stop further processing if no videos
    }

    videoListSubset.forEach((videoFileName) => {
        const videoNameWithoutExtension = videoFileName.replace(/\..+$/, ''); // Remove file extension
        const listItem = document.createElement('li');
        listItem.textContent = videoNameWithoutExtension;
        listItem.className = 'list-group-item';
        listItem.onclick = () => loadVideo(videoFileName); // Add click event to load and play video
        playlist.appendChild(listItem);
    });

    // Load the first video in the list by default (without autoplay)
    loadVideo(videoListSubset[0], false); // Load the first video, but don't autoplay
}

// Function to load and play the selected video with error handling and spinner
function loadVideo(videoFileName, autoPlay = true) {
    const videoPlayer = videojs('video-player');
    const loadingSpinner = document.getElementById('loading-spinner');
    loadingSpinner.style.display = 'block'; // Show loading spinner when video starts loading

    // Encode the video file name to handle special characters
    const encodedFileName = encodeURIComponent(videoFileName);

    videoPlayer.src(`videos/${encodedFileName}`); // Set video source to the correct file
    videoPlayer.load();

    // Hide the spinner when the video is loaded and ready to play
    videoPlayer.on('loadeddata', function() {
        loadingSpinner.style.display = 'none'; // Hide spinner when video is ready
    });

    // Also hide the spinner when the video starts playing
    videoPlayer.on('play', function() {
        loadingSpinner.style.display = 'none'; // Ensure spinner is hidden when video starts
    });

    // Error handling: Display a message if the video fails to load
    videoPlayer.on('error', function() {
        loadingSpinner.style.display = 'none'; // Hide spinner in case of an error
        alert('Failed to load the video. Please try another one.');
    });

    // Remove 'active' class from all playlist items
    const playlistItems = document.querySelectorAll('#video-playlist .list-group-item');
    playlistItems.forEach(item => item.classList.remove('active'));

    // Add 'active' class to the clicked item
    const selectedItem = Array.from(playlistItems).find(item => item.textContent === videoFileName.replace(/\..+$/, ''));
    if (selectedItem) {
        selectedItem.classList.add('active');
    }

    if (autoPlay) {
        videoPlayer.play(); // Automatically play the video if autoPlay is true
    }
}

// Function to handle the big play button click (first video should play)
function initializeBigPlayButton(videoList) {
    const videoPlayer = videojs('video-player');
    videoPlayer.one('play', () => {
        // Play the first video in the playlist if it's not already loaded
        if (!videoPlayer.currentSrc()) {
            loadVideo(videoList[0], true); // Auto-play the first video when the big play button is clicked
        }
    });
}

// Fetch the video list and initialize playlist
getVideoList()
    .then((videoData) => {
        videoList = videoData;
        createPlaylist(videoList); // Load initial set of videos

        // Initialize the big play button to play the first video
        initializeBigPlayButton(videoList);
    })
    .catch((error) => {
        console.error('Error creating playlist:', error);
    });
