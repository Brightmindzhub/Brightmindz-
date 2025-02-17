document.addEventListener("DOMContentLoaded", async function () {
    const articleContainer = document.getElementById("article-content");

    // ✅ URL se `id` get karo  
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = parseInt(urlParams.get("id"), 10); // Convert to number

    if (!articleId || isNaN(articleId)) {
        articleContainer.innerHTML = "<p>❌ Article not found.</p>";
        return;
    }

    try {
        // ✅ **Articles Fetch karo**
        const response = await fetch("https://brightmindzhub.github.io/Brightmindz-/articles.json");
        const articles = await response.json();

        const article = articles.find(a => a.id === articleId);
        if (!article) {
            articleContainer.innerHTML = "<p>❌ Article not found.</p>";
            return;
        }

        // ✅ **Article Content Format karo**
        let contentHTML = "";
        if (typeof article.content === "object") {
            for (const [key, value] of Object.entries(article.content)) {
                contentHTML += `<h2>${key}</h2>`; // ✅ Section Heading
                
                if (typeof value === "object") {
                    // ✅ Agar nested object hai, toh properly format karo
                    if (typeof value === "object") {
                        contentHTML += `<ul>`; // List format me show karne ke liye
                        for (const [subKey, subValue] of Object.entries(value)) {
                            if (typeof subValue === "object") { 
                                // ✅ **Agar subValue bhi ek object hai (e.g., Prices section), toh nested loop use karo**
                                contentHTML += `<li><strong>${subKey}:</strong><ul>`;
                                for (const [subSubKey, subSubValue] of Object.entries(subValue)) {
                                    contentHTML += `<li>${subSubKey}: ${subSubValue}</li>`;
                                }
                                contentHTML += `</ul></li>`;
                            } else {
                                contentHTML += `<li><strong>${subKey}:</strong> ${subValue}</li>`;
                            }
                        }
                        contentHTML += `</ul>`;
                    }
                    
                } else {
                    contentHTML += `<p>${value}</p>`; // ✅ Normal Text
                }
            }
        } else {
            contentHTML = `<p>${article.preview}</p>`; // ✅ Backup content
        }

        // ✅ **Article Display karo**
        const imageUrl = article.image || "https://brightmindzhub.github.io/default.jpg";

        articleContainer.innerHTML = `
            <h1 id="article-title">${article.title}</h1>
            <p><strong>Category:</strong> ${article.category} | <strong>Date:</strong> ${article.date}</p>
            <img src="${imageUrl}" alt="Article Image" style="max-width:100%;">
            ${contentHTML} <!-- ✅ Formatted Content -->
        `;

        // ✅ **Meta Tags Update karo (SEO + Social Media)**
        updateMetaTags(article, imageUrl);
    } catch (error) {
        console.error("❌ Error loading article:", error);
        articleContainer.innerHTML = "<p>❌ Error loading article.</p>";
    }
});

// ✅ **Meta Tags Update karne ka Function**
function updateMetaTags(article, imageUrl) {
    document.title = article.title;
    setMetaTag("description", article.preview);
    setMetaTag("keywords", `${article.category}, Articles, Brightmindz`);

    // ✅ **Open Graph Meta Tags (Facebook, LinkedIn, WhatsApp)**
    setMetaTag("og:type", "article", true);
    setMetaTag("og:title", article.title, true);
    setMetaTag("og:description", article.preview, true);
    setMetaTag("og:image", imageUrl, true); // Dynamic image
    setMetaTag("og:url", window.location.href, true);

    // ✅ **Twitter Cards**
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", article.title);
    setMetaTag("twitter:description", article.preview);
    setMetaTag("twitter:image", imageUrl); // Dynamic image
}

// ✅ **Meta Tag Update karne wala Helper Function**
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