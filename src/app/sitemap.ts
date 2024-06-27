import type { MetadataRoute } from 'next';

const baseUrl = process.env.BASE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    { url: `${baseUrl}`, changeFrequency: 'weekly', priority: 1 },
  ];
}
