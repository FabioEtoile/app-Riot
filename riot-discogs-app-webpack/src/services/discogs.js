const API_KEY = process.env.DISCOGS_KEY;
const API_SECRET = process.env.DISCOGS_SECRET;
const BASE_URL = 'https://api.discogs.com';

export function getResourceIdFromUrl(resourceUrl) {
  return resourceUrl.split('/').pop();
}

export async function searchDiscogs(query, type = 'release', page = 1, perPage = 100) {
  const url = `${BASE_URL}/database/search?q=${encodeURIComponent(query)}&type=${type}&page=${page}&per_page=${perPage}&key=${API_KEY}&secret=${API_SECRET}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erreur Discogs : ${response.status} ${response.statusText}\n${errorText}`);
    }
    return await response.json();
  } catch (err) {
    console.error("erreur API searchDiscogs:", err);
    throw err;
  }
}

export async function getRelease(id) {
  const url = `${BASE_URL}/releases/${id}?key=${API_KEY}&secret=${API_SECRET}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`erreur release: ${response.status}`);
  return await response.json();
}

export async function getReleaseDetails(id) {
  const res = await fetch(`${BASE_URL}/releases/${id}`);
  if (!res.ok) throw new Error("erreur chargement release");
  return await res.json();
}

export async function getMasterDetails(id) {
  const url = `${BASE_URL}/masters/${id}?key=${API_KEY}&secret=${API_SECRET}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erreur master");
  return await res.json();
}
export async function getArtist(artistId) {
  const url = `${BASE_URL}/artists/${artistId}?key=${API_KEY}&secret=${API_SECRET}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Erreur getArtist: ${response.status}`);
  const data = await response.json();
  return {
    id: artistId,
    name: data.name || '',
    biography: data.profile || '',
    image: (data.images && data.images.length > 0) ? data.images[0].uri : ''
  };
}
