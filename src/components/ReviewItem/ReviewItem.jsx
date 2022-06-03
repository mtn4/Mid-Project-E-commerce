import React from "react";
import "./ReviewItem.css";
import { BiFace } from "react-icons/bi";
import { RiStarSFill } from "react-icons/ri";
export default function ReviewItem(props) {
  const renderRatingStars = () => {
    return Array.apply(null, { length: props.rating }).map((e, i) => (
      <span className="review-rating" key={i}>
        <RiStarSFill />
      </span>
    ));
  };
  return (
    <div className="review-card">
      <div className="review-item-container">
        <div className="review-poster">
          <div className="review-avatar">
            <BiFace />
          </div>
          <div className="review-email">{props.email}</div>
        </div>
        <div className="review-rating-title">
          <div>{renderRatingStars()}</div>
          <div className="review-title">{props.title}</div>
        </div>
        <div className="review-description">{props.description}</div>
      </div>
    </div>
  );
}
