import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.beechfordestates.com'
  
  // Static pages
  const routes = [
    '',
    '/about',
    '/invest',
    '/own',
    '/develop',
    '/tools',
    '/solutions',
    '/optimizations',
    '/optimizations/deal-picker',
    '/optimizations/debt-stack',
    '/optimizations/capex-phasing',
    '/optimizations/leasing-mix',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : route.includes('optimizations') ? 0.9 : 0.8,
  }))

  return routes
}

