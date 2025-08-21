/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/', destination: '/v11.5/ipa-calculator-ivc-v11-5.html', permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: '/v11.5/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, must-revalidate' },
        ],
      },
    ];
  },
};
module.exports = nextConfig;
