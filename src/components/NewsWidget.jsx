import React, { useEffect, useState } from 'react';

const NewsWidget = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        // optional mock toggle for quick testing
        const useMock =
        new URLSearchParams(window.location.search).get('mock') === 'true'

        if (useMock) {
          setNews([
            { title: 'Mock headline 1', url: '#', source: 'Mock Source' },
            { title: 'Mock headline 2', url: '#', source: 'Mock Source' },
          ]);
          return;
        }

        const res = await fetch(`/api/news?limit=5`, { headers: { 'Accept': 'application/json' } });
        const text = await res.text(); // read raw first
        let data;
        try { data = JSON.parse(text); } catch { data = { raw: text }; }

        if (!res.ok) {
          const msg = data?.error || data?.message || `HTTP ${res.status}`;
          setErr(`News API failed: ${msg}`);
          console.error('News API error:', { status: res.status, data });
          return;
        }

        setNews(Array.isArray(data.news) ? data.news : []);
      } catch (e) {
        setErr(`Could not load news: ${e.message}`);
        console.error('News load exception:', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="widget">
      <h2>Latest News</h2>
      {loading && <p>Loading...</p>}
      {err && (
        <div>
          <p>{err}</p>
          <p style={{ fontSize: 12, opacity: 0.8 }}>
          Try opening <code>/api/news?limit=3</code> directly in your browser to see details.
          </p>
        </div>
      )}
      {!loading && !err && (
        <ul>
          {news.map((n, i) => (
          <li key={i}>
            <a href={n.url} target="_blank" rel="noreferrer">{n.title}</a>
            {n.source ? <> — <em>{n.source}</em></> : null}
          </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewsWidget;