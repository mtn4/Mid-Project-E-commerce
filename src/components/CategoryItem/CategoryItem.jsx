import React from "react";
import "./CategoryItem.css";
import getPageTitle from "../../utils/getPageTitle";
export default function CategoryItem(props) {
  const category = getPageTitle(props.category);
  return (
    <div className="category-container">
      <div
        className="category-item"
        style={{
          backgroundImage: `url(${props.img})`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      >
        {category}
      </div>
    </div>
  );
}
