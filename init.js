let pageNumber = 1;
const itemsOnPage = 10;
let rawData;
let data;
let filteredData;

document.addEventListener("DOMContentLoaded", function() {
    // showData(data);
    // update();
    // startEventListener();
    // setActiveLink();
    getData();
} )
  
  
function getData() {
    fetch('http://localhost:3000/data', {
      mode: 'cors',
    })
    .then(response => response.json())
    .then(collectedData => {
      if (collectedData)  {
        start(collectedData);
      } else {
        console.error("No data available");
      }
    })
    .catch(error => console.error('Ошибка:', error));
}
  
function start(collectedData) {
    startEventListener();
    rawData = collectedData;
    data = rawData;
    filteredData = data;
    console.log('init filteredData length: ' + filteredData.length);
    pageNumber = 1;
    showData(data);
    staffCount();
}