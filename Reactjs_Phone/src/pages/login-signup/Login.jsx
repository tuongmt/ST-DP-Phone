import React, { useState } from 'react';
import "./LoginSignup.scss";
import { Link,useHistory,Redirect } from "react-router-dom";
import {handleLoginApi,getAllUser} from '../../userService';




export const Login =  (props) => {
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMessage, setErrMessage] = useState('');



  const handleOnChangeUsername = (event) => {
    setUsername(event.target.value);
}

const handleOnChangePassword = (event) => {
    setPassword(event.target.value);
}
const handleLogin = async () => {
  setErrMessage('');

  try {
      let data = await handleLoginApi(username, password);
      if (data && data.errcode !== 0) {
          setErrMessage(data.message);
      }
      if (data && data.errcode === 0) {

        localStorage.setItem('user', JSON.stringify(data.user));
       
        if(data.user.roleId=="R1"){
          history.replace("/admin/user"); // Sử dụng replace thay vì push
          window.location.reload(); // Tải lại trang
        }else{
          history.replace("/"); // Sử dụng replace thay vì push
          window.location.reload(); // Tải lại trang
        }
   
        
          console.log("login succeeds");
      }
  } catch (error) {
      if (error.response) {
          if (error.response.data) {
              setErrMessage(error.response.data.message);
          }
      }
      console.log("Ntanh", error.response);
  }
}

  const [isShowPassword, setIsShowPassword] = useState(false);
  const handleShowHidePassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <>
      <div className="loginsignup">
        <div className="login-container">
          <h1>Đăng nhập</h1>
          <div className="input-data">
            <input type="text" required 
                value={username}
                onChange={handleOnChangeUsername}
            />
            <div className="underline"></div>
            <label>Tài khoản </label>
          </div>
          <div className="input-data"
           value={password}
           onChange={handleOnChangePassword}
          >
            <input  type={isShowPassword ? 'text' : 'password'} required />
            <span onClick={handleShowHidePassword}>
    <i className={isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
  </span> 
            <div className="underline"></div>
            <label>Mật khẩu </label>
          </div>
          <div className='col-12' style={{ color: 'red' }}>
                        {errMessage}
                    </div>
          <button type="submit" id="" name="button" onClick={handleLogin}>
            Đăng nhập
          </button>
          <p className="loginsignup-signup">
            Chưa có tài khoản?
            <Link to={"./Signup"}>
              <span> Đăng ký ngay</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
