document.addEventListener("DOMContentLoaded", function() {
    // Sidebar Toggle
    const menuIcon = document.querySelector(".menu-icon");
    const sidebar = document.querySelector(".sidebar");

    menuIcon.addEventListener("click", function() {
        sidebar.classList.toggle("active");
    });

    document.addEventListener("click", function(event) {
        if (!sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
            sidebar.classList.remove("active"); // Sidebar ke bahar click karne par band ho jaye
        }
    });

    // Search Bar Expand
    const searchContainer = document.querySelector(".search-container");
    const searchInput = document.getElementById("searchInput");

    searchContainer.addEventListener("click", function() {
        searchContainer.classList.add("active");
        searchInput.focus();
    });

    document.addEventListener("click", function(event) {
        if (!searchContainer.contains(event.target)) {
            searchContainer.classList.remove("active");
        }
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const categoryBtn = document.getElementById("categoryBtn");
    const categoryList = document.getElementById("categoryList");

    categoryBtn.addEventListener("click", function() {
        if (categoryList.classList.contains("open")) {
            categoryList.style.maxHeight = "0px";
            categoryList.style.opacity = "0";
            categoryList.classList.remove("open");
        } else {
            categoryList.style.maxHeight = "300px";
            categoryList.style.opacity = "1";
            categoryList.classList.add("open");
        }
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const sortBtn = document.getElementById("sortBtn");
    const sortList = document.getElementById("sortList");
    const viewBtn = document.getElementById("viewBtn");

    sortBtn.addEventListener("click", function(event) {
        event.stopPropagation();
        sortList.classList.toggle("open");
    });

    document.addEventListener("click", function(event) {
        if (!sortBtn.contains(event.target) && !sortList.contains(event.target)) {
            sortList.classList.remove("open");
        }
    });

    let isGridView = true;
    viewBtn.addEventListener("click", function() {
        isGridView = !isGridView;
        viewBtn.textContent = isGridView ? "Grid View" : "List View";
    });
});

