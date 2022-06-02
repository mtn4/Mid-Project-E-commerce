import React from "react";
import "./Product.css";

export default function Product(props) {
  return (
    <div className="product-container">
      <div
        className="product-image"
        style={{
          backgroundImage: `url(${props.img})`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="product-details">
        <div>{props.name}</div>
        <div className="brand">{props.brand}</div>
        <div className="price">{props.price}</div>
      </div>
    </div>
  );
}
