document.addEventListener("DOMContentLoaded", async function () {
    const articleContainer = document.getElementById("article-content");

    // URL se 'id' get karo
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = parseInt(urlParams.get("id"), 10); // Convert to number

    if (!articleId || isNaN(articleId)) {
        articleContainer.innerHTML = "<p>❌ Article not found.</p>";
        return;
    }

    try {
        // Articles ko fetch karo
        const response = await fetch("https://brightmindzhub.github.io/Brightmindz-/articles.json");
        const articles = await response.json();

        const article = articles.find(a => a.id === articleId);
        if (!article) {
            articleContainer.innerHTML = "<p>❌ Article not found.</p>";
            return;
        }

        // Article content ko format karna
        let contentHTML = "";
        if (typeof article.content === "object") {
            for (const [key, value] of Object.entries(article.content)) {
                contentHTML += `<h2>${key}</h2>`;
                
                if (typeof value === "object") {
                    contentHTML += `<ul>`;
                    for (const [subKey, subValue] of Object.entries(value)) {
                        contentHTML += `<li><strong>${subKey}:</strong> ${subValue}</li>`;
                    }
                    contentHTML += `</ul>`;
                } else {
                    contentHTML += `<p>${value}</p>`;
                }
            }
        } else {
            contentHTML = `<p>${article.preview}</p>`;
        }

        // Article ko display karna
        const imageUrl = article.image || "https://brightmindzhub.github.io/default.jpg";

        articleContainer.innerHTML = `
            <h1 id="article-title">${article.title}</h1>
            <p><strong>Category:</strong> ${article.category} | <strong>Date:</strong> ${article.date}</p>
            <img src="${imageUrl}" alt="Article Image" style="max-width:100%;">
            ${contentHTML}
        `;

        // Meta tags update karna
        updateMetaTags(article, imageUrl);

    } catch (error) {
        console.error("❌ Error loading article:", error);
        articleContainer.innerHTML = "<p>❌ Error loading article.</p>";
    }
});

// Meta Tags ko dynamically update karne wala function
function updateMetaTags(article, imageUrl) {
    document.title = article.title;
    setMetaTag("description", article.preview);
    setMetaTag("keywords", `${article.category}, Articles, Brightmindz`);

    // Open Graph tags
    setMetaTag("og:type", "article", true);
    setMetaTag("og:title", article.title, true);
    setMetaTag("og:description", article.preview, true);
    setMetaTag("og:image", imageUrl, true);
    setMetaTag("og:url", window.location.href, true);

    // Twitter cards
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", article.title);
    setMetaTag("twitter:description", article.preview);
    setMetaTag("twitter:image", imageUrl);
}

// Helper function to set meta tags dynamically
function setMetaTag(name, content, isProperty = false) {
    const selector = isProperty ? `meta[property='${name}']` : `meta[name='${name}']`;
    let metaTag = document.querySelector(selector);

    if (!metaTag) {
        metaTag = document.createElement("meta");
        if (isProperty) {
            metaTag.setAttribute("property", name);
        } else {
            metaTag.setAttribute("name", name);
        }
        document.head.appendChild(metaTag);
    }
    metaTag.setAttribute("content", content);
}