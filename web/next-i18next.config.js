const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    localeDetection: false,
    localePath: path.resolve('./public/locales'),
  },
  //re-render on changes to locales
  reloadOnPrerender: true,
};
