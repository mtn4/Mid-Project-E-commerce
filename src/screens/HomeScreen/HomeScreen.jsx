import React from "react";
import "./HomeScreen.css";
import CategoryItem from "../../components/CategoryItem/CategoryItem";
import { Link } from "react-router-dom";

export default function HomeScreen() {
  const categories = ["audio", "cellphones", "computers", "videogames"];
  const renderCategoryCards = () => {
    return Array.apply(null, { length: 4 }).map((e, i) => (
      <div key={i}>
        <Link key={i} to={`${categories[i]}`}>
          <CategoryItem
            img={`/assets/images/${i + 1}.jpg`}
            category={categories[i]}
          />
        </Link>
      </div>
    ));
  };

  return (
    <div className="home-container">
      <div className="home-page">
        <div className="home-page-title">Welcome to BuyNow!</div>
        <div className="home-page-category-items">{renderCategoryCards()}</div>
      </div>
    </div>
  );
}
