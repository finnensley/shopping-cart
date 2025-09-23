import React, { useState } from "react";

const initialItems = [
  { id: 1, name: "T-shirt", price: 3, quantity: 2 },
  { id: 2, name: "Hats", price: 10, quantity: 3 },
  { id: 3, name: "Mug", price: 10, quantity: 4 },
  { id: 4, name: "Jacket", price: 5, quantity: 0 },
];

const ShoppingCart = () => {
  const [items, setItems] = useState(initialItems);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item) => {
    if (item.quantity === 0) return;
    setItems((prevItems) =>
      prevItems.map((it) =>
        it.id === item.id ? { ...it, quantity: it.quantity - 1 } : it
      )
    );
    setCartItems((prevCartItems) => {
      const found = prevCartItems.find((cartItem) => cartItem.id === item.id);
      if (found) {
        return prevCartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCartItems, { ...item, quantity: 1 }];
      }
    });
  };

  const handleIncrease = (cartItem) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((ci) =>
        ci.id === cartItem.id ? { ...ci, quantity: ci.quantity + 1 } : ci
      )
    );
    setItems((prevItems) =>
      prevItems.map((it) =>
        it.id === cartItem.id ? { ...it, quantity: it.quantity - 1 } : it
      )
    );
  };

  const handleDelete = (cartItem) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((ci) => ci.id !== cartItem.id)
    );
    setItems((prevItems) =>
      prevItems.map((it) =>
        it.id === cartItem.id
          ? { ...it, quantity: it.quantity + cartItem.quantity }
          : it
      )
    );
  };

  const handleDecrease = (cartItem) => {
    if (cartItem.quantity === 1) { // handleDelete happens after click past 1
        handleDelete(cartItem);
    } else {
    setCartItems((prevCartItems) =>
      prevCartItems.map((ci) =>
        ci.id === cartItem.id ? { ...ci, quantity: ci.quantity - 1 } : ci
      )
    );

    setItems((prevItems) =>
      prevItems.map((it) =>
        it.id === cartItem.id ? { ...it, quantity: it.quantity + 1 } : it
      )
    );
  };
};

  return (
    <div>
      <div
    //   style ={{ backgroundColor: "rgb(80, 56, 56)" }}
      style ={{ backgroundColor: "slategrey" }}
      className="flex rounded-4xl justify-center item-center border-2 border-white shadow-2xl shadow-black-950 gap-4"> {/*bg-blue-900*/}
        {/*center div inside a div, justify-center item-center on outer div*/}
        <div className="flex flex-col justify-evenly ml-5 mt-15 mb-15 bg-blue-200 shadow-2xl shadow-black-950 drop-shadow-lg p-10 rounded-4xl w-xl">
          <h2 className="flex justify-center mb-5 text-3xl">Inventory Items</h2>
          <hr></hr>
          <ul
            style={{ listStyleType: "none" }}
            className="divide-y-2 divide-gray-500 p-5"
          >
            {items.map((item) => (
              <li key={item.id} className="p-5 text-2xl">
                {item.name} : ${item.price} | On Hand:{" "}
                {item.quantity === 0 ? "Out of Stock" : item.quantity}
                <button
                  className="ml-4"
                  onClick={() => handleAddToCart(item)}
                  hidden={item.quantity === 0}
                >
                  Add To Cart
                </button>
              </li>
            ))}
          </ul>
          <hr></hr>
        </div>
        <div className="flex justify-center item-center rounded-lg gap-4">
          <div className="flex flex-col justify-evenly mr-5 mt-15 mb-15 shadow-2xl shadow-black-950 bg-blue-200 rounded-4xl drop-shadow-lg p-10 w-xl">
            <h2 className="flex justify-center mb-5 text-3xl">Shopping Cart</h2>
            <hr></hr>
            {cartItems.map((cartItem) => {
              const itemInStock = items.find((it) => it.id === cartItem.id);
              const stock = itemInStock ? itemInStock.quantity : 0;
              return (
                <div key={cartItem.id} className="mb-2 p-5 text-2xl">
                  <span className="divide-y-2 divide-gray-500 text-2xl p-5">
                    {cartItem.name} : ${cartItem.price} x {cartItem.quantity}
                  </span>
                  <span className="inline-flex items-center ml-2">
                  <button
                    className="ml-35 w-12 text-3xl"
                    onClick={() => handleIncrease(cartItem)}
                    disabled={stock === 0}
                  >
                    +
                  </button>
                  <button
                    // style={{ marginLeft: "8px" }}
                    className="ml-2 w-12 text-3xl"
                    onClick={() => handleDecrease(cartItem)}
                    disabled={cartItem.quantity === 0}
                  >
                    -
                  </button>
                  </span>
                  <button
                    className="ml-2 w-full"
                    onClick={() => handleDelete(cartItem)}
                  >
                    Delete
                  </button>
                  <hr></hr>
                </div>
              );
            })}
            <div>
              <p className="p-5 text-2xl">
                SubTotal: $
                {
                  cartItems
                    .map((cartItem) => cartItem.quantity * cartItem.price)
                    .reduce((acc, itemTotal) => acc + itemTotal, 0) // itemTotal could be amt, can be anything
                }
              </p>
              <hr></hr>
              <p className="p-5 text-2xl">Taxes: </p>
              <hr></hr>
              <p className="p-5 text-2xl">Shipping: </p>
              <hr></hr>
              <button className="p-5 w-full" type="submit">
                Check Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
