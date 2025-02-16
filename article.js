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

            // ✅ **Content Format Fix**
            let contentText = "";
            if (typeof article.content === "string") {
                contentText = article.content; // ✅ Agar string hai, to direct use karo
            } else if (Array.isArray(article.content)) {
                contentText = article.content.join("<br><br>"); // ✅ Array hai, to paragraphs ke form me dikhana
            } else if (typeof article.content === "object") {
                contentText = JSON.stringify(article.content, null, 2); // ✅ Object hai, to readable format me convert karna
            } else {
                contentText = article.preview; // ✅ Backup agar content na ho
            }

            // ✅ Article **FULL CONTENT** display karo
            articleContainer.innerHTML = `
                <h1 id="article-title">${article.title}</h1>
                <p><strong>Category:</strong> ${article.category} | <strong>Date:</strong> ${article.date}</p>
                <img src="${article.image || 'https://brightmindzhub.github.io/default.jpg'}" alt="Article Image" style="max-width:100%;">
                <p>${contentText}</p> <!-- ✅ FIXED CONTENT DISPLAY -->
            `;

            // ✅ **Meta Tags Update karo**
            document.title = article.title;
            document.querySelector("meta[name='description']").setAttribute("content", article.preview);
        })
        .catch(error => {
            console.error("❌ Error loading article:", error);
            articleContainer.innerHTML = "<p>❌ Error loading article.</p>";
        });
});