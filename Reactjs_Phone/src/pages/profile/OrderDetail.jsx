import React, { useState, useEffect } from "react";
import "./OrderHistory.scss";
import { useParams } from 'react-router-dom';
import { getAllOders, getAllOrderdetail,Layhoadon } from "../../userService";
import { Buffer } from "buffer";
 const OrderDetail = () => {
  const { id_order } = useParams();



  const [user, setUser] = useState({ taikhoan: "" });
  const [orderData, setOrderData] = useState({
    hoadon: { id_order: "" },
    chitiethoadon: [],
  });


  const [hoadon, sethoadon] = useState("");

  useEffect(() => {
    const getUserDataFromLocalStorage = async () => {
      const userData = localStorage.getItem("user");

      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      }
    };

    getUserDataFromLocalStorage();
  }, []); // Thêm mảng rỗng để chỉ chạy một lần khi component mount

  useEffect(() => {
    if (user.id) {
      laymahdcuataikhoan();
      layhoadon();
    }
  }, [user.id]);

  useEffect(() => {
  
      laychitiethoadon();
    
  }, []);

  const laymahdcuataikhoan = async () => {
    try {
      let response = await getAllOders(user.id);
      if (response && response.errcode === 0) {
        setOrderData((prevOrderData) => ({
          ...prevOrderData,
          hoadon: response.orders,
        }));
      }
    } catch (error) {
      console.log("hong lay dc:", error);
    }
  };

  const laychitiethoadon = async () => {
    try {
      let response = await getAllOrderdetail(id_order);
      if (response && response.errcode === 0) {
        setOrderData((prevOrderData) => ({
          ...prevOrderData,
          chitiethoadon: response.Oderdetail,
        }));
      }
    } catch (error) {
      console.log("loi roi:", error);
    }
  };




  const layhoadon = async () => {
    try {
      let response = await Layhoadon(id_order);
      if (response && response.errcode === 0) {
        sethoadon(response.orders1);
      }
    } catch (error) {
      console.log("hong lay dc:", error);
    }
  };

  const formatDate = (isoDate) => {
    const dateObject = new Date(isoDate);
 
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();

    return `${day}/${month}/${year}`;
  };
 const  formatCurrency=(number)=> {
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



  console.log("xem hoa don",hoadon);
 

  return (
    <>
      <div className="product container-fluid tabular-wrapper oh_wrapper">
        <h1>CHI TIẾT ĐƠN HÀNG</h1>
        <div className="table-container">
          <table className="table_1">
            <tr>
              <th>ID</th>
              <th>Tình trạng đơn hàng</th>
              <th>Địa chỉ giao hàng</th>
            </tr>
            <tr>
              <td>{hoadon.id_order}</td>
              <td>{hoadon.order_status}</td>
              <td>{hoadon.receiving_point}</td>
            </tr>
          </table>
          <table>

            <thead>
              <tr className="history">
                <th>Sản phẩm đặt mua</th>
                <th>Hình</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Tạm tính</th>
              </tr>
            </thead>
            <tbody>
              {orderData.chitiethoadon.map((value, index) =>{
                 let imageBase64 = "";
                 if (value.idProductData.image) {
                   imageBase64 = Buffer.from(
                     value.idProductData.image,
                     "base64"
                   ).toString("binary");
                 }
                return(
                  <tr className="description" key={index}>
                  <td>{value.idProductData.name}</td>
                  <td><img src={imageBase64} alt="" /></td>
                  <td>{formatCurrency(value.idProductData.price)}</td>
                  <td>{value.quantity}</td>
                  <td>{formatCurrency(value.total_price)}</td>
                </tr>
                )
              })}
             
             
            </tbody>
            <tfoot>
    <tr>
      <th colSpan={1}>Tổng tiền</th>
      <td colSpan={6}> {formatCurrency(hoadon.total_value)} </td>
    </tr>
  </tfoot>
          </table>
        </div>
      </div>
    </>
  );
};
export default OrderDetail;