// Variable
var button_show_setting = document.querySelector("#button-show-setting"),
    box_setting = document.querySelector(".settings"),
    button_play=document.querySelector(".play"),
    button_next = document.querySelector(".next"),
    button_pause = document.querySelector(".pause"),
    button_previous = document.querySelector(".previous"),
    audio = document.querySelector("#audio"),
    cover_music = document.querySelector("#cover-music"),
    author = document.querySelector("#author"),
    box_status = document.querySelector('.box-status'),
    button_volume_plus = document.querySelector(".button-plus"),
    button_volume_minus = document.querySelector(".button-minus"),
    button_volume_silent = document.querySelector(".button-silent")

var index_music = 0;
var list_music = ['1', '2'],
    list_author = ['Amir Tataloo', 'Soroush naeimi'];
// EventListener
button_show_setting.addEventListener("click", function(){
    box_setting.classList.toggle("setting");
    button_show_setting.parentElement.classList.toggle("icon-bars-rotate");
});

button_play.addEventListener('click', function(){
    audio.play();
    button_play.style.display = "none";
    button_pause.style.display = "block";
});

button_pause.addEventListener('click', function(){
    audio.pause();
    button_play.style.display = "block";
    button_pause.style.display = "none";
});

button_next.addEventListener('click', function(){
    NextMusic(index_music)
});

button_previous.addEventListener('click', function(){
    PreviousMusic(index_music)
});

box_status.addEventListener('click', function(e){
    const width = box_status.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
});

button_volume_plus.addEventListener('click', function(){
    console.log(audio.volume)
    var new_volume = audio.volume+ 0.1;
    if(new_volume > 1){
        audio.volume = 1
    }else{
        audio.volume = new_volume
    }
});

button_volume_minus.addEventListener('click', function(){
    console.log(audio.volume)
    var new_volume = audio.volume - 0.1;
    if(new_volume < 0){
        audio.volume = 0
    }else{
        audio.volume = new_volume
    }
});

button_volume_silent.addEventListener('click', function(){
    
    if (audio.volume == 0){
        audio.volume = 0.9;
    }
    else{
        audio.volume = 0;
    }
});


audio.addEventListener('ended', function(){
    NextMusic(index_music)
})

// Functions
function SetMusic(index) {
    audio.src = 'music/'+list_music[index]+'.mp3';
    cover_music.src = 'img/'+list_music[index]+'.jpg';
    author.innerHTML = list_author[index];
};


function NextMusic(index){
    
    index_music = index+1;
    
    if(index_music>list_music.length-1){
        index_music = 0;
        SetMusic(index_music);
    };

    SetMusic(index_music);
    audio.play();
};

function PreviousMusic(index){
    index_music = index-1;
    if(index_music<0){
        index_music = list_music.length-1;
    };

    SetMusic(index_music);
    audio.play()
};

function updateTrackTime(track) {
    var currTimeDiv = document.getElementById('currentTime');
    var durationDiv = document.getElementById('duration');
    // console.log(track.currentTime);
    // console.log(track.duration);
    var currTime = Math.floor(track.currentTime).toString();
    var duration = Math.floor(track.duration).toString();

    var step_change = (currTime/duration)*100
    // var w = document.querySelector(".current-status").offsetWidth;
    chnageStatusMusic(step_change)
    // console.log(step_change);


    currTimeDiv.innerHTML = formatSecondsAsTime(currTime);


    if (isNaN(duration)){
        durationDiv.innerHTML = '00:00';
    } 
    else{
        durationDiv.innerHTML = formatSecondsAsTime(duration);
    }
}

function formatSecondsAsTime(secs, format) {
    var hr  = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600))/60);
    var sec = Math.floor(secs - (hr * 3600) -  (min * 60));

    if (min < 10){ 
        min = "0" + min; 
    }
    if (sec < 10){ 
        sec  = "0" + sec;
    }

    return min + ':' + sec;
}

function chnageStatusMusic(step) {
    document.querySelector(".current-status").style.width  = `${Math.round(step)}%`
}

// Call Functions

SetMusic(index_music)