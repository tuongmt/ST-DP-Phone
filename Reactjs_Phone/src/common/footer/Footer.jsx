import React from "react";
import "./footer.css";

export const Footer = () => {
  return (
    <>
      <footer>
        <div className="container grid2">
          <div className="box">
            <h1>Bonik </h1>
            <p>Công ty cổ phần thương mại điện tử Việt Nam</p>
            <div className="icon d_flex">
              <div className="d_flex">
                <i className="fa-brands fa-google-play"></i>
                <span>Google Play</span>
              </div>
              <div className="d_flex">
                <i className="fa-brands fa-app-store-ios"></i>
                <span>App Store</span>
              </div>
            </div>
          </div>
          <div className="box">
            <h2>Về chúng tôi</h2>
            <ul>
              <li>Sự nghiệp</li>
              <li>Câu chuyện</li>
              <li>Chính sách bảo mật</li>
              <li>Điều khoản & điều kiện</li>
              <li>Sự chăm sóc của chúng tôi</li>
            </ul>
          </div>

          <div className="box">
            <h2>Chăm sóc khách hàng</h2>
            <ul>
              <li>Trung tâm hỗ trợ</li>
              <li>Cách thức mua hàng </li>
              <li>Theo dõi đơn hàng</li>
              <li>Trả lại & hoàn tiền </li>
            </ul>
          </div>
          <div className="box">
            <h2>Liên lạc với chúng tôi</h2>
            <ul>
              <li>828 SVH, Q10, TP HCM </li>
              <li>Email: iPhone@example.com</li>
              <li>Hotline: +099999999</li>
              <li>© Design & copied by Tuong</li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};
