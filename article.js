document.addEventListener("DOMContentLoaded", async function () {
    const articleContainer = document.getElementById("article-content");

    // ✅ URL से `id` get करो  
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = parseInt(urlParams.get("id"), 10); // Convert to number

    if (!articleId || isNaN(articleId)) {
        articleContainer.innerHTML = "<p>❌ Article not found.</p>";
        return;
    }

    try {
        // ✅ **Articles Fetch करो**
        const response = await fetch("https://brightmindzhub.github.io/Brightmindz-/articles.json");
        const articles = await response.json();

        const article = articles.find(a => a.id === articleId);
        if (!article) {
            articleContainer.innerHTML = "<p>❌ Article not found.</p>";
            return;
        }

        // ✅ **Article Content Format करो**
        let contentHTML = "";
        if (typeof article.content === "object") {
            for (const [key, value] of Object.entries(article.content)) {
                contentHTML += `<h2>${key}</h2>`; // ✅ Section Heading
                
                if (typeof value === "object") {
                    // ✅ Agar nested object hai, toh properly format karo
                    for (const [subKey, subValue] of Object.entries(value)) {
                        contentHTML += `<p><strong>${subKey}:</strong> ${subValue}</p>`;
                    }
                } else {
                    contentHTML += `<p>${value}</p>`; // ✅ Normal Text
                }
            }
        } else {
            contentHTML = `<p>${article.preview}</p>`; // ✅ Backup content
        }

        // ✅ **Article Display करो**
        const imageUrl = article.image || "https://brightmindzhub.github.io/default.jpg";

        articleContainer.innerHTML = `
            <h1 id="article-title">${article.title}</h1>
            <p><strong>Category:</strong> ${article.category} | <strong>Date:</strong> ${article.date}</p>
            <img src="${imageUrl}" alt="Article Image" style="max-width:100%;">
            ${contentHTML} <!-- ✅ Formatted Content -->
        `;

        // ✅ **Meta Tags Update करो (SEO + Social Media)**
        updateMetaTags(article, imageUrl);
    } catch (error) {
        console.error("❌ Error loading article:", error);
        articleContainer.innerHTML = "<p>❌ Error loading article.</p>";
    }
});

// ✅ **Meta Tags Update करने का Function**
function updateMetaTags(article, imageUrl) {
    document.title = article.title;
    setMetaTag("description", article.preview);
    setMetaTag("keywords", `${article.category}, Articles, Brightmindz`);

    // ✅ **Open Graph Meta Tags (Facebook, LinkedIn, WhatsApp)**
    setMetaTag("og:type", "article", true);
    setMetaTag("og:title", article.title, true);
    setMetaTag("og:description", article.preview, true);
    setMetaTag("og:image", imageUrl, true);
    setMetaTag("og:url", window.location.href, true);

    // ✅ **Twitter Cards**
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", article.title);
    setMetaTag("twitter:description", article.preview);
    setMetaTag("twitter:image", imageUrl);
}

// ✅ **Meta Tag Update करने वाला Helper Function**
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