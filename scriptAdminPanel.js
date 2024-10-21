let oldId = '';

// логин
function openLoginWindow() {
  document.getElementById("login-window").style.display = "block";
  document.body.style.overflow = "hidden";
  document.body.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
}

function closeLoginWindow() {
  document.getElementById("login-window").style.display = "none";
  document.body.style.overflow = "auto";
  document.body.style.backgroundColor = "";
}

// добавить сотрудника
function openAddEmployeeWindow() {
  document.getElementById("add-employee-window").style.display = "block";
  document.getElementById("overlay").style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeAddEmployeeWindow() {
  document.getElementById("add-employee-window").style.display = "none";
  document.getElementById("overlay").style.display = "none";
  document.body.style.overflow = "auto";
}

// редактировать сотрудника
function openEditEmployeeWindow(employeeData) {
  
  document.getElementById("edit-employee-window").style.display = "block";
  document.getElementById("overlay").style.display = "block";
  document.body.style.overflow = "hidden";
  console.log(employeeData);
  Object.keys(employeeData).forEach(key => {
    // console.log(key, employeeData[key]);
    if (key === 'Сотрудник') {
      document.getElementById('full-name-edit').value = employeeData[key];
      // console.log('full-name:', document.getElementById('full-name-edit').value);
    
    } else if (key === 'Телефон') {
      document.getElementById('phone-edit').value = employeeData[key];
      oldId = document.getElementById('phone-edit').value;
      // console.log('phone:', document.getElementById('phone-edit').value);
    } else if (key === 'Внешний номер') {
      document.getElementById('external-number-edit').value = employeeData[key];
      // console.log('external-number:', document.getElementById('external-number-edit').value);
    } else if (key === 'Номер ВТС') {
      document.getElementById('vts-number-edit').value = employeeData[key];
      // console.log('vts-number:', document.getElementById('vts-number-edit').value);
    } else if (key === 'Должность') {
      document.getElementById('position-edit').value = employeeData[key];
      // console.log('position:', document.getElementById('position-edit').value);
    } else if (key === 'Отдел') {
      document.getElementById('department-edit').value = employeeData[key];
      // console.log('department:', document.getElementById('department-edit').value);
    } else if (key === 'Кабинет') {
      document.getElementById('cabinet-edit').value = employeeData[key];
      // console.log('cabinet:', document.getElementById('cabinet-edit').value);
    }
  });
  
}

function closeEditEmployeeWindow() {
  document.getElementById("edit-employee-window").style.display = "none";
  document.getElementById("overlay").style.display = "none";
  document.body.style.overflow = "auto";
}

function updateEmployeeData() {
  const newEmployeeData = {
    oldId: oldId,
    newData: {
      "Телефон": document.getElementById('phone-edit').value,
      "Внешний номер": document.getElementById('external-number-edit').value,
      "Номер ВТС": document.getElementById('vts-number-edit').value,
      "Сотрудник": document.getElementById('full-name-edit').value,
      "Должность": document.getElementById('position-edit').value,
      "Отдел": document.getElementById('department-edit').value,
      "Кабинет": document.getElementById('cabinet-edit').value
    }
  };

  fetch('http://localhost:3000/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newEmployeeData)
  })
  .then(response => response.text())
  .then(data => {
    if (data === 'Файл успешно обновлен') {
      console.log('Данные успешно обновлены');
      // Обновите таблицу
      getData();
      closeEditEmployeeWindow();
    } else {
      console.error('Ошибка обновления данных');
    }
  })
  .catch(error => console.error(error));
}

