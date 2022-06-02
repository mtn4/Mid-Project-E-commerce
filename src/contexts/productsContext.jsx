import { createContext, useState } from "react";

export const productsContext = createContext();

function ContextProvider({ children }) {
  const [productsArr, setProductsArr] = useState([]);

  return (
    <productsContext.Provider
      value={{
        productsArr,
        setProductsArr,
      }}
    >
      {children}
    </productsContext.Provider>
  );
}

export default ContextProvider;
