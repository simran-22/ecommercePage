const userAPI = "https://reqres.in/api/users";
const toast = document.querySelector(".error");
const usersList = document.querySelector(".usersList");
const editBtn = document.querySelector(".edit");
const editForm = document.querySelector(".editForm");

const users = [];

const getUsers = () => {
  fetch(userAPI)
    .then((response) => response.json())
    .then(({ data }) => {
      data &&
        data.forEach((user) => {
          usersList.innerHTML += `<div class="col-sm-4">
                    <div class="cards-wraper">
                        <div class="card" style="width:100%;">
                            <div class="img-div"> <img src=${user.avatar} alt="..."></div>
                            <div class="card-body">
                                <p class="card-text">
                                    ${user.first_name} ${user.last_name}
                                </p>
                                <p>Email : ${user.email}</p>
                               <p>ID: ${user.id}</p>
                               <button  onclick="populateEditForm('${user.first_name} ${user.last_name}', '${user.email}', '${user.id}')" type="button" class="btn btn-primary edit" data-toggle="modal" data-target="#exampleModalCenter"> Edit </button></div>
                        </div>
                    </div>
                </div>`;
        });
    })
    .catch((error) => {
      toast.innerHTML = "<p>Error while fetching users</p>";
      toast.classList.add("show");
      setInterval(function () {
        toast.classList.remove("show");
      }, 5000);
    });
};

getUsers();

// edit
function populateEditForm(name, email, id) {
  const modalNameInput = document.querySelector('[name="name"]');
  const modalEmailInput = document.querySelector('[name="email"]');
  const modalIDInput = document.querySelector('[name="editUserID"]');
  modalNameInput.value = name;
  modalEmailInput.value = email;
  modalIDInput.value = id;
}

editForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const myFormData = new FormData(e.target);

  const formDataObj = {};
  myFormData.forEach((value, key) => (formDataObj[key] = value));

  editPerson(formDataObj);
});

function editPerson({ name, email, editUserID }) {
  var myHeaders = new Headers();
  myHeaders.append("User-Agent", "googlebot");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("mode", "no-cors");

  var raw = JSON.stringify({
    name,
    email,
    editUserID,
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://reqres.in/api/users/" + editUserID, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      $("#exampleModalCenter").modal("hide");

      toast.innerHTML = "<p>User Updated!!</p>";
      toast.classList.add("show");
      setInterval(function () {
        toast.classList.remove("show");
      }, 5000);
    })
    .catch((error) => console.log("error", error));
}
