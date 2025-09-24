import { useState } from "react";
import ShoppingCart from "./components/shoppingCart";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CheckOut from "./components/checkOut";
   

function App() {

  return (
    <BrowserRouter>
    <div>
      <div className="flex flex-col items-center bg-blue-200 border-2 border-white p-10 rounded-4xl drop-shadow-lg shadow-2xl shadow-black-950">
        <h1 className="text-4xl">Finnigan's Store</h1>
      </div>
      <Routes>
      <Route path="/" element={<ShoppingCart />} />
      <Route path="/checkout" element={<CheckOut />} />
      </Routes>
    </div>
   </BrowserRouter>
  );
}

export default App;
