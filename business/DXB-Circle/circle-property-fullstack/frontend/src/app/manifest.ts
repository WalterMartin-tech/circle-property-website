import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Beechford Estate Office - Dubai Property Investment',
    short_name: 'Beechford Estates',
    description: 'Discreet property services with institutional-grade analytics. Evidence-driven decisions, integrated execution, and ongoing portfolio management for discerning families.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1e293b',
    icons: [
      {
        src: '/vite.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}