function addEmployee() {
  const fullName = document.getElementById('full-name').value;
  const phone = document.getElementById('phone').value;
  const externalNumber = document.getElementById('external-number').value;
  const vtsNumber = document.getElementById('vts-number').value;
  const position = document.getElementById('position').value;
  const department = document.getElementById('department').value;
  const cabinet = document.getElementById('cabinet').value;

  const newEmployee = {
    "Телефон": phone,
    "Внешний номер": externalNumber,
    "Номер ВТС": vtsNumber,
    "Сотрудник": fullName,
    "Должность": position,
    "Отдел": department,
    "Кабинет": cabinet
  };

  fetch('http://localhost:3000/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newEmployee)
  })
  .then(response => response.text())
  .then(data => {
    if (data = 'Файл успешно обновлен'){
      getData();
    }
  })
  .catch(error => console.error('Ошибка:', error));
}

function validateInputs(event) {
  event.preventDefault(); // prevent the default behavior of the button
  const form = document.querySelector('#add-employee-window form');
  const inputs = form.querySelectorAll('input'); // check all input fields inside the form
  let isValid = true; // assume all inputs are valid initially

  inputs.forEach(input => {
    if (input.id === 'phone') {
      const pattern = /^#\d+$/; // allow "#" and digits
      if (!input.value.trim() || !pattern.test(input.value.trim())) { 
        isValid = false; // set isValid to false if we find an input field with no valid value
        input.style.border = '1px solid #FF0000'; // add a red border to the input field
      } else {
        input.style.border = ''; // remove the red border if the input field has a valid value
      }
    } else if (input.id === 'external-number') {
      const pattern = /^\d{3}-\d{2}-\d{2}$/; // allow numbers in the format XXX-XXX-XX
      if (!input.value.trim() || !pattern.test(input.value.trim())) { 
        isValid = false; // set isValid to false if we find an input field with no valid value
        input.style.border = '1px solid #FF0000'; // add a red border to the input field
      } else {
        input.style.border = ''; // remove the red border if the input field has a valid value
      }
    } else {
      const pattern = /^[a-zA-Zа-яА-Я0-9\s]+$/; // allow alphanumeric characters, Cyrillic characters, and whitespace
      if (!input.value.trim() || !pattern.test(input.value.trim())) { 
        isValid = false; // set isValid to false if we find an input field with no valid value
        input.style.border = '1px solid #FF0000'; // add a red border to the input field
      } else {
        input.style.border = ''; // remove the red border if the input field has a valid value
      }
    }
  });

  console.log('isValid:', isValid); // check the value of isValid

  const errorMessage = document.getElementById('error-message');

  if (isValid) {
    errorMessage.style.display = 'none'; // hide the error message
    addEmployee(); // call the existing addEmployee function if all inputs are valid
    closeAddEmployeeWindow(); // close the popup window if all inputs are valid
  } else {
    errorMessage.style.display = 'block'; // show the error message
    errorMessage.textContent = 'Заполните все необходимые поля!'; // set the error message text
  }
}


function deleteEmployee(id) {
  const employee = filteredData.find(employee => employee["Телефон"] === id);
  if (employee) {
    const employeeName = `${employee["Сотрудник"]}`;
    document.getElementById("delete-employee-message").innerHTML = `Вы действительно хотите удалить сотрудника (<span style="color: #7364FF;">${id}</span> ${employeeName})?`;
    openDeleteEmployeeWindow(id); // вызвать функцию openDeleteEmployeeWindow с ID
  } else {
    console.error('Сотрудник не найден');
  }
}

function confirmDeleteEmployee(id) {
  fetch(`http://localhost:3000/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id }) // передать ID сотрудника в теле запроса
  })
  .then(response => response.text())
  .then(data => {
    console.log('Ответ сервера:', data);
    if (data === 'Сотрудник удален') {
      getData();
    }
  })
  .catch(error => console.error('Ошибка:', error));
  closeDeleteEmployeeWindow();
}

function openDeleteEmployeeWindow(id) {
  document.getElementById("delete-employee-window").style.display = "block";
  document.getElementById("delete-btn").onclick = function() {
    confirmDeleteEmployee(id); // вызвать функцию confirmDeleteEmployee с ID
  };
}

function closeDeleteEmployeeWindow() {
  document.getElementById("delete-employee-window").style.display = "none";
}
