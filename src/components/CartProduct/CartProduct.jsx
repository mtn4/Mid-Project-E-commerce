import React, { useState, useContext } from "react";
import { productsContext } from "../../contexts/productsContext";
import { Link } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";
import "./CartProduct.css";

export default function CartProduct(props) {
  const { cartObj, setCartObj } = useContext(productsContext);
  const [quantity, setQuantity] = useState(props.qty);
  let productIndex = props.id - 1;
  const changeCartQuantity = (e) => {
    const quantity = e.target.value.replace(/\D/g, "");
    setQuantity(quantity);
    let total = cartObj.total - cartObj[productIndex];
    if (quantity > 0) {
      setCartObj({
        ...cartObj,
        [productIndex]: parseInt(quantity),
        total: total + parseInt(quantity),
      });
    }
  };
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
        <input
          type="text"
          maxLength="3"
          value={quantity}
          onChange={changeCartQuantity}
        ></input>
        <BsFillTrashFill
          style={{ cursor: "pointer" }}
          size={18}
          onClick={(e) => props.onClick(e, props.id)}
        />
        <div className="cart-item-price">{displayPrice()}</div>
      </div>
    </div>
  );
}
