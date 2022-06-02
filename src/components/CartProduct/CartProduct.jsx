import React from "react";
import { Link } from "react-router-dom";
import "./CartProduct.css";

export default function CartProduct(props) {
  return (
    <div className="cart-item-container">
      <div className="cart-name-image">
        <Link to={`/products/${props.id}`}>
          <div
            className="cart-item-image"
            style={{
              backgroundImage: `url(${props.img})`,
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="cart-item-name">{props.name}</div>
        </Link>
      </div>
      <div className="cart-qty-price">
        <div className="qty-remove">
          <span>Quantity: {props.qty}</span>
          <button id={props.id} onClick={props.onClick}>
            Remove
          </button>
        </div>
        <div className="cart-item-price">{props.price}</div>
      </div>
    </div>
  );
}
