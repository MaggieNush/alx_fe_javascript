document.addEventListener('DOMContentLoaded', function() {
    let quotes = [
    { text: "Stay juicy, my friend.", category: "Motivation" },
    { text: "Fruits first, drama later.", category: "Health" },
    { text: "You're doing better than you think.", category: "Encouragement" }
    ];

    function addQuote(text, category) {
        quotes.push({text, category});
        alert("Quote added succesfully!")
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
        let randomQuote = quotes[randomIndex]

    document.getElementById('quoteDisplay').innerHTML = `"${randomQuote.text}" - ${randomQuote.category}`;
    }

    const newQuoteButton = document.getElementById('newQuote');

    newQuoteButton.addEventListener('click', showRandomQuote);
        
    createAddQuoteForm();
    
});

