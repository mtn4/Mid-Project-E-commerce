import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { productsContext } from "../../contexts/productsContext";
import api from "../../apis/api";
import CircleLoader from "react-spinners/CircleLoader";
import "./ProductScreen.css";
import getPageTitle from "../../utils/getPageTitle";

export default function ProductScreen(props) {
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { productsArr, setProductsArr, cartObj, setCartObj } =
    useContext(productsContext);
  let productIndex = props.match.params.id - 1;
  useEffect(() => {
    setLoading(true);
    (async () => {
      const data = await api.get();
      setProductsArr(data.data);
      setLoading(false);
    })();
  }, [setProductsArr]);
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };
  useEffect(() => {
    if (cartObj.total > 0)
      localStorage.setItem("cartObj", JSON.stringify(cartObj));
  }, [cartObj]);
  const handleAddToCart = () => {
    if (cartObj[productIndex]) {
      setCartObj({
        ...cartObj,
        [productIndex]: cartObj[productIndex] + parseInt(quantity),
        total: cartObj.total + parseInt(quantity),
      });
      setQuantity(1);
    } else {
      setCartObj({
        ...cartObj,
        [productIndex]: parseInt(quantity),
        total: cartObj.total + parseInt(quantity),
      });
      setQuantity(1);
    }
  };
  return (
    <div className="product-page-container">
      <div className="product-page">
        {loading ? (
          <div className="spinner">
            <CircleLoader color={"blue"} loading={true} size={200} />
          </div>
        ) : (
          <>
            <div
              className="product-page-image"
              style={{
                backgroundImage: `url(${productsArr[productIndex].img})`,
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div className="product-page-information">
              <div>
                <div className="product-page-category">
                  <Link to={`/${productsArr[productIndex].category}`}>
                    {getPageTitle(productsArr[productIndex].category)}
                  </Link>
                </div>
                <div className="product-page-brand">
                  {productsArr[productIndex].brand}
                </div>
                <div className="product-page-name">
                  {productsArr[productIndex].name}
                </div>
                <div className="product-page-model">
                  <span>Model: </span>
                  {productsArr[productIndex].model}
                </div>
              </div>

              <div className="product-page-description">
                {productsArr[productIndex].description}
              </div>
              <div className="product-price-container">
                <div className="product-page-price">
                  <div className="quantity">
                    <span>Qty: </span>
                    <input
                      value={quantity}
                      onChange={handleQuantityChange}
                      type="number"
                    />
                  </div>
                  {productsArr[productIndex].price}
                </div>
                <button onClick={handleAddToCart}>Add to Cart</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
