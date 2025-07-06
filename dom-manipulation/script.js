// Initial array of quotes
let quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "The journey of a thousand miles begins with one step.", category: "Inspiration" }
];

// Function to show a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  document.getElementById("quoteText").innerText = `"${quote.text}"`;
  document.getElementById("quoteCategory").innerText = `— ${quote.category}`;
}

// Function to add a new quote
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (newText === "" || newCategory === "") {
    alert("Please enter both quote and category.");
    return;
  }

  quotes.push({ text: newText, category: newCategory });

  textInput.value = "";
  categoryInput.value = "";
  alert("New quote added!");
}

// Event listener for 'Show New Quote' button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Show a quote on initial load
showRandomQuote();
