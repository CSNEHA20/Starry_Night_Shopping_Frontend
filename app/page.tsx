import ScrollSequence from "@/components/animation/ScrollSequence";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedArt from "@/components/home/FeaturedArt";
import StorySection from "@/components/home/StorySection";
import { RecommendedForYou } from "@/components/recommendations/RecommendedForYou";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import { getFeaturedCollections } from "@/lib/data/curated-collections";
import ScrollStorytelling from "@/components/home/ScrollStorytelling";
import HeroSection from "@/components/home/HeroSection";

export default function Home() {
    const featuredCollections = getFeaturedCollections();

    return (
        <main className="min-h-screen text-white">
            <ScrollSequence
                imageSequenceSrc="/image-sequence-background"
                frameCount={1023}
                className="h-screen"
            />

            {/* Hero Overlays - Scrolling with page */}
            <div className="relative z-10">
                <HeroSection />

                <ScrollStorytelling />
                <StorySection />
                <CategoryGrid />
                <FeaturedArt />
                <FeaturedCollections collections={featuredCollections} />
                <RecommendedForYou limit={6} />
            </div>
        </main>
    );
}
