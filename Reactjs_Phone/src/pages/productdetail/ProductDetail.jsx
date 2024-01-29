import React, { useState, useEffect } from "react";
import { getDeltaiProduct,CreateCart } from "../../userService";
import { Buffer } from "buffer";
import "./ProductDetail.css";
import { Link, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
export const ProductDetail = ({ addToCart }) => {
  //Chuyển đổi tiền tệ
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


  const { id } = useParams();
  const [user, setUser] = useState({ taikhoan: "" });
  
  const [detailProducts, setdetailProducts] = useState({});
  let imageBase64='';
  if(detailProducts.image){

   
     imageBase64=Buffer.from(detailProducts.image,'base64').toString('binary');
  

}
  

  const handleAddCart = (data) => {



      themvaogiohang({
        name: data.name,
        price: data.price,
        quantity: 1,
        image:imageBase64,
        iduser: user.id,
        idproduct:data.id
      });
  
  };

 
  const themvaogiohang = async (data) => {
    try {
      const response = await CreateCart(data);
      if (response && response.errcode !== 0) {
        toast.error('Thêm giỏ hàng thất bại !');
        alert(response.errMessage);
      } else {
        toast.success('Thêm giỏ hàng thành công !');
       
      }
    } catch (e) {
      console.log(e);
    }
  };

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
    getAllUserFromReact();
  }, []);


  
  const getAllUserFromReact = async () => {
    let response = await getDeltaiProduct(id);
    if (response && response.errcode === 0) {
      setdetailProducts(response.products);
    }
  };


{
  user && <ProductDetail />;
}
  // {product.cover}
  return (
    <>
      <div className="wrapper-pd">
        <div className="product mtop d_flex">
          <div className="img-pd">
            <span className="discount">{}% Off</span>
            <img src={imageBase64} alt="" />
          </div>
          <div className="product-info">
            <h2>{detailProducts.name}</h2>
            <div className="rate">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
            </div>
            <div className="desc">
              <p>{detailProducts.name}</p>
            </div>
            <div className="price-pd">
              <h4>{formatCurrency(detailProducts.price)}</h4>
            </div>
            <button onClick={user && user.id ? () => handleAddCart(detailProducts) :  () => addToCart(detailProducts)}>
              <i class="fa-solid fa-cart-plus"></i>
              <span> Mua ngay</span>
            </button>
          </div>
        </div>
      </div>
      <div className="wrapper-ap">
        <h2>Đánh giá sản phẩm</h2>
        <hr />
        <div className="product mtop d_flex">
          <div>
            <div className="pd-item username">Username</div>
            <div className="rate pd-item">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
            </div>
          </div>
          <div className="pd-item">Comments</div>
        </div>
      </div>
    </>
  );
};
