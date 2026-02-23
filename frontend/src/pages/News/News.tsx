import { useEffect, useState } from "react";
import "./News.scss";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  image: string;
}

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  useEffect(() => {
    fetch(`${API_BASE}/api/news`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setNews(data);
        } else if (Array.isArray(data.news)) {
          setNews(data.news);
        } else {
          console.error("Unexpected response:", data);
          setNews([]);
        }
      })
      .catch(err => {
        console.error("Failed to fetch news:", err);
        setNews([]);
      });
  }, []);
  

  return (
    <div className="news-page">
      <h1>News & Announcements</h1>
  
      {news.length === 0 ? (
        <p className="no-news">No news to be displayed.</p>
      ) : (
        news.map(item => (
          <article className="news-card" key={item.id}>
            {item.image && (
              <div className="image-wrapper">
                <img
                  src={`${API_BASE}/images/news/${item.image}`}
                  alt={item.title}
                />
              </div>
            )}
  
            <div className="news-content">
              <h3>{item.title}</h3>
              <p>{item.content}</p>
            </div>
          </article>
        ))
      )}
    </div>
  );
  
}