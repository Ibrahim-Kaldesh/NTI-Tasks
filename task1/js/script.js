// const addUser = document.getElementById("addUser")
let allUsers = [];
const addUser = document.querySelector("#addUser");
const editUser = document.querySelector("#edit-user");
const showAll = document.querySelector("#showAll");
const formHeaders = ["id", "userName", "email", "age", "status"];
const dataWrap = document.querySelector("#dataWrap");
const single = document.querySelector("#single");
const modal = document.querySelector(".modal");
const close = document.querySelector("#close");
const closeIcon = document.querySelector(".close");
const saveChanges = document.querySelector("#save-changes");

// handle modal
const handleModal = function (display) {
  modal.style.display = display;
};

// handle status of the user
const handleStatusBtn = function (class1, class2, state, msg, user) {
  this.textContent = msg;
  this.classList.remove(class1);
  this.classList.add(class2);
  user.status = state;
};

const createUserObj = function (formData) {
  const user = {};
  formHeaders.forEach((h) => {
    if (h === "id") user[h] = Date.now();
    else if (h === "status") user[h] = 0;
    else user[h] = formData[h].value;
  });
  return user;
};

const storeToLocalStorage = function (key, data) {
  //if there is an error set item with []
  let myData;
  try {
    myData = JSON.stringify(data);
  } catch (e) {
    myData = "[]";
  }
  localStorage.setItem(key, myData);
};
if (addUser) {
  addUser.addEventListener("submit", function (e) {
    e.preventDefault();
    const allUsers = JSON.parse(localStorage.getItem("myUsers")) || [];
    let user = createUserObj(addUser.elements);
    allUsers.push(user);
    storeToLocalStorage("myUsers", allUsers);
    addUser.reset();
    window.location = "index.html";
  });
}

const createMyOwnEle = function (parent, ele, txt, classes) {
  let myEle = document.createElement(ele);
  if (txt) myEle.textContent = txt;
  if (classes) myEle.classList = classes;
  parent.appendChild(myEle);
  return myEle;
};

const drawall = function (usersData) {
  dataWrap.textContent = "";
  if (!usersData.length) {
    const tr = document.createElement("tr");
    dataWrap.appendChild(tr);
    tr.textContent = "no users yet";
  }
  usersData.forEach((user, index) => {
    const tr = createMyOwnEle(dataWrap, "tr", null, null);
    formHeaders.forEach((head) => {
      if (head !== "status") createMyOwnEle(tr, "td", user[head], null);
    });
    const td = createMyOwnEle(tr, "td", null, null);

    const delBtn = createMyOwnEle(
      td,
      "button",
      "delete",
      "btn btn-danger mx-2"
    );
    const editBtn = createMyOwnEle(
      td,
      "button",
      "edit",
      "btn btn-primary mx-2"
    );

    const showBtn = createMyOwnEle(
      td,
      "button",
      "show",
      "btn btn-warning mx-2"
    );

    const statusBtn = createMyOwnEle(
      td,
      "button",
      usersData[index].status ? "deactivate" : "activate",
      `btn btn-${usersData[index].status ? "success" : "secondary"} mx-2`
    );

    delBtn.addEventListener("click", function (e) {
      usersData.splice(index, 1);
      tr.remove();
      storeToLocalStorage("myUsers", usersData);
      drawall(usersData);
    });

    showBtn.addEventListener("click", function (e) {
      localStorage.setItem("single", JSON.stringify(user));
      window.location = "single.html";
    });

    close.addEventListener("click", function (e) {
      handleModal("none");
    });

    closeIcon.addEventListener("click", function (e) {
      handleModal("none");
    });

    editBtn.addEventListener("click", function () {
      handleModal("block");
      const inputs = editUser.elements;
      formHeaders.forEach((h) => {
        if (inputs[h]) {
          inputs[h].value = usersData[index][h];
        }
      });
      saveChanges.addEventListener("click", function (e) {
        e.preventDefault();
        const fields = Array.from(tr.childNodes).slice(1, -1);
        const l = fields.length;
        formHeaders.slice(1).forEach((h, idx) => {
          if (inputs[h]) {
            usersData[index][h] = inputs[h].value || usersData[index][h];
            if (idx < l) fields[idx].textContent = usersData[index][h];
          }
        });

        storeToLocalStorage("myUsers", usersData);
        handleModal("none");
      });
    });

    statusBtn.addEventListener("click", function () {
      this.classList.contains("btn-secondary")
        ? handleStatusBtn.call(
            this,
            "btn-secondary",
            "btn-success",
            1,
            "deactivate",
            usersData[index]
          )
        : handleStatusBtn.call(
            this,
            "btn-success",
            "btn-secondary",
            0,
            "activate",
            usersData[index]
          );
      storeToLocalStorage("myUsers", usersData);
    });
  });
};

if (dataWrap) {
  const usersData = JSON.parse(localStorage.getItem("myUsers")) || [];
  drawall(usersData);
}

if (single) {
  const userData = JSON.parse(localStorage.getItem("single"));
  single.textContent = `${userData.id} - ${userData.userName}`;
}
