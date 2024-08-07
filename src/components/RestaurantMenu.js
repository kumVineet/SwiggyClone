import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";
import ResMenuHeader, { MenuHeaderSkeleton } from "./ResMenuHeader";

const RestaurantMenu = () => {
  const [resData, setResData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { resId } = useParams();
  const [processedData, setProcessedData] = useState({});

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [resId]); // Add resId as a dependency

  const fetchData = async () => {
    try {
      const data = await fetch(MENU_API + resId);
      const json = await data.json();
      setResData(json.data);
      processMenuData(json.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const processMenuData = (data) => {
    const cardTypes =
      data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

    const newProcessedData = {};

    cardTypes.forEach((item) => {
      const { card } = item;
      const { "@type": type, title, itemCards, categories } = card.card;

      if (
        type === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      ) {
        if (!newProcessedData[type]) {
          newProcessedData[type] = [];
        }
        newProcessedData[type].push({ title, itemCards });
      } else if (
        type ===
        "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
      ) {
        if (!newProcessedData[type]) {
          newProcessedData[type] = [];
        }
        newProcessedData[type].push({ title, categories });
      } else {
        if (!newProcessedData[type]) {
          newProcessedData[type] = [];
        }
        newProcessedData[type].push(card.card);
      }
    });

    setProcessedData(newProcessedData);
  };

  if (loading) {
    return (
      <div className="max-w-full mx-52 mt-4">
        <MenuHeaderSkeleton />
      </div>
    );
  }

  if (resData === null) {
    return <div>No data available</div>;
  }

  const headerData = resData?.cards[2]?.card?.card?.info;

  return (
    <div className="max-w-full mx-44 mt-4">
      <ResMenuHeader data={headerData} />
      <div className="menu">
        {Object.keys(processedData).map((type) => (
          <div key={type}>
            {processedData[type].map((category, index) => (
              <div key={index} className="mb-6">
                <h2 className="text-xl font-bold mb-2">{category.title}</h2>
                <ul className="list-disc list-inside ml-4">
                  {category.itemCards?.map((item) => (
                    <li key={item?.card?.info?.id}>
                      {item?.card?.info?.name} --- Rs{" "}
                      {(item?.card?.info?.defaultPrice ||
                        item?.card?.info?.price) / 100}
                    </li>
                  ))}
                  {category.categories?.map((subCategory, subIndex) => (
                    <div key={subIndex}>
                      <h3 className="text-lg font-semibold mt-2">
                        {subCategory.title}
                      </h3>
                      <ul className="list-disc list-inside ml-4">
                        {subCategory.itemCards?.map((item) => (
                          <li key={item?.card?.info?.id}>
                            {item?.card?.info?.name} --- Rs{" "}
                            {(item?.card?.info?.defaultPrice ||
                              item?.card?.info?.price) / 100}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
