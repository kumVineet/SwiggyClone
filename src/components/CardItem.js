import React, { useEffect, useState } from "react";
import { ITEM_IMG } from "../utils/constants";
import nonVeg from "../assets/Images/non-veg.png";
import veg from "../assets/Images/veg.png";

const CardItem = (props) => {
  const { data } = props;
  const [isVeg, setIsVeg] = useState(true);

  useEffect(() => {
    if (data.itemAttribute.vegClassifier === "NONVEG") {
      setIsVeg(false);
    }
  }, [data]);

  return (
    <>
      <div className="flex flex-col md:flex-row max-w-full h-56 p-4 justify-between ">
        <div className="w-2/3 h-52">
          <img
            src={isVeg ? veg : nonVeg}
            className="w-5 h-5 mb-2 md:mb-0 md:mr-2"
            alt={isVeg ? "Veg" : "Non-Veg"}
          />
          <h3 className="text-xl font-semibold text-gray-700">{data.name}</h3>
          <h4 className="text-lg font-medium ">
            ₹{(data.defaultPrice || data.price) / 100}
          </h4>
          <p className="text-sm  text-gray-500 mt-2 md:mt-5">
            {data.description}
          </p>
        </div>
        <div className="flex flex-col h-52  ">
          <img
            className="w-40 h-40 object-fill rounded-md "
            src={ITEM_IMG + data?.imageId}
            alt={data.name}
          />
          <div className="flex flex-col relative bottom-8 items-center mt-2">
            <button className="bg-white text-green-500 font-bold py-2 px-4 w-28 h-10 border border-gray-500 rounded-md mb-1">
              ADD
            </button>
            {data.addons ? (
              <span className="text-xs text-gray-500 font-light">
                Customisable
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardItem;
