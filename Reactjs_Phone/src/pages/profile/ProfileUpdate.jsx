import React, { useState, useEffect } from "react";
import { editUserService,getAllUser } from "../../userService";
import { toast } from "react-toastify";
import CommonUtils from "../../utils/CommonUtils"; // Assuming this import is needed

export const ProfileUpdate = () => {
  const [user, setUser] = useState({ id: "", fullName: "", address: "", phoneNumber: "" });
  const [arrUsers, setArrUsers] = useState("");

  const [state, setState] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
  });

  useEffect(() => {

   
    if(user&&user!==""){
   
    
      setState({
        id: user.id,
        fullName: arrUsers.fullName || "",
        address: arrUsers.address || "",
        phoneNumber: arrUsers.phoneNumber || "",
      });
     
    }
   

    getAllUserFromReact();
    getUserDataFromLocalStorage();
    
  }, [user.id]);
  const getUserDataFromLocalStorage = async () => {
    const userData = localStorage.getItem("user");

    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    }
  };
  const handleSaveUser = () => {
    doEditUser({
      id: user.id,
      fullname: state.fullName,
      address: state.address,
      phoneNumber: state.phoneNumber,
    });
  };
 

  const getAllUserFromReact = async () => {
    let response = await getAllUser(user.id);
    if (response && response.errcode === 0) {
      setArrUsers(response.users);
    }
  };
  const doEditUser = async (user) => {
    try {
      let res = await editUserService(user);
      if (res && res.errcode === 0) {
        toast.success("Cập nhật thành công");
      } else {
        toast.error("Sửa Thất bại");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleOnChangeInput = (event, id) => {
    let copyState = { ...state };
    copyState[id] = event.target.value;
    setState({
      ...copyState,
    });
  };

  return (
    <>
      <div className="background">
        <div className="product profileUpdate_container ">
          <h1>Cập nhật thông tin cá nhân</h1>
          <div className="profileUpdate_main">
            <div className="input-data">
              <input
                type="text"
                required
                onChange={(event) => {
                  handleOnChangeInput(event, "fullName");
                }}
                value={state.fullName}
              />
              <div className="underline"></div>
              <label>Họ tên </label>
            </div>
            <div className="input-data">
              <input
                type="text"
                required
                onChange={(event) => {
                  handleOnChangeInput(event, "phoneNumber");
                }}
                value={state.phoneNumber}
              />
              <div className="underline"></div>
              <label>Số điện thoại </label>
            </div>
            <div className="input-data">
              <input
                type="text"
                required
                onChange={(event) => {
                  handleOnChangeInput(event, "address");
                }}
                value={state.address}
              />
              <div className="underline"></div>
              <label>Địa chỉ </label>
            </div>
            <button type="submit" name="button" onClick={handleSaveUser}>
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
