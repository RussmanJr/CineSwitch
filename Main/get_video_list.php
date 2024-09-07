<?php
// Define the directory where video files are stored
$directory = __DIR__ . '/videos'; // Use the 'videos' directory as the video files directory

// Create an empty array to store video file names
$videoFiles = [];

// Check if the directory is accessible
if (!is_dir($directory) || !is_readable($directory)) {
    http_response_code(500);
    echo json_encode(['error' => 'Video directory is not accessible.']);
    exit;
}

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

// Sanitize file names to prevent XSS
$sanitizedFiles = array_map('htmlspecialchars', $videoFiles);

// Return the list of video files as JSON
header('Content-Type: application/json');
echo json_encode($sanitizedFiles);
?>
