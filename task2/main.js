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
    Suite: suite,
    City: city,
    street: street,
    "Zip Code": zipcode,
    Geo: `Lat: ${lat} Lng: ${lng}`,
    Company: companyName,
    catchPhrase: catchPhrase,
    bs: bs,
  };
};

// create a header for our table
const createTableHeader = function (data) {
  if (tableHeader) {
    for (key in data) {
      tableHeader.insertAdjacentHTML(
        "beforeend",
        `<th scope="col">${key}</th>`
      );
    }
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
  if (tableBody) tableBody.appendChild(row);
};

if (allUsers) {
  allUsers.addEventListener("click", function () {
    window.location = "table.html";
  });
}

// create a list of users for the fetched data
(async function () {
  let data;
  try {
    data = await usersDate("https://jsonplaceholder.typicode.com/users");
  } catch (err) {
    console.log(err);
  }

  // now data is available , we can show users in the page

  // create a header for our table
  createTableHeader(destrucObject(data[0]));

  // loop for all users
  data.forEach((user) => {
    // create User and insert it into table
    creatUser(user);
  });
})();
