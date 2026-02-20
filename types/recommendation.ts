import type { Artwork } from "@/lib/data/artworks";

export interface RecommendedArtwork {
    artworkId: string;
    score: number;
    reason: string;
    rank: number;
    artwork: Artwork;
}

export interface UserPreferences {
    userId?: string;
    sessionId?: string;
    categoryAffinity: Record<string, number>;
    priceRange: {
        min: number;
        max: number;
        average: number;
    };
    colorPreferences: string[];
    styleAffinity: Record<string, number>;
    eraAffinity: Record<string, number>;
    favoriteArtists: string[];
    purchaseFrequency: number;
    averageSessionDuration: number;
    totalSpent: number;
    firstSeen: number;
    lastSeen: number;
    updatedAt: number;
}

export interface PreferencesApiResponse {
    success: boolean;
    data?: UserPreferences;
    error?: {
        code: string;
        message: string;
    };
    timestamp: number;
}

export type EventType =
    | 'page_view'
    | 'artwork_click'
    | 'artwork_hover'
    | 'scroll_depth'
    | 'add_to_cart'
    | 'remove_from_cart'
    | 'purchase'
    | 'wishlist_add'
    | 'wishlist_remove'
    | 'search_query'
    | 'category_view'
    | 'artist_view';


export interface BaseEvent {
    eventType: EventType;
    timestamp: number;
    sessionId?: string;
    userId?: string;
}

export interface PageViewEvent extends BaseEvent {
    eventType: 'page_view';
    pageUrl: string;
    referrer?: string;
}

export interface ArtworkClickEvent extends BaseEvent {
    eventType: 'artwork_click';
    artworkId: string;
    artworkTitle: string;
    category: string;
    price: number;
    position: number;
    context?: string;
}

export interface ArtworkHoverEvent extends BaseEvent {
    eventType: 'artwork_hover';
    artworkId: string;
    duration: number;
}

export interface ScrollDepthEvent extends BaseEvent {
    eventType: 'scroll_depth';
    pageUrl: string;
    depth: number;
    maxDepth: number;
}

export interface CartEvent extends BaseEvent {
    eventType: 'add_to_cart' | 'remove_from_cart';
    artworkId: string;
    price: number;
    quantity: number;
}

export interface PurchaseEvent extends BaseEvent {
    eventType: 'purchase';
    orderId: string;
    artworkIds: string[];
    totalAmount: number;
    itemCount: number;
}

export interface WishlistEvent extends BaseEvent {
    eventType: 'wishlist_add' | 'wishlist_remove';
    artworkId: string;
}

export interface SearchQueryEvent extends BaseEvent {
    eventType: 'search_query';
    query: string;
    resultsCount: number;
}

export interface CategoryViewEvent extends BaseEvent {
    eventType: 'category_view';
    categoryId: string;
    categoryName: string;
}

export interface ArtistViewEvent extends BaseEvent {
    eventType: 'artist_view';
    artistId: string;
    artistName: string;
}

export type UserEvent =
    | PageViewEvent
    | ArtworkClickEvent
    | ArtworkHoverEvent
    | ScrollDepthEvent
    | CartEvent
    | PurchaseEvent
    | WishlistEvent
    | SearchQueryEvent
    | CategoryViewEvent
    | ArtistViewEvent;


