// LOAD ALL THE MATERIAL JS 
import {MDCRipple} from '@material/ripple/index';
document.querySelectorAll('.mdc-button').forEach
(
    function (mdc_button)
    {
        let ripple = new MDCRipple(mdc_button);
    }
);
import {MDCTextField} from '@material/textfield';
document.querySelectorAll('.mdc-text-field').forEach
(
    function (mdc_textfield)
    {
        let line_ripple = new MDCTextField(mdc_textfield);
    }
);
import {MDCFloatingLabel} from '@material/floating-label';
document.querySelectorAll('.mdc-floating-label').forEach(
    function (mdc_floatinglabel)
    {
        let floating_label = new MDCFloatingLabel(mdc_floatinglabel);
    }
);

import {MDCTextFieldIcon} from '@material/textfield/icon';
document.querySelectorAll('.mdc-text-field__icon').forEach(
    function (mdc_text_field__icon)
    {
        let icon = new MDCTextFieldIcon(mdc_text_field__icon);
    }
)
document.querySelectorAll('#password_visibility').forEach(
    function(field)
    {
        let ripple = new MDCRipple(field);
        ripple.unbounded=true;
    }
)


/// recorder BITS  AND PEICES

var record_state = " <span class=\"mdc-button__ripple\"></span>record";
var recording_state = "<span class=\"mdc-button__ripple\"></span>recording..."
var processing_state = "<span class=\"mdc-button__ripple\"></span>processing..."

