// server/index.js
import express from 'express';
import 'dotenv/config'; // loads .env in dev
const app = express();

app.get('/api/news', async (req, res) => {
	try {
		const API_KEY = process.env.NEWS_API_KEY;
		if (!API_KEY) return res.status(500).json({ error: 'Missing NEWS_API_KEY' });

		const search = String(req.query.search || '');
		const limit = Number(req.query.limit || 5);

		const url = new URL('https://api.currentsapi.services/v1/latest-news');
		url.searchParams.set('language', 'en');
		if (search) url.searchParams.set('keywords', search);
		url.searchParams.set('page_size', String(limit));
		url.searchParams.set('apiKey', API_KEY);

		const r = await fetch(url.toString());
		const data = await r.json();

		if (!r.ok) return res.status(r.status).json({ error: data?.message || 'Upstream error' });

		const news = (data.news || []).slice(0, limit).map(n => ({
			title: n.title,
			url: n.url,
			source: n.author || n.source || '',
			publishedAt: n.published
		}));
		res.json({ news });
	} catch (e) {
		res.status(500).json({ error: 'Failed to fetch news', details: String(e) });
	}
});

const PORT = process.env.PORT || 5174;
app.listen(PORT, () => console.log(`[dev server] API on http://localhost:${PORT}`));