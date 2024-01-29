import React from "react";
import "./Cart.css";
import { Link, useHistory } from "react-router-dom";
import { Buffer } from "buffer";
import { useEffect } from "react";

export const Cart = ({
  cartItem,
  addToCart,
  decreaseQty,
  deleteProduct,
  setCardItem,
}) => {
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCardItem(JSON.parse(storedCart));
    }
  }, []);

  const history = useHistory();

  const totalPrice = cartItem.reduce(
    (price, item) => price + item.qty * item.price,
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
    history.push({ pathname: "./Checkout", state: { totalPrice: totalPrice } });
  };

  return (
    <>
      <section className="cart-items">
      <div className="container title ">
      
        <button onClick={handleContinueShopping}>Tiếp tục mua hàng</button>
     
          <h1>Giỏ hàng</h1>
        </div>
        <div className="container d_flex">
          <div className="cart-details">
            {cartItem.length === 0 && (
              <h1 className="no-items product">
                Không có sản phẩm nào trong giỏ hàng
              </h1>
            )}
            {cartItem.map((item) => {
              const productQty = item.price * item.qty;
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
                      <span>{item.qty}</span>

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
