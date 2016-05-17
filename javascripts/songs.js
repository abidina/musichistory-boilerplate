"use strict";

// AJAX FUNCTION
var initialAjaxFunction = function() {
  $.ajax({
  url: 'https://torrid-fire-9009.firebaseio.com/songs/.json',
  success: populateSongListDOMElement
  });
};

initialAjaxFunction(); // <-- runs on page load


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
    songString += '<div class="musicRow"><h1>' + currentSong.title + '</h1><p><span class=info>' + currentSong.artist + '</span> on the album <span class=info>' + currentSong.album + '</span></p><button class="deleteBtn" id="' + song + '"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></div>';
    console.log("song", song);
  }
  $('#songSection').append(songString);
}

// DELETE BUTTON - REMOVES SONG FROM DATABASE
$(document).on("click", ".deleteBtn", function() {
  var songId = $(this).attr('id');
  deleteSongFromFirebase(songId);
});

var deleteSongFromFirebase = function (songId) {
  console.log("song id", songId);
  $.ajax({
    url: `https://torrid-fire-9009.firebaseio.com/songs/${songId}.json`,
    method: 'DELETE'
  }).done(function () {
    initialAjaxFunction();
  });
};


// ADD MUSIC BUTTON - ADDS USER INPUT TO DATABASE
$('.editMusicBtn').click(function() {

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
    initialAjaxFunction();
  $("#addMusicView").hide();
  $("#listMusicView").show();
  });
});




