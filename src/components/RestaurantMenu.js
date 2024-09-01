import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";
import ResMenuHeader, { MenuHeaderSkeleton } from "./ResMenuHeader";
import AccordianBody from "./AccordianBody";

const RestaurantMenu = () => {
  const [resData, setResData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { resId } = useParams();
  const [processedData, setProcessedData] = useState({});
  const [showIndex, setShowIndex] = useState(0);

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
  // console.log("Processed Data ", processedData);

  return (
    <div className="max-w-full mx-36 mt-4">
      <ResMenuHeader data={headerData} />
      <div className="flex items-center justify-center h-full mt-4">
        <h4>Menu</h4>
      </div>
      <div className="h-3 max-w-full mt-6 mb-4 bg-gray-100" />
      <div>
        {processedData[
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        ]?.map((item, index) => (
          <React.Fragment key={item.title}>
            <AccordianBody
              itemData={item}
              isNested={false}
              isExpanded={index === showIndex ? true : false}
              setShowIndex={() => setShowIndex(index)}
            />
          </React.Fragment>
        ))}
      </div>
      <div>
        {processedData[
          "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
        ] &&
        processedData[
          "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
        ].length > 0
          ? processedData[
              "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
            ].map((nestedItem) => (
              <React.Fragment key={nestedItem.title}>
                <div>
                  <div className="w-full mx-auto bg-gray-50 shadow-lg p-2 mb-4 flex justify-between cursor-pointer rounded-lg">
                    <span className="text-xl font-bold ml-5">
                      {nestedItem.title}
                    </span>
                  </div>
                  <div>
                    {nestedItem?.categories?.map((item, index, arr) => (
                      <div
                        key={item.title}
                        className={`relative mt-3 mx-4 ${
                          index !== arr.length - 1
                            ? "border-b border-gray-200"
                            : ""
                        }`}
                      >
                        <AccordianBody
                          itemData={item}
                          isNested={true}
                          isExpanded={index === showIndex ? true : false}
                          setShowIndex={() => setShowIndex(index)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="h-3 max-w-full mt-6 mb-4 bg-gray-100" />
              </React.Fragment>
            ))
          : null}
      </div>
    </div>
  );
};

export default RestaurantMenu;
