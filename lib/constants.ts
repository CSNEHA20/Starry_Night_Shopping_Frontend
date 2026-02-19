// Animation constants
export const ANIMATION_DURATION = {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
    SLOWER: 800,
    SLOWEST: 1200,
} as const;

export const ANIMATION_EASE = {
    IN_OUT: 'cubic-bezier(0.23, 1, 0.32, 1)',
    OUT: 'cubic-bezier(0.33, 1, 0.68, 1)',
    SPRING: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    POWER4_OUT: 'power4.out',
    POWER4_IN_OUT: 'power4.inOut',
} as const;

// Spacing scale (8px base)
export const SPACING = {
    1: 4,
    2: 8,
    3: 16,
    4: 24,
    5: 32,
    6: 48,
    7: 64,
    8: 96,
    9: 128,
} as const;

// Border radius
export const RADIUS = {
    SM: 8,
    MD: 16,
    LG: 24,
    XL: 32,
    FULL: 9999,
} as const;

// Breakpoints
export const BREAKPOINTS = {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536,
} as const;

// Z-index layers
export const Z_INDEX = {
    BACKGROUND: -10,
    BASE: 0,
    CONTENT: 10,
    HEADER: 50,
    MODAL: 100,
    CURSOR: 10000,
    PROGRESS: 10001,
} as const;

// Performance targets
export const PERFORMANCE = {
    TARGET_FPS: 60,
    MAX_BUNDLE_SIZE: 500, // KB
    MAX_INITIAL_LOAD: 3000, // ms
    MAX_FCP: 1500, // ms
    MAX_LCP: 2500, // ms
} as const;

// Three.js settings
export const THREE_CONFIG = {
    STAR_COUNT: 2000,
    CAMERA_FOV: 75,
    CAMERA_NEAR: 0.1,
    CAMERA_FAR: 1000,
    MAX_PIXEL_RATIO: 2,
} as const;

// Color palette
export const COLORS = {
    MIDNIGHT: {
        950: '#0B0F1A',
        900: '#0F1B2E',
        800: '#1B2735',
        700: '#243447',
    },
    GOLD: {
        DEFAULT: '#D4AF37',
        LIGHT: '#F5E6C4',
        DARK: '#CBA135',
    },
    GLOW: {
        BLUE: '#4F70E8',
        CYAN: '#6FA8FF',
    },
    TEXT: {
        PRIMARY: '#F8F8F8',
        MUTED: '#B8C0CC',
    },
} as const;

// API endpoints
export const API_ENDPOINTS = {
    // API Routes (Disabled for static export/local mode)
    // ARTWORKS: '/api/artworks',
    // CATEGORIES: '/api/categories',
    // ARTISTS: '/api/artists',
    // CART: '/api/cart',
    // CHECKOUT: '/api/checkout',
    // WEBHOOKS: '/api/webhooks',
} as const;

// Routes
export const ROUTES = {
    HOME: '/',
    GALLERY: '/gallery',
    ARTWORK: '/artwork',
    ARTISTS: '/artists',
    CART: '/cart',
    CHECKOUT: '/checkout',
    ABOUT: '/about',
} as const;
