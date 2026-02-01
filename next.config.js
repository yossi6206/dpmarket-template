/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/index-two',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig