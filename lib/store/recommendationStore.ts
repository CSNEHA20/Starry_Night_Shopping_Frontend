import { create } from 'zustand';

interface RecommendationStore {
    isPersonalizationEnabled: () => boolean;
    enablePersonalization: () => void;
    disablePersonalization: () => void;
}

export const useRecommendationStore = create<RecommendationStore>((set) => ({
    isPersonalizationEnabled: () => true, // Default to true for now
    enablePersonalization: () => { },
    disablePersonalization: () => { },
}));
