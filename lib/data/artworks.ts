// Mock data for artworks
export interface Artwork {
    id: string;
    slug: string;
    title: string;
    artist: string;
    artistId: string;
    category: string;
    era: string;
    price: number;
    imageUrl: string;
    description: string;
    year: number;
    medium: string;
    dimensions: string;
    featured: boolean;
    inStock: boolean;
    tags?: string[];
    colorPalette?: string[];
    popularityScore?: number;
}

export interface Category {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    count: number;
}

export interface Artist {
    id: string;
    slug: string;
    name: string;
    email?: string;
    bio: string;
    artisticPhilosophy?: string;
    imageUrl: string;
    coverImageUrl?: string;
    era: string;
    primaryStyle?: string;
    styleTags?: string[];
    artworkCount: number;
    featured: boolean;
    verified?: boolean;
    verifiedAt?: Date;
    commissionTier?: 'base' | 'featured' | 'limited_edition';
    reputationScore?: number;
    badges?: string[];
    totalSales?: number;
    averageRating?: number;
    socialLinks?: {
        website?: string;
        instagram?: string;
        twitter?: string;
        facebook?: string;
        linkedin?: string;
        behance?: string;
        artstation?: string;
    };
    joinedAt?: Date;
}

export const categories: Category[] = [
    {
        id: "medieval",
        name: "Medieval",
        description: "Sacred art from the Middle Ages",
        imageUrl: "/images/artworks/Medieval.png",
        count: 24,
    },
    {
        id: "ancient",
        name: "Ancient",
        description: "Timeless pieces from ancient civilizations",
        imageUrl: "/images/artworks/Ancient.png",
        count: 18,
    },
    {
        id: "renaissance",
        name: "Renaissance",
        description: "Masterpieces of rebirth and enlightenment",
        imageUrl: "/images/artworks/Renaissance.png",
        count: 32,
    },
    {
        id: "modern",
        name: "Modern",
        description: "Contemporary expressions of art",
        imageUrl: "/images/artworks/Modern.png",
        count: 45,
    },
    {
        id: "abstract",
        name: "Abstract",
        description: "Non-representational artistic expressions",
        imageUrl: "/images/artworks/Abstract.png",
        count: 28,
    },
    {
        id: "pastel",
        name: "Pastel",
        description: "Soft, delicate color compositions",
        imageUrl: "/images/artworks/Pastel.png",
        count: 21,
    },
    {
        id: "minimalist",
        name: "Minimalist",
        description: "Less is more - refined simplicity",
        imageUrl: "/images/artworks/Minimalist.png",
        count: 19,
    },
    {
        id: "oil",
        name: "Oil Paintings",
        description: "Classic oil on canvas masterworks",
        imageUrl: "/images/artworks/Oil Paintings.png",
        count: 38,
    },
];

