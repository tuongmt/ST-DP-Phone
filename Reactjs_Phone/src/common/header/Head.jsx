import React from "react";

export const Head = () => {
  return (
    <>
      <section className="head">
        <div className="container d_flex ">
          <div className="left row">
            <i className="fa fa-phone"></i>
            <label htmlFor="">+0999999999</label>
            <i className="fa fa-envelope"></i>
            <label htmlFor="">iPhone@example.com</label>
          </div>
          <div className="right row RText">
            <label>Hỏi đáp</label>
            <label>Cần hỗ trợ</label>
            <span>🌐</span>
            <label>VN</label>
          </div>
        </div>
      </section>
    </>
  );
};
