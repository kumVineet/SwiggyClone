import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";

const RestaurantMenu = () => {
  const [resData, setResData] = useState(null);
  const { resId } = useParams();

  useEffect(() => {
    fetchData();
  }, []);
  //"804071"
  const fetchData = async () => {
    const data = await fetch(MENU_API + resId);
    const json = await data.json();

    setResData(json.data);
  };

  if (resData === null) return <h1>Loading .......</h1>;

  const {
    name,
    avgRatingString,
    costForTwoMessage,
    totalRatingsString,
    areaName,
    feeDetails,
    sla,
    cuisines,
  } = resData?.cards[2]?.card?.card?.info;

  const cardTypes =
    resData?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
  const recommendedCard = cardTypes.find((card) => {
    return card?.card?.card?.title === "Recommended";
  });

  const { itemCards } = recommendedCard?.card?.card ?? {};
  const stripHtmlTags = (html) => {
    var div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const plainText = stripHtmlTags(feeDetails?.message);

  console.log(resData);

  return (
    <div className="max-w-full mx-52 mt-4">
      <div className="max-w-full rounded overflow-hidden shadow-lg p-4">
        <div className="font-bold text-2xl mb-2">{name}</div>
        <div className="flex items-center mb-2">
          <div className="text-green-600 font-bold">{avgRatingString}</div>
          <div className="text-black-600 font-bold ml-2">
            ({totalRatingsString})
          </div>
          <span className="h-1.5 w-1.5 bg-gray-500 rounded-full inline-block ml-2" />
          <div className="text-black-600 font-bold ml-3">
            {costForTwoMessage}
          </div>
        </div>
        <div className="text-orange-600 mb-2">
          {cuisines.map((cuisine, index) => (
            <span key={index}>
              <a href="#" className="hover:underline">
                {cuisine}
              </a>
              {index < cuisines.length - 1 && <span>,</span>}
              <span className="ml-1" />
            </span>
          ))}
        </div>
        <div className="mb-2 flex items-center">
          <span className="h-1.5 w-1.5 bg-gray-500 rounded-full inline-block ml-2 mr-2" />
          <span className="text-gray-600">Outlet |</span>
          <span className="font-bold ml-1">{areaName}</span>
        </div>
        <div className="text-gray-600 mb-4">
          <span className="h-1.5 w-1.5 bg-gray-500 rounded-full inline-block ml-2 mr-2" />
          {sla.minDeliveryTime}-{sla.maxDeliveryTime} mins
        </div>
        <h2 className="text-gray-600">{plainText}</h2>
      </div>
      <div className="menu">
        <ul>
          {itemCards?.map((item) => (
            <li key={item?.card?.info.id}>
              {item?.card?.info?.name} --- Rs{" "}
              {(item?.card?.info?.defaultPrice || item?.card?.info?.price) /
                100}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantMenu;
