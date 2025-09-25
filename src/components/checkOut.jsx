import React from "react";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const navigate = useNavigate();
  //use localstorage to add the shopping cart or ??

  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

  const handleCheckOut = async () => {
    const response = await fetch("http://localhost:4242/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems }),
    });
    const data = await response.json();
    if(data.url) {
      window.location = data.url; // Redirect to Stripe Checkout
    } else {
      alert("Checkout failed. Please try again.");
    }

  };

  return (
    <div>
      <div
        style={{ backgroundColor: "slategrey" }}
        className="flex rounded-4xl justify-center item-center border-2 border-white shadow-2xl shadow-black-950 gap-4"
      >
        <div className="flex justify-center item-center rounded-lg gap-4">
          <div className="flex flex-col justify-evenly mr-5 mt-15 mb-15 shadow-2xl shadow-black-950 bg-blue-200 rounded-4xl drop-shadow-lg p-10 w-xl">
            <h2 className="flex justify-center mb-5 text-3xl">
              Shopping Cart Summary
            </h2>
            <hr />
            <ul  className="divide-y-2 divide-gray-500 p-5">
              {cartItems.map((item) => (
                <li key={item.id} className="mb-2 p-5 text-2xl">
                  {item.name} x {item.quantity} — ${item.price}
                </li>
              ))}
            </ul>
            <p className="p-5 text-3xl text-center">
              Total: $
              {cartItems
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2)}
              <br />
              <span className="text-center text-base">
                *excludes taxes and shipping
              </span>
            </p>
                <hr />
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleCheckOut}
            >
              Check Out
            </button>
          </div>
        </div>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => navigate("/")}
      >
        Return Home
      </button>
    </div>
  );
};

export default CheckOut;
