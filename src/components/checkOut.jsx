import React from "react";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const navigate = useNavigate();
//use localstorage to add the shopping cart or ?? 
  return (
    <div>
      <h1>Check Out</h1>
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
