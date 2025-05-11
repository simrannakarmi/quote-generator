const quoteText = document.getElementById("quote-text");
const author = document.getElementById("author");
const categorySelect = document.getElementById("category-select");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const randomButton = document.getElementById("random-button");
const increaseFont = document.getElementById("increase-font");
const decreaseFont = document.getElementById("decrease-font");

// dark mode variables
const darkModeToggle = document.getElementById("dark-mode-toggle");
const modeLabel = document.getElementById("mode-label");
const modeIcon = document.getElementById("mode-icon");
const moonSVG = `
  <svg width="20px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#4e4b4b" stroke-width="1.536"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#eceef3"></path> </g></svg>
`;
const sunSVG = `
  <svg width="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clip-path="url(#F8F8F8a)" fill="#F8F8F8"> <path d="M12 0a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V1a1 1 0 0 1 1-1ZM4.929 3.515a1 1 0 0 0-1.414 1.414l2.828 2.828a1 1 0 0 0 1.414-1.414L4.93 3.515ZM1 11a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2H1ZM18 12a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1ZM17.657 16.243a1 1 0 0 0-1.414 1.414l2.828 2.828a1 1 0 1 0 1.414-1.414l-2.828-2.828ZM7.757 17.657a1 1 0 1 0-1.414-1.414L3.515 19.07a1 1 0 1 0 1.414 1.414l2.828-2.828ZM20.485 4.929a1 1 0 0 0-1.414-1.414l-2.828 2.828a1 1 0 1 0 1.414 1.414l2.828-2.828ZM13 19a1 1 0 1 0-2 0v4a1 1 0 1 0 2 0v-4ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"></path> </g> <defs> <clipPath id="a"> <path fill="#F8F8F8ffffff" d="M0 0h24v24H0z"></path> </clipPath> </defs> </g></svg>
`;

let currentCategory = "";
let currentIndex = 0;
let fontSize = 22;

if (typeof quotes === "undefined" || Object.keys(quotes).length === 0) {
  quoteText.textContent = "No quotes available.";
  author.textContent = "";
  categorySelect.innerHTML = "<option disabled select>No categories</option>";
} else {
  currentCategory = Object.keys(quotes)[0];

  // Category dropdown
  for (let category in quotes) {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category[0].toUpperCase() + category.slice(1);
    categorySelect.appendChild(option);
  }

  // Displays quote
  function displayQuote() {
    const quote = quotes[currentCategory][currentIndex];
    quoteText.textContent = `"${quote.text}"`;
    author.textContent = `- ${quote.author}`;
  }

  categorySelect.addEventListener("change", () => {
    currentCategory = categorySelect.value;
    currentIndex = 0;
    displayQuote();
  });

  prevButton.addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + quotes[currentCategory].length) %
      quotes[currentCategory].length;
    displayQuote();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % quotes[currentCategory].length;
    displayQuote();
  });

  randomButton.addEventListener("click", () => {
    const len = quotes[currentCategory].length;
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * len);
    } while (randomIndex === currentIndex);

    currentIndex = randomIndex;
    displayQuote();
  });

  increaseFont.addEventListener("click", () => {
    fontSize = Math.min(fontSize + 2, 40);
    quoteText.style.fontSize = `${fontSize}px`;
  });

  decreaseFont.addEventListener("click", () => {
    fontSize = Math.max(fontSize - 2, 12);
    quoteText.style.fontSize = `${fontSize}px`;
  });

  displayQuote();
}

// darkmode
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  const isDark = document.body.classList.contains("dark-mode");
  modeLabel.textContent = isDark ? "Light Mode" : "Dark Mode";
  modeIcon.innerHTML = isDark ? sunSVG : moonSVG;
});

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("footer-year").textContent = new Date().getFullYear();
});
