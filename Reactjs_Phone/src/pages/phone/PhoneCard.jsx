import React, { useState, useEffect } from "react";
import { getAllProducts, getAllBrand,CreateCart } from "../../userService";
import { Buffer } from "buffer";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';

export const PhoneCard = ({ addToCart }) => {
  const { id } = useParams();
  const [user, setUser] = useState({ taikhoan: "" });

  const [arrProducts, setArrProducts] = useState([]);
  const [arrbrand, setArrbrand] = useState('');
  const [idbrand, setidbrand] = useState('');
  const [orderBy, setordeby] = useState('');
  const [selectedPriceRange, setgia] = useState('');


  const getAllUserFromReact = async () => {
    let idCate = '';
    if (id && id == 20) {
      idCate = '';
    } else {
      idCate = id;
    }
    let response = await getAllProducts("ALL", idCate, idbrand, selectedPriceRange, orderBy);
    if (response && response.errcode === 0) {
      setArrProducts(response.products);
    }
  };

  const getAllBrandFromReact = async () => {
    let response = await getAllBrand("ALL");
    if (response && response.errcode === 0) {
      setArrbrand(response.Brand);
    }
  };

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = arrProducts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(arrProducts.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  function formatCurrency(number) {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    });

    const formattedNumber = formatter.format(number);

    return formattedNumber.replace(/\s/g, "");
  }

  const handleBrandClick = (clickedId) => {
    setidbrand(clickedId);
  };

  const handleOrderClick = (order) => {
    setordeby(order);
  };
  const handleOnChangeInput = (event) => {
    // Thực hiện các hành động khi input thay đổi
    // Ví dụ: cập nhật giá trị selectedPriceRange
    setgia(event.target.value);
  };




  const handleAddCart = (data) => {
    const imageBuffer = Buffer.from(data.image, 'base64').toString("binary");

      themvaogiohang({
        name: data.name,
        price: data.price,
        quantity: 1,
        image: imageBuffer,
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
     getAllBrandFromReact();
   }, [idbrand, orderBy,selectedPriceRange]);













  {
    user && <PhoneCard />;
  }
  return (
    <>
      {arrbrand && arrbrand.map((gia, stt) => {
        let imageBase63 = '';
        if (gia.image) {
          imageBase63 = Buffer.from(gia.image, 'base64').toString('binary');
        }
        return (
          <div className="list-Brand" key={stt} onClick={() => handleBrandClick(gia.id)}>
            <img src={imageBase63} alt="" />
          </div>
        );
      })}

      <hr />
      <div className="sapxep">
        Chọn giá theo tiêu chí
        <select
      className="form-control col-3 mr-2"
      onChange={(event) => handleOnChangeInput(event, 'selectedPriceRange')}
      value={selectedPriceRange}
    >
      <option value="">Tất cả giá</option>
      <option value="0-5000000">0 - 5 triệu</option>
      <option value="5000000-10000000">5 triệu - 10 triệu</option>
      <option value="10000000-20000000">10 triệu - 20 triệu</option>
      <option value="20000000-30000000">20 triệu - 30 triệu</option>
      <option value="30000000-50000000">30 triệu - 50 triệu</option>
      <option value="50000000-100000000">50 triệu - 100 triệu</option>
      <option value="100000000-200000000">100 triệu - 200 triệu</option>
      <option value="200000000-999999999999999999">200 triệu - không giới hạn</option>
    </select>

      </div>
     
      <hr />

      <div className="sapxep">
        Sắp xếp theo
      </div>
      <span className={`high ${orderBy === "price-desc" ? "active" : ""}`} onClick={() => handleOrderClick("price-desc")}>
        <i className="fas fa-sort-amount-up-alt mr-2"></i>Giá Cao-Thấp
      </span>
      <span className={`low ${orderBy === "price-asc" ? "active" : ""}`} onClick={() => handleOrderClick("price-asc")}>
        <i className="fas fa-sort-amount-down mr-2"></i>Giá Thấp-Cao
      </span>
      <hr />
      <div className="grid1-p">
        {currentItems.map((item, index) => {
          let imageBase64 = '';
          if (item.image) {
            imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
          }
          return (
            <div className="box" key={index}>
              <div className="product mtop ">
                <div className="img">
                  <span className="discount">{}% Off</span>
                  <Link to={`/productdetail/${item.id}`}>
                    <img src={imageBase64} alt="" />
                  </Link>
                </div>
                <div className="product-details">
                  <h3>{item.name}</h3>
                  <div className="rate">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                  </div>
                  <div className="d_flex">
                    <div className="price">
                      <h4>{formatCurrency(item.price)}</h4>
                    </div>
                    <div className="price-discount">
                      <strike>123$</strike>
                    </div>
                  </div>
                  <div className="d_flex">
                    <Link to={`/productdetail/${item.id}`}>
                      <button>
                        <span>Chi tiết</span>
                      </button>
                    </Link>
                    <button onClick={user && user.id ? () => handleAddCart(item) :  () => addToCart(item)}>
                      <span>Mua ngay</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pagination d_flex">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <i class="fa-solid fa-arrow-left-long"></i>
        </button>
        <div>
          Trang {currentPage} / {totalPages}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <i class="fa-solid fa-arrow-right-long"></i>
        </button>
      </div>
    </>
  );
};
