import { createContext, useState, useEffect } from "react";

export const productsContext = createContext();

function ContextProvider({ children }) {
  const [productsArr, setProductsArr] = useState([]);
  const [cartObj, setCartObj] = useState({ total: 0 });
  const [wishListObj, setWishListObj] = useState([]);
  const [ordersObj, setOrdersObj] = useState([]);
  useEffect(() => {
    const cartObjData = JSON.parse(localStorage.getItem("cartObj"));

    if (cartObjData) {
      setCartObj(cartObjData);
    }
  }, []);
  return (
    <productsContext.Provider
      value={{
        productsArr,
        setProductsArr,
        cartObj,
        setCartObj,
        wishListObj,
        setWishListObj,
        ordersObj,
        setOrdersObj,
      }}
    >
      {children}
    </productsContext.Provider>
  );
}

export default ContextProvider;
