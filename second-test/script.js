const inputs = document.querySelectorAll("input");
const toast = document.querySelector(".error");

// On Submit
const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const myFormData = new FormData(e.target);
  const formDataObj = {};

  myFormData.forEach((value, key) => (formDataObj[key] = value));

  if (formDataObj.name.length < 3) {
    toastMessage("Name Should be More than 3");
  } else if (formDataObj.phone.length < 10) {
    toastMessage("Phone Should be More than 10");
  } else {
    addPerson(formDataObj);
  }
});

function addPerson({ name, email, phone, dob, avatar }) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("mode", "no-cors");

  var raw = JSON.stringify({
    name,
    email,
    dob,
    phone,
    avatar,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://reqres.in/api/users", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      toastMessage("User Created");
    })
    .catch((error) => toastMessage("Error: ", error));
}

function toastMessage(message) {
  toast.innerHTML = "<p>" + message + "</p>";
  toast.classList.add("show");
  setInterval(function () {
    toast.classList.remove("show");
  }, 5000);
}
