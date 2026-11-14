import manifest from './photo-manifest.json';

export type FestivalPhoto = { id: number; src: string; alt: string; original: string };
export const photos: FestivalPhoto[] = manifest;
export const heroPhoto = photos[17]; // stage pyrotechnics
export const eventPhoto = photos[18]; // Capital Fest screen
export const featurePhoto = photos[8]; // purple concert performance
export const galleryOrder = [2, 7, 18, 20, 12, 21, 1, 6, 13, 10, 15, 3, 5, 9, 11, 14, 17, 16, 19, 4, 8]
  .map((id) => photos.find((photo) => photo.id === id)!)
  .filter(Boolean);
