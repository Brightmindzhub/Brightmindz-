document.addEventListener('DOMContentLoaded', function () {
  // Load the JSON data
  fetch('../articles.json')
    .then(response => response.json())
    .then(data => {
      // Get the current article category from URL or context
      const currentArticleId = new URLSearchParams(window.location.search).get('id');
      const currentArticle = data.find(article => article.id === parseInt(currentArticleId));
      
      // Display related articles based on the same category
      const relatedArticles = data.filter(article => article.category === currentArticle.category && article.id !== currentArticle.id);
      displayRelatedArticles(relatedArticles);
    });

  function displayRelatedArticles(articles) {
    const container = document.getElementById('related-articles-container');
    
    // Show only 2 related articles
    articles.slice(0, 2).forEach(article => {
      const articleDiv = document.createElement('div');
      articleDiv.classList.add('related-article');
      
      articleDiv.innerHTML = `
        <a href="${article.url}">
          <img src="${article.image}" alt="${article.title}">
          <h3>${article.title}</h3>
          <p>${article.preview}</p>
        </a>
      `;
      
      container.appendChild(articleDiv);
    });
  }
});