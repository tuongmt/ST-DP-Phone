import NavDropdown from "react-bootstrap/NavDropdown";
import React, { useState, useEffect } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";

export const NavbarAdmin = (props) => {
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
    user && <NavbarAdmin />;
  }

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-dark mb-3">
        <div className="flex-row d-flex">
          <a className="navbar-brand" href="#">
            Admin
          </a>
        </div>
        <div className="navbar-collapse collapse" id="collapsingNavbar">
          <ul className="navbar-nav">
            <li className="">
              <a className="nav-link" href="#">
                Trang chủ
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">{user.fullName}</a>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li
              className="nav-item"
              style={{ display: "flex", alignItems: "center" }}
            >
              <NavDropdown
                title={<i className="fas fa-cogs"></i>}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="#">
                  <i className="fas fa-key mr-3"></i>
                  Đổi mật khẩu
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt mr-3"></i>
                  Đăng xuất
                </NavDropdown.Item>
              </NavDropdown>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default NavbarAdmin;
