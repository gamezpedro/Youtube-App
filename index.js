
let url = "https://www.googleapis.com/youtube/v3/search?type=video&key=AIzaSyDPkzGh8AonYcel-jq8qknGU4KUFboKfqQ&part=snippet&maxResults=10&q=";
let key;

function fetchVideos(videoUrl){


    $.ajax({
      url : (videoUrl),  //url endpointToAPI
      method : "GET",
      dataType : "json",  
      success : function( responseJSON ){
        displayResults( responseJSON );
      },
      error : function( err ){
        console.log( err );
      }
    });
}

function displayResults( responseJSON ){
    
    $(".results").empty();
    
    for(i = 0; i < responseJSON.pageInfo.resultsPerPage; i++) {
        let youtubeURL = "https://www.youtube.com/watch?v=" + responseJSON.items[i].id.videoId;
        $(".results").append(`
            <h2 id="Title" onclick="openTab('${youtubeURL}')">
            ${responseJSON.items[i].snippet.title}
            </h2>
            <p>
              <img src= "${responseJSON.items[i].snippet.thumbnails.default.url}" onclick="openTab('${youtubeURL}')"/>
            </p>
        `);
    }
    $(".results").append(`
      <button id="prevButton"> Prev </button>
      <button id="nextButton" > Next </button>
    `
    );
    prevNext(responseJSON);
}

function prevNext(responseJSON){
  $("#prevButton").on("click", function(e){
    e.preventDefault();
    let videoUrl = `https://www.googleapis.com/youtube/v3/search?type=video&pageToken=${responseJSON.prevPageToken}&key=AIzaSyDPkzGh8AonYcel-jq8qknGU4KUFboKfqQ&part=snippet&maxResults=10&q=${key}`;
    //console.log(videoUrl);
    fetchVideos(videoUrl);
  });

  $("#nextButton").on("click", function(e){
    e.preventDefault();
    let videoUrl = `https://www.googleapis.com/youtube/v3/search?type=video&pageToken=${responseJSON.nextPageToken}&key=AIzaSyDPkzGh8AonYcel-jq8qknGU4KUFboKfqQ&part=snippet&maxResults=10&q=${key}`;
    //console.log(videoUrl);
    fetchVideos(videoUrl);
  });
}


function watchForm(){
  $("#submitButton").on("click",function(e){
    e.preventDefault();
    cont = 0;
    key = $("#textInput").val();
    let videoUrl = url + $("#textInput").val();
    if($(key)=="")
        {
            alert("You must Submit Keyword to Search")
        }
    else{
      $("#textInput").val("");
      fetchVideos(videoUrl);
    }
    console.log(videoUrl);
  });
}

function openTab(youtubeURL){
    window.open(youtubeURL, '_blank'); //target is a new browser tab
}

function init(){
  watchForm();
}

init();