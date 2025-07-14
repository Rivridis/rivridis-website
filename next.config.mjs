/** @type {import('next').NextConfig} */
const nextConfig = { async redirects() {
    return [
      {
        source: '/windows-assistant',
        destination: '/rivridis-assistant',
        permanent: true, // 301 redirect
      },
    ]
  },
};

export default nextConfig;
