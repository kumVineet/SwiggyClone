import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CardItem from "./CardItem";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className="max-w-full mx-36 mt-4">
      <div className="flex flex-row justify-between m-4 p-4 ">
        <h1 className="font-bold text-2xl">Cart</h1>
        <button
          className="p-2 bg-black text-white rounded-lg"
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
      </div>
      {cartItems.length === 0 ? (
        <div className="flex justify-center">
          <h1>Add Items to Cart</h1>
        </div>
      ) : (
        <>
          <ul className="list-inside ml-4 mt-2">
            {cartItems.map((item, index) => (
              <li key={index} className="mb-2">
                <hr className="border-gray-300 my-2" />
                <CardItem data={item} />
              </li>
            ))}
          </ul>
          <div className="h-3 max-w-full mt-6 mb-4 bg-gray-100" />
        </>
      )}
    </div>
  );
};

export default Cart;
