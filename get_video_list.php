<?php
$directory = __DIR__ . '/videos'; // Use the 'videos' directory as the video files directory
$videoFiles = [];

// Scan the directory for video files
$files = scandir($directory);
foreach ($files as $file) {
    // Check if the file has a supported video extension (add more extensions as needed)
    if (preg_match('/\.(mp4|webm|ogg)$/i', $file)) {
        $videoFiles[] = $file;
    }
}

// Return the list of video files as JSON
header('Content-Type: application/json');
echo json_encode($videoFiles);
