# 🌟 Starry Night – Premium Art Marketplace (3D - Immersive Website)

An immersive 3D animated e-commerce platform for luxury digital art, featuring cinematic scroll storytelling and premium interactions inspired by Van Gogh's "The Starry Night."

![Next.js](https://img.shields.io/badge/Next.js-15.1.6-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Three.js](https://img.shields.io/badge/Three.js-0.172-green)
![GSAP](https://img.shields.io/badge/GSAP-3.12-brightgreen)

## ✨ Features

### 🎨 Immersive 3D Experience
- **2000 Animated Stars** with Van Gogh-inspired swirling motion
- Three.js particle system with depth and color variation
- Smooth camera transitions on scroll

### 🎬 Cinematic Animations
- GSAP ScrollTrigger for scroll-based storytelling
- Framer Motion micro-interactions
- Lenis smooth scrolling for premium feel
- Horizontal scroll gallery with snap points

### 💎 Premium UI/UX
- Custom cursor with gold glow effect
- 3D tilt effects on category cards
- Glassmorphism design throughout
- Animated borders and depth shadows
- Scroll progress indicator with star trail

### 🎯 Core Pages
- **Hero Section**: Fullscreen 3D starry background with staggered text reveals
- **Category Showcase**: 8 art categories with 3D hover effects
- **Featured Art**: Horizontal scroll gallery with premium cards
- **Navigation**: Glassmorphism header with responsive mobile menu

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js
- **Animations**: GSAP, Framer Motion
- **Smooth Scroll**: Lenis
- **State Management**: Zustand (ready for cart)
- **Fonts**: Google Fonts (Playfair Display, Inter)

## 📁 Project Structure

```
Starry-Night/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles & design system
├── components/
│   ├── home/               # Homepage sections
│   ├── layout/             # Header, Footer
│   ├── providers/          # Smooth scroll provider
│   ├── three/              # Three.js components
│   └── ui/                 # Reusable UI components
├── lib/
│   ├── data/               # Mock data
│   └── utils.ts            # Utility functions
└── ...config files
```

## 🎨 Design System

### Color Palette
- **Midnight Blues**: `#0B0F1A`, `#0F1B2E`, `#1B2735`
- **Gold Accents**: `#D4AF37`, `#F5E6C4`
- **Glow Effects**: `#4F70E8`, `#6FA8FF`

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

## 🎯 Performance

- 60fps animations with GPU acceleration
- Optimized Three.js rendering
- Debounced scroll listeners
- Code splitting via Next.js App Router
- Ready for lazy loading

## 📋 Roadmap

- [ ] Gallery page with 3D hover grid
- [ ] Artwork detail pages with rotating frames
- [ ] Artist profile pages
- [ ] Shopping cart functionality
- [ ] Checkout flow
- [ ] Ambient background music toggle
- [ ] Image integration (replace placeholders)
- [ ] Backend integration (Shopify/Sanity/Custom API)

## 📝 Notes

- Currently using mock data and placeholder images
- All core animations and interactions are functional
- Ready for backend integration
- Optimized for desktop, tablet, and mobile

## 📄 License

MIT

---

**Built with ❤️ using Next.js, Three.js, GSAP, and Framer Motion**
