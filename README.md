Js Html5 AV Recorder
=======================

JsHtml5AVRecorder is a native html5 object that helps you record both audio and video in live streaming, simultaneously, it is a wrapper for jsHtml5AudioRecorder and jsHtml5VideoRecorder from myself.
You can record both audio and video files, convert them into one file with ffmpeg and stream the result.
Make sure you have ffmpeg correctly setup in your environment.
It will only works with Google Chrome.


1) How to install
---------------------

    bower install js-html5-av-recorder


2) How to use it?
-----------------

    //Instantiate the object
    var jsAVRecorder                    = new jsHtml5AVRecorder();

    jsAVRecorder.audioWrapper                    = jsAudioRecorder;      //jsHtml5AudioRecorder object with parameters - here https://github.com/edouardkombo/jsHtml5AudioRecorder
    jsAVRecorder.videoWrapper                    = jsVideoRecorder;      //jsHtml5VideoRecorder object with parameters - here https://github.com/edouardkombo/jsHtml5VideoRecorder
    jsAVRecorder.convertFilesTo                  = 'mp4';                //MP4 is the extension in which convert the medias
    jsAVRecorder.doConversion                    = true;                 //Apply conversion
    jsAVRecorder.streamConvertedResult           = true;                 //Show the result of the conversion
    jsAVRecorder.deleteSeparatedFiles            = true;                 //Delete audio and video files, to only keep the single file
    jsAVRecorder.mediaPath                       = '/medias/Temp/';
    jsAVRecorder.phpFile                         = '/form/convertProcess.php'; //File is included inside the repository


    //Init the object
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

        
3) Live Demonstration
---------------------

http://edouardkombo.github.io/jsHtml5AVRecorder/demo/
    

Contributing
-------------

If you do contribute, please make sure it conforms to the PSR coding standard. The easiest way to contribute is to work on a checkout of the repository, or your own fork, rather than an installed version.

Want to learn more? Visit my blog http://creativcoders.wordpress.com


Issues
------

Bug reports and feature requests can be submitted on the [Github issues tracker](https://github.com/edouardkombo/jsHtml5AVRecorder/issues).

For further informations, contact me directly at edouard.kombo@gmail.com.
