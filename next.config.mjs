// next.config.js
export const images = {
  domains: ['dummyimage.com', 'v5.airtableusercontent.com'], // Add your domain here
}

export const rewrites = async () => {
  return [
    {
      source: '/:path*',
      has: [
        {
          type: 'host',
          value: '(?<host>.*)',
        },
      ],
      destination: '/:path*',
    },
  ]
}
