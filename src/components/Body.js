import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Body = () => {
  const [originalList, setOriginalList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [count, setCount] = useState(0);
  const [searchText, setSearchText] = useState("");

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.65200&lng=77.16630&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();

    const restaurants =
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants || [];
    setOriginalList(restaurants);
    setFilteredList(restaurants);
  };

  const filterList = () => {
    if (count === 0) {
      const filteredList = originalList.filter(
        (res) => res.info.avgRating >= 4.4
      );
      setFilteredList(filteredList);
      setCount(1);
    } else {
      setFilteredList(originalList);
      setCount(0);
    }
  };

  const search = () => {
    const filteredList = originalList.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredList(filteredList);
    setSearchText("");
  };

  useEffect(() => {
    if (filteredList.length === 0 && originalList.length > 0) {
      const timer = setTimeout(() => setFilteredList(originalList), 4000);
      return () => clearTimeout(timer);
    }
  }, [filteredList, originalList]);

  return filteredList ? (
    <div className="body flex flex-col items-center p-4">
      <div className="filter flex items-center space-x-4 mb-4">
        <div className="search flex items-center space-x-2">
          <input
            type="text"
            className="search-box border border-gray-300 rounded-md p-2 w-64 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-200"
            onClick={() => search()}
          >
            Search
          </button>
        </div>
        <button
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-200"
          onClick={filterList}
        >
          {count === 0 ? "Top Rated Restaurant" : "Reset Filter"}
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {filteredList.map((restaurant) => (
          <Link
            to={"/restaurants/" + restaurant.info.id}
            key={restaurant.info.id}
          >
            {restaurant?.info?.avgRating > 4.4 ? (
              <RestaurantCardPromoted resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  ) : (
    <h1>Loading...........</h1>
  );
};

export default Body;
