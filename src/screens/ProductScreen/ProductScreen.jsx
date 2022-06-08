import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { productsContext } from "../../contexts/productsContext";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../apis/api";
import wishlist from "../../apis/wishlist";
import CircleLoader from "react-spinners/CircleLoader";
import "./ProductScreen.css";
import getPageTitle from "../../utils/getPageTitle";
import { AiFillHeart } from "react-icons/ai";
import ReviewItem from "../../components/ReviewItem/ReviewItem";
import { RiStarSFill } from "react-icons/ri";

export default function ProductScreen(props) {
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);
  const history = useHistory();
  const {
    wishListObj,
    setWishListObj,
    productsArr,
    setProductsArr,
    cartObj,
    setCartObj,
  } = useContext(productsContext);
  const { currentUser } = useAuth();
  let productIndex = props.match.params.id - 1;
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
      setAddedToCart(true);
    } else {
      setCartObj({
        ...cartObj,
        [productIndex]: parseInt(quantity),
        total: cartObj.total + parseInt(quantity),
      });
      setQuantity(1);
      setAddedToCart(true);
    }
  };
  const handleAddWishlist = () => {
    const userEmail = currentUser.multiFactor.user.email;
    if (wishListObj[0].wishlist[userEmail]) {
      if (!wishListObj[0].wishlist[userEmail].includes(productIndex)) {
        let newWishListObj = [...wishListObj];
        newWishListObj[0].wishlist[userEmail].push(productIndex);
        setLoading(true);
        (async () => {
          await wishlist.put("1", newWishListObj[0]);
          setWishListObj(newWishListObj);
          setLoading(false);
        })();
      } else {
        let newWishListObj = [...wishListObj];
        const index =
          newWishListObj[0].wishlist[userEmail].indexOf(productIndex);
        newWishListObj[0].wishlist[userEmail].splice(index, 1);
        setLoading(true);
        (async () => {
          await wishlist.put("1", newWishListObj[0]);
          setWishListObj(newWishListObj);
          setLoading(false);
        })();
      }
    } else {
      let newWishListObj = [...wishListObj];
      newWishListObj[0].wishlist[userEmail] = [productIndex];
      setLoading(true);
      (async () => {
        await wishlist.put("1", newWishListObj[0]);
        setWishListObj(newWishListObj);
        setLoading(false);
      })();
    }
  };
  const renderReviewItems = () => {
    return productsArr[productIndex].reviews.map((review, index) => (
      <div key={index}>
        <ReviewItem
          email={review.email}
          rating={review.rating}
          description={review.description}
          title={review.title}
        />
      </div>
    ));
  };
  const handleAddReview = () => {
    const review = {
      email: currentUser.multiFactor.user.email,
      rating: rating,
      description: description,
      title: title,
    };
    let newProductsArr = [...productsArr];
    newProductsArr[productIndex].reviews.push(review);
    setLoading(true);
    (async () => {
      await api.put(`${productIndex + 1}`, newProductsArr[productIndex]);
      setProductsArr(newProductsArr);
      setLoading(false);
      setDescription("");
      setTitle("");
      setRating(1);
    })();
  };
  const handleRatingStarClick = (e, value) => {
    setRating(value);
  };
  const wishlistLiked = () => {
    const userEmail = currentUser.multiFactor.user.email;
    return (
      wishListObj[0].wishlist[userEmail] &&
      wishListObj[0].wishlist[userEmail].includes(productIndex)
    );
  };
  useEffect(() => {
    if (addedToCart) {
      history.push("/cart");
    }
  }, [addedToCart, history]);
  const calcProductAvgRating = () => {
    let avgScore = 0;
    if (productsArr[productIndex].reviews.length > 0) {
      for (let i = 0; i < productsArr[productIndex].reviews.length; i++) {
        avgScore += productsArr[productIndex].reviews[i].rating;
      }
      avgScore = avgScore / productsArr[productIndex].reviews.length;
    }
    return avgScore.toFixed(1);
  };
  const renderReviewsSummary = () => {
    return Array.apply(null, { length: 5 }).map((e, i) => (
      <span
        style={{ cursor: "auto" }}
        className={`add-review-star ${
          i + 1 <= Math.round(calcProductAvgRating()) ? "star-active" : ""
        }`}
        key={i}
      >
        <RiStarSFill />
      </span>
    ));
  };
  return (
    <div className="product-page-container">
      {loading ? (
        <div className="spinner">
          <CircleLoader color={"blue"} loading={true} size={200} />
        </div>
      ) : (
        <>
          <div className="product-page">
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
                <div className="product-page-reviews-summary">
                  <span>{renderReviewsSummary()}</span>
                  <span style={{ fontWeight: 700 }}>
                    {calcProductAvgRating()}
                  </span>
                  <span>
                    ({productsArr[productIndex].reviews.length} Reviews)
                  </span>
                </div>
              </div>

              <div className="product-page-description">
                {productsArr[productIndex].description}
              </div>
              <div className="product-page-footer">
                <div className="product-price-container">
                  <div className="product-page-price">
                    <div className="quantity">
                      <span>Qty: </span>
                      <input
                        value={quantity}
                        min="1"
                        onChange={handleQuantityChange}
                        type="number"
                      />
                    </div>
                    {productsArr[productIndex].price}
                  </div>
                  <button onClick={handleAddToCart}>Add to Cart</button>
                </div>
                {currentUser ? (
                  <div
                    className={`add-wishlist-btn ${
                      wishlistLiked() ? "liked" : ""
                    }`}
                    onClick={handleAddWishlist}
                  >
                    <AiFillHeart />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="product-reviews-container">
            <div className="product-reviews-header">
              <div className="product-add-review">
                {currentUser ? (
                  <>
                    <div className="add-review-title">Write a Review</div>
                    <div className="add-review-rating">
                      <span
                        onClick={(e) => handleRatingStarClick(e, 1)}
                        className="add-review-star star-active"
                      >
                        <RiStarSFill />
                      </span>
                      <span
                        onClick={(e) => handleRatingStarClick(e, 2)}
                        className={`add-review-star ${
                          rating > 1 ? "star-active" : ""
                        }`}
                      >
                        <RiStarSFill />
                      </span>
                      <span
                        onClick={(e) => handleRatingStarClick(e, 3)}
                        className={`add-review-star ${
                          rating > 2 ? "star-active" : ""
                        }`}
                      >
                        <RiStarSFill />
                      </span>
                      <span
                        onClick={(e) => handleRatingStarClick(e, 4)}
                        className={`add-review-star ${
                          rating > 3 ? "star-active" : ""
                        }`}
                      >
                        <RiStarSFill />
                      </span>
                      <span
                        onClick={(e) => handleRatingStarClick(e, 5)}
                        className={`add-review-star ${
                          rating > 4 ? "star-active" : ""
                        }`}
                      >
                        <RiStarSFill />
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder="Enter Title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                      placeholder="Your Review"
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    <button onClick={handleAddReview}>Submit Review</button>
                  </>
                ) : (
                  <div className="add-review-title">
                    Sign in to add a review
                  </div>
                )}
              </div>
            </div>
            <div className="product-reviews">
              {productsArr[productIndex].reviews.length
                ? renderReviewItems()
                : ""}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
