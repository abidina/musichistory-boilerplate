"use strict";

var songsArray = [];
var songString = "";

// AJAX FUNCTION
var ajaxFunction = function() {
  $.ajax({
  url: 'https://torrid-fire-9009.firebaseio.com/songs/.json',
  success: populateSongListDOMElement
  });
};

// hide or show add music/list view depending on link click
$("#addMusicView").hide();

$("#addClick").click(function() {
  $("#listMusicView").hide();
  $("#addMusicView").show();
});

$("#listClick").click(function() {
  $("#addMusicView").hide();
  $("#listMusicView").show();
});

// function for populating the DOM with song list
function populateSongListDOMElement (songs) {
  let songString = "";
  $('#songSection').html("");
  for (let song in songs) {
    let currentSong = songs[song];
    songString += '<div class="musicRow"><h1>' + currentSong.title + '</h1><p><span class=info>' + currentSong.artist + '</span> on the album <span class=info>' + currentSong.album + '</span></p><button class="deleteBtn"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></div>';
  }
    $('#songSection').append(songString);
}

// delete btn
$(document).on("click", "button[class='deleteBtn']", function() {
    $(this).parent().remove();  
});


// ajax request for list music
$('#listClick').click(function() {
  ajaxFunction();
});


// user data added on add music button click
$('#addMusicBtn').click(function() {

  var newSong = {
    "title": $("#userSongName").val(),
    "album": $("#userAlbumName").val(),
    "artist": $("#userArtistName").val()
  };

  $.ajax({
    url: 'https://torrid-fire-9009.firebaseio.com/songs/.json',
    type: 'POST',
    data: JSON.stringify(newSong)
  }).done(function() {
    console.log("it saved");
    ajaxFunction();
  $("#addMusicView").hide();
  $("#listMusicView").show();
  });
});


ajaxFunction();


