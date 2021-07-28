require('dotenv').config();
const withPWA = require('next-pwa');

module.exports = withPWA({
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    });

    return config;
  },
  env: {
    API_ENV: process.env.API_ENV,
    CONTENFUL_SPACE_ID: process.env.CONTENFUL_SPACE_ID,
    NPM_USE_PRODUCTION: process.env.NPM_USE_PRODUCTION,
    PORT: process.env.PORT,
  },
  cssLoaderOptions: {
    url: false,
  },
  pwa: {
    dest: 'public',
  },
});
