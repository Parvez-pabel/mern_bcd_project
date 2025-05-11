import React from "react";
import ProductStore from "../../store/ProductStore";
import StarRatings from "react-star-ratings";

const Reviews = () => {
  const { ProductReview } = ProductStore();
  return (
    <div className="mt-3">
      <ul className="list-group gap-2 ">
        {ProductReview !== null ? (
          ProductReview.map((item, index) => {
            return (
              <li key={index} className="list-group-item card bg-transparent">
                <h6 className="m-0 p-0 ">
                  <i className="bi bi-person-square m-2 "></i>
                  {item.profile.cus_name} _<span>{item.profile.cus_add} </span>
                  <span className=" m-2 ">
                    <StarRatings
                      rating={parseFloat(item.rating)}
                      starRatedColor="red"
                      starDimension="15px"
                      starSpacing="2px"
                    />
                  </span>
                </h6>
                <p>{item.des}</p>
              </li>
            );
          })
        ) : (
          <span></span>
        )}
      </ul>
    </div>
  );
};

export default Reviews;
