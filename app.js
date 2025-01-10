const userListElement = document.querySelector(".user-list");
const searchInput = document.querySelector("#searchName");
const cityFilter = document.querySelector("#filterCity");
const errorMessageElement = document.querySelector("#error-message");
const loadingIndicator = document.querySelector("#loading-indicator");

const API_URL = "https://jsonplaceholder.typicode.com/users";

let usersData = [];

function showError(message) {
  errorMessageElement.textContent = message;
  errorMessageElement.style.display = "block";
}

function hideError() {
  errorMessageElement.textContent = "";
  errorMessageElement.style.display = "none";
}

function showLoading() {
  loadingIndicator.style.display = "block";
}

function hideLoading() {
  loadingIndicator.style.display = "none";
}

function fetchUsers() {
  hideError();
  showLoading();

  fetch(API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error na requisição: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      usersData = data.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        city: user.address.city,
      }));

      displayUsers(usersData);
      populateCityFilter(usersData);
      applySavedFilters();
      saveFilters();
    })
    .catch((error) => {
      console.error("Erro ao buscar usuários:", error.message);
      showError(`Erro ao buscar usuários: ${error.message}`);
    })
    .finally(() => {
      hideLoading();
    });
}

function displayUsers(users) {
  userListElement.innerHTML = "";

  if (users.length === 0) {
    showError("Nenhum usuário encontrado com o nome informado.");
    return;
  }

  hideError();

  users.forEach((user) => {
    const userItem = createUserItem(user);
    userListElement.appendChild(userItem);
  });
}

function createUserItem(user) {
  const listItem = document.createElement("li");
  listItem.innerHTML = `
    <strong>${user.name}</strong>
    <p>Email: ${user.email}</p>
    <p>Cidade: ${user.city}</p>
  `;

  return listItem;
}

function populateCityFilter(usersList) {
  const uniqueCities = getUniqueCities(usersList);

  cityFilter.innerHTML = '<option value="">Filtrar por cidade</option>';

  uniqueCities.forEach((city) => {
    const cityOption = createCityOption(city);
    cityFilter.appendChild(cityOption);
  });
}

function getUniqueCities(usersList) {
  return [...new Set(usersList.map((user) => user.city))];
}

function createCityOption(city) {
  const option = document.createElement("option");
  option.value = city;
  option.textContent = city;

  return option;
}

function saveFilters() {
  const searchTerm = searchInput.value;
  const selectedCity = cityFilter.value;

  localStorage.setItem("searchName", searchTerm);
  localStorage.setItem("filterCity", selectedCity);
}

function applySavedFilters() {
  const savedName = localStorage.getItem("searchName") || "";
  const savedCity = localStorage.getItem("filterCity") || "";

  searchInput.value = savedName;
  cityFilter.value = savedCity;

  let filteredUsers = usersData;

  if (savedName) {
    filteredUsers = filteredUsers.filter((user) =>
      user.name.toLowerCase().includes(savedName.toLowerCase())
    );
  }

  if (savedCity) {
    filteredUsers = filteredUsers.filter((user) => user.city === savedCity);
  }

  displayUsers(filteredUsers);
}

function filterByName() {
  saveFilters();
  const searchTerm = searchInput.value.toLowerCase();
  const filteredUsers = usersData.filter((user) =>
    user.name.toLowerCase().includes(searchTerm)
  );

  displayUsers(filteredUsers);
}

function filterByCity() {
  saveFilters();
  const selectedCity = cityFilter.value;
  const filteredUsers = selectedCity
    ? usersData.filter((user) => user.city === selectedCity)
    : usersData;
  displayUsers(filteredUsers);
}

searchInput.addEventListener("input", filterByName);
cityFilter.addEventListener("change", filterByCity);

fetchUsers();
