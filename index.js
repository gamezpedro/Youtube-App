
let url = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyDPkzGh8AonYcel-jq8qknGU4KUFboKfqQ&part=snippet&maxResults=10&q=";
let prevPage;
let nextPage;
let cont = -1;



function fetchVideos(videoUrl){


    $.ajax({
      url : (videoUrl),  //url endpointToAPI
      method : "GET",
      data: {},        //info sent to the API
      dataType : "json",  
      ContentType : "application/json", //Type of data sent in the request
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
    
    nextPage = responseJSON.prevPageToken;
    prevPage = responseJSON.nextPageToken;

    for(i = 0; i < responseJSON.pageInfo.resultsPerPage; i++) {
        let youtubeURL = "https://www.youtube.com/watch?v=" + responseJSON.items[i].id.videoId;
        $(".results").append(`
            <h2 id="Title" onclick="openTab('${youtubeURL}')">
            ${responseJSON.items[i].snippet.title}
            </h2>
            <img src= "${responseJSON.items[i].snippet.thumbnails.default.url}" onclick="openTab('${youtubeURL}')"/>
        `);
    }
}


function watchForm(){
  $("#submitButton").on("click",function(e){
    e.preventDefault();
    cont = 0;
    let videoUrl = url + $("#textInput").val();
    if($("#textInput").val()=="")
        {
            alert("You must Submit Keyword to Search")
        }
        else{
            $("#textInput").val("");
            fetchVideos(videoUrl);
        }
  });

  $("#prevButton").on("click", function(e){
    e.preventDefault();
    let videoUrl = url + $("#textInput").val();
    if(cont > 0){
        videoUrl += '&pageToken=' + prevPage;
        cont--;
    }
    fetchVideos(videoUrl);
  });

  $("#nextButton").on("click", function(e){
    e.preventDefault();
    let videoUrl = url + $("#textInput").val();
    if(cont >= 0){
        videoUrl += '&pageToken=' + nextPage;
        cont++;
    }
    fetchVideos(videoUrl);
  });

}

function openTab(youtubeURL){
    window.open(youtubeURL, '_blank'); //target is a new browser tab
}

function init(){
  watchForm();
}

init();