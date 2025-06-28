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
        populateCategories();
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

    function importFromJSONFile(event) {
        const fileReader = new FileReader();

        fileReader.onload = function(event) {
            try {
                const importedQuotes = JSON.parse(event.target.result);

                if (Array.isArray(importedQuotes)) {
                    importedQuotes.forEach(q => {
                        if (q.text && q.category) {
                            quotes.push(q);
                        }
                    });

                    saveQuotes();
                    alert("Quotes imported successfully!");
                } else {
                    alert("Invalid file format. Please upload a valid quotes JSON.");

                } 
            
            } catch (error) {
                alert("Error reading this file. Make sure it's a valid JSON.");
                console.error(error);
            }
        };
        fileReader.readAsText(event.target.files[0]);
    }

    const importInput = document.getElementById('importFile');
    importInput.addEventListener('change', importFromJSONFile);
      
    function populateCategories() {
        // const categorySet = new Set();
        // quotes.forEach(q => categorySet.add(q.category));

        const dropdown = document.getElementById('categoryFilter');
        dropdown.innerHTML = '<option value="all">All Categories</option>';

        const categories = quotes.map(q => q.category);

        const uniqueCategories = [...new Set(categories)];

        uniqueCategories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            dropdown.appendChild(option);
        });

        const savedCategory = localStorage.getItem('selectedCategory');
        if (savedCategory) {
            dropdown.value = savedCategory;
            filterQuotes();
        }
    }

    function filterQuotes() {
        const selectedCategory = document.getElementById('categoryFilter').value;
        localStorage.setItem('selectedCategory', selectedCategory);

        let filteredQuotes = selectedCategory === 'all'
            ? quotes
            : quotes.filter(q => q.category === selectedCategory);

        if (filteredQuotes.length === 0) {
            document.getElementById('quoteDisplay').innerHTML = 'No quotes available in this category';
            return;
        }

        let randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        let randomQuote = filteredQuotes[randomIndex];

        sessionStorage.setItem('lastQuote', JSON.stringify(randomQuote));
        document.getElementById('quoteDisplay').innerHTML = `"${randomQuote.text}" - ${randomQuote.category}`;
    }

    let mockServerQuotes = [
        { text: "Server-side wisdom.", category: "Server"},
        { text: "Well synced.", category: "Tech"}
    ]

    function fetchFromServer() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(mockServerQuotes);
            }, 1000);
        });
    }

    function postToServer(newQuotes) {
        return new Promise(resolve => {
            setTimeout(() => {
                mockServerQuotes = [...newQuotes];
                resolve("Server updated!");
            }, 1000);
        });
    }

    function syncWithServer() {
        fetchFromServer().then(serverQuotes => {
            const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];

            const localJson = JSON.stringify(localQuotes);
            const serverJson = JSON.stringify(serverQuotes);

            if (localJson !== serverJson) {
                localStorage.setItem('quotes', JSON.stringify(serverQuotes));
                quotes = serverQuotes;
                populateCategories();
                alert("Quotes updated from server (server took priority).");
            
            }
        });
    
    showNotification("Quotes updated from server (server took priority).");
    }

    syncWithServer();
    setInterval(syncWithServer, 10000);

    function showNotification(message) {
        const note = document.getElementById('notification');
        note.textContent = message;
        note.style.display = 'block';
        setTimeout(() => {
            note.style.display = 'none';
        }, 5000);
    }

    createAddQuoteForm();
    const exportButton = document.getElementById('exportQuotes');
    exportButton.addEventListener('click', exportToJsonFile);
    
    populateCategories();
    document.getElementById('categoryFilter')
            .addEventListener('change', filterQuotes)
});



