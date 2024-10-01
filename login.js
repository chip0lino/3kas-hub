function openLoginWindow() {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("login-window").style.display = "block";
}
  
function validateLogin(event) {
    event.preventDefault(); // prevent the default behavior of the button
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");
  
    if (username === "admin" && password === "222222") {
      // Login successful, redirect to adminpanel.html
      window.location.href = "adminpanel.html";
    } else {
      errorMessage.textContent = "Логин или пароль неверный";
      errorMessage.style.color = "red";
    }
  }
  
function closeLoginWindow() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("login-window").style.display = "none";
}
  