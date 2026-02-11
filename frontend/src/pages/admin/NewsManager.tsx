import { useEffect, useState } from "react";
import "./NewsManager.scss";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  image: string;
}

export default function NewsManager() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/news");
  
      if (!res.ok) {
        console.error("Failed to fetch news:", res.status);
        setNews([]);
        return;
      }
  
      const data = await res.json();
  
      if (Array.isArray(data)) {
        setNews(data);
      } else if (Array.isArray(data.news)) {
        // common FastAPI pattern
        setNews(data.news);
      } else {
        console.error("Unexpected response shape:", data);
        setNews([]);
      }
    } catch (err) {
      console.error("Error fetching news:", err);
      setNews([]);
    }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);

    await fetch("http://localhost:8000/api/news", {
      method: "POST",
      body: formData,
    });

    setTitle("");
    setContent("");
    setImage(null);
    fetchNews();
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this news item? This action cannot be undone."
    );
  
    if (!confirmed) return;
  
    await fetch(`http://localhost:8000/api/news/${id}`, {
      method: "DELETE",
    });
  
    fetchNews();
  };
  

  return (
    <div className="news-manager">
      <h2>Manage News</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Content</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Image</label>
          <input
            type="file"
            onChange={e =>
              setImage(e.target.files ? e.target.files[0] : null)
            }
          />
        </div>

        <button type="submit" className="submit-btn">
          Add News
        </button>
      </form>

      <div className="news-list">
        {news.map(n => (
          <div className="admin-news-card" key={n.id}>
            {n.image && (
        <img
          src={`http://localhost:8000/images/news/${n.image}`}
          alt={n.title}
        />
      )}

            <div className="content">
              <h4>{n.title}</h4>
              <p>{n.content}</p>
            </div>

            <button
              className="delete-btn"
              onClick={() => handleDelete(n.id)}
            >
              Delete
            </button>
          </div>
        ))}
      
      </div>
    </div>
  );
}