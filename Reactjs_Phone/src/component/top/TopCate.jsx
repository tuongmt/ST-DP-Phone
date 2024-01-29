import React from "react";
import { TopCart } from "./TopCart";
import "./style.css";
export const TopCate = () => {
  return (
    <>
      <section className="topCat background">
        <div className="container">
          <div className="heading d_flex">
            <div className="heading-left row f_flex">
              <i className="fa fa-border-all"></i>
              <h2>Loại được ưa chuộng hàng đầu</h2>
            </div>
            {/* <div className="heading-right row">
              <span>Xem tất cả</span>
              <i className="fa fa-caret-right"> </i>
            </div> */}
          </div>
          <TopCart />
        </div>
      </section>
    </>
  );
};
