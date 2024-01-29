import React from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
export const DashBoard = () => {
  const history = useHistory();

  const handleManageUser = () => {
    history.replace("/admin/User"); // Sử dụng replace thay vì push
  };
  const handleManageProduct = () => {
    history.replace("/admin/product"); // Sử dụng replace thay vì push
  };

  const handleManageCategories = () => {
    history.replace("/admin/categories"); // Sử dụng replace thay vì push
  };
  const handleManageBrand = () => {
    history.replace("/admin/brand"); // Sử dụng replace thay vì push
  };

  const handleManageOrders = () => {
    history.replace("/admin/orders"); // Sử dụng replace thay vì push
  };

  return (
    <>
      <div className="sidebar">
        <div className="logo"></div>
        <ul className="menu">
          <li className="active">
            <Link to="./User">
              <i className="fa-solid fa-house"></i>
              <span>Trang chủ </span>
            </Link>
          </li>
          <li>
            <Link to="./User">
              <i className="fas fa-user mr-2"></i>
              <span>Quản lý Tài khoản </span>
            </Link>
          </li>
          <li>
            <Link to="./product">
              <i className="fas fa-store mr-2"></i>
              <span>Quản lý Sản phẩm </span>
            </Link>
          </li>

          <li>
            <Link to="./categories">
              <i className="fas fa-vial mr-2"></i>
              <span>Quản lý Loại sản phẩm</span>
            </Link>
          </li>
          <li>
            <Link to="./brand">
              <i class="fas fa-parking mr-2"></i>
              <span>Quản lý Hãng sản phẩm</span>
            </Link>
          </li>

          <li onClick={() => handleManageOrders()}>
            <Link to=". /orders">
              <i className="fas fa-shuttle-van mr-2"></i>
              <span>Quản lý Đơn hàng</span>
            </Link>
          </li>
          <li className="logout">
            <i className="fas fa-sign-out-alt mr-2"></i>
            <span>Đăng xuất</span>
          </li>
        </ul>
      </div>
    </>
  );
};
