function convertRestaurantsToCategories(restaurantList) {
  // process your restaurants here!
  return list;
}

function makeYourOptionsObject(datapointsFromRestaurantsList) {
  // set your chart configuration here!
  CanvasJS.addColorSet('customColorSet1', [
    // add an array of colors here https://canvasjs.com/docs/charts/chart-options/colorset/
  ]);

  return {
    animationEnabled: true,
    colorSet: 'customColorSet1',
    title: {
      text: 'Change This Title'
    },
    axisX: {
      interval: 1,
      labelFontSize: 12
    },
    axisY2: {
      interlacedColor: 'rgba(1,77,101,.2)',
      gridColor: 'rgba(1,77,101,.1)',
      title: 'Change This Title',
      labelFontSize: 12,
      scaleBreaks: {customBreaks: []} // Add your scale breaks here https://canvasjs.com/docs/charts/chart-options/axisy/scale-breaks/custom-breaks/
    },
    data: [{
      type: 'bar',
      name: 'restaurants',
      axisYType: 'secondary',
      dataPoints: datapointsFromRestaurantsList
    }]
  };
}

function runThisWithResultsFromServer(jsonFromServer) {
  console.log('jsonFromServer', jsonFromServer);
  sessionStorage.setItem('restaurantList', JSON.stringify(jsonFromServer)); // don't mess with this, we need it to provide unit testing support
  // Process your restaurants list
  // Make a configuration object for your chart
  // Instantiate your chart
  const reorganizedData = convertRestaurantsToCategories(jsonFromServer);
  const options = makeYourOptionsObject(reorganizedData);
  const chart = new CanvasJS.Chart('chartContainer', options);
  chart.render();
}

// Leave lines 52-67 alone; do your work in the functions above
document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray();
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((jsonFromServer) => runThisWithResultsFromServer(jsonFromServer))
    .catch((err) => {
      console.log(err);
    });
});

// code from A1
async function windowActions() { // asynchronous function; async gives access to await keyword
  console.log('window loaded');
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const request = await fetch(endpoint); // request fetches the api; await pauses async function execution until a Promise is addressed
  const restaurant = await request.json(); //restaurants is request formatted to json; empty array
  const search = document.querySelector("#search"); // document is html page
  const suggestions = document.querySelector('.suggestions');

  function findMatches(WordToMatch, restaurant) {
      return restaurant.filter(place => {
          const regex = new RegExp(WordToMatch, 'gi'); // gi means all regular expression matches
          return place.city.match(regex) || place.name.match(regex) || place.category.match(regex);
      });
  }

  function displayMatches(event){
      const matchArray = findMatches(event.target.value, restaurant);
      const html = matchArray.map((place) => { // creating a box. inside box, set each item
      console.log(place);
          return `
              <li> 
                  <div class="labels">
                      <span class="name">${place.name}</span> 
                      <br>
                      <span class="category">${place.category}</span>
                      <br>
                      <span class="address">${place.address_line_1}</span>
                      <br>
                      <span class="city">${place.city}</span>
                      <br>
                      <span class="zip">${place.zip}</span>
                  </div>
              </li> 
          `; // span is an inline container
      }).join('');
      suggestions.innerHTML = html; //returns inner HTML text content
  }

  search.addEventListener('keyup', async (event) => { // keyup is stop typing
      displayMatches(event);
  });

  search.addEventListener('change', displayMatches); //checking for changes on input field

}
window.onload = windowActions;


