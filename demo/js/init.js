/***************************************************
    Detect browser
***************************************************/
if((window.chrome !== null) && (window.navigator.vendor === "Google Inc.")) {
} else { 
   alert('This application will only work on Google Chrome!');
}

/***************************************************
	HTML5 Audio Recorder
***************************************************/
var jsAudioRecorder = new jsHtml5AudioRecorder();
jsAudioRecorder.Recorder            = Recorder;         //External library that effectively record audio stream
jsAudioRecorder.mediaPath           = '/medias/Temp/';  //Path where to store audio files
jsAudioRecorder.audioExtension      = 'wav';            //Only wav format is supported
jsAudioRecorder.audioTagId          = 'myAudio';
jsAudioRecorder.showStreamOnFinish  = false;            //Show audio player on finish?
jsAudioRecorder.phpFile             = '/form/audioProcess.php'; //Php file that will proceed to audio file 


/***************************************************
	HTML5 Video Recorder
***************************************************/
var jsVideoRecorder = new jsHtml5VideoRecorder();
jsVideoRecorder.whammy                      = Whammy;              //Whammy object from https://github.com/antimatter15/whammy
jsVideoRecorder.width                       = '640';               //Width of the canvas and video tag element
jsVideoRecorder.height                      = '480';               //Height of the canvas and video tag element
jsVideoRecorder.resultTagIdHost             = 'media';             //Div id where to store (the video recorded by the user)
jsVideoRecorder.resultTagId                 = 'myVideo';           //Id of the video to show to user inside the resultTagIdHost
jsVideoRecorder.videoTagIdHost              = 'media';             //Div id where to store (video and canvas html tag element)
jsVideoRecorder.videoTagId                  = 'video';             //Id of the video tag element
jsVideoRecorder.canvasTagId                 = 'canvas';            //Id of the canvas tag element
jsVideoRecorder.maxRecordTime               = 30;
jsVideoRecorder.videoExtension              = 'webm';              //Only "webm" format is supported
jsVideoRecorder.hideWebcamWhileRecording    = true;                //Hide webcam while recording, strongly improves performance
jsVideoRecorder.mediaPath                   = '/medias/Temp/';
jsVideoRecorder.phpFile                     = '/form/videoProcess.php'; //File is included inside the repository

/***************************************************
	HTML5 AV Recorder
***************************************************/
var jsAVRecorder = new jsHtml5AVRecorder();
jsAVRecorder.audioWrapper                    = jsAudioRecorder;      //jsHtml5AudioRecorder object with parameters - here https://github.com/edouardkombo/jsHtml5AudioRecorder
jsAVRecorder.videoWrapper                    = jsVideoRecorder;      //jsHtml5VideoRecorder object with parameters - here https://github.com/edouardkombo/jsHtml5VideoRecorder
jsAVRecorder.convertFilesTo                  = 'mp4';                //MP4 is the extension in which convert the medias
jsAVRecorder.doConversion                    = false;                 //Apply conversion
jsAVRecorder.streamConvertedResult           = false;                 //Show the result of the conversion
jsAVRecorder.deleteSeparatedFiles            = false;                 //Delete audio and video files, to only keep the single file
jsAVRecorder.mediaPath                       = '/medias/Temp/';
jsAVRecorder.phpFile                         = '/form/convertProcess.php'; //File is included inside the repository


jsAVRecorder.init();

function startRecording() {
    jsAVRecorder.startRecording();
}

/**
 * You can use "save", "saveAndDownload" or "saveAndStream", "downloadAndStream" parameters
 */
function stopRecording() {
    //For demo
    jsAVRecorder.stopRecording('stream');
    
    //In production
    //jsAVRecorder.stopRecording('saveAndStream');
}

