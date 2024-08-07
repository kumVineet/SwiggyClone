import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";
import ResMenuHeader, { MenuHeaderSkeleton } from "./ResMenuHeader";
import CardItem from "./CardItem";

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
  console.log("Processed Data ", processedData);

  return (
    <div className="max-w-full mx-36 mt-4">
      <ResMenuHeader data={headerData} />
      <div className="h-3 max-w-full mt-6 mb-4 bg-gray-200" />
      <div className="menu">
        {Object.keys(processedData).map((type) => (
          <div key={type}>
            {processedData[type].map((category, index) => (
              <div key={index} className="">
                <h2 className="text-xl font-bold m-2">{category.title}</h2>
                <ul className=" list-inside ml-4">
                  {category.itemCards?.map((item) => (
                    <li key={item?.card?.info?.id}>
                      <CardItem data={item?.card?.info} />
                    </li>
                  ))}
                  {category.categories?.map((subCategory, subIndex) => (
                    <div key={subIndex}>
                      <h3 className="text-xl font-semibold mt-2">
                        {subCategory.title}
                      </h3>
                      <ul className=" list-inside ml-4">
                        {subCategory.itemCards?.map((item) => (
                          <li key={item?.card?.info?.id}>
                            <CardItem data={item?.card?.info} />
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
