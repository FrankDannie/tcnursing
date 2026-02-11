const BASE_URL = "http://localhost:8000";

export async function getNews() {
  const res = await fetch(`${BASE_URL}/api/news`);
  return res.json();
}

export async function createNews(
  title: string,
  content: string,
  image?: File
) {
  const form = new FormData();
  form.append("title", title);
  form.append("content", content);
  if (image) form.append("image", image);

  await fetch(`${BASE_URL}/api/news`, {
    method: "POST",
    body: form,
  });
}

export async function deleteNews(id: number) {
  await fetch(`${BASE_URL}/api/news/${id}`, {
    method: "DELETE",
  });
}