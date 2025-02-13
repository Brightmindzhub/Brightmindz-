document.addEventListener("DOMContentLoaded", function () {
    const categoryName = new URLSearchParams(window.location.search).get("category");

    if (!categoryName) {
        document.getElementById("category-title").innerText = "No Category Selected";
        document.getElementById("category-content").innerText = "Please select a category from the homepage.";
    } else {
        document.getElementById("category-title").innerText = categoryName;
        document.getElementById("category-content").innerHTML = `You selected <strong>${categoryName}</strong> category.`;
    }
});

// ✅ Open category.html from Homepage folder
document.querySelectorAll(".category-item").forEach(item => {
    item.addEventListener("click", function () {
        const categoryName = this.dataset.category; // Assuming data-category is set
        window.location.href = `Homepage/category.html?category=${encodeURIComponent(categoryName)}`;
    });
});