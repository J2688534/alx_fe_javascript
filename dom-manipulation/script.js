let quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "The journey of a thousand miles begins with one step.", category: "Inspiration" }
];

// DOM references
const quoteTextEl = document.getElementById("quoteText");
const quoteCategoryEl = document.getElementById("quoteCategory");
const quoteDisplay = document.getElementById("quoteDisplay");
const categoryFilter = document.getElementById("categoryFilter");

// Show a random quote
function showRandomQuote() {
  const selectedCategory = categoryFilter.value;
  const filteredQuotes = selectedCategory === "All"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteTextEl.innerText = "No quotes found for this category.";
    quoteCategoryEl.innerText = "";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];

  quoteTextEl.innerText = `"${quote.text}"`;
  quoteCategoryEl.innerText = `— ${quote.category}`;
}

// Update category filter dropdown
function updateCategoryDropdown() {
  const categories = ["All", ...new Set(quotes.map(q => q.category))];

  categoryFilter.innerHTML = ""; // Clear options
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });
}

// Add new quote
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value.trim();
  const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (!newQuoteText || !newQuoteCategory) {
    alert("Please fill in both fields.");
    return;
  }

  quotes.push({ text: newQuoteText, category: newQuoteCategory });

  // Clear inputs
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  updateCategoryDropdown();
  alert("Quote added!");
}

// Event listeners
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
categoryFilter.addEventListener("change", showRandomQuote);

// Initial load
updateCategoryDropdown();
showRandomQuote();
