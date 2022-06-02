import { createContext, useState } from "react";

export const productsContext = createContext();

function ContextProvider({ children }) {
  const [productsArr, setProductsArr] = useState([]);
  const [cartArr, setCartArr] = useState([]);

  return (
    <productsContext.Provider
      value={{
        productsArr,
        setProductsArr,
        cartArr,
        setCartArr,
      }}
    >
      {children}
    </productsContext.Provider>
  );
}

export default ContextProvider;
