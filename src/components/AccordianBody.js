import { useState } from "react";
import CardItem from "./CardItem";
import down from "../assets/Images/down.png";
import up from "../assets/Images/up.png";

const AccordianBody = ({ itemData, isNested, isExpanded, setShowIndex }) => {
  // const [isExpanded, setIsExpanded] = useState(false);

  const toggleCategory = () => {
    // setIsExpanded(true)
    setShowIndex();
  };

  return (
    <div>
      <div
        className="w-full mx-auto bg-grey-50 p-2 mb-4 flex justify-between cursor-pointer rounded-lg"
        onClick={toggleCategory}
      >
        <span
          className={`text-xl ml-5 ${
            isNested ? "font-semibold" : "font-bold"
          } `}
        >
          {itemData.title} ({itemData?.itemCards?.length})
        </span>
        <span className="mr-5 flex justify-center items-center">
          {isExpanded ? (
            <img src={up} className="w-4 h-4" />
          ) : (
            <img src={down} className="w-4 h-4" />
          )}
        </span>
      </div>
      <div>
        {isExpanded && (
          <ul className="list-inside ml-4 mt-2">
            {itemData.itemCards?.map((item, index) => (
              <li key={index} className="mb-2">
                <hr className="border-gray-300 my-2" />
                <CardItem data={item?.card?.info} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {!isNested && <div className="h-3 max-w-full mt-6 mb-4 bg-gray-100" />}
    </div>
  );
};

export default AccordianBody;
