import os
import json
from datetime import datetime

JSON_FILE = "articles/preview.json"

DOMAIN = "https://Rgthinks.top"

sitemap_content = """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
"""

with open(JSON_FILE, "r", encoding="utf-8") as file:
    articles = json.load(file)

for article in articles:
    url = f"{DOMAIN}/{article['url'].replace('../', '')}"
    lastmod = datetime.today().strftime('%Y-%m-%d')
    sitemap_content += f"""
    <url>
        <loc>{url}</loc>
        <lastmod>{lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    """

sitemap_content += "</urlset>"

with open("sitemap.xml", "w", encoding="utf-8") as f:
    f.write(sitemap_content)

print("✅ Sitemap.xml generated successfully!")