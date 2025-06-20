let age_form = document.getElementById("age_form");
let username = document.getElementById("username");
let dob = document.getElementById("dob");
let output_section = document.getElementById("output_section");

let today = new Date();
let year = today.getFullYear();
let month = String(today.getMonth() + 1).padStart(2, "0");
let day = String(today.getDate()).padStart(2, "0");
dob.max = `${year}-${month}-${day}`;

let ages_output = [];

function renderOutputBox(
  name,
  birthDate,
  years,
  months,
  days,
  totalMonths,
  totalDays
) {
  const userEntry = {
    name,
    birthDate,
    years,
    months,
    days,
    totalMonths,
    totalDays,
    timestamp: new Date(),
  };

  ages_output.push(userEntry);

  let userEntrySection = document.createElement("section");
  userEntrySection.classList.add("user_entry", "flex_col_start");

  userEntrySection.innerHTML = `
      <p>Date of Birth is ${birthDate}</p>
      <p><span>${name}</span> is ${years} years, ${months} months, ${days} days old</p>
      <p><span>${name}</span> is ${years} years old</p>
      <p><span>${name}</span> is ${totalMonths} months old</p>
      <p><span>${name}</span> is ${totalDays} days old</p>
    `;

  output_section.appendChild(userEntrySection);
}

function getData(dobValue) {
  let today = new Date();
  let birthDate = new Date(dobValue);

  if (today < birthDate) {
    alert("Invalid date of birth - cannot be in the future");
    return;
  }

  let currentYear = today.getFullYear();
  let currentMonth = today.getMonth();
  let currentDay = today.getDate();

  let birthYear = birthDate.getFullYear();
  let birthMonth = birthDate.getMonth();
  let birthDay = birthDate.getDate();

  let calculatedYear = currentYear - birthYear;
  let calculatedMonth = currentMonth - birthMonth;
  let calculatedDay = currentDay - birthDay;

  if (calculatedDay < 0) {
    calculatedMonth--;
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
    calculatedDay += daysInPrevMonth;
  }

  if (calculatedMonth < 0) {
    calculatedYear--;
    calculatedMonth += 12;
  }

  let totalMonths = calculatedYear * 12 + calculatedMonth;

  const timeDiff = today.getTime() - birthDate.getTime();
  const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  renderOutputBox(
    username.value,
    birthDate.toDateString(),
    calculatedYear,
    calculatedMonth,
    calculatedDay,
    totalMonths,
    totalDays
  );
}

age_form.addEventListener("submit", (e) => {
  e.preventDefault();

  getData(dob.value);

  username.value = "";
  dob.value = "";
});
