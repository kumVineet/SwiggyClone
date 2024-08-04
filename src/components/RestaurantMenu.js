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

  const { name } = resData?.cards[2]?.card?.card?.info;

  const cardTypes =
    resData?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
  const recommendedCard = cardTypes.find((card) => {
    return card?.card?.card?.title === "Recommended";
  });

  const { itemCards } = recommendedCard?.card?.card ?? {};

  return (
    <div className="menu">
      <h1>{name}</h1>
      <h2>Menu</h2>
      <ul>
        {itemCards?.map((item) => (
          <li key={item?.card?.info.id}>
            {item?.card?.info?.name} --- Rs{" "}
            {(item?.card?.info?.defaultPrice || item?.card?.info?.price) / 100}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
