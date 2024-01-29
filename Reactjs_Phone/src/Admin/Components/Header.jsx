import React, { useState, useEffect } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";

export const Header = () => {
  const history = useHistory();
  const [user, setUser] = useState({ taikhoan: "" });

  useEffect(() => {
    // Sử dụng một hàm async để lấy dữ liệu từ Local Storage
    const getUserDataFromLocalStorage = async () => {
      const userData = localStorage.getItem("user");
      console.log("userData", userData); // Kiểm tra giá trị userData

      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      }
    };

    getUserDataFromLocalStorage(); // Gọi hàm để lấy dữ liệu từ Local Storage
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);

    history.replace("/login-signup/Login"); // Sử dụng replace thay vì push
    window.location.reload(); // Tải lại trang
  };

  {
    user && <Header />;
  }

  return (
    <>
      <div className="header_wrapper d_flex">
        <div className="page_admin">
          <h2>TRANG CHỦ ADMIN</h2>
        </div>
        <div className="d_flex username_logout">
          <h3>{user.fullName}</h3>
        </div>
        <div>
          <h3>
            <NavDropdown
              title={
                <i className="fas fa-cogs" style={{ background: "white" }}></i>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item>
                <i className="fas fa-key mr-3"></i>
                Đổi mật khẩu
              </NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown.Item onClick={handleLogout}>
                <i className="fas fa-sign-out-alt mr-3"></i>
                Đăng xuất
              </NavDropdown.Item>
            </NavDropdown>
          </h3>
        </div>
      </div>
    </>
  );
};
