const tableHeader = document.querySelector(".table-header");
const tableBody = document.querySelector(".table-body");
const allUsers = document.querySelector(".show-all");

// get date from API
const usersDate = async function (urlAPI) {
  try {
    // fecth API
    const res = await fetch(`${urlAPI}`);
    // handle err if found !!
    if (!res.ok) throw new Error("an error happened during fecthing data");

    // get data
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

// destructure data of user
const destrucObject = function (user) {
  const {
    id,
    name,
    username,
    email,
    phone,
    website,
    address: {
      suite,
      city,
      street,
      zipcode,
      geo: { lat, lng },
    },
    company: { name: companyName, catchPhrase, bs },
  } = user;

  return {
    ID: id,
    Name: name,
    Username: username,
    Email: email,
    Phone: phone,
    Website: website,
    Address: `${suite} - ${street} st.`,
    // Suite: suite,
    // street: street,
    City: city,
    "Zip Code": zipcode,
    Geo: `Lat: ${lat} Lng: ${lng}`,
    Company: companyName,
    CatchPhrase: catchPhrase,
    BS: bs,
  };
};

// create a header for our table
const createTableHeader = function (data) {
  for (key in data) {
    tableHeader.insertAdjacentHTML(
      "beforeend",
      `<th scope="col">${key !== "ID" ? key : "#" + key}</th>`
    );
  }
};

// create User and insert it into table
const creatUser = function (user) {
  const row = document.createElement("tr");

  for (val of Object.values(destrucObject(user))) {
    const cell = document.createElement("td");
    cell.textContent = `${val}`;
    row.appendChild(cell);
  }
  tableBody.appendChild(row);
};

// create a list of users from the fetched data
(async function () {
  let data;
  try {
    data = await usersDate("https://jsonplaceholder.typicode.com/users");
  } catch (err) {
    console.log(err);
  }

  // now data is available , we can store it in local storage and show users in the page
  localStorage.setItem("AllUsers", JSON.stringify(data));
})();

// check if in index.html page then we can addEventListener to (showAll) -> button
if (allUsers) {
  allUsers.addEventListener("click", function () {
    window.location = "table.html";
  });
}

// check if in table.html page then we can showAll users
if (tableHeader && tableBody) {
  // get data from localStorage
  const data = localStorage.getItem("AllUsers");

  // check if data exists
  if (data !== "undefined") {
    const allUsers = JSON.parse(data);

    // create a header for our table
    createTableHeader(destrucObject(allUsers[0]));

    // loop for all users
    allUsers.forEach((user) => {
      // create User and insert it into table
      creatUser(user);
    });
  } else tableBody.insertAdjacentHTML("beforeend", "<tr>no users yet</tr>");
}
