import React from "react";
import { Link } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";
import "./CartProduct.css";

export default function CartProduct(props) {
  const displayPrice = () => {
    return (
      "$" +
      (
        Number(props.price.replace(/[^0-9.-]+/g, "")) * Number(props.qty)
      ).toFixed(2)
    );
  };
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
          {/* <button id={props.id} onClick={props.onClick}>
            Remove
          </button> */}
          <BsFillTrashFill
            size={18}
            onClick={(e) => props.onClick(e, props.id)}
          />
        </div>
        <div className="cart-item-price">{displayPrice()}</div>
      </div>
    </div>
  );
}
