import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { productsContext } from "../../contexts/productsContext";
import api from "../../apis/api";
import wishlist from "../../apis/wishlist";
import CircleLoader from "react-spinners/CircleLoader";
import Product from "../../components/Product/Product";
import "./WishListScreen.css";

export default function WishListScreen() {
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const { wishListObj, setWishListObj, productsArr, setProductsArr } =
    useContext(productsContext);
  useEffect(() => {
    setLoading(true);
    (async () => {
      const data = await api.get();
      setProductsArr(data.data);
      const wishData = await wishlist.get();
      setWishListObj(wishData.data);
      setLoading(false);
    })();
  }, [setProductsArr, setWishListObj]);
  const renderWishListProducts = () => {
    const userEmail = currentUser.multiFactor.user.email;
    if (wishListObj[0].wishlist[userEmail]) {
      if (wishListObj[0].wishlist[userEmail].length > 0) {
        return wishListObj[0].wishlist[userEmail].map((index) => (
          <div key={productsArr[index].id}>
            <Link
              key={productsArr[index].id}
              to={`/products/${productsArr[index].id}`}
            >
              <Product
                img={productsArr[index].img}
                name={productsArr[index].name}
                brand={productsArr[index].brand}
                price={productsArr[index].price}
              />
            </Link>
          </div>
        ));
      } else {
        return (
          <div className="wish-list-sub-title">
            There are no products in your wish list!
          </div>
        );
      }
    } else {
      return (
        <div className="wish-list-sub-title">
          There are no products in your wish list!
        </div>
      );
    }
  };
  return (
    <div className="wish-list-container">
      <div className="wish-list">
        {loading ? (
          <div className="spinner">
            <CircleLoader color={"blue"} loading={true} size={200} />
          </div>
        ) : (
          <>
            <div className="wish-list-title">
              {currentUser
                ? "Your Wish List"
                : "Please Log In To Use Wish List"}
            </div>
            <div className="products-container">
              {currentUser ? renderWishListProducts() : ""}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
