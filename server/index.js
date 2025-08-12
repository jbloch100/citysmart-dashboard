const express = require("express");
require("dotenv").config();

const app = express();

app.get("/api/news", async (req, res) => {
  try {
    const API_KEY = process.env.NEWS_API_KEY; // your NewsAPI.org key
    if (!API_KEY) return res.status(500).json({ error: "Missing NEWS_API_KEY" });

    const search = String(req.query.search || "");
    const limit = Number(req.query.limit || 8);

    const fetchNewsApi = async (url) => {
      const r = await fetch(url.toString(), { headers: { "X-Api-Key": API_KEY } });
      const data = await r.json();
      return { ok: r.ok, status: r.status, data };
    };

    // 1) Try Canada top-headlines
    const u1 = new URL("https://newsapi.org/v2/top-headlines");
    u1.searchParams.set("country", "ca");
    if (search) u1.searchParams.set("q", search);
    u1.searchParams.set("pageSize", String(limit));
    let { ok, status, data } = await fetchNewsApi(u1);
    let articles = Array.isArray(data?.articles) ? data.articles : [];
    console.log("[news] CA headlines:", { ok, status, count: articles.length });

    // 2) Fallback: US top-headlines
    if (!ok || articles.length === 0) {
      const u2 = new URL("https://newsapi.org/v2/top-headlines");
      u2.searchParams.set("country", "us");
      if (search) u2.searchParams.set("q", search);
      u2.searchParams.set("pageSize", String(limit));
      ({ ok, status, data } = await fetchNewsApi(u2));
      articles = Array.isArray(data?.articles) ? data.articles : [];
      console.log("[news] US headlines:", { ok, status, count: articles.length });
    }

    // 3) Fallback: general category (language=en)
    if (!ok || articles.length === 0) {
      const u3 = new URL("https://newsapi.org/v2/top-headlines");
      u3.searchParams.set("category", "general");
      u3.searchParams.set("language", "en");
      if (search) u3.searchParams.set("q", search);
      u3.searchParams.set("pageSize", String(limit));
      ({ ok, status, data } = await fetchNewsApi(u3));
      articles = Array.isArray(data?.articles) ? data.articles : [];
      console.log("[news] Category general:", { ok, status, count: articles.length });
    }

    if (!ok) {
      console.error("[news] error body:", data);
      return res.status(status).json({ error: data?.message || `Upstream ${status}` });
    }

    if (articles.length === 0) {
      // Last‑ditch non-empty response so UI isn't blank
      return res.json({
        news: [
        {
          title: "No headlines returned at this time.",
          url: "https://newsapi.org",
          source: "NewsAPI",
          publishedAt: new Date().toISOString(),
        },
        ],
      });
    }

    const news = articles.slice(0, limit).map((a) => ({
    title: a.title,
    url: a.url,
    source: a.source?.name || "",
    publishedAt: a.publishedAt,
    }));

    res.json({ news });
  } catch (e) {
    console.error("[news] exception:", e);
    res.status(500).json({ error: "Failed to fetch news", details: String(e) });
  }
});

const PORT = process.env.PORT || 5174;
app.listen(PORT, () => {
  console.log(`[dev server] API on http://localhost:${PORT}`);
  console.log("[dev server] NEWS_API_KEY present:", !!process.env.NEWS_API_KEY);
});