import {
    UserEvent,
    PageViewEvent,
    ArtworkClickEvent,
    ArtworkHoverEvent,
    ScrollDepthEvent,
    CartEvent,
    PurchaseEvent,
    WishlistEvent,
    SearchQueryEvent,
    CategoryViewEvent,
    ArtistViewEvent,
} from '@/types/recommendation';

// ============================================================================
// Event Tracker Configuration
// ============================================================================

// const BATCH_SIZE = 10; // Send events in batches of 10
const BATCH_INTERVAL = 5000; // Send every 5 seconds
const MAX_QUEUE_SIZE = 50; // Maximum events in queue before forcing send

// ============================================================================
// Event Queue Management
// ============================================================================

class EventQueue {
    private queue: UserEvent[] = [];
    private batchTimer: NodeJS.Timeout | null = null;

    add(event: UserEvent) {
        this.queue.push(event);

        // Force send if queue is too large
        if (this.queue.length >= MAX_QUEUE_SIZE) {
            this.flush();
        } else if (!this.batchTimer) {
            // Start batch timer
            this.batchTimer = setTimeout(() => {
                this.flush();
            }, BATCH_INTERVAL);
        }
    }

    async flush() {
        if (this.queue.length === 0) return;

        const eventsToSend = [...this.queue];
        this.queue = [];

        if (this.batchTimer) {
            clearTimeout(this.batchTimer);
            this.batchTimer = null;
        }

        try {
            await sendEventsToServer(eventsToSend);
        } catch (error) {
            console.error('Failed to send events:', error);
            // Store failed events in localStorage for retry
            storeFailedEvents(eventsToSend);
        }
    }

    clear() {
        this.queue = [];
        if (this.batchTimer) {
            clearTimeout(this.batchTimer);
            this.batchTimer = null;
        }
    }
}

const eventQueue = new EventQueue();

// ============================================================================
// Server Communication
// ============================================================================

async function sendEventsToServer(events: UserEvent[]): Promise<void> {
    // Pure frontend mode: Log events to console instead of sending to API
    if (process.env.NODE_ENV === 'development') {
        console.log('[EventTracker] Tracking events:', events);
    }
    return Promise.resolve();
}

// ============================================================================
// Failed Events Storage (for retry)
// ============================================================================

const FAILED_EVENTS_KEY = 'starry-night-failed-events';

function storeFailedEvents(events: UserEvent[]) {
    try {
        const existing = localStorage.getItem(FAILED_EVENTS_KEY);
        const failedEvents = existing ? JSON.parse(existing) : [];
        failedEvents.push(...events);

        // Keep only last 100 failed events
        const trimmed = failedEvents.slice(-100);
        localStorage.setItem(FAILED_EVENTS_KEY, JSON.stringify(trimmed));
    } catch (error) {
        console.error('Failed to store events in localStorage:', error);
    }
}

export function retryFailedEvents() {
    try {
        const existing = localStorage.getItem(FAILED_EVENTS_KEY);
        if (!existing) return;

        const failedEvents: UserEvent[] = JSON.parse(existing);
        if (failedEvents.length === 0) return;

        // Clear storage
        localStorage.removeItem(FAILED_EVENTS_KEY);

        // Retry sending
        sendEventsToServer(failedEvents).catch((error) => {
            console.error('Retry failed:', error);
            storeFailedEvents(failedEvents);
        });
    } catch (error) {
        console.error('Failed to retry events:', error);
    }
}

// ============================================================================
// Event Tracker Class
// ============================================================================

export class EventTracker {
    private sessionId: string;
    private userId?: string;
    private isEnabled: boolean = true;

    constructor(sessionId: string, userId?: string) {
        this.sessionId = sessionId;
        this.userId = userId;
    }

    setUserId(userId: string) {
        this.userId = userId;
    }

    setEnabled(enabled: boolean) {
        this.isEnabled = enabled;
    }

    private createBaseEvent(): Omit<UserEvent, 'eventType'> {
        return {
            timestamp: Date.now(),
            sessionId: this.sessionId,
            userId: this.userId,
        };
    }

    // Track page view
    trackPageView(pageUrl: string, referrer?: string) {
        if (!this.isEnabled) return;

        const event: PageViewEvent = {
            ...this.createBaseEvent(),
            eventType: 'page_view',
            pageUrl,
            referrer,
        };

        eventQueue.add(event);
    }

