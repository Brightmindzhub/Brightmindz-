document.addEventListener("DOMContentLoaded", function () {
    const articleContainer = document.getElementById("article-content");

    // ✅ URL से `id` get करो
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = parseInt(urlParams.get("id"), 10); // Convert to number

    if (!articleId || isNaN(articleId)) {
        articleContainer.innerHTML = "<p>❌ Article not found.</p>";
        return;
    }

    // ✅ Articles load करो
    fetch("https://brightmindzhub.github.io/Brightmindz-/articles.json")
        .then(response => response.json())
        .then(articles => {
            const article = articles.find(a => a.id === articleId);

            if (!article) {
                articleContainer.innerHTML = "<p>❌ Article not found.</p>";
                return;
            }

            // ✅ Article display करो
            articleContainer.innerHTML = `
                <h1 id="article-title">${article.title}</h1>
                <p><strong>Category:</strong> ${article.category} | <strong>Date:</strong> ${article.date}</p>
                <p>${article.preview}</p>
            `;
        })
        .catch(error => {
            console.error("❌ Error loading article:", error);
            articleContainer.innerHTML = "<p>❌ Error loading article.</p>";
        });
});


// ✅ **Dynamic Meta Tags Update karo**
            document.title = article.title; // Page Title Update
            document.querySelector("meta[name='description']").setAttribute("content", article.preview);
            document.querySelector("meta[name='keywords']").setAttribute("content", `${article.category}, Articles, Brightmindz`);

            // **Open Graph Meta Tags (Facebook, LinkedIn, WhatsApp)**
            document.querySelector("meta[property='og:type']").setAttribute("content", "article");
            document.querySelector("meta[property='og:title']").setAttribute("content", article.title);
            document.querySelector("meta[property='og:description']").setAttribute("content", article.preview);
            document.querySelector("meta[property='og:image']").setAttribute("content", article.image || "https://brightmindzhub.github.io/default.jpg");
            document.querySelector("meta[property='og:url']").setAttribute("content", window.location.href);

            // **Twitter Cards**
            document.querySelector("meta[name='twitter:card']").setAttribute("content", "summary_large_image");
            document.querySelector("meta[name='twitter:title']").setAttribute("content", article.title);
            document.querySelector("meta[name='twitter:description']").setAttribute("content", article.preview);
            document.querySelector("meta[name='twitter:image']").setAttribute("content", article.image || "https://brightmindzhub.github.io/default.jpg");
        })