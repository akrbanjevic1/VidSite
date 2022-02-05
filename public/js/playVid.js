function setVideo() {
    var videoTitle = localStorage.getItem('videoTitle', videoTitle);
    var videoString = "videos/"+videoTitle+".mp4";

    var video = document.getElementById('video');
    //alert(videoString); testing if video name was passed from previous page
    //document.getElementById('vidSrc').setAttribute('src',videoString);
    $("#vidSrc").attr("src", videoString);
    //alert(document.getElementById('vidSrc').getAttribute('src')); testing if video src actually changed
    video.load();
}

$(document).ready(function(){                      // wait until the document is ready
    setVideo();
});