import { CDN_URL } from "../utils/constants";
import greenStar from "../assets/Images/greenStar.png";

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

const RestaurantCard = (props) => {
  const { resData } = props;
  const { cloudinaryImageId, name, avgRating, cuisines, costForTwo, sla } =
    resData?.info;
  const truncatedCuisines = truncateText(cuisines.join(", "), 50);
  return (
    <div
      className="bg-white border rounded-lg shadow-md overflow-hidden flex flex-col p-4 m-2 transition-transform transform hover:scale-110 hover:shadow-xl"
      style={{ minWidth: "250px", maxWidth: "250px", height: "350px" }}
    >
      <img
        className="w-full h-36 object-cover rounded-md"
        src={CDN_URL + cloudinaryImageId}
      />
      <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2 text-left">
        {name}
      </h3>
      <div className="flex items-center space-x-2">
        <img src={greenStar} className="w-4 h-4" />
        <h4 className="text-sm font-medium text-gray-600 text-left">
          {avgRating}
        </h4>
        <span className="h-1 w-1 bg-gray-500 rounded-full inline-block ml-2" />
        <h4 className="text-sm font-medium text-gray-600 text-left">
          {sla.slaString}
        </h4>
      </div>
      <h4 className="text-sm font-medium text-gray-600 text-left break-words overflow-hidden mt-2">
        {truncatedCuisines}
      </h4>
      <h4 className="text-sm font-medium text-gray-600 text-left mt-2">
        {costForTwo}
      </h4>
    </div>
  );
};

//Higher Order Component
// input - RestaurantCard ==>> RestaurantCardPromoted

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div className="relative">
        <label className="absolute top-2 left-2 bg-black text-white text-sm font-mono rounded-tr-md rounded-br-md px-2 py-1 z-10">
          Good Food
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
