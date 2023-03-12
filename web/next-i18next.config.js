/** @type {import('next').NextConfig} */
module.exports = {
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  //re-render on changes to locales
  reloadOnPrerender: true,
};
