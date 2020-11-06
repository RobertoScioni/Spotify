const genres = {
	pop: 132,
	rap: 116,
	Reggaeton: 122,
	Rock: 152,
}

/**
 *
 * @param {*} category the category tofetch
 */

const fetchArtistsByCategory = (genre) =>
	fetch(`https://deezerdevs-deezer.p.rapidapi.com/genre/${genre}/artists`, {
		method: "GET",
		headers: {
			"x-rapidapi-key": "e75d8629a2mshe74bcadd1131095p185f53jsn7e5fafda57bb",
			"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
		},
	})
		.then((response) => response.json())
		.then((usefulData) => usefulData.data)
		.catch((err) => {
			console.error(err)
		})
/**
 * removes all the matching Elements from the DOM except the templates
 *
 * we have templates for .card .tab-pane and #list-tab>.list-group-item
 */
const erase = (query) => {
	Array.from(document.querySelectorAll(`${query}:not(.template)`)).map((card) =>
		card.remove()
	)
}

/**
 * fills the navbar with the content of an array and then calles fillNavTabs to fille the relative tabs
 *
 * @param voices the element to fill the navbar width
 */

const fillNavbar = (voices) => {
	erase("#list-tab>.list-group-item")
	//console.log(voices)
	const template = document.querySelector("#list-tab>.template")
	voices.forEach((voice) => {
		let button = template.cloneNode(true)
		button.classList.remove("template", "active")
		button.id = `list-${voice}-list`
		button.href = `#list-${voice}`
		button.innerText = voice.toUpperCase()
		button.setAttribute("aria-controls", voice)
		//button[["aria-controls"]] = voice
		template.parentElement.appendChild(button)
	})
	template.parentElement.children[1].classList.add("active")
	fillNavTabs(voices)
}

/**
 * this fills the tabs
 * @param {*} voices
 */
const fillNavTabs = (voices) => {
	erase(".tab-pane")
	const template = document.querySelector(".tab-pane.template")
	voices.forEach((voice) => {
		let pane = template.cloneNode(true)
		pane.classList.remove("template", "active")
		pane.id = `list-${voice}`
		//pane[["aria-labelledby"]] = `list-${voice}-list`
		pane.setAttribute("aria-labelledby", `list-${voice}-list`)
		erase(".card")
		template.parentElement.appendChild(pane)
		//console.log(fetchArtistsByCategory(genres[voice]))
		fetchArtistsByCategory(genres[voice]).then((artists) =>
			artists.forEach((artist) => {
				//fillCard(artist, pane.querySelector(".row"))
				console.log(artist)
				const template = document.querySelector(".card.template")
				const card = template.cloneNode(true)
				card.classList.remove("template")
				card.querySelector(".card-img-top").src = artist.picture_medium
				card.querySelector(".card-text").innerText = artist.name
				pane.querySelector(".row").appendChild(card)
			})
		)
	})
	template.parentElement.children[1].classList.add("active")
}

/**
 * fills a card with the info of an artist and appends it in the target
 * @param {*} artist
 */
const fillCard = (artist, target) => {
	console.log(artist.name)
	const template = document.querySelector(".card.template")
	const card = template.cloneNode(true)
	artist.then((artist) => {
		card.classList.remove("template")
		card.querySelector(".card-img-top").src = artist.picture_medium
		target.appendChild(card)
	})
}
