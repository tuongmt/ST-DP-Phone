import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./Checkout.css";
import { CreateOrders, getAllCart } from "../../userService";
import { useLocation } from "react-router-dom";
export const Order = () => {
  const location = useLocation();
  const [totalPrice, setTotalPrice] = useState(location.state.totalPrice);

  const [user, setUser] = useState({ taikhoan: "" });
  const [arrCart, setListCart] = useState([]);

  const [state, setState] = useState({
    receiver: "",
    order_status: "Đang chờ để duyệt",
    receiving_point: "",
    total_value: totalPrice,
    note: "",
    phoneNumber: "",
  
    payment: "",
    order_idUser: user.id,
  });

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
    laydanhsachgiohang();
  }, [user.id]);



  const handleOnChangeInput = (event, id) => {
    const copyState = { ...state };
    copyState[id] = event.target.value;
    setState({ ...copyState });
  };

  const checkValidInput = () => {
    let isValid = true;
    const emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
    const phoneNumber = state.phoneNumber;
    const arrInput = ["receiver", "receiving_point", "phoneNumber"];

    for (let i = 0; i < arrInput.length; i++) {
      if (!state[arrInput[i]]) {
        isValid = false;
        alert("Vui lòng điền vào: " + arrInput[i]);
        break;
      }
      if (!/^\d{10}$/.test(phoneNumber)) {
        isValid = false;
        alert("Số điện thoại phải là số và phải có 10 số");
        break;
      }
      // else if (!emailRegex.test(this.state.email)) {
      //   isValid = false;
      //   alert('Email không đúng định dạng');
      //   break;
      
      // }
    }
    return isValid;
  };




  const handleAddOrders = async() => {
  
    const isValid = checkValidInput();
    if (isValid ) {
console.log("xem produclist", arrCart);
  
      taomoidonhang({
        receiver: state.receiver,
        order_status: "Đang chờ để duyệt",
        receiving_point: state.receiving_point,
        total_value: totalPrice,
        phoneNumber: state.phoneNumber,
        note: state.note,
        payment: state.payment,
        order_idUser: user.id,
        productList: arrCart.map((item) => ({
          product_id: item.idproduct,
          quantity: item.quantity,
          total_price:item.price*item.quantity
        })),
      });
    }
  };

  const laydanhsachgiohang = async () => {
    try {
      let response = await getAllCart(user.id);
      if (response && response.errcode === 0) {
        setListCart(response.Cart);
      }
    } catch (error) {
      console.log("Error fetching cart data:");
    }
  };

  const taomoidonhang = async (data) => {
    try {
      const response = await CreateOrders(data);
      if (response && response.errcode !== 0) {
        toast.error("Đặt hàng thất bại !");
        alert(response.errMessage);
      } else {
        setTotalPrice(0);
        toast.success("Đặt hàng thành công !");
        setState({
          receiver: "",
          order_status: "",
          receiving_point: "",
          total_value: "",
          note: "",
          phoneNumber: "",
          payment: "",
          order_idUser: "",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  function formatCurrency(number) {
    // Sử dụng Intl.NumberFormat để định dạng số
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0, // Loại bỏ phần thập phân
    });

    // Lấy chuỗi đã định dạng số
    const formattedNumber = formatter.format(number);

    // Loại bỏ khoảng trắng giữa số và đơn vị tiền tệ (₫)
    return formattedNumber.replace(/\s/g, "");
  }

  {
    user && <Order />;
  }

  return (
    <>
      <div className="order">
        <div className="container-o">
          <h1>Điền thông tin đơn đặt hàng</h1>
          <div className="input-data">
            <input
              type="text"
              id="name"
              required
              onChange={(event) => {
                handleOnChangeInput(event, "receiver");
              }}
              value={state.receiver}
            />
            <div className="underline"></div>
            <label>Họ và tên </label>
          </div>
          <div className="input-data">
            <input
              type="text"
              id="name"
              required
              onChange={(event) => {
                handleOnChangeInput(event, "phoneNumber");
              }}
              value={state.phoneNumber}
            />
            <div className="underline"></div>
            <label>Số điện thoại </label>
          </div>
          <div class="input-data">
            <input
              type="text"
              id="text"
              required
              onChange={(event) => {
                handleOnChangeInput(event, "receiving_point");
              }}
              value={state.receiving_point}
            />
            <div className="underline"></div>
            <label>Địa Chỉ Giao Hàng</label>
          </div>
          <div class="input-data">
            {/* <textarea type="text" id="text" required /> */}
            <input
              type="text"
              id="text"
              required
              onChange={(event) => {
                handleOnChangeInput(event, "note");
              }}
              value={state.note}
            />
            <div className="underline"></div>
            <label>Ghi chú</label>
          </div>
          <div class="input-data">
            Tổng số tiền: {formatCurrency(totalPrice)} vnd
            <select
              className="ml-5"
              id=""
              onChange={(event) => {
                handleOnChangeInput(event, "payment");
              }}
              value={state.payment}
            >
              <option value="">chọn phương thức thanh toán</option>
              <option value="Thanh toán bằng tiền mặt">
                Thanh toán bằng tiền mặt
              </option>
              <option value="Thanh toán bằng ngân hàng">
                Thanh toán bằng ngân hàng
              </option>
            </select>
          </div>
          <button
            type="submit"
            onClick={() => {
              handleAddOrders();
            }}
          >
            Đặt Hàng
          </button>
        </div>
      </div>
    </>
  );
};
