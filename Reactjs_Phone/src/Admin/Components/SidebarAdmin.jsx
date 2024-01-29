import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";

import { Link } from "react-router-dom";

const SidebarAdmin = () => {
  return (
    <div
      className="col-lg-2"
      id="sidebar"
      role="navigation"
      style={{ backgroundColor: "#e9ecef" }}
    >
      <Nav
        defaultActiveKey="/home"
        className="flex-column sticky-top pl-0 pt-5 p-0 mt-3"
      >
        <li className="nav-item mb-2 mt-3">
          <a className="nav-link text-secondary" href="/">
            <h5>Nguyễn Tuấn Anh</h5>
          </a>
        </li>
        <li className="nav-item mb-2 ">
          <a className="nav-link text-secondary" href="profile">
            <i className="fas fa-user font-weight-bold"></i>{" "}
            <span className="ml-3">Thông tin cá nhân</span>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link text-secondary">
            <span style={{ display: "flex", alignItems: "center" }}>
              <i className="fas fa-list-ul" style={{ marginRight: "5px" }}></i>
              <span className="ml-0">
            
                <NavDropdown title="Danh sách" className="text-secondary">
                  <NavDropdown.Item
                    href="list chuyen di"
                    className="text-secondary "
                  >
                    <i className="fas fa-book-reader text-secondary mr-3"></i>{" "}
                    <Link to="/admin">
                      <span>Danh sách chuyến đi</span>
                    </Link>{" "}
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="list nguoi dung"
                    className="text-secondary "
                  >
                    <i className="fas fa-book-medical text-secondary mr-3"></i>
                    Danh sách người dùng
                  </NavDropdown.Item>
                </NavDropdown>
              </span>
            </span>
          </a>
        </li>

        <li className="nav-item mb-2">
          <a className="nav-link text-secondary" href="#">
            <i className="far fa-chart-bar font-weight-bold"></i>{" "}
            <span className="ml-3">Analytics</span>
          </a>
        </li>
        <li className="nav-item mb-2">
          <a className="nav-link text-secondary" href="#">
            <i className="fas fa-file-export font-weight-bold"></i>
            <span className="ml-3">Export</span>
          </a>
        </li>
        <li className="nav-item mb-2">
          <a className="nav-link text-secondary" href="#">
            <i className="fas fa-tablet-alt font-weight-bold"></i>
            <span className="ml-3">Snippets</span>
          </a>
        </li>
        <li className="nav-item mb-2">
          <a className="nav-link text-secondary" href="#">
            <i className="fas fa-atom font-weight-bold"></i>{" "}
            <span className="ml-3">Flex</span>
          </a>
        </li>
        <li className="nav-item mb-2">
          <a className="nav-link text-secondary" href="#">
            <i className="far fa-folder font-weight-bold"></i>{" "}
            <span className="ml-3">Layouts</span>
          </a>
        </li>
        <li className="nav-item mb-2">
          <a className="nav-link text-secondary" href="#">
            Templates
          </a>
        </li>
        <li className="nav-item mb-2">
          <a className="nav-link text-secondary" href="#">
            Themes
          </a>
        </li>
      </Nav>
    </div>
  );
};

export default SidebarAdmin;
