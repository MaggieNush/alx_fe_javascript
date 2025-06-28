document.addEventListener('DOMContentLoaded', function() {
    let quotes = [
        { text: "Stay juicy, my friend.", category: "Motivation" },
    { text: "Fruits first, drama later.", category: "Health" },
    { text: "You're doing better than you think.", category: "Encouragement" }
    ];

    const newQuoteButton = document.getElementById('newQuote');

    newQuoteButton.addEventListener('click', function() {

    let randomIndex = Math.floor(Math.random() * quotes.length);
    let randomQuote = quotes[randomIndex]

    document.getElementById('quoteDisplay').innerHTML = `"${randomQuote.text}" - ${randomQuote.category}`
    });

    function showRandomQuote() {
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
            let newText = quoteInput.value;
            let newCategory = categoryInput.value;

            if (newText.trim() === "" || newCategory.trim() === "") {
                alert("Please fill in both the quote and category");
                return;

            }

            quotes.push({
                text: newText,
                category: newCategory
            });

            alert("Quote added successfully!");

            quoteInput.value = "";
            categoryInput.value = "";
        }); 

    };
        
    showRandomQuote();
    
});

