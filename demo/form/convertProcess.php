<?php
ini_set('memory_limit', '1024M');

if (isset($_POST)) {
       
    //Variables
    $path               = (string) filter_input(INPUT_GET, 'path');                 
    $audioFileName      = (string) filter_input(INPUT_GET, 'audioFileName');
    $videoFileName      = (string) filter_input(INPUT_GET, 'videoFileName');    
    $extension          = (string) filter_input(INPUT_GET, 'extension'); 
    $deleteSeparatedFiles = (string) filter_input(INPUT_GET, 'deleteSeparatedFiles');     

    
    $basePath           = (string) $_SERVER['DOCUMENT_ROOT'];

    $audio              = (string) $basePath . $audioFileName;
    $video              = (string) $basePath . $videoFileName;
    $output             = (string) str_replace('webm', $extension, $basePath . $videoFileName);
    
    $relativeOutput     = str_replace($basePath, '', $output);

    $command  = "ffmpeg -i $video -i $audio -strict experimental -map 0:0 ";
    $command .= "-map 1:0 $output";
    shell_exec($command);

    if ($deleteSeparatedFiles === 'true') {
        unlink($audio);
        unlink($video);
    }
    
    //Return media url inside media directory
    echo $relativeOutput;         
}
