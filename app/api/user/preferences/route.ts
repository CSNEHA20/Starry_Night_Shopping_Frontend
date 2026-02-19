import { NextRequest, NextResponse } from 'next/server';
import type { UserPreferences, PreferencesApiResponse } from '@/types/recommendation';

// GET /api/user/preferences - Retrieve user preferences
export async function GET(request: NextRequest) {
    try {
        const sessionId = request.cookies.get('sessionId')?.value;
        const userId = request.cookies.get('userId')?.value;

        if (!sessionId) {
            return NextResponse.json<PreferencesApiResponse>(
                {
                    success: false,
                    error: {
                        code: 'MISSING_SESSION',
                        message: 'Session ID is required',
                    },
                    timestamp: Date.now(),
                },
                { status: 400 }
            );
        }

        // TODO: Fetch preferences from database
        // For now, return mock data
        const preferences: UserPreferences = {
            userId,
            sessionId,
            categoryAffinity: {},
            priceRange: {
                min: 0,
                max: 10000,
                average: 2500,
            },
            colorPreferences: [],
            styleAffinity: {},
            eraAffinity: {},
            favoriteArtists: [],
            purchaseFrequency: 0,
            averageSessionDuration: 0,
            totalSpent: 0,
            firstSeen: Date.now(),
            lastSeen: Date.now(),
            updatedAt: Date.now(),
        };

        return NextResponse.json<PreferencesApiResponse>({
            success: true,
            data: preferences,
            timestamp: Date.now(),
        });
    } catch (error) {
        console.error('Error fetching user preferences:', error);
        return NextResponse.json<PreferencesApiResponse>(
            {
                success: false,
                error: {
                    code: 'INTERNAL_ERROR',
                    message: 'Failed to fetch user preferences',
                },
                timestamp: Date.now(),
            },
            { status: 500 }
        );
    }
}

// POST /api/user/preferences - Update user preferences
export async function POST(request: NextRequest) {
    try {
        const sessionId = request.cookies.get('sessionId')?.value;
        const userId = request.cookies.get('userId')?.value;

        if (!sessionId) {
            return NextResponse.json<PreferencesApiResponse>(
                {
                    success: false,
                    error: {
                        code: 'MISSING_SESSION',
                        message: 'Session ID is required',
                    },
                    timestamp: Date.now(),
                },
                { status: 400 }
            );
        }

        const body = await request.json();

        // TODO: Validate and save preferences to database
        // For now, just echo back the received data
        const updatedPreferences: UserPreferences = {
            ...body,
            userId,
            sessionId,
            updatedAt: Date.now(),
        };

        return NextResponse.json<PreferencesApiResponse>({
            success: true,
            data: updatedPreferences,
            timestamp: Date.now(),
        });
    } catch (error) {
        console.error('Error updating user preferences:', error);
        return NextResponse.json<PreferencesApiResponse>(
            {
                success: false,
                error: {
                    code: 'INTERNAL_ERROR',
                    message: 'Failed to update user preferences',
                },
                timestamp: Date.now(),
            },
            { status: 500 }
        );
    }
}
