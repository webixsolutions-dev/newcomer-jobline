import ResourcesHero from "../components/resources/ResourcesHero";
import PopularCategories from "../components/resources/PopularCategories";
import FeaturedResources from "../components/resources/FeaturedResources";
import SupportCTA from "../components/resources/SupportCTA";

const Resources = () => {
  return (
    <div className="bg-white min-h-screen pt-[72px]">
      <ResourcesHero />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <PopularCategories />
        <FeaturedResources />
        <SupportCTA />
      </main>
    </div>
  );
};

export default Resources;