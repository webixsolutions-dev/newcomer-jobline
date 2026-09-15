// src/pages/Resources.jsx
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import ResourcesHero from "../components/resources/ResourcesHero";
import PopularResourceCategories from "../components/resources/PopularResourceCategories";
import FeaturedResources from "../components/resources/FeaturedResources";
import ResourcesHelpCTA from "../components/resources/ResourcesHelpCTA";
import {
  FEATURED_RESOURCES,
  RESOURCE_CATEGORIES,
} from "../data/resourcesPageData";

const matchesQuery = (query, ...fields) => {
  if (!query) return true;
  const normalized = query.toLowerCase();
  return fields.some((field) => field.toLowerCase().includes(normalized));
};

const Resources = () => {
  const { hash } = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hash]);

  const filteredCategories = useMemo(
    () =>
      RESOURCE_CATEGORIES.filter((cat) =>
        matchesQuery(searchQuery, cat.title, cat.description)
      ),
    [searchQuery]
  );

  const filteredFeatured = useMemo(
    () =>
      FEATURED_RESOURCES.filter((item) =>
        matchesQuery(searchQuery, item.title, item.description)
      ),
    [searchQuery]
  );

  return (
    <>
      <ResourcesHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <PopularResourceCategories categories={filteredCategories} />
      <FeaturedResources resources={filteredFeatured} />
      <ResourcesHelpCTA />
    </>
  );
};

export default Resources;