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
function startRecording()
{
    // call to getUserMedia
    console.log('click');
    audioContext = new AudioContext;
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream){
    gumStream = stream
    input = audioContext.createMediaStreamSource(stream)
    input.connect(audioContext.destination);
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
function createPost(name,user,audio){
}

function loadAsRecentRecording(blob, encoding) {
    try {
        clearElement('recentRecording');
        url = URL.createObjectURL(blob);
        var recentRecording = document.getElementById("recentRecording")
        var au = document.createElement('audio');au.controls = true;au.src = url;
        var inputText = document.createElement('input');inputText.setAttribute("type","text");
        inputText.placeholder = "Enter your name here ";
        inputText.id = "userName";
        var submitButton = document.createElement('button')
        submitButton.setAttribute("onclick","uploadRecentRecordingToServer()")
        submitButton.innerHTML = "Upload"
        recentRecording.appendChild(au);recentRecording.appendChild(inputText);recentRecording.appendChild(submitButton);
        recordButton.disabled = false
        recordButton.innerHTML = "record"
    } catch (error) {
        console.log(error)
    }
    
}
function clearElement(element)
{
    var temp = document.getElementById(element)
    while (temp.firstChild) {
        temp.removeChild(temp.lastChild);
      }
    
}
function updatePage(pageNumber)
{
    console.log(pageNumber);
    document.getElementsByClassName("active")[0].classList.remove("active");
    document.getElementById(`page${pageNumber}`).classList.add("active");
    fetch('/update/page',{
        method:"POST",
        headers:{ 
            'pageNumber' : pageNumber
        }
    })
    .then(respnce => {
        clearElement('page');
        var arr = respnce.json().then(
            function(value){
                console.log(value);
                var page = document.getElementById('page');
                for(const item of value)
                {
                    const itemarr = item.split("_");
                    var date = new Date();
                    date.setTime((itemarr.slice(-1)));
                    //console.log(date.toISOString());
                    page.insertAdjacentHTML('beforeend',`<div class=audioPost>
                    <p>${itemarr[0]}</p><small>${date.toISOString()}
                        <audio controls>
                        <source src="res\\${item}.mp3" type="audio/mp3">
                        Your browser does not support the audio element.
                        </audio>
                    </div>`);
                };
            }
        );
       
    }).catch(err => console.log(err));
}
function test()
{
    document.getElementById("error").innerHTML+="hi";
}
function uploadRecentRecordingToServer()
{
    var userName =document.getElementById("userName");
    if(userName.value == '')
    {
        alert('Please enter name to upload !');return;
    }
    console.log("file upload started")
    var date = new Date();
    info_string = `${userName.value}_${date.getTime()}`;
    var formData = new FormData();
    console.log("filename is "+info_string);
    formData.append('recentRecording',recentBlob,info_string);
    fetch ('/upload/', {
        method:"POST",
        body: formData
    })
    .then(function(respnce){
        clearElement("recentRecording");
        updatePage(1);
    })
    .catch(err => console.log(err));
    /*
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST",'/upload',false);xhttp.send(blob);
    xhttp.onload = function() {
        console.log("file uploaded")
    }
    */ 
}