    // Track artwork click
    trackArtworkClick(
        artworkId: string,
        artworkTitle: string,
        category: string,
        price: number,
        position: number,
        context: ArtworkClickEvent['context']
    ) {
        if (!this.isEnabled) return;

        const event: ArtworkClickEvent = {
            ...this.createBaseEvent(),
            eventType: 'artwork_click',
            artworkId,
            artworkTitle,
            category,
            price,
            position,
            context,
        };

        eventQueue.add(event);
    }

    // Track artwork hover
    trackArtworkHover(artworkId: string, duration: number) {
        if (!this.isEnabled) return;

        const event: ArtworkHoverEvent = {
            ...this.createBaseEvent(),
            eventType: 'artwork_hover',
            artworkId,
            duration,
        };

        eventQueue.add(event);
    }

    // Track scroll depth
    trackScrollDepth(pageUrl: string, depth: number, maxDepth: number) {
        if (!this.isEnabled) return;

        const event: ScrollDepthEvent = {
            ...this.createBaseEvent(),
            eventType: 'scroll_depth',
            pageUrl,
            depth,
            maxDepth,
        };

        eventQueue.add(event);
    }

    // Track cart events
    trackAddToCart(artworkId: string, price: number, quantity: number) {
        if (!this.isEnabled) return;

        const event: CartEvent = {
            ...this.createBaseEvent(),
            eventType: 'add_to_cart',
            artworkId,
            price,
            quantity,
        };

        eventQueue.add(event);
    }

    trackRemoveFromCart(artworkId: string, price: number, quantity: number) {
        if (!this.isEnabled) return;

        const event: CartEvent = {
            ...this.createBaseEvent(),
            eventType: 'remove_from_cart',
            artworkId,
            price,
            quantity,
        };

        eventQueue.add(event);
    }

    // Track purchase
    trackPurchase(
        orderId: string,
        artworkIds: string[],
        totalAmount: number,
        itemCount: number
    ) {
        if (!this.isEnabled) return;

        const event: PurchaseEvent = {
            ...this.createBaseEvent(),
            eventType: 'purchase',
            orderId,
            artworkIds,
            totalAmount,
            itemCount,
        };

        eventQueue.add(event);
    }

    // Track wishlist
    trackWishlistAdd(artworkId: string) {
        if (!this.isEnabled) return;

        const event: WishlistEvent = {
            ...this.createBaseEvent(),
            eventType: 'wishlist_add',
            artworkId,
        };

        eventQueue.add(event);
    }

    trackWishlistRemove(artworkId: string) {
        if (!this.isEnabled) return;

        const event: WishlistEvent = {
            ...this.createBaseEvent(),
            eventType: 'wishlist_remove',
            artworkId,
        };

        eventQueue.add(event);
    }

    // Track search
    trackSearch(query: string, resultsCount: number) {
        if (!this.isEnabled) return;

        const event: SearchQueryEvent = {
            ...this.createBaseEvent(),
            eventType: 'search_query',
            query,
            resultsCount,
        };

        eventQueue.add(event);
    }

    // Track category view
    trackCategoryView(categoryId: string, categoryName: string) {
        if (!this.isEnabled) return;

        const event: CategoryViewEvent = {
            ...this.createBaseEvent(),
            eventType: 'category_view',
            categoryId,
            categoryName,
        };

        eventQueue.add(event);
    }

    // Track artist view
    trackArtistView(artistId: string, artistName: string) {
        if (!this.isEnabled) return;

        const event: ArtistViewEvent = {
            ...this.createBaseEvent(),
            eventType: 'artist_view',
            artistId,
            artistName,
        };

        eventQueue.add(event);
    }

    // Flush all pending events
    flush() {
        eventQueue.flush();
    }
}

// ============================================================================
// Singleton Instance
// ============================================================================

let trackerInstance: EventTracker | null = null;

export function initializeEventTracker(sessionId: string, userId?: string) {
    trackerInstance = new EventTracker(sessionId, userId);

    // Retry failed events on initialization
    retryFailedEvents();

    return trackerInstance;
}

export function getEventTracker(): EventTracker {
    if (!trackerInstance) {
        throw new Error('EventTracker not initialized. Call initializeEventTracker first.');
    }
    return trackerInstance;
}

// ============================================================================
// Cleanup on page unload
// ============================================================================

if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
        eventQueue.flush();
    });
}
