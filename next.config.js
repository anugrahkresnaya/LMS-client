/** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig

module.exports = {
  transpilePackages: ['canvas'],
  swcMinify: false,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add a rule to handle binary files
    config.module.rules.push({
      test: /\.(pdf|node)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }
      ]
    });

    return config;
  },
  images: {
    domains: ['ik.imagekit.io', 'storage.googleapis.com'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // Change this to your desired origin or set it to '*' to allow all origins
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Accept, Content-Type, Authorization',
          },
        ],
      },
    ];
  },
}
