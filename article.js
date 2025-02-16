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

            // ✅ **Content Formatting (Headings + Paragraphs)**
            let contentHTML = "";
            if (typeof article.content === "string") {
                contentHTML = `<p>${article.content.replace(/\n/g, "</p><p>")}</p>`; 
            } else if (Array.isArray(article.content)) {
                contentHTML = article.content.map(text => {
                    if (text.startsWith("# ")) {
                        return `<h2>${text.replace("# ", "")}</h2>`; // ✅ **Main Heading (H2)**
                    } else if (text.startsWith("## ")) {
                        return `<h3>${text.replace("## ", "")}</h3>`; // ✅ **Sub Heading (H3)**
                    } else {
                        return `<p>${text}</p>`; // ✅ **Normal Paragraph**
                    }
                }).join("");
            } else if (typeof article.content === "object") {
                contentHTML = `<pre>${JSON.stringify(article.content, null, 2)}</pre>`; // ✅ **Backup for Objects**
            } else {
                contentHTML = `<p>${article.preview}</p>`; // ✅ **Backup if no content**
            }

            // ✅ Article **FULL CONTENT with Formatting**
            articleContainer.innerHTML = `
                <h1 id="article-title">${article.title}</h1>
                <p><strong>Category:</strong> ${article.category} | <strong>Date:</strong> ${article.date}</p>
                <img src="${article.image || 'https://brightmindzhub.github.io/default.jpg'}" alt="Article Image" style="max-width:100%;">
                ${contentHTML} <!-- ✅ Formatted Content -->
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