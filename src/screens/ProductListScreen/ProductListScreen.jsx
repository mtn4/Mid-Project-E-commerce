import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { productsContext } from "../../contexts/productsContext";
import api from "../../apis/api";
import CircleLoader from "react-spinners/CircleLoader";
import Product from "../../components/Product/Product";
import "./ProductListScreen.css";
import getPageTitle from "../../utils/getPageTitle";

export default function ProductListScreen(props) {
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

  const renderProducts = () => {
    return productsArr
      .filter((product) => {
        if (props.match.params.name) {
          if (product.category === props.match.params.name) {
            return true;
          } else {
            return product.name
              .toLowerCase()
              .includes(props.match.params.name.toLowerCase());
          }
        }
        return product.category;
      })
      .map((product, index) => (
        <div key={product.id}>
          <Link key={product.id} to={`/products/${product.id}`}>
            <Product
              img={product.img}
              name={product.name}
              brand={product.brand}
              price={product.price}
            />
          </Link>
        </div>
      ));
  };

  return (
    <div className="products-page-container">
      <div className="products-page">
        {loading ? (
          <div className="spinner">
            <CircleLoader color={"blue"} loading={true} size={200} />
          </div>
        ) : (
          <>
            <div className="products-page-title">
              {getPageTitle(props.match.params.name)}
            </div>
            <div className="products-container">{renderProducts()}</div>
          </>
        )}
      </div>
    </div>
  );
}
