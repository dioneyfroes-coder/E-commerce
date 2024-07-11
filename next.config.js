/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
  images: {
    domains: ['via.placeholder.com', 'localhost'],
  },
  compiler: {
    styledComponents: true,
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
};
