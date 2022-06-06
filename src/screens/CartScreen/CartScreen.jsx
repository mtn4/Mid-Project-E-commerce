import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { productsContext } from "../../contexts/productsContext";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../apis/api";
import CircleLoader from "react-spinners/CircleLoader";
import CartProduct from "../../components/CartProduct/CartProduct";
import "./CartScreen.css";

export default function CartScreen() {
  const [loading, setLoading] = useState(true);
  const emptyCart = useRef(false);
  const { currentUser } = useAuth();
  const {
    productsArr,
    setProductsArr,
    cartObj,
    setCartObj,
    cartTotal,
    setCartTotal,
  } = useContext(productsContext);
  useEffect(() => {
    setLoading(true);
    (async () => {
      const data = await api.get();
      setProductsArr(data.data);
      setLoading(false);
    })();
  }, [setProductsArr]);

  useEffect(() => {
    let total = 0;
    if (loading === false) {
      if (cartObj.total > 0) {
        for (const key in cartObj) {
          if (key === "total") {
            continue;
          }
          let currency = productsArr[key].price;
          let number = Number(currency.replace(/[^0-9.-]+/g, ""));
          total = total + number * cartObj[key];
        }
      }
    }
    setCartTotal("$" + total.toFixed(2));
  }, [cartObj, loading, productsArr, setCartTotal]);

  const handleRemove = (e, id) => {
    let newCartObj = {
      ...cartObj,
      total: cartObj.total - cartObj[id - 1],
    };
    delete newCartObj[id - 1];
    setCartObj(newCartObj);
    console.log(cartObj.total);
    emptyCart.current = true;
  };

  useEffect(() => {
    if (cartObj.total > 0 || emptyCart.current)
      localStorage.setItem("cartObj", JSON.stringify(cartObj));
  }, [cartObj]);

  const renderCartProducts = () => {
    let cartObjToRender = { ...cartObj };
    delete cartObjToRender.total;
    return Object.keys(cartObjToRender).map((key, index) => {
      return (
        <div key={key}>
          <CartProduct
            id={productsArr[key].id}
            img={productsArr[key].img}
            name={productsArr[key].name}
            brand={productsArr[key].brand}
            price={productsArr[key].price}
            qty={cartObj[key]}
            onClick={handleRemove}
          />
        </div>
      );
    });
  };
  return (
    <div className="cart-page-container">
      <div className="cart-page">
        {loading ? (
          <div className="spinner">
            <CircleLoader color={"blue"} loading={true} size={200} />
          </div>
        ) : (
          <>
            <div className="cart-left">
              <div className="cart-page-title">Your Cart</div>
              {cartObj.total ? renderCartProducts() : ""}
            </div>
            <div className="cart-right">
              <div className="summary">Order Summary</div>
              <hr />
              <div className="item-total">
                <span>Item Total</span>
                <span>{cartTotal}</span>
              </div>
              <div className="shipping">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="tax">
                <span>Estimated Sales Tax</span>
                <span>$0.00</span>
              </div>
              <hr />
              <div className="total">
                <span>Total</span>
                <span>{cartTotal}</span>
              </div>
              {currentUser ? (
                <Link to={`/checkout`}>
                  <button
                    className="checkout-btn"
                    disabled={cartObj.total ? false : true}
                  >
                    Checkout
                  </button>
                </Link>
              ) : (
                <button className="sign-btn">Sign In To Checkout</button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
