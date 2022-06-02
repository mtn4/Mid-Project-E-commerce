import React, { useState, useEffect, useContext } from "react";
import { productsContext } from "../../contexts/productsContext";
import api from "../../apis/api";
import CircleLoader from "react-spinners/CircleLoader";
import "./CartScreen.css";

export default function CartScreen() {
  const [loading, setLoading] = useState(true);
  const { setProductsArr, cartObj } = useContext(productsContext);
  useEffect(() => {
    setLoading(true);
    (async () => {
      const data = await api.get();
      setProductsArr(data.data);
      setLoading(false);
    })();
  }, [setProductsArr]);

  const renderCartProducts = () => {
    for (const [key, value] of Object.entries(cartObj)) {
      if (key === "total") continue;
      console.log(`${key}: ${value}`);
    }
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
            {cartObj.total ? renderCartProducts() : ""}
            <div></div>
            <div></div>
          </>
        )}
      </div>
    </div>
  );
}
