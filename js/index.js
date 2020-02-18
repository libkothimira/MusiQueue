$("#search-button")[0].addEventListener('click', function(event) {

//Clear Search Results
  $(".search-results .card-container")[0].innerHTML = "";
  event.preventDefault();
  var query = $("#searchbar")[0].value;


  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=" + query + "&key=" + API_KEY, requestOptions)
    .then(response => response.text())
    .then(result => {
      results = JSON.parse(result).items;
      for (item of results) {
        // console.log(item);

        song = {
          title: item.snippet.title,
          artist: item.snippet.channelTitle,
          cover: item.snippet.thumbnails.default.url,
          id: item.id.videoId
        }

        card = generateCard(song);
        $(".search-results .card-container")[0].appendChild(card)
      }
    })
    .catch(error => console.log('error', error));
})




function generateCard(song) {
  var card = document.createElement('div');
  card.className = "card";

  var songTitle = document.createElement('p');
  songTitle.innerHTML = song.title;
  songTitle.className = "song-title";
  var songArtist = document.createElement('p');
  songArtist.className = "song-artist";
  songArtist.innerHTML = song.artist;
  var songvideoID = document.createElement('p');
  songvideoID.className = "song-length";
  songvideoID.innerHTML = song.id;
  songvideoID.style.visibility = 'invisible'


  var image = document.createElement('div');
  image.className = "song-art"
  var picture = document.createElement('img')
  picture.src = song.cover;
  image.appendChild(picture);
  card.appendChild(songTitle);
  card.appendChild(songArtist);
  card.appendChild(songvideoID);
  card.appendChild(image);
  return card;
}
