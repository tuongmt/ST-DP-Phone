import React from "react";
import { FlashCard } from "./FlashCard";
import { Link } from "react-router-dom";
import "./Flash.css";

export const FlashDeals = ({ productItems, addToCart }) => {
  return (
    <>
      <section className="flash background">
        <div className="container">
          <div className="heading f_flex">
            <div className="heading-left row">
              <h1>
                Điện thoại bán chạy nhất hiện nay
                {/* <i className="fa fa-bolt"></i> */}
              </h1>
            </div>
            <div className="heading-right row ">
              {/* <Link to={"./phone"}>
                <span>
                  Xem tất cả <i className="fa fa-caret-right"> </i>
                </span>
              </Link> */}
            </div>
          </div>
          <FlashCard productItems={productItems} addToCart={addToCart} />
        </div>
      </section>
    </>
  );
};