export const artworks: Artwork[] = [
    {
        id: "1",
        slug: "starry-night",
        title: "Starry Night",
        artist: "Vincent van Gogh",
        artistId: "van-gogh",
        category: "Modern",
        era: "Post-Impressionism",
        price: 125000,
        imageUrl: "/images/starry-night.jpeg",
        description: "A swirling night sky over a French village",
        year: 1889,
        medium: "Oil on canvas",
        dimensions: "73.7 cm × 92.1 cm",
        featured: true,
        inStock: true,
        tags: ["night", "sky", "landscape", "swirling", "impressionism", "blue"],
        colorPalette: ["#0B0F1A", "#4F70E8", "#D4AF37"],
        popularityScore: 95,
    },
    {
        id: "2",
        slug: "birth-of-venus",
        title: "The Birth of Venus",
        artist: "Sandro Botticelli",
        artistId: "botticelli",
        category: "Renaissance",
        era: "Early Renaissance",
        price: 185000,
        imageUrl: "/images/artworks/The Birth of Venus (Renaissance inspired).png",
        description: "The goddess Venus emerging from the sea",
        year: 1485,
        medium: "Tempera on canvas",
        dimensions: "172.5 cm × 278.9 cm",
        featured: true,
        inStock: true,
        tags: ["mythology", "goddess", "renaissance", "classical", "beauty"],
        colorPalette: ["#F5E6C4", "#6FA8FF", "#D4AF37"],
        popularityScore: 92,
    },
    {
        id: "3",
        slug: "great-wave",
        title: "The Great Wave",
        artist: "Katsushika Hokusai",
        artistId: "hokusai",
        category: "Ancient",
        era: "Edo Period",
        price: 95000,
        imageUrl: "/images/artworks/The Great Wave (Japanese woodblock style).png",
        description: "A powerful wave threatening boats off Kanagawa",
        year: 1831,
        medium: "Woodblock print",
        dimensions: "25.7 cm × 37.8 cm",
        featured: true,
        inStock: true,
        tags: ["ocean", "wave", "japanese", "ukiyo-e", "nature", "blue"],
        colorPalette: ["#4F70E8", "#F5E6C4", "#0B0F1A"],
        popularityScore: 88,
    },
    {
        id: "4",
        slug: "composition-viii",
        title: "Composition VIII",
        artist: "Wassily Kandinsky",
        artistId: "kandinsky",
        category: "Abstract",
        era: "Abstract Art",
        price: 145000,
        imageUrl: "/images/artworks/Composition VIII (Abstract modern inspired).png",
        description: "Geometric shapes in harmonious composition",
        year: 1923,
        medium: "Oil on canvas",
        dimensions: "140 cm × 201 cm",
        featured: true,
        inStock: true,
        tags: ["abstract", "geometric", "colorful", "modern", "shapes"],
        colorPalette: ["#D4AF37", "#4F70E8", "#0B0F1A"],
        popularityScore: 85,
    },
    {
        id: "5",
        slug: "girl-pearl-earring",
        title: "Girl with a Pearl Earring",
        artist: "Johannes Vermeer",
        artistId: "vermeer",
        category: "Renaissance",
        era: "Dutch Golden Age",
        price: 165000,
        imageUrl: "/images/artworks/Girl with a Pearl Earring (Baroque inspired).png",
        description: "A captivating portrait of a young woman",
        year: 1665,
        medium: "Oil on canvas",
        dimensions: "44.5 cm × 39 cm",
        featured: true,
        inStock: true,
        tags: ["portrait", "dutch", "baroque", "pearl", "woman"],
        colorPalette: ["#0B0F1A", "#D4AF37", "#F5E6C4"],
        popularityScore: 90,
    },
    {
        id: "6",
        slug: "the-scream",
        title: "The Scream",
        artist: "Edvard Munch",
        artistId: "munch",
        category: "Modern",
        era: "Expressionism",
        price: 135000,
        imageUrl: "/images/artworks/The Scream (Expressionist inspired).png",
        description: "An iconic image of human anxiety",
        year: 1893,
        medium: "Oil, tempera, pastel and crayon on cardboard",
        dimensions: "91 cm × 73.5 cm",
        featured: true,
        inStock: true,
        tags: ["expressionism", "emotion", "anxiety", "modern", "iconic"],
        colorPalette: ["#4F70E8", "#D4AF37", "#0B0F1A"],
        popularityScore: 93,
    },
];

