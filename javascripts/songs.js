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



function populateSongListDOMElement (songList) {
  for(var i=0; i < songList.songs.length; i++) {
    var currentSong = songList.songs[i];
    songsArray.push(currentSong);
    console.log(songsArray);
    // this won't work bc 'section' isn't closed in the same line that it's opened
      $('#songSection').append('<div><h1>' + currentSong.title + '</h1></div>');
      $('#songSection').append('<div><p>' + currentSong.artist + '</p></div>');
      $('#songSection').append('<div><p>' + currentSong.album + '</p></div>');
      $('#songSection').append('<button class="deleteBtn">Delete</button>');

  }
}



// trying to make delete btn work
$(document).on("click", "button[class='deleteBtn']", function() {
  $(this).closest('p').remove();  
});

// this was taken from Chatty & modified, but definitely seems too convoluted 
// var deleteFunc = function() {
//     var dltBtn = document.getElementsByClassName('.deletebtn')
//     for (var i = 0; i < $('.deletebtn').length; i++) {
//       $('.deletebtn').on("click", function () {
//       let deleteIndex = this.split("songs")[1];
//       let chats = Chatty.getChats();
//       songList.splice(deleteIndex, 1);
//       populateSongListDOMElement();
//       });
//     }
//   };

  // $('.deletebtn').click(deleteFunc());

// ajax request
$('#listClick').click(function() {
  $.ajax({
  url: 'songList.json',
  success: populateSongListDOMElement
});
});

$('#moreSongsBtn').click(function() {
  $.ajax({
  url: 'songList2.json',
  success: populateSongListDOMElement
});
});