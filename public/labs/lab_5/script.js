function mapInit() {
  let map = L.map('mapid').setView([0, 0], 1);
  L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=HoFRVfZhUhAgENkBcaCO', {
    tileSize: 512,
    zoomOffset: -1,
    minZoom: 1,
    attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
    crossOrigin: true
  }).addTo(map);
  let marker = L.marker([51.5, -0.09]).addTo(map);
  return map;
}

async function dataHandler(mapObjectFromFunction) {
  const endpoint =
    "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json";
  const request = await fetch(endpoint);
  const restaurants = await request.json();
  const search = document.querySelector("#search");
  const suggestions = document.querySelector(".suggestions");
  function findMatches(wordToMatch, restaurants) {
    return restaurants.filter(place => {
      const regex = new RegExp(wordToMatch, "gi");
      return (
        place.zip.match(regex)
      );
    });
  }
  function displayMatch() {
    const matchArray = findMatches(event.target.value, restaurants);

    const html = matchArray
      .map(place => {
        console.log(place);
        return `
            <li>
              <div class="card">
                <div class="card-content">
                  <div class="content">
                    <p class="title">${place.name}</p>
                    <p class="subtitle">${place.category}</p>
                    <p class="address">${place.address_line_1}, ${place.city}, ${place.zip}</p>
                  </div>
                </div>
              </div>
            </li> `;
      })
      .join("");
    suggestions.innerHTML = html;
  }
  search.addEventListener("keyup", async event => {
    displayMatch(event);
  });

  search.addEventListener("change", displayMatch);
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;
