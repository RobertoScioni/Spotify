window.onload = () => {
  const queryString = window.location.search
  console.log(queryString)
  let urlParams = new URLSearchParams(queryString)
  const urlID = urlParams.get('id')
       
  fetch(`https://deezerdevs-deezer.p.rapidapi.com/album/${urlID}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "fe1ee78acemsh9541414cd7dfc97p1b64f4jsnf2b7496140d3",
		"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
	}
})
.then(response => response.json())
.then(data => {
  let getSongList = document.querySelector("#songList")
  let firstElement = document.querySelector(".row.d-flex.justify-content-between")
 console.log(data)
  for (let index = 0; index < data.tracks.data.length-1; index++) {
    let elementToAdd = firstElement.cloneNode(true)
    firstElement.parentElement.appendChild(elementToAdd)
  }

  let getImg = document.querySelector(".img-fluid")
  let getTitle = document.querySelector(".generalHeading")
  let getArtistName = document.querySelector(".artist")
  let getSongs = document.querySelectorAll("h5")
  let getArtists = document.querySelectorAll("h6")
  let getLengths = document.querySelectorAll(".songLength")
  for (let index = 0; index < getSongs.length; index++) {
    const element = getSongs[index];
    element.innerText = data.tracks.data[index].title
    const element2 = getArtists[index];
  element2.innerText = data.artist.name
  const element3 = getLengths[index]
  element3.innerText = data.tracks.data[index].duration
  getTitle.innerText = data.title
  getImg.src= data.cover_medium
 getArtistName.innerText = data.artist.name
  }
  
})
.catch(err => {
	console.error(err);
});
}
  
  
//<div class="container d-flex flex-column mt-5">
//            <div class="row d-flex justify-content-between">
 //             <div class="row">
//                <img
//                  src="imgs/note.png"
//                  height="15px"
 //                 width="15px"
  //                alt="note"
   //             />
   //             <div class="col d-flex flex-column">
    //              <h5>Papercut</h5>
   //               <h6>Linkin Park</h6>
    //            </div>
    //          </div>
    //          <div class="songLength">3:04</div>
     //       </div>