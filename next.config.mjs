// // next.config.js (ES Module)
// export const images = {
//   formats: ["image/avif", "image/webp"],
//   remotePatterns: [
//     {
//       protocol: "https",
//       hostname: "p19-sign.tiktokcdn-us.com",
//       port: "",
//       pathname: "**",
//     },
//   ],
// };

// const nextConfig = {
//   images,
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['p16-sign.tiktokcdn-us.com/', 'p19-sign.tiktokcdn-us.com' ]
  }
}

export default nextConfig