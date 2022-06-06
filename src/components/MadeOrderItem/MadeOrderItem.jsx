import React from "react";
import { Link } from "react-router-dom";
import "./MadeOrderItem.css";

export default function MadeOrderItem(props) {
  const displayPrice = (price, quantity) => {
    return (
      "$" +
      (Number(price.replace(/[^0-9.-]+/g, "")) * Number(quantity)).toFixed(2)
    );
  };
  const renderMadeOrderProducts = () => {
    // console.log(props.itemsArr);
    return props.itemsArr.map((product, index) => (
      <div className="made-order-item" key={index}>
        <div className="made-order-img-name">
          <Link to={`/products/${product.id}`}>
            <div
              className="made-order-item-image"
              style={{
                backgroundImage: `url(${product.img})`,
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div className="made-order-item-name">{product.name}</div>
          </Link>
        </div>
        <div className="made-order-qty-price">
          <div className="made-order-item-qty">
            Quantity: {product.quantity}
          </div>
          <div className="made-order-item-price">
            {displayPrice(product.price, product.quantity)}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="made-order-container">
      <div className="made-order-top">
        <div className="made-order-address">
          <div className="made-order-ship-to">SHIP TO:</div>
          <div>{props.name}</div>
          <div>{props.address}</div>
          <div>
            {props.city}, {props.postal}
          </div>
          <div>{props.country}</div>
        </div>
        <div className="made-order-price-id">
          <div>
            <div>ORDER ID: {props.orderId}</div>
            <div>{props.email}</div>
          </div>
          <div className="made-order-total">TOTAL: {props.total}</div>
        </div>
      </div>
      <div className="made-order-bottom">{renderMadeOrderProducts()}</div>
    </div>
  );
}
