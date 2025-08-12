// api/news.js
// Vercel serverless function – fetches news via CurrentsAPI without exposing your key to the browser.

export default async function handler(req, res) {
	try {
		const { search = "", limit = 5 } = req.query || {};
		const API_KEY = process.env.NEWS_API_KEY; // set this in Vercel → Project → Settings → Environment Variables

		if (!API_KEY) {
			return res.status(500).json({ error: "Server missing NEWS_API_KEY" });
		}

		const url = new URL("https://api.currentsapi.services/v1/latest-news");
		url.searchParams.set("language", "en");
		if (search) url.searchParams.set("keywords", String(search));
		url.searchParams.set("page_size", String(limit));
		url.searchParams.set("apiKey", API_KEY); // CurrentsAPI expects key in query string

		const r = await fetch(url.toString());
		const data = await r.json();

		if (!r.ok) {
			return res.status(r.status).json({ error: data?.message || "Upstream error" });
		}

		// Normalize to a compact shape your widget expects
		const news = (data.news || []).slice(0, limit).map(item => ({
			title: item.title,
			url: item.url,
			source: item.author || item.source || "",
			publishedAt: item.published, // e.g., "2024-05-01 10:23:00 +0000"
		}));

		return res.status(200).json({ news });
	} catch (e) {
		return res.status(500).json({ error: "Failed to fetch news", details: String(e) });
	}
}