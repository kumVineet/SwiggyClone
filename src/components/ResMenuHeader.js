import greenStar from "../assets/Images/greenStar.png";
import { CDN_URL } from "../utils/constants";

const ResMenuHeader = (props) => {
  const { data } = props;

  const {
    name,
    avgRatingString,
    costForTwoMessage,
    totalRatingsString,
    areaName,
    feeDetails,
    sla,
    cuisines,
    cloudinaryImageId,
  } = data;

  const stripHtmlTags = (html) => {
    var div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const plainText = stripHtmlTags(feeDetails?.message);

  return (
    <div className="flex flex-col md:flex-row items-center max-w-full h-auto md:h-72 rounded overflow-hidden shadow-lg p-4 justify-between">
      <div className="flex-1 md:mr-4">
        <div className="font-bold text-xl md:text-2xl mb-2">{name}</div>
        <div className="flex items-center mb-2 space-x-2">
          <img src={greenStar} className="w-4 h-4" />
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
      <img
        className="w-full md:w-56 h-48 md:h-full rounded-lg object-cover"
        src={CDN_URL + cloudinaryImageId}
        alt="Restaurant"
      />
    </div>
  );
};

export default ResMenuHeader;

export const MenuHeaderSkeleton = () => {
  return (
    <div className="flex items-center max-w-full h-64 rounded overflow-hidden shadow-lg p-4 justify-between animate-pulse">
      <div className="flex flex-col justify-between h-full space-y-4">
        <div className="h-8 bg-gray-300 rounded w-72 shimmer"></div>
        <div className="flex items-center space-x-2">
          <div className="w-28 h-4 bg-gray-300 rounded shimmer"></div>
          <div className="h-1.5 w-1.5 bg-gray-300 rounded-full ml-2 shimmer"></div>
          <div className="h-4 bg-gray-300 rounded w-28 ml-3 shimmer"></div>
        </div>
        <div className="flex items-center mb-2 space-x-2">
          <div className="h-4 bg-gray-300 rounded w-64 shimmer"></div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-1.5 w-1.5 bg-gray-300 rounded-full ml-2 mr-2 shimmer"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3 shimmer"></div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-1.5 w-1.5 bg-gray-300 rounded-full ml-2 mr-2 shimmer"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3 shimmer"></div>
        </div>
        <div className="h-6 bg-gray-300 rounded w-64 shimmer"></div>
      </div>
      <div className="w-56 h-full bg-gray-300 rounded-lg shimmer"></div>
    </div>
  );
};
