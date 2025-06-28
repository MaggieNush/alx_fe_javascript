document.addEventListener('DOMContentLoaded', function() {
    let storedQuotes = localStorage.getItem('quotes')
    let defaultQuotes = [
    { text: "Stay juicy, my friend.", category: "Motivation" },
    { text: "Fruits first, drama later.", category: "Health" },
    { text: "You're doing better than you think.", category: "Encouragement" }
    ];

    let quotes = storedQuotes ? JSON.parse(storedQuotes) : defaultQuotes;
    
    
    function saveQuotes() {
        localStorage.setItem('quotes', JSON.stringify(quotes));
    }

    function addQuote(text, category) {
        quotes.push({text, category});
        saveQuotes();
        alert("Quote added succesfully!")
    }

    let lastQuote = sessionStorage.getItem('lastQuote');
    if (lastQuote) {
        let quote = JSON.parse(lastQuote);
        document.getElementById('quoteDisplay').innerHTML =
            `"${quote.text}" - ${quote.category}`;
    }

    function createAddQuoteForm() {
        let form = document.createElement('form');
        let quoteInput = document.createElement('input');
        quoteInput.type = "text";
        quoteInput.placeholder = "Enter a new quote";

        let categoryInput = document.createElement('input');
        categoryInput.type = "text";
        categoryInput.placeholder = "Enter quote category";

        let submitButton = document.createElement('button');
        submitButton.type = "submit";
        submitButton.textContent = "Add Quote";

        form.appendChild(quoteInput);
        form.appendChild(categoryInput);
        form.appendChild(submitButton);

        document.body.appendChild(form);

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            let newText = quoteInput.value;
            let newCategory = categoryInput.value;

            if (newText.trim() === "" || newCategory.trim() === "") {
                alert("Please fill in both the quote and category");
                return;

            }

            addQuote(newText, newCategory);

            quoteInput.value = "";
            categoryInput.value = "";
        }); 

    }


    function showRandomQuote() {
        let randomIndex = Math.floor(Math.random() * quotes.length);
        let randomQuote = quotes[randomIndex];

        sessionStorage.setItem('lastQuote', JSON.stringify(randomQuote));
        document.getElementById('quoteDisplay').innerHTML = `"${randomQuote.text}" - ${randomQuote.category}`;
    }

    const newQuoteButton = document.getElementById('newQuote');

    newQuoteButton.addEventListener('click', showRandomQuote);

    function exportToJsonFile() {
        const dataStr = JSON.stringify(quotes, null, 2);
        const blob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(blob);

        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'quotes.json';
        downloadLink.click();

        URL.revokeObjectURL(url);
    }
        
    createAddQuoteForm();
    
});

