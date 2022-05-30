/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'repository-images.githubusercontent.com'
    ],
  }
}

export default nextConfig;