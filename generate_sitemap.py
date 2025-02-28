import os
import json
from datetime import datetime

JSON_FILE = "articles/preview.json"
DOMAIN = "https://rgthinks.top"

sitemap_content = """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
"""

# Static pages manually added
static_pages = [
    f"{DOMAIN}/",
    f"{DOMAIN}/pages/about-us",
    f"{DOMAIN}/pages/contact-us",
    f"{DOMAIN}/pages/terms",
    f"{DOMAIN}/pages/copyright",
    f"{DOMAIN}/pages/privacy",
    f"{DOMAIN}/categories/category.html?category=Technology",
    f"{DOMAIN}/categories/category.html?category=Artificial%20Intelligence",
    f"{DOMAIN}/categories/category.html?category=Programming%20and%20Web%20Development",
    f"{DOMAIN}/categories/category.html?category=Cybersecurity",
    f"{DOMAIN}/categories/category.html?category=Finance%20and%20Cryptocurrency",
    f"{DOMAIN}/categories/category.html?category=Health%20and%20Wellness",
    f"{DOMAIN}/categories/category.html?category=Education%20and%20E-learning",
    f"{DOMAIN}/categories/category.html?category=Science%20and%20Space",
    f"{DOMAIN}/categories/category.html?category=Entertainment%20and%20Movies",
    f"{DOMAIN}/categories/category.html?category=Gaming%20and%20Esports",
    f"{DOMAIN}/search/search.html",
]

# Add static pages to sitemap
for url in static_pages:
    lastmod = datetime.today().strftime('%Y-%m-%d')
    sitemap_content += f"""
    <url>
        <loc>{url}</loc>
        <lastmod>{lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
    </url>
    """

# Add articles dynamically from JSON file
with open(JSON_FILE, "r", encoding="utf-8") as file:
    articles = json.load(file)

for article in articles:
    url = f"{DOMAIN}/{article['url'].replace('../', '')}"
    lastmod = datetime.today().strftime('%Y-%m-%d')
    sitemap_content += f"""
    <url>
        <loc>{url}</loc>
        <lastmod>{lastmod}</lastmod>
        <changefreq=weekly</changefreq>
        <priority>0.8</priority>
    </url>
    """

sitemap_content += "\n</urlset>"

with open("sitemap.xml", "w", encoding="utf-8") as f:
    f.write(sitemap_content)

print("✅ Sitemap.xml generated successfully!")