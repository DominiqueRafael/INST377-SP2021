function mapInit() {
    let map = L.map('mapid').setView([51.505, -0.09], 13);
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
          place.city.match(regex) ||
          place.name.match(regex) ||
          place.category.match(regex)
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
  
    // use your assignment 1 data handling code here
    // and target mapObjectFromFunction to attach markers
  }
  
  async function windowActions() {
    const map = mapInit();
    await dataHandler(map);
  }
  
  window.onload = windowActions;