import { useEffect, useState } from "react";
import "./GalleryManager.scss";
import {
  Screen,
  getImages,
  uploadImage,
  deleteImage,
} from "../../../services/galleryService";

const screens: { key: Screen; label: string; single: boolean }[] = [
  { key: "home", label: "Home Screen", single: false },
  { key: "campus_facilities", label: "Campus Facilities", single: false },
  { key: "about_founder", label: "About Founder", single: true },
  { key: "chairman", label: "Chairman", single: true },
];

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export default function GalleryManager() {
  const [screen, setScreen] = useState<Screen>("home");
  const [images, setImages] = useState<string[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleteMode, setDeleteMode] = useState(false);

  async function reload() {
    const data = await getImages(screen);
    setImages(data);
    setSelected(new Set());
    setDeleteMode(false);
  }

  useEffect(() => {
    reload();
  }, [screen]);

  async function handleUpload(file: File) {
    await uploadImage(screen, file);
    reload();
  }

  function toggleSelect(img: string) {
    if (!deleteMode) return;

    const next = new Set(selected);
    next.has(img) ? next.delete(img) : next.add(img);
    setSelected(next);
  }

  async function confirmDelete() {
    if (selected.size === 0) return;

    const ok = window.confirm(
      `Are you sure you want to delete ${selected.size} image(s)?`
    );
    if (!ok) return;

    for (const img of Array.from(selected)) {
      await deleteImage(screen, img);
    }

    reload();
  }

  return (
    <div className="gallery-layout">
      <aside className="gallery-sidebar">
        {screens.map((s) => (
          <button
            key={s.key}
            className={screen === s.key ? "active" : ""}
            onClick={() => setScreen(s.key)}
          >
            {s.label}
          </button>
        ))}
      </aside>

      <section className="gallery-content">
        <h2>{screen.replace("_", " ").toUpperCase()}</h2>

        <div className="gallery-actions">
          <label className="upload-btn">
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) =>
                e.target.files && handleUpload(e.target.files[0])
              }
            />
          </label>

          <button
            className={`delete-toggle ${deleteMode ? "active" : ""}`}
            onClick={() => {
              setDeleteMode(!deleteMode);
              setSelected(new Set());
            }}
          >
            {deleteMode ? "Cancel" : "Select to Delete"}
          </button>

          {deleteMode && (
            <button
              className="delete-confirm"
              disabled={selected.size === 0}
              onClick={confirmDelete}
            >
              Delete ({selected.size})
            </button>
          )}
        </div>

        <div className="image-grid">
          {images.map((img) => (
            <div
              key={img}
              className={`image-card ${
                selected.has(img) ? "selected" : ""
              }`}
              onClick={() => toggleSelect(img)}
            >
              {deleteMode && (
                <span className="checkmark">
                  {selected.has(img) ? "✓" : ""}
                </span>
              )}
              <img src={`${BASE_URL}/images/${screen}/${img}`} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}