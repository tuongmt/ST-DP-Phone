import React, { useState, useEffect } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";

export const Navbar = () => {
  const [MobileMenu, setMobileMenu] = useState(false);
  const history = useHistory();
  const [user, setUser] = useState({ taikhoan: "" });

  useEffect(() => {
    // Sử dụng một hàm async để lấy dữ liệu từ Local Storage
    const getUserDataFromLocalStorage = async () => {
      const userData = localStorage.getItem("user");
    

      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      }
    };

    getUserDataFromLocalStorage(); // Gọi hàm để lấy dữ liệu từ Local Storage
  }, []);

  {
    user && <Navbar />;
  }

  return (
    <>
      <header className="header">
        <div className="container d_flex">
          <div className="d_flex">
            <ul
              className={
                MobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"
              }
              onClick={() => setMobileMenu(false)}
            >
              <li>
                <Link to="/">Trang chủ</Link>
              </li>
              <li>
                <Link to="/contact">Liên lạc</Link>
              </li>
            </ul>
          </div>
          <div className="navlink">
            <ul
              className={
                MobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"
              }
              onClick={() => setMobileMenu(false)}
            >
              <li>
                  
                {
                  user.taikhoan === "" ? (
                    <Link to="/login-signup/Login">Đăng nhập</Link>
                  ) : (
                    <Link to="/">Xin Chào, <strong>{user.taikhoan}</strong></Link>
                  )

                }
                
              </li>
            </ul>

            <button
              className="toggle"
              onClick={() => setMobileMenu(!MobileMenu)}
            >
              {MobileMenu ? (
                <i className="fas fa-times close home-bth"></i>
              ) : (
                <i className="fa-solid fa-bars open"></i>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
