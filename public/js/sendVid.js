$("a").click(function(){
    var videoTitle = this.id;
    localStorage.setItem('videoTitle', videoTitle);
    });
