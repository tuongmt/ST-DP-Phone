import React, { useState, useEffect,useRef } from "react";
import "./Cart.css";
import { Link, useHistory } from "react-router-dom";
import { Buffer } from "buffer";
import { toast } from 'react-toastify';

import { getAllCart, updateCartData, deleteCart } from "../../userService";

export const CartLogin = () => {
  const [user, setUser] = useState({ taikhoan: "" });
  const [arrCart, setListCart] = useState([]);



  useEffect(() => {
    const getUserDataFromLocalStorage = async () => {
      const userData = localStorage.getItem("user");
  
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      }
    };
    getUserDataFromLocalStorage();
  
    // Check if user.id exists before making the API call
    if (user.id) {
      const laydanhsachgiohang = async () => {
        try {
          let response = await getAllCart(user.id);
          if (response && response.errcode === 0) {
            setListCart(response.Cart);
          }
        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      };
      
      laydanhsachgiohang();
    }
  }, [user.id]);



  console.log("xem id user",user.id);

  const history = useHistory();

  const totalPrice = arrCart.reduce(
    (price, item) => price + item.quantity * item.price,
    0
  );
  const handleContinueShopping = () => {
    // Sử dụng history.goBack() để quay lại trang trước đó
    history.goBack();
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

  const handleCheckout = () => {
    history.push({ pathname: "./cart/Checkout", state: { totalPrice: totalPrice } });
  };





  const addToCart = (product) => {
   let tangsoluong=product.quantity+1;
 tanggiamsoluong({
  id:product.id,
  quantity:tangsoluong,

 })
  };


  const decreaseQty = (product) => {
    if(product.quantity<=1){
      deleteProduct(product);
    }else{
      let giamsoluong=product.quantity-1;
      tanggiamsoluong({
       id:product.id,
       quantity:giamsoluong,
      
      })
    }

   };





  const deleteProduct = (idsanpham) => (
    handleDeleteUser(idsanpham)
  );
  

  const laydanhsachgiohang = async () => {
    try {
      let response = await getAllCart(user.id);
      if (response && response.errcode === 0) {
        setListCart(response.Cart);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const tanggiamsoluong = async (data) => {
    try {
      let res = await updateCartData(data);
      if (res && res.errcode !== 0) {
        alert(res.errMessage);
     
      } else {
     

        await laydanhsachgiohang();
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };



  const handleDeleteUser = async (data) => {
    try {
      let res = await deleteCart(data.id);
      if (res && res.errcode !== 0) {
        alert(res.errMessage);
     
      } else {
     
        toast.success("Xóa sản phẩm Thành công");
        await laydanhsachgiohang();
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };






  {
    user && <CartLogin />;
  }


  return (
    <>
      <section className="cart-items">
        <div className="container title ">
          <button onClick={handleContinueShopping}>Tiếp tục mua hàng</button>

          <h1>Giỏ hàng</h1>
        </div>
        <div className="container d_flex">
          <div className="cart-details">
            {arrCart.length === 0 && (
              <h1 className="no-items product">
                Không có sản phẩm nào trong giỏ hàng
              </h1>
            )}
            {arrCart.map((item) => {
              const productQty = item.price * item.quantity;
              let imageBase64 = "";
             
              if (item.image) {
              
                imageBase64 = Buffer.from(item.image, "base64").toString(
                  "binary"
                );
              }
              return (
                <div className="cart-list product d_flex">
                  <div className="img">
                    <img src={imageBase64} alt="" />
                  </div>
                  <div className="cart-details">
                    <h3>{item.name}</h3>
                    <h5>Giá: {formatCurrency(item.price)}</h5>
                    <h4>Tổng:{formatCurrency(productQty)}</h4>
                  </div>
                  <div className="cart-items-function">
                    <div className="removeCart">
                      <button onClick={() => deleteProduct(item)}>
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>

                    <div className="cartControl d_flex">
                      <button
                        className="desCart"
                        onClick={() => decreaseQty(item)}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <span>{item.quantity}</span>

                      <button
                        className="incCart"
                        onClick={() => addToCart(item)}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="cart-total product">
            <h2>Tóm tắt giỏ hàng</h2>
            <div className="d_flex">
              <h4>Tổng thanh toán: </h4>
              <h3>{formatCurrency(totalPrice)}</h3>
            </div>
            <button onClick={handleCheckout}>Tiến hành đặt hàng</button>
          </div>
        </div>
      </section>
    </>
  );
};
