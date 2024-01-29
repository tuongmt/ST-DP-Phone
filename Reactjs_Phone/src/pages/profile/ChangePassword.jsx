import React from "react";

export const ChangePassword = () => {
  return (
    <>
      <div className="background">
        <div className="changepassword_container">
          <div className="product changepassword_main">
            <h1>Thay đổi mật khẩu</h1>
            <div className="input-data">
              <input type="text" required />
              <div className="underline"></div>
              <label>Mật khẩu hiện tại </label>
            </div>
            <div className="input-data">
              <input type="text" required />
              <div className="underline"></div>
              <label>Mật khẩu mới </label>
            </div>
            <div className="input-data">
              <input type="text" required />
              <div className="underline"></div>
              <label>Xác nhận Mật khẩu mới</label>
            </div>
            <button type="submit" id="" name="button">
              Lưu
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
