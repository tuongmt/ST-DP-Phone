import React, { useState, useEffect } from "react";
import "./OrderHistory.scss";
import { getAllOders,deleteOrderdetail,deleteOrders } from "../../userService";
import { toast } from 'react-toastify';
import { Link, useHistory, Redirect } from "react-router-dom";

const OrderHistory = () => {


  const [user, setUser] = useState({ taikhoan: "" });
  const [hoadon, sethoadon] = useState([]);
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
    }
  }, [user.id]);
  
  

  const khongduochuy=()=>{
    toast.error("Đơn hàng đã xác nhận không thể hủy !!!!")
  }

  const huydonhang = async (data) => {
    try {
      let res = await deleteOrders(data.id);
      if (res && res.errcode !== 0) {
        alert(res.errMessage);
     
      } else {
     
        toast.success("Hủy đơn hàng Thành công");
        await laymahdcuataikhoan();
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  const laymahdcuataikhoan = async () => {
    try {
      let response = await getAllOders(user.id);
      if (response && response.errcode === 0) {
        
        sethoadon(response.orders);
      }
    } catch (error) {
      console.log("hong lay dc:");
    }
  };

  const xoachitietdonhang = async (data) => {
    try {
      let res = await deleteOrderdetail(data.id_order);
      if (res && res.errcode !== 0) {
        alert(res.errMessage);
     
      } else {
     
      
      
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

 


  const formatDate = (isoDate) => {
    const dateObject = new Date(isoDate);
    // const hours = dateObject.getHours();
    // const minutes = dateObject.getMinutes();
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();

    return `${day}/${month}/${year}`;
  };


  const formatCurrency=(number)=> {
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
  user && <OrderHistory />;
}

  return (
    <>
      <div className="oh_wrapper">
        <h1>LỊCH SỬ ĐẶT HÀNG</h1>

        <table>
          <thead>
            <tr class="history">
              <th>ID</th>
              <th>Tổng tiền</th>
              <th>Ngày đặt</th>
              <th>Địa chỉ giao hàng</th>
              <th>Tình trạng đơn hàng</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
          {hoadon.map((value, index) => {
              return (
                <tr class="description" key={index}>
                 <th>{value.id_order}</th>
                 <th>{formatCurrency(value.total_value)}</th>
                  <th>{formatDate(value.createdAt)}</th>
                  <th>{value.receiving_point	}</th>
                  <th>{value.order_status} </th>
                  <td>
                  <Link to={`/profile/OrderDetail/${value.id_order}`} className="a_detail">
                    Xem chi tiết đơn hàng
                  </Link>
                  <button
                        className="button_del"
                        onClick={() => {
                           value.order_status === "Đang chờ để duyệt"
                            ? (huydonhang(value), xoachitietdonhang(value))
                            : khongduochuy();
                        }}
                      >Hủy đơn</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderHistory;
