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