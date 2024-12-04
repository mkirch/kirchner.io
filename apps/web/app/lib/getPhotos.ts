export async function getPhotos() {
  const response = await fetch('/api/photo');
  if (!response.ok) {
    throw new Error('Failed to fetch photos');
  }
  return response.json();
}
