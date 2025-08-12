module.exports = async (req, res) => {
	try {
		const { search = "", limit = 8 } = req.query || {};
		const API_KEY = process.env.NEWS_API_KEY;
		if (!API_KEY) return res.status(500).json({ error: "Server missing NEWS_API_KEY" });

		const fetchNewsApi = async (url) => {
			const r = await fetch(url.toString(), { headers: { "X-Api-Key": API_KEY } });
			const data = await r.json();
			return { ok: r.ok, status: r.status, data };
		};

		let ok, status, data, articles = [];

		// 1) Canada headlines
		const u1 = new URL("https://newsapi.org/v2/top-headlines");
		u1.searchParams.set("country", "ca");
		if (search) u1.searchParams.set("q", String(search));
		u1.searchParams.set("pageSize", String(limit));
		({ ok, status, data } = await fetchNewsApi(u1));
		articles = Array.isArray(data?.articles) ? data.articles : [];

		// 2) Fallback: US headlines
		if (!ok || articles.length === 0) {
			const u2 = new URL("https://newsapi.org/v2/top-headlines");
			u2.searchParams.set("country", "us");
			if (search) u2.searchParams.set("q", String(search));
			u2.searchParams.set("pageSize", String(limit));
			({ ok, status, data } = await fetchNewsApi(u2));
			articles = Array.isArray(data?.articles) ? data.articles : [];
		}

		// 3) Fallback: general category (language=en)
		if (!ok || articles.length === 0) {
			const u3 = new URL("https://newsapi.org/v2/top-headlines");
			u3.searchParams.set("category", "general");
			u3.searchParams.set("language", "en");
			if (search) u3.searchParams.set("q", String(search));
			u3.searchParams.set("pageSize", String(limit));
			({ ok, status, data } = await fetchNewsApi(u3));
			articles = Array.isArray(data?.articles) ? data.articles : [];
		}

		if (!ok) {
			return res.status(status).json({ error: data?.message || `Upstream ${status}` });
		}

		if (articles.length === 0) {
			// non-empty response so UI never looks blank
			return res.json({
				news: [
					{ 
						title: "No headlines returned at this time.",
						url: "https://newsapi.org",
						source: "NewsAPI",
						publishedAt: new Date().toISOString() 
					}
				]
			});
		}

		const news = articles.slice(0, Number(limit)).map(a => ({
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