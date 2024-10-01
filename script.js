function nextPage() {
  if (pageNumber < Math.ceil(filteredData.length / itemsOnPage)) {
    pageNumber += 1;
    // console.log('next filteredData length: ' + filteredData.length);
    
    // console.log('next data length: ' + data.length);
    // console.log('next data length: ' + JSON.stringify(data));
    showData(filteredData);
    update();
    setPrevNextButtonActive(); // Добавьте этот вызов
  }
}

function prevPage() {
  if (pageNumber > 1){
    pageNumber -= 1;
    // console.log('prev filteredData length: ' + filteredData.length);

    // console.log('prev data length: ' + data.length);
    // console.log('prev data length: ' + JSON.stringify(data));
    showData(filteredData);
    update();
    setPrevNextButtonActive();
  } else {
    console.log("Вы уже на первой странице");
  }
}

function setPrevNextButtonActive() {

  const nextBTN = document.querySelector(".next-button");
  const prevBTN = document.querySelector(".prev-button");

  if (pageNumber === 1) {
    prevBTN.classList.remove("prev-next-button-active");
    prevBTN.classList.add("prev-next-button-inactive");
  }
  else {
    prevBTN.classList.add("prev-next-button-active");
    prevBTN.classList.remove("prev-next-button-inactive");
  }

  if (pageNumber === Math.ceil(filteredData.length / itemsOnPage)) {
    nextBTN.classList.remove("prev-next-button-active");
    nextBTN.classList.add("prev-next-button-inactive");
  }
  else {
    nextBTN.classList.add("prev-next-button-active");
    nextBTN.classList.remove("prev-next-button-inactive");
  }
  
}

function searching(searchQuery) {
  filteredData = rawData.filter((employee) => {
    for (const key in employee) {
      if (employee[key].toString().toLowerCase().includes(searchQuery)) {
        return true;
      }
    }
    return false;
  });

  let data = filteredData.slice(0, itemsOnPage); // Get data for the first page
  pageNumber = 1; // Reset pageNumber to 1
  showData(data);
  update();
}



function startEventListener() {
  const searchInput = document.getElementById('search');
  searchInput.addEventListener('input', (e) => {
  const searchQuery = e.target.value.trim().toLowerCase();
  searching(searchQuery);
  });

  const links = document.querySelectorAll('.central-menu a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      update();
    });
  });
}

// массив для кнопок всей зуйни через querry selecter all ебани класс 1 класс button по которому ты будешь их искать выставляешл их все в инэктив и в кнопку с айди кот ты предаешь с параметром функции ьы ей выставляешь класс эктив
// онклик вызов функции через айди млжно выцепить через this но его можно передавать как параметр функции как onclick

function allEmployers() {
  let data = rawData;
  showData(data);
  update();
}

function onlineEmployers() {
  pageNumber = 1;
  let data = rawData.filter(employee => employee["Статус"] === 'В сети');
  showData(data);
  update();
}

function awayEmployers() {
  pageNumber = 1;
  let data = rawData.filter(employee => employee["Статус"] === 'Отошел');
  showData(data);
  update();
}

function offlineEmployers() {
  pageNumber = 1;
  let data = rawData.filter(employee => employee["Статус"] === 'Не в сети');
  showData(data);
  update();
}

// searchquery по нему фильтерить джесон



function update() {
  setPrevNextButtonActive();
  listOfPages();
  staffCount();
  setActiveLink();
}

function setActiveLink() {
  const links = document.querySelectorAll('.central-menu a');
  links.forEach(link => {
    link.classList.remove('active');
  });
  const currentPage = window.location.pathname;
  links.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (currentPage.endsWith('/' + linkHref) || currentPage === '/' + linkHref) {
      link.classList.add('active');
    }
  });
}


function listOfPages() {
  const pages = document.getElementById("list-of-pages");
  pages.innerText = ((pageNumber - 1) * itemsOnPage + 1).toString() + "-" + (pageNumber * itemsOnPage).toString() + " " + "из " + filteredData.length.toString();

}

function staffCount() {
  const pages = document.getElementById("staff-count");
  pages.innerText = filteredData.length.toString();
}





function showData(jsonData) {
  if (jsonData) {
    const tbody = document.getElementById("tableBody");

    function getStatusClass(status) {
      switch (status) {
        case "В сети":
          return "status-online";
        case "Отошел":
          return "status-away";
        default:
          return "status-offline";
      }
    }

    if (tbody) {
      tbody.innerHTML = ''; // Clear the table body

      jsonData.forEach((row, number) => {
        if (number >= (pageNumber - 1) * itemsOnPage && number < pageNumber * itemsOnPage){
          const tableRow = document.createElement('tr');

          let columnIndex = 0; // Define columnIndex here

          Object.keys(row).forEach((key) => {
            const tableCell = document.createElement('td');
            let data = row[key]
            tableCell.innerHTML = data;
            if (columnIndex === 0) { // Add the class 'number' only to the first column
              tableCell.classList.add('number');
            }
            tableRow.appendChild(tableCell);
            columnIndex++; // Increment the column index
          })

          // добавляем кнопку удаления сотрудника
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Удалить';
          deleteButton.onclick = () => deleteEmployee(number);
          tableRow.appendChild(deleteButton);

          tbody.appendChild(tableRow);
        }
      });
    } else {
      console.error("Table body not found");
    }
  } else {
    console.error("No data available");
  }
}

