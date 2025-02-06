/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ["srnyhmscwqokzdnbbmod.supabase.co"],
  },
  // Optimize for production
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
}

export default nextConfig