var gumStream; //GetUserMedia() stream
var recorder; //WebAudioRecorder object 
//MediaStreamAudioSourceNode we'll be recording var encodingType; 
var encodingType;
var input;
// when to encode 
var encodeAfterRecord = true;
//new audio context to help us record 
var audioContext = new AudioContext;
// recentRecording blob
var recentBlob;
// recentRecording info
var info_string;
var constraints =
{
audio : true,
video : false
}
var recording_button = document.getElementById("record");
recording_button.addEventListener("click",onRecordButtonClick);
var upload_button = document.getElementById("upload"); 
upload_button.addEventListener("click",uploadRecentRecordingToServer);
function startRecording()
{
    // call to getUserMedia
    console.log('click');
    audioContext = new AudioContext;
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream){
    gumStream = stream
    input = audioContext.createMediaStreamSource(stream)
    //input.connect(audioContext.destination);
    encodingType = "mp3";
    recorder = new WebAudioRecorder(input, {
        workerDir: "./js/",
        encoding: encodingType,
        onEncoderLoading: function(recorder, encoding) {
            // show "loading encoder..." display 
            console.log("Loading " + encoding + " encoder...");
        },
        onEncoderLoaded: function(recorder, encoding) {
            // hide "loading encoder..." display
            console.log(encoding + " encoder loaded");
        }
    });
    recorder.onComplete = function(recorder, blob) { 
        console.log("Encoding complete");
        recentBlob = blob;
        loadAsRecentRecording(blob,recorder.encoding);
    }
    recorder.setOptions(
        {
            timeLimit: 120,
            encodeAfterRecord : encodeAfterRecord,
            mp3: {
                bitRate: 160
            }
        }
    )
    recorder.startRecording();
    console.log("Recording started");
    recording_button.innerHTML = recording_state;
}).catch(function(err){
    console.log(err)
    recording_button.innerHTML = record_state;
});

}
function onRecordButtonClick()
{
    var recordButton = document.getElementById("record")
    console.log(recordButton.innerHTML)
    if(recordButton.innerHTML == record_state)
    {
        startRecording();
    }
    else{
         //stop microphone access 
        gumStream.getAudioTracks()[0].stop();
        //tell the recorder to finish the recording (stop recording + encode the recorded audio) 
        recorder.finishRecording();
        console.log("finished recording.")
        recordButton.disabled = true
        recordButton.innerHTML = processing_state;
    }
}  
function loadAsRecentRecording(blob, encoding) {
    try {
        var recordButton = document.getElementById('record');
        var uploadButton = document.getElementById('upload');
        clearAudioHolder();
        var date = new Date();
        var url = URL.createObjectURL(blob);
        fetch('/username',{
            method: 'GET',
        }).then((response) => response.text())
        .then((text) => {
            createAudioElement('title',url,text,date.toISOString());
            recordButton.disabled = false;
            uploadButton.disabled = false;
            recordButton.innerHTML = record_state;
        });
    } catch (error) {
        console.log(error)
    }
    
}
function clearAudioHolder()
{
    const audioHolderList = document.querySelector('.audio-holder-list');
    audioHolderList.innerHTML = ''
}
function clearElement(element)
{
    var temp = document.getElementById(element)
    while (temp.firstChild) {
        temp.removeChild(temp.lastChild);
      }
    
}
function uploadRecentRecordingToServer()
{
    console.log("file upload started");
    var audioTitleField = document.querySelector('.audio-title');
    var date = new Date();
    var timestamp = date.getTime();
    fetch('/username',{
        method: 'GET',
    }).then((response) => response.text())
    .then((text) => {
        info_string = `${text}_${timestamp}`;
        var formData = new FormData();
        console.log("filename is "+info_string);
        formData.append('recentRecording',recentBlob,info_string);
        fetch ('/upload/', {
            method:"POST",
            headers : {
                'Title': audioTitleField.value,
                'Timestamp': timestamp,
                'replyTo' : null
            },
            body: formData
        })
        .then(function(respnce){
            self.location="feed.html";
        })
        .catch(err => console.log(err));
    });
    
    /*
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST",'/upload',false);xhttp.send(blob);
    xhttp.onload = function() {
        console.log("file uploaded")
    }
    */ 
}
function createAudioElement(title,name, user, timestamp) {
    // create new HTML elements
    const audioHolderList = document.querySelector('.audio-holder-list');
    const audioHolderNew = document.createElement('div');
    const audioPlayer = document.createElement('div');
    const audio = document.createElement('audio');
    const source = document.createElement('source');
    const audioDetails = document.createElement('div');
    const audioTitle = document.createElement('input');
    const audioUser = document.createElement('p');
    const audioTimestamp = document.createElement('p');
    const audioInteraction = document.createElement('div');
    const shareButton = document.createElement('button');
    const forumButton = document.createElement('button');
    // set attributes and text content
    audioHolderNew.className = 'audio-holder-new';
    audioPlayer.className = 'audio-player';
    audioDetails.className = 'audio-details';
    audio.controls = true;
    audio.controlsList = 'noplaybackrate nodownload';
    audio.style.margin = '5px';
    audio.style.width = '99%';
    source.src = name;
    source.type = 'audio/mp3';
    audioTitle.className = 'audio-title';
    audioTitle.type = 'text';
    audioTitle.hint = title;
    audioUser.className = 'audio-user';
    audioUser.textContent = user;
    audioTimestamp.className = 'audio-timestamp';
    audioTimestamp.textContent = timestamp;
    audioInteraction.className = 'audio-interaction';
    shareButton.className = 'material-icons mdc-icon-button';
    shareButton.title = 'Share';
    shareButton.innerHTML = '<div class="mdc-icon-button__ripple"></div>favorite';
    forumButton.className = 'material-icons mdc-icon-button';
    forumButton.title = 'Share';
    forumButton.innerHTML = '<div class="mdc-icon-button__ripple"></div>forum';
  
    // append elements to parent nodes
    audioPlayer.appendChild(audio);
    audio.appendChild(source);
    audioHolderNew.appendChild(audioPlayer);
    audioDetails.appendChild(audioTitle);
    audioDetails.appendChild(audioUser);
    audioDetails.appendChild(audioTimestamp);
    audioHolderNew.appendChild(audioDetails);
    audioInteraction.appendChild(shareButton);
    audioInteraction.appendChild(forumButton);
    audioHolderNew.appendChild(audioInteraction);
    audioHolderList.appendChild(audioHolderNew);
}