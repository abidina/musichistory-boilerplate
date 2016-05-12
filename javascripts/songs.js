"use strict";

var songs = [];
var songElement = document.getElementById('songSection');
var songString = "";
var songList;

// songs[songs.length] = "Legs > by Z*ZTop on the album Eliminator";
// songs[songs.length] = "The Logical Song > by Supertr@amp on the album Breakfast in America";
// songs[songs.length] = "Another Brick in the Wall > by Pink Floyd on the album The Wall";
// songs[songs.length] = "Welco(me to the Jungle > by Guns & Roses on the album Appetite for Destruction";
// songs[songs.length] = "Ironi!c > by Alanis Moris*ette on the album Jagged Little Pill";

// songs.unshift("Please Pardon Yourself = by The Avett Brothers on the album Mignonette");
// songs.push("Agape = by Bear's Den on the album Agape");

// var newSongs = [];
//     songs = songs.toString().replace(/>/g, "=");
//     songs = songs.replace("@", "");
//     songs = songs.replace("(", "");
//     songs = songs.replace("*", "");
//     songs = songs.replace("*e", "e");
//     songs = songs.replace("!", "").split(',');

$("#addMusicView").hide();
$("#addClick").click(function() {
  $("#listMusicView").hide();
  $("#addMusicView").show();
});

$("#listClick").click(function() {
  $("#addMusicView").hide();
  $("#listMusicView").show();
});

$("#addMusicBtn").click(function(){
  var userSong = $("#userSongName").val() + " on the album " + $("#userAlbumName").val() + " by " + $("#userArtistName").val();
  songs.unshift(userSong);
  for (var i = 0; i < songs.length; i++) {
    var string = "";
    var string = "<p>" + songs[i] + "</p>";
    songElement.innerHTML += string;
  }
});


function populateSongListDOMElement (songList, i) {
  var currentSong = songList.songs[i];
  for(var i=0; i < songList.songs.length; i++) {
    let string = "";
    if (i === 0) {
      string += '<div class="domSong">';
    }
    string += '<section><h1>' + currentSong.title + '</h1>';
    string += '<div>' + currentSong.artist + '</div>';
    string += '<div>' + currentSong.album + '</div>';
    string += '<button class="deleteBtn">Delete</button></section>';
    if (i === songList.songs.length) {
      string += '</div>';
    }
    return string;
  }
  songString += populateSongListDOMElement(songList, i);
}

// for(var i=0; i < songList.songs.length; i++) {
//   var currentSong = songList.songs[i];
//     //this won't work because you can't append an unclosed tag to the DOM
//     $('#songSection').append('<div class="domSong">');
//     $('#songSection').append('<section><h1>' + currentSong.title + '</h1>');
//     $('#songSection').append('<div>' + currentSong.artist + '</div>');
//     $('#songSection').append('<div>' + currentSong.album + '</div>');
//     $('#songSection').append('<button class="deleteBtn">Delete</button></section></div>');
//   }

// $(".deleteBtn").click(function(){
//   $(this).closest("section").remove();
// });

$(document).on("click", "button[class='deleteBtn']", function() {
  $(this).closest('div[class="domSong"]').remove();  
});

$('#listClick').click(function() {
  $.ajax({
  url: 'songList.json',
  success: populateSongListDOMElement
});
});