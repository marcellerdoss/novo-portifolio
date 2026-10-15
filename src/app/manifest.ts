import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Marcelle Rocha | Produto estratégico',
    short_name: 'Marcelle Rocha',
    description:
      'Design centrado em comportamento e decisão. Produtos digitais construídos com estratégia, intenção e foco em impacto.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FEF4EF',
    theme_color: '#211F4A',
    icons: [
      {
        src: '/images/social/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/social/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
