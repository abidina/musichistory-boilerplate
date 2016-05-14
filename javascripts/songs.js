"use strict";

var songsArray = [];
var songString = "";
// var songList;


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


// songsArray & songList.songs are different. wtf.
// is the user input ever actually put into the initial array?

$("#addMusicBtn").click(function(){
  var userSong ='<div><h1>' + $("#userSongName").val() + '</h1></div><div><p>' + $("#userArtistName").val() + '</p></div><div><p>' + $("#userAlbumName").val() + '</p></div><button class="deleteBtn">Delete</button>';

  songsArray.unshift(userSong);

  for (var i = 0; i < songsArray.length; i++) {
    let string = "";
    string += "<p class='whatIsThisTag'>" + songsArray[i] + "</p>";
    $('#songSection').html(string);
  }
});



function populateSongListDOMElement (songs) {
  for (let song in songs) {
    let currentSong = songs[song];
    console.log(currentSong);
    $('#songSection').append('<div class="musicRow"><h1>' + currentSong.title + '</h1><p>' + currentSong.artist + '</p><p>' + currentSong.album + '</p><button class="deleteBtn">Delete</button></div>');
  }
}



// trying to make delete btn work
$(document).on("click", "button[class='deleteBtn']", function() {
  console.log("delete one");
  $(this).parent().remove();  
});


// ajax request
$('#listClick').click(function() {
  $.ajax({
  url: 'https://torrid-fire-9009.firebaseio.com/songs/.json',
  success: populateSongListDOMElement
});
});

$('#moreSongsBtn').click(function() {
  $.ajax({
  url: 'songList2.json',
  success: populateSongListDOMElement
});
});