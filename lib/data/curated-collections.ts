export interface Collection {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    link: string;
}

export const curatedCollections: Collection[] = [
    {
        id: "impressionist-masterpieces",
        title: "Impressionist Masterpieces",
        description: "Light, color, and rapid brushwork defining a movement.",
        imageUrl: "/images/examples/impressionism.jpg",
        link: "/collections/impressionism",
    },
    {
        id: "modern-abstract",
        title: "Modern Abstract",
        description: "Breaking away from traditional representation.",
        imageUrl: "/images/examples/abstract.jpg",
        link: "/collections/abstract",
    },
    {
        id: "renaissance-classics",
        title: "Renaissance Classics",
        description: "The rebirth of art and culture in Europe.",
        imageUrl: "/images/examples/renaissance.jpg",
        link: "/collections/renaissance",
    },
];

export function getFeaturedCollections(): Collection[] {
    return curatedCollections;
}
