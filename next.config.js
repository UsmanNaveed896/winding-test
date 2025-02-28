module.exports = {
  // The env can be here as it is a public token, it is part of the client side bundle anyway
  env: {
    NEXT_STORYBLOK_ACCESS_TOKEN: 'zE5iFY2tMgzW6rVJjzapHQtt',
    NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN: '746fa376ada1d23183c9981319e784aa',
    NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: 'winding-road-motorcars.myshopify.com',
  },

  trailingSlash: true,

  // Rewrites
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/home',
      },
    ]
  },

  // Redirects
  async redirects() {
    return [
      {
        "source": "/home",
        "destination": "/",
        permanent: true
      }
    ]
  },
}