export const artists: Artist[] = [
    {
        id: "van-gogh",
        slug: "vincent-van-gogh",
        name: "Vincent van Gogh",
        email: "vincent@starrynight.art",
        bio: "Dutch Post-Impressionist painter known for his bold colors and emotional honesty.",
        artisticPhilosophy: "I dream my painting and I paint my dream. Art is to console those who are broken by life.",
        imageUrl: "/images/artists/van-gogh.jpg",
        coverImageUrl: "/images/artists/van-gogh-cover.jpg",
        era: "Post-Impressionism",
        primaryStyle: "impressionism",
        styleTags: ["post-impressionism", "expressionism", "landscape", "portrait"],
        artworkCount: 12,
        featured: true,
        verified: true,
        verifiedAt: new Date('2024-01-15'),
        commissionTier: "featured",
        reputationScore: 95,
        badges: ["master_artist", "verified_artist", "featured_artist", "top_seller"],
        totalSales: 127,
        averageRating: 4.9,
        socialLinks: {
            website: "https://vangogh.art",
            instagram: "@vangogh_official",
        },
        joinedAt: new Date('2023-06-01'),
    },
    {
        id: "botticelli",
        slug: "sandro-botticelli",
        name: "Sandro Botticelli",
        email: "sandro@starrynight.art",
        bio: "Italian painter of the Early Renaissance, known for his graceful figures.",
        artisticPhilosophy: "Beauty is the harmony of purpose and form, expressed through divine grace.",
        imageUrl: "/images/artists/botticelli.jpg",
        coverImageUrl: "/images/artists/botticelli-cover.jpg",
        era: "Early Renaissance",
        primaryStyle: "realism",
        styleTags: ["renaissance", "classical", "mythology", "portrait"],
        artworkCount: 8,
        featured: true,
        verified: true,
        verifiedAt: new Date('2024-02-01'),
        commissionTier: "featured",
        reputationScore: 92,
        badges: ["master_artist", "verified_artist", "featured_artist", "collector_favorite"],
        totalSales: 89,
        averageRating: 4.8,
        socialLinks: {
            website: "https://botticelli.art",
            instagram: "@botticelli_renaissance",
        },
        joinedAt: new Date('2023-07-15'),
    },
    {
        id: "hokusai",
        slug: "katsushika-hokusai",
        name: "Katsushika Hokusai",
        email: "hokusai@starrynight.art",
        bio: "Japanese artist and printmaker of the Edo period, master of ukiyo-e.",
        artisticPhilosophy: "From the age of six I had a passion for drawing. At seventy-three I have learned a little about the real structure of nature.",
        imageUrl: "/images/artists/hokusai.jpg",
        coverImageUrl: "/images/artists/hokusai-cover.jpg",
        era: "Edo Period",
        primaryStyle: "traditional",
        styleTags: ["ukiyo-e", "woodblock", "landscape", "nature"],
        artworkCount: 15,
        featured: true,
        verified: true,
        verifiedAt: new Date('2023-12-10'),
        commissionTier: "featured",
        reputationScore: 88,
        badges: ["master_artist", "verified_artist", "featured_artist", "limited_edition_specialist"],
        totalSales: 156,
        averageRating: 4.7,
        socialLinks: {
            website: "https://hokusai.art",
            instagram: "@hokusai_ukiyoe",
            twitter: "@hokusai_art",
        },
        joinedAt: new Date('2023-05-20'),
    },
    {
        id: "kandinsky",
        slug: "wassily-kandinsky",
        name: "Wassily Kandinsky",
        email: "wassily@starrynight.art",
        bio: "Russian painter and art theorist, pioneer of abstract art.",
        artisticPhilosophy: "Color is the keyboard, the eyes are the harmonies, the soul is the piano with many strings.",
        imageUrl: "/images/artists/kandinsky.jpg",
        coverImageUrl: "/images/artists/kandinsky-cover.jpg",
        era: "Abstract Art",
        primaryStyle: "abstract",
        styleTags: ["abstract", "geometric", "expressionism", "modernism"],
        artworkCount: 10,
        featured: false,
        verified: true,
        verifiedAt: new Date('2024-01-05'),
        commissionTier: "base",
        reputationScore: 85,
        badges: ["master_artist", "verified_artist", "collector_favorite"],
        totalSales: 67,
        averageRating: 4.6,
        socialLinks: {
            website: "https://kandinsky.art",
            instagram: "@kandinsky_abstract",
            behance: "@kandinsky",
        },
        joinedAt: new Date('2023-09-10'),
    },
];
