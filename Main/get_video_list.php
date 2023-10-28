<?php
// Define the directory where video files are stored
$directory = __DIR__ . '/videos'; // Use the 'videos' directory as the video files directory

// Create an empty array to store video file names
$videoFiles = [];

// Scan the directory for video files
$files = scandir($directory);

// Loop through each file in the directory
foreach ($files as $file) {
    // Check if the file has a supported video extension (e.g., mp4, webm, ogg)
    if (preg_match('/\.(mp4|webm|ogg)$/i', $file)) {
        // If the file matches a supported video extension, add its name to the $videoFiles array
        $videoFiles[] = $file;
    }
}

// Return the list of video files as JSON
header('Content-Type: application/json');
echo json_encode($videoFiles);
