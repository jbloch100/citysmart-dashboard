module.exports = async (req, res) => {
	try {
		const { search = "", limit = 5 } = req.query || {};
		const API_KEY = process.env.NEWS_API_KEY;
		if (!API_KEY) return res.status(500).json({ error: "Server missing NEWS_API_KEY" });

		const url = new URL("https://newsapi.org/v2/top-headlines");
		url.searchParams.set("country", "ca");
		if (search) url.searchParams.set("q", String(search));
		url.searchParams.set("pageSize", String(limit));

		const r = await fetch(url.toString(), {
			headers: { "X-Api-Key": API_KEY } // <-- header
		});

		const data = await r.json();
		if (!r.ok) return res.status(r.status).json({ error: data?.message || `Upstream ${r.status}` });

		const news = (data.articles || []).slice(0, Number(limit)).map(a => ({
			title: a.title,
			url: a.url,
			source: a.source?.name || "",
			publishedAt: a.publishedAt
		}));

		return res.status(200).json({ news });
	} catch (e) {
		return res.status(500).json({ error: "Failed to fetch news", details: String(e) });
	}
};