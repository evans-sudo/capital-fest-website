import manifest from './photo-manifest.json';

export type FestivalPhoto = { id: number; src: string; alt: string; original: string };
export const photos: FestivalPhoto[] = manifest;
// The latest client-supplied images lead each section and the gallery.
export const heroPhoto = photos.find((photo) => photo.id === 30)!;
export const eventPhoto = photos.find((photo) => photo.id === 24)!;
export const featurePhoto = photos.find((photo) => photo.id === 28)!;
export const galleryOrder = [22, 24, 23, 25, 26, 27, 28, 29, 30, 2, 7, 18, 20, 12, 21, 1, 6, 13, 10, 15, 3, 5, 9, 11, 14, 17, 16, 19, 4, 8]
  .map((id) => photos.find((photo) => photo.id === id)!)
  .filter(Boolean);
