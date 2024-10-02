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
  console.log(employeeData);
  Object.keys(employeeData).forEach(key => {
    console.log(key, employeeData[key]);
    if (key === 'Сотрудник') {
      document.getElementById('full-name').value = employeeData[key];
      console.log('full-name:', document.getElementById('full-name').value);
    } else if (key === 'Телефон') {
      document.getElementById('phone').value = employeeData[key].replace('#', '');
      console.log('phone:', document.getElementById('phone').value);
    } else if (key === 'Внешний номер') {
      document.getElementById('external-number').value = employeeData[key];
      console.log('external-number:', document.getElementById('external-number').value);
    } else if (key === 'Номер ВТС') {
      document.getElementById('vts-number').value = employeeData[key];
      console.log('vts-number:', document.getElementById('vts-number').value);
    } else if (key === 'Должность') {
      document.getElementById('position').value = employeeData[key];
      console.log('position:', document.getElementById('position').value);
    } else if (key === 'Отдел') {
      document.getElementById('department').value = employeeData[key];
      console.log('department:', document.getElementById('department').value);
    } else if (key === 'Кабинет') {
      document.getElementById('cabinet').value = employeeData[key];
      console.log('cabinet:', document.getElementById('cabinet').value);
    }
  });
  document.getElementById("edit-employee-window").style.display = "block";
  document.getElementById("overlay").style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeEditEmployeeWindow() {
  document.getElementById("edit-employee-window").style.display = "none";
  document.getElementById("overlay").style.display = "none";
  document.body.style.overflow = "auto";
}

function updateEmployeeData() {
  const employeeData = {
    oldId: document.getElementById('phone').value,
    newData: {
      "Телефон": document.getElementById('phone').value,
      "Внешний номер": document.getElementById('external-number').value,
      "Номер ВТС": document.getElementById('vts-number').value,
      "Сотрудник": document.getElementById('full-name').value,
      "Должность": document.getElementById('position').value,
      "Отдел": document.getElementById('department').value,
      "Кабинет": document.getElementById('cabinet').value
    }
  };

  fetch('/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(employeeData)
  })
  .then(response => response.text())
  .then(data => console.log(data))
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

  fetch('http://localhost:3000/update', {
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
  fetch(`http://localhost:3000/delete/${id}`, {
    method: 'DELETE'
  })
  .then(response => response.text())
  .then(data => {
    console.log('Ответ сервера:', data);
    if (data === 'Сотрудник удален') {
      getData(); // обновить данные после удаления сотрудника
      showData(filteredData); // обновить таблицу после удаления сотрудника
    }
  })
  .catch(error => console.error('Ошибка:', error));
}
