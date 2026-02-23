// src/services/galleryService.ts

export type Screen =
  | "home"
  | "campus_facilities"
  | "about_founder"
  | "chairman";

  const API_BASE = import.meta.env.VITE_API_BASE_URL ;
  const BASE_URL = `${API_BASE}/api/gallery`;

/** Get images for a screen */
export async function getImages(screen: Screen): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/${screen}`);
  if (!res.ok) {
    throw new Error("Failed to fetch images");
  }
  return res.json();
}

/** Upload an image */
export async function uploadImage(screen: Screen, file: File): Promise<void> {
  const form = new FormData();
  form.append("image", file);

  const res = await fetch(`${BASE_URL}/${screen}`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    throw new Error("Failed to upload image");
  }
}

/** Delete an image */
export async function deleteImage(
  screen: Screen,
  name: string
): Promise<void> {
  const res = await fetch(`${BASE_URL}/${screen}/${name}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete image");
  }
}