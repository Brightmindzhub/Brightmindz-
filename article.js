// URL se article ID get karna
const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get("id");

// Articles JSON file se data fetch karke, selected article ko dikhana
fetch("articles.json")
    .then(response => response.json())
    .then(data => {
        let selectedArticle = data.find(article => article.id == articleId);
        if (selectedArticle) {
            document.getElementById("article-content").innerHTML = `
                <h2>${selectedArticle.title}</h2>
                <p><strong>Category:</strong> ${selectedArticle.category} | <strong>Date:</strong> ${selectedArticle.date}</p>
                <p>${selectedArticle.content}</p>
                <a href="index.html">← Back to Home</a>
            `;
        } else {
            document.getElementById("article-content").innerHTML = `<p>Article not found!</p>`;
        }
    })
    .catch(error => console.error("Error loading article:", error));