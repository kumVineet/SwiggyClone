import { CDN_URL } from "../utils/constants";

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
      className="bg-white border rounded-lg shadow-md overflow-hidden flex flex-col p-4 m-2"
      style={{ minWidth: "250px", maxWidth: "250px", height: "350px" }}
    >
      <img
        className="w-full h-32 object-cover rounded-md"
        src={CDN_URL + cloudinaryImageId}
      />
      <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2 text-left">
        {name}
      </h3>
      <div className="flex items-center space-x-4">
        <h4 className="text-sm font-medium text-gray-600 text-left">
          {avgRating}
        </h4>

        <h4 className="text-sm font-medium text-gray-600 text-left">
          {sla.slaString}
        </h4>
      </div>
      <h4
        className="text-sm font-medium text-gray-600 text-left break-words overflow-hidden"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
        }}
      >
        {truncatedCuisines}
      </h4>
      <h4 className="text-sm font-medium text-gray-600 text-left">
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
      <div>
        <label className="absolute m-2 bg-black text-cyan-300 text-sm font-mono rounded-tr-md rounded-br-md px-1">
          Good Food
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
