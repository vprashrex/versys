import React, { useContext, useEffect, useState } from "react";
import data from "../assets/dummy/data.json";

const AppProvider = React.createContext();

export function useAppContext() {
  return useContext(AppProvider);
}

export default function AppContext({ children }) {
  const [influencersCategory, setInfluencersCategory] = useState([
    {
      id: "1",
      name: "Fashion",
      url: "https://d5ik1gor6xydq.cloudfront.net/websiteImages/creatorMarketplace/categories/fashion.png",
    },
    {
      id: "2",
      name: "Music & dance",
      url: "https://d5ik1gor6xydq.cloudfront.net/websiteImages/creatorMarketplace/categories/music%20&%20dance.png",
    },
    {
      id: "3",
      name: "Beauty",
      url: "https://d5ik1gor6xydq.cloudfront.net/websiteImages/creatorMarketplace/categories/beauty.png",
    },
    {
      id: "4",
      name: "Travel",
      url: "https://d5ik1gor6xydq.cloudfront.net/websiteImages/creatorMarketplace/categories/travel.png",
    },
  ]);
  const [influencersPlatform, setInfluencersPlatform] = useState([
    {
      id: "1",
      name: "Any",
    },
    {
      id: "2",
      name: "Instagram",
    },
    {
      id: "3",
      name: "User Generated Content",
    },
    {
      id: "4",
      name: "Youtube",
    },
  ]);
  const [allInfluencers, setAllInfluencers] = useState(data);
  const [featuredInfluencers, setFeaturedInfluencers] = useState([]);

  useEffect(() => {
    setFeaturedInfluencers(allInfluencers.filter((user, i) => user.isFeatured));

    // fetch all Platform from API
    // setInfluencersPlatform(data)
    // fetch all category from API
    // setInfluencersCategory(data)
  }, [allInfluencers]);

  const value = {
    allInfluencers,
    influencersCategory,
    influencersPlatform,
    setInfluencersCategory,
    setInfluencersPlatform,
    featuredInfluencers,
  };

  return <AppProvider.Provider value={value}>{children}</AppProvider.Provider>;
}
