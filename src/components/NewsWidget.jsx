import React, { useEffect, useState } from 'react';

const NewsWidget = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/news?limit=5`);
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Error");
        setNews(data.news || []);
      } catch (e) {
        setErr("Could not load news.");
        console.error(e);
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
      {err && <p>{err}</p>}
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