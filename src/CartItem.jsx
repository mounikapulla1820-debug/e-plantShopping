import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "../redux/CartSlice";
import "./CartItem.css";

const CartItem = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // ✅ Calculate total cart amount
  const calculateTotalAmount = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.totalPrice;
    });
    return total;
  };

  // ✅ Increase quantity
  const handleIncrement = (id) => {
    dispatch(updateQuantity({ id, type: "increase" }));
  };

  // ✅ Decrease quantity
  const handleDecrement = (id) => {
    dispatch(updateQuantity({ id, type: "decrease" }));
  };

  // ✅ Remove item from cart
  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-details">
                <h3>{item.name}</h3>
                <p>Unit Price: ₹{item.price}</p>
                <p>Total: ₹{item.totalPrice}</p>

                <div className="quantity-controls">
                  <button onClick={() => handleDecrement(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item.id)}>+</button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h3 className="cart-total">
            Total Cart Amount: ₹{calculateTotalAmount()}
          </h3>

          <div className="cart-actions">
            <button onClick={() => alert("Coming Soon")}>
              Checkout
            </button>
            <button onClick={() => window.history.back()}>
              Continue Shopping
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;
