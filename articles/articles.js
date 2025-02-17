// ✅ Load Articles
let data = [];

fetch("https://brightmindzhub.github.io/Brightmindz-/articles.json")
  .then(response => response.json())
  .then(jsonData => {
    if (!Array.isArray(jsonData) || jsonData.length === 0) {
      console.error("❌ JSON is empty or not an array!");
      return;
    }

    data = jsonData;
    renderRelatedArticles();
  })
  .catch(error => console.error("❌ Error loading JSON:", error));

function renderRelatedArticles() {
  // Get the current article ID from the URL
  const currentArticleId = new URLSearchParams(window.location.search).get('id');
  const currentArticle = data.find(article => article.id == currentArticleId);

  if (!currentArticle) {
    console.error("❌ Current article not found!");
    return;
  }

  // Filter related articles from the same category (excluding the current article)
  const relatedArticles = data.filter(article => article.category === currentArticle.category && article.id != currentArticle.id);

  // Display only 2 related articles
  const relatedArticlesContainer = document.getElementById('related-articles-container');
  relatedArticlesContainer.innerHTML = '';  // Clear previous content

  // Show up to 2 related articles
  relatedArticles.slice(0, 2).forEach(article => {
    let articleDiv = document.createElement('div');
    articleDiv.classList.add('related-article');

    articleDiv.innerHTML = `
      <a href="${article.url}">
        <img src="${article.image}" alt="${article.title}" class="related-article-image">
        <h3>${article.title}</h3>
        <p>${article.preview}</p>
      </a>
    `;

    relatedArticlesContainer.appendChild(articleDiv);
  });

  // Add "Go Back" button
  const goBackButton = document.getElementById('go-back-button');
  goBackButton.addEventListener('click', function() {
    window.history.back();
  });
}