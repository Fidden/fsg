const nextTranslate = require('next-translate-plugin');
const {withGlobalCss} = require('next-global-css')
const withConfig = withGlobalCss()

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
};

module.exports = nextTranslate(withConfig(nextConfig));
