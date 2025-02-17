import { defineConfig } from 'astro/config'

import vercel from '@astrojs/vercel'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import sanity from '@sanity/astro'

import { loadEnv } from 'vite'

const { SANITY_STUDIO_PROJECT_ID, SANITY_STUDIO_DATASET } = loadEnv(
    process.env.NODE_ENV,
    process.cwd(),
    ''
)

export default defineConfig({
    adapter: vercel(),
    output: 'server',
    site: 'https://lukasposledni.cz',
    integrations: [
        sanity({
            projectId: SANITY_STUDIO_PROJECT_ID,
            dataset: SANITY_STUDIO_DATASET,
            useCdn: true,
            studioBasePath: '/content',
        }),
        react(),
        sitemap(),
    ],
    image: {
        domains: ['cdn.sanity.io'],
        remotePatterns: [{ protocol: 'https' }],
    },
    vite: {
        plugins: [tailwindcss()],
    },
    experimental: {
        svg: true,
    },
})
