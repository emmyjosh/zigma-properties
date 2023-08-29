/** @format */
const form = document.getElementById("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const userName = document.getElementById("userName").value;
  console.log(userName);
  const email = document.getElementById("email").value;
  console.log(email);
  const passWord = document.getElementById("pwd").value;
  console.log(passWord);
});
