/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    // Image optimization
    images: {
        domains: [
            'starrynight-images.s3.amazonaws.com',
            'res.cloudinary.com',
            'd2w9rnfcy7mm78.cloudfront.net',
            'images.unsplash.com'
        ],
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60,
    },

    // Performance optimizations
    experimental: {
        optimizeCss: true,
        optimizePackageImports: ['three', 'gsap', '@react-three/fiber', '@react-three/drei'],
    },

    // Compiler options
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production' ? {
            exclude: ['error', 'warn'],
        } : false,
    },

    // Security headers
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN'
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin'
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()'
                    }
                ],
            },
        ]
    },

    // Webpack optimizations
    webpack: (config, { dev, isServer }) => {
        // Optimize Three.js bundle
        if (!dev && !isServer) {
            config.optimization.splitChunks = {
                chunks: 'all',
                cacheGroups: {
                    three: {
                        test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
                        name: 'three',
                        priority: 10,
                    },
                    gsap: {
                        test: /[\\/]node_modules[\\/]gsap[\\/]/,
                        name: 'gsap',
                        priority: 10,
                    },
                },
            }
        }

        return config
    },

    // Environment variables validation
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    },
}

module.exports = nextConfig
