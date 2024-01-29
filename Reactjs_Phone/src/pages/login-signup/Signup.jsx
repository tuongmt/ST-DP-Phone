import React, { useState } from 'react';
import "./LoginSignup.scss";
import { Link } from "react-router-dom";
import { createNewUseService } from '../../userService';
import { toast } from 'react-toastify';



export const Signup = (props) => {
  const [state, setState] = useState({
    taikhoan:'',
    password:'',
    rePassword: '',
    fullName:'',
    address:'',
    phoneNumber:'',
    email:'',
    roleId: 'R3',
  });
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowRePassword, setIsShowRePassword] = useState(false);
  const [errMessage, setErrMessage] = useState('');
 


  const handleOnChangeInput = (event, id) => {
    const copyState = { ...state };
    copyState[id] = event.target.value;
    setState({ ...copyState });
  };


  const checkValidInput = () => {
    let isValid = true;
    const checkPass = state.rePassword;
    const password = state.password;
    const phoneNumber = state.phoneNumber;
    const emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
    const arrInput=['taikhoan','password','rePassword','fullName','address','phoneNumber','email'];

    for (let i = 0; i < arrInput.length; i++) {
      if (!state[arrInput[i]]) {
        isValid = false;
        alert('Vui lòng điền vào: ' + arrInput[i]);
        break;
      } else if (checkPass !== state.password) {
        isValid = false;
        alert('Mật khẩu nhập lại không giống vui lòng kiểm tra lại');
        break;
      } else if (!emailRegex.test(state.email)) {
        isValid = false;
        alert('Email không đúng định dạng');
        break;
      } else if (
        password.length < 8 ||
        !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) ||
        !/\d/.test(password)
      ) {
        isValid = false;
        alert('Mật khẩu yêu cầu ít nhất một chữ cái viết thường, ít nhất một chữ cái viết hoa, ít nhất một số, mật khẩu phải có ít nhất 8 ký tự');
        break;
      }
      if (!/^\d{10}$/.test(phoneNumber)) {
        isValid = false;
        alert('Số điện thoại phải là số và phải có 10 số');
        break;
      }
    }
    return isValid;
  };

  const handleAddNewUser = () => {
    const isValid = checkValidInput();
    if (isValid) {
      taomoinguoidung({
        taikhoan: state.taikhoan,
        password: state.password,
        fullName: state.fullName,
        address: state.address,
        phoneNumber: state.phoneNumber,
        email: state.email,
        roleId: 'R3',     
      });
    }
  };


  const taomoinguoidung = async (data) => {
    try {
      const response = await createNewUseService(data);
      if (response && response.errcode !== 0) {
        toast.error('Tạo Tài khoản thất bại !');
        alert(response.errMessage);
      } else {
        toast.success('Tạo Tài khoản thành công !');
        setState({
          taikhoan: '',
          password: '',
          rePassword: '',
          fullName: '',
          address: '',
          phoneNumber: '',
          email: '',
          roleId: 'R3',
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleShowHidePassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  const handleShowHideRePassword = () => {
    setIsShowRePassword(!isShowRePassword);
  };
  return (
    <>
      <div className="loginsignup">
        <div className="signup-container">
          <h1>Đăng ký</h1>
          <div className="input-data">
            <input type="text" required  
               onChange={(event)=>{
                handleOnChangeInput(event,'taikhoan')
        
              }}
              value={state.taikhoan}  
            
            />



            <div className="underline"></div>
            <label>Tài khoản </label>
          </div>





          <div className="input-data">
          <input
    type={isShowPassword ? 'text' : 'password'}
    required
    onChange={(event) => handleOnChangeInput(event, 'password')}
    value={state.password}
  />
  <span onClick={handleShowHidePassword}>
    <i className={isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
  </span> 
            <div className="underline"></div>
            <label>Mật khẩu </label>
          </div>






          <div className="input-data">
            <input type={isShowRePassword ? 'text':"password"} required
             onChange={(event) => {
              handleOnChangeInput(event, 'rePassword');
            }}
            value={state.rePassword}
            
            />
              <span  onClick={handleShowHideRePassword}>
    <i className={isShowRePassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
  </span> 
            <div className="underline"></div>
            <label>Nhập lại Mật khẩu </label>
          </div>














          <div className="input-data">
            <input type="text" required 
            onChange={(event)=>{
              handleOnChangeInput(event,'fullName')
      
            }}
            value={state.fullName}
            />
            <div className="underline"></div>
            <label>Họ và tên </label>
          </div>
          <div className="input-data">
            <input type="text" required 
            onChange={(event)=>{
              handleOnChangeInput(event,'phoneNumber')
      
            }}
            value={state.phoneNumber}
            
            />
            <div className="underline"></div>
            <label>Số điện thoại </label>
          </div>
          <div className="input-data">
            <input type="text" required 
             onChange={(event)=>{
              handleOnChangeInput(event,'email')
      
            }}
            value={state.email}
            />
            <div className="underline"></div>
            <label>Email </label>
          </div>
          <div className="input-data">
            <input type="text" required
             onChange={(event)=>{
              handleOnChangeInput(event,'address')
      
            }}
            value={state.address}
            
            />
            <div className="underline"></div>
            <label>Địa chỉ </label>
          </div>
          <button type="submit" id="" name="button"  onClick={()=>{handleAddNewUser()}}>
            Đăng ký
          </button>
          <p className="loginsignup-signup">
            Đã có tài khoản?
            <Link to={"./Login"}>
              <span> Đăng nhập </span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
