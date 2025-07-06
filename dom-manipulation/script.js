// Keys for storage
const STORAGE_KEY = 'quotes';
const LAST_QUOTE_KEY = 'lastQuote';

let quotes = [];

// Default quotes
const defaultQuotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "The journey of a thousand miles begins with one step.", category: "Inspiration" }
];

// Load from localStorage or fall back to defaults
function loadQuotes() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      quotes = JSON.parse(stored);
    } catch {
      quotes = [...defaultQuotes];
    }
  } else {
    quotes = [...defaultQuotes];
  }
}

// Save to localStorage
function saveQuotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
}

// Show a random quote (filtered by category)
function showRandomQuote() {
  const selected = document.getElementById('categoryFilter').value;
  const pool = selected === 'All'
    ? quotes
    : quotes.filter(q => q.category === selected);

  if (!pool.length) {
    document.getElementById('quoteText').innerText = 'No quotes for this category.';
    document.getElementById('quoteCategory').innerText = '';
    return;
  }

  const q = pool[Math.floor(Math.random() * pool.length)];
  document.getElementById('quoteText').innerText = `"${q.text}"`;
  document.getElementById('quoteCategory').innerText = `— ${q.category}`;

  // Remember last quote in sessionStorage
  sessionStorage.setItem(LAST_QUOTE_KEY, JSON.stringify(q));
}

// Populate the category dropdown
function updateCategoryDropdown() {
  const cats = ['All', ...new Set(quotes.map(q => q.category))];
  const sel = document.getElementById('categoryFilter');
  sel.innerHTML = '';
  cats.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    sel.appendChild(opt);
  });
}

// Add a new quote from the form
function addQuote() {
  const text = document.getElementById('newQuoteText').value.trim();
  const category = document.getElementById('newQuoteCategory').value.trim();
  if (!text || !category) {
    alert('Please fill in both fields.');
    return;
  }

  quotes.push({ text, category });
  saveQuotes();
  updateCategoryDropdown();
  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';
  alert('Quote added!');
}

// Export all quotes as a downloadable JSON file
function exportToJson() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();
  URL.revokeObjectURL(url);
}

// Import quotes from a JSON file input
function importFromJsonFile(evt) {
  const file = evt.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        quotes = quotes.concat(imported);
        saveQuotes();
        updateCategoryDropdown();
        alert('Quotes imported successfully!');
      } else {
        alert('Invalid JSON format.');
      }
    } catch {
      alert('Error reading file.');
    }
  };
  reader.readAsText(file);
}

// Wire everything up on page load
window.addEventListener('DOMContentLoaded', () => {
  loadQuotes();
  updateCategoryDropdown();
  showRandomQuote();

  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
  document.getElementById('exportJson').addEventListener('click', exportToJson);
  document.getElementById('categoryFilter').addEventListener('change', showRandomQuote);
});
