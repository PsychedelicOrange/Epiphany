// Material JS
import {MDCMenu} from '@material/menu';
import {MDCMenuSurface} from '@material/menu-surface';
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
// EVENTS 
// microphone
var mic_upload_button = document.getElementById('mic');
mic_upload_button.addEventListener("click",function(){
    self.location="create.html";
});
// sort by drop down
var drop_down = document.getElementById("drop_down");
var input_field = document.getElementById("sort_by_input");
input_field.addEventListener("click",function(){
    this.blur();
    const menu = new MDCMenu(document.querySelector('.mdc-menu'));
    menu.open = true;
})
drop_down.addEventListener("click", function() {
    //console.log(document.getElementById("password_field").type)
    let input_field = document.getElementById("sort_by_input");
    input_field.blur();
    const menu = new MDCMenu(document.querySelector('.mdc-menu'));
    menu.open = true;
    console.log("elo")
});
// search bar
var search_icon = document.getElementById("search_button");
search_icon.addEventListener("click",function(){
    createAudioElement('chat gpt','Meek','Partho','just in time');
    console.log(this.innerHTML);
    if(this.innerHTML == 'search')
    {
        this.innerHTML = 'close';
    }
    else{
        this.innerHTML = 'search';
    }
});
// Hide header
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
    console.log("fired.")
  } else {
    document.getElementById("navbar").style.top = "-75px";
  }
  prevScrollpos = currentScrollPos;
}
// HELPER FUNCTIONS 
function createAudioElement(title,name, user, timestamp) {
    // create new HTML elements
    const audioHolderList = document.querySelector('.audio-holder-list');
    const audioHolderNew = document.createElement('div');
    const audioPlayer = document.createElement('div');
    const audio = document.createElement('audio');
    const source = document.createElement('source');
    const audioDetails = document.createElement('div');
    const audioTitle = document.createElement('p');
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
    source.src = name + '.mp3';
    source.type = 'audio/mp3';
    audioTitle.className = 'audio-title';
    audioTitle.textContent = title;
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