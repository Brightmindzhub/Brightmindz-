import os
import json
from datetime import datetime

JSON_FILE = "articles/preview.json"

# Domain Name
DOMAIN = "https://Rgthinks.top"

# Sitemap header
sitemap_content = """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
"""

# JSON se data load karo
with open(JSON_FILE, "r", encoding="utf-8") as file:
    articles = json.load(file)

# Har article ke liye URL add karo
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

# Sitemap close tag
sitemap_content += "</urlset>"

# `sitemap.xml` file me likho
with open("sitemap.xml", "w", encoding="utf-8") as f:
    f.write(sitemap_content)

print("✅ Sitemap.xml generated successfully!")