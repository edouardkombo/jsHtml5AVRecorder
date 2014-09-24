/**
 * Object:  jsHtml5AVRecorder
 * Version: master
 * Author:  Edouard Kombo
 * Twitter: @EdouardKombo
 * Github:  https://github.com/edouardkombo
 * Blog:    http://creativcoders.wordpress.com
 * Url:     https://github.com/edouardkombo/jsHtml5AVRecorder
 * 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * 
 * Record both audio and video in html5 and convert them into mp4.
 */

var jsHtml5AVRecorder = function(){};

jsHtml5AVRecorder.prototype = {
    audioWrapper: '',
    videoWrapper: '',
    convertFilesTo: '',
    phpFile: '',
    mediaPath: '',
    uniqueMedia: '',
    deleteSeparatedFiles: true,
    doConversion: '',
    streamConvertedResult: '',
    streamResult: true,
    
    /**
     * Init all objects
     * 
     * @returns {undefined}
     */
    init: function (){
        if ((this.audioWrapper !== '') && (this.videoWrapper !== ''))
        {
            this.audioWrapper.init();
            this.videoWrapper.init();
            
            //Listen to click on taken video to play simultaneously audio and video
            window.addEventListener('click', function() {
                if (this.event.target.id) {
                    if ((this.event.target.id === this.jsAVRecorder.videoWrapper.resultTagIdHost)
                       || ((this.event.target.id === this.jsAVRecorder.videoWrapper.resultTagId))) {
                        if (this.jsAVRecorder.streamResult) {
                            this.jsAVRecorder.streamAll();
                        }
                    }
                }
            }, false);                                                
        } 
    },
    
    /**
     * Start recording
     * 
     * @returns {undefined}
     */
    startRecording: function () {
        this.audioWrapper.startRecording();
        this.videoWrapper.startRecording();        
    },
    
    /**
     * Stop recording
     * 
     * @returns {undefined}
     */
    stopRecording: function (method) {
        this.audioWrapper.stopRecording(method);
        this.videoWrapper.stopRecording(method);
        
        if (this.doConversion) {
            this.prepareToConversion();
        }

    },
    
    /**
     * Check if audio and video files have been generated and do convert them
     * 
     * @returns {undefined}
     */
    prepareToConversion: function()
    {
        setTimeout(function (){
            if ((this.videoWrapper.videoLink !== '') && (this.audioWrapper.audioLink !== '')) {
                this.convert();
            }
            clearTimeout();
        }.bind(this), 1000);       
    },
    
    /**
     * Stream video and audio simultaneously
     * 
     * @returns {undefined}
     */
    streamAll: function () {
        var video = document.getElementById(this.videoWrapper.resultTagId);
        var audio = document.getElementById(this.audioWrapper.audioTagId);        
        
        if (video.paused) {            
            video.play();
            audio.play();
            console.log('Play all');
        }  else {
            video.currentTime = 0;
            audio.currentTime = 0;
                        
            video.pause();
            audio.pause();
            console.log('Pause all');
        }          
    },
        

    /**
     * Convert audio and video files in one through ffmpeg
     * 
     * @returns {undefined}
     */
    convert: function () {
        
        var datas       = 'path='+this.mediaPath+'&deleteSeparatedFiles='+this.deleteSeparatedFiles+'&audioFileName='+this.audioWrapper.audioLink+'&videoFileName='+this.videoWrapper.videoLink+'&extension='+this.convertFilesTo;                  
        console.log();
        var client = new XMLHttpRequest();
        client.onreadystatechange = function() 
        {
            if (client.readyState === 4 && client.status === 200) 
            {
                console.log(client.response);
                
                //Get unique media url
                this.uniqueMedia = client.response;
                
                if (this.streamConvertedResult) {
                    
                    this.streamResult = false;
                    
                    //Remove the previous element
                    document.getElementById(this.videoWrapper.resultTagId).remove();
                    
                    //Recreate the new element
                    var videoResult = document.createElement('video');
                    videoResult.src = this.uniqueMedia;
                    videoResult.setAttribute('autoplay', false);         
                    videoResult.setAttribute('controls', true);        
                    videoResult.id  = this.videoWrapper.resultTagId;

                    document.getElementById(this.videoWrapper.resultTagIdHost).appendChild(videoResult);

                    videoResult.pause(); 
                }                
            }
        }.bind(this);
        client.open("post", this.phpFile+'?'+datas, true);
        client.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        client.setRequestHeader("cache-Control", "no-store, no-cache, must-revalidate");
        client.setRequestHeader("cache-Control", "post-check=0, pre-check=0");
        client.setRequestHeader("cache-Control", "max-age=0");
        client.setRequestHeader("Pragma", "no-cache");            
        client.setRequestHeader("X-File-Name", encodeURIComponent('1'));
        client.setRequestHeader("Content-Type", "application/octet-stream");
        client.send();
    }    
};