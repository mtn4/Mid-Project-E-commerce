import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { productsContext } from "../../contexts/productsContext";
import api from "../../apis/api";
import CircleLoader from "react-spinners/CircleLoader";
import "./ProductScreen.css";
import getPageTitle from "../../utils/getPageTitle";

export default function ProductScreen(props) {
  const [loading, setLoading] = useState(true);
  const { productsArr, setProductsArr } = useContext(productsContext);
  useEffect(() => {
    setLoading(true);
    (async () => {
      const data = await api.get();
      setProductsArr(data.data);
      setLoading(false);
    })();
  }, [setProductsArr]);
  let productIndex = props.match.params.id - 1;
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
              <div className="product-page-description">
                {productsArr[productIndex].description}
              </div>
              <div className="product-price-container">
                <div className="product-page-price">
                  {productsArr[productIndex].price}
                </div>
                <button>Add to Cart</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
