// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference

// @type-check enabled!
// VSCode and other TypeScript-enabled text editors will provide auto-completion,
// helpful tooltips, and warnings if your exported object is invalid.
// You can disable this by removing "@ts-check" and `@type` comments below.

// @ts-check
export default /** @type {import('astro').AstroUserConfig} */ ({
  // Comment out "renderers: []" to enable Astro's default component support.
  pages: './src/routers',
  renderers: ['@astrojs/renderer-svelte'],
  vite: {
    ssr: { external: ['svgo'] },
    server: { host: '0.0.0.0' },
  },
  buildOptions: { site: 'https://lifeni.life' },
  markdownOptions: {
    render: [
      '@astrojs/markdown-remark',
      {
        remarkPlugins: ['remark-gfm', 'remark-unwrap-images'],
        rehypePlugins: [
          'rehype-external-links',
          'rehype-slug',
          'rehype-plugin-image-native-lazy-loading',
        ],
      },
    ],
  },
})
