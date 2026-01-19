import { fetchClient } from "./fetchClient";

export interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
}

export const getPages = () => fetchClient<Page[]>("/pages");
export const getPage = (slug: string) => fetchClient<Page>(`/pages/${slug}`);
export const createPage = (data: Partial<Page>) =>
  fetchClient<Page>("/pages", { method: "POST", body: JSON.stringify(data) });
export const updatePage = (id: number, data: Partial<Page>) =>
  fetchClient<Page>(`/pages/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deletePage = (id: number) =>
  fetchClient(`/pages/${id}`, { method: "DELETE" });
