import React, { useState, useEffect } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import { Buffer } from "buffer";
import "./Profile.css";
import user from "../../../public/images/search/user.png";
export const Profile = () => {
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
  let imageBase64='';
  if(user.image){

   
     imageBase64=Buffer.from(user.image,'base64').toString('binary');
  

}

  {
    user && <Profile />;
  }

  return (
    <>
      <div className="background">
        <div className="profile_container  product">
          <h1>Thông tin cá nhân</h1>
          <div className="d_flex profile_main">
            <div className="profile-left">
              <img src={imageBase64} alt="" />
              <a href="./ProfileUpdate">Cập nhật Thông tin cá nhân</a>
            </div>
            <div className="profile-right ">
              <div className="d_flex profile_item">
                <h3>Tên tài khoản: </h3>
                <p>{user.taikhoan}</p>
              </div>

              <div className="d_flex profile_item">
                <h3>Họ tên: </h3>
                <p>{user.fullName}</p>
              </div>

              <div className="d_flex profile_item">
                <h3>Số điện thoại: </h3>
                <p>{user.phoneNumber}</p>
              </div>

              <div className="d_flex profile_item">
                <h3>Email: </h3>
                <p>{user.email}</p>
              </div>

              <div className="d_flex profile_item">
                <h3>Địa chỉ: </h3>
                <p>{user.address}</p>
              </div>

              <Link to="/profile/OrderHistory">
                <span>Đơn đặt hàng</span>
              </Link>
              <a href="./ChangePassword">
                <span>Thay đổi mật khẩu </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
