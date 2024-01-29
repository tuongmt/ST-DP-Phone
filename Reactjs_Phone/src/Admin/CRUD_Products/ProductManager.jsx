import React, { Component } from "react";
import {
  getAllProducts,
  CreateProducts,
  deleteProducts,
  updateProductData,
  CreateCategories,
  deleteCategories,
  getAllCategories,
  getAllBrand
} from "../../userService";
import { emitter } from "../../utils/emitter";
import { toast } from "react-toastify";
import ModalEditProducts from "./ModalEditProducts";
import ModalProducts from "./ModalProducts";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./ModalProducts.scss";
import ModalCategories from "./ModalCategories";
import { Buffer } from "buffer";

class ProductManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrProducts: [],
      arrCate: [],
      arrBrand:[],
      idne: "",
      idbrand:"",
      isOpenModalProduct: false,
      isOpenModalEditProduct: false,
      isOpenModalCategories: false,
      productEdit: {},
      currentPage: 1,
      productsPerPage: 5,
      previewImgURL: "",
      
       orderBy:'',
      


      selectedPriceRange: "", // Lưu trữ mức giá đã chọn
    };

    this.handlePageChange = this.handlePageChange.bind(this); // Thêm dòng này
  }
  handleOnChangeInput = (event, id) => {
    //good code
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {
        //console.log('check good state: ',this.state.idne);
        // muốn lấy giá trị từ hàm render thì phải bỏ vào đây
        this.getAllUserFromReact(this.state.idne,this.state.idbrand,this.state.selectedPriceRange,this.state.orderBy);
      }
    );
    //console.log('copystate: ',copyState);

    // console.log(event.target.value,id)
  };

  async componentDidMount() {

    await this.getAllCategoriesReact();
    await this.getAllBrandReact();
    await this.getAllUserFromReact(this.state.idne,this.state.idbrand,this.state.selectedPriceRange,this.state.orderBy);
  }
  getAllCategoriesReact = async () => {
    let response = await getAllCategories("ALL");
    if (response && response.errcode == 0) {
      this.setState({
        arrCate: response.categories,
      });
    }
  };
  getAllBrandReact = async () => {
    let response = await getAllBrand("ALL");
    if (response && response.errcode == 0) {
      this.setState({
        arrBrand: response.Brand,
      });
    }
  };


  getAllUserFromReact = async (idne,idbrand,selectedPriceRange,orderBy) => {
    console.log("id cuar toi: ", idne);

    let response = await getAllProducts("ALL", idne,idbrand,selectedPriceRange,orderBy);

    if (response && response.errcode == 0) {
      this.setState({
        arrProducts: response.products,
      });
    }
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenModalProduct: true,
    });
  };
  handleAddCategories = () => {
    this.setState({
      isOpenModalCategories: true,
    });
  };
  toggleCategoriesModal = () => {
    this.setState({
      isOpenModalCategories: !this.state.isOpenModalCategories,
    });
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModalProduct: !this.state.isOpenModalProduct,
    });
  };
  toggleUserEditModal = () => {
    this.setState({
      isOpenModalEditProduct: !this.state.isOpenModalEditProduct,
    });
  };
  createNewUser = async (data) => {
    try {
      let response = await CreateProducts(data);
      if (response && response.errcode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUserFromReact(this.state.idne,this.state.idbrand,this.state.selectedPriceRange,this.state.orderBy);
        this.setState({
          isOpenModalProduct: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
      //  console.log("response create user: " , response)
    } catch (e) {
      console.log(e);
    }
    // console.log('check data from child',data)
  };

  createNewCategories = async (data) => {
    try {
      let response = await CreateCategories(data);
      if (response && response.errcode !== 0) {
        alert(response.errMessage);
        toast.error("tạo thất bại");
      } else {
        
        await this.getAllUserFromReact(this.state.idne,this.state.idbrand,this.state.selectedPriceRange,this.state.orderBy);

        this.setState({
          isOpenModalCategories: false,
          
        });
        toast.success('tạo thành công');
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
      //  console.log("response create user: " , response)
    } catch (e) {
      console.log(e);
    }
    // console.log('check data from child',data)
  };

  handleDeleteUser = async (user) => {
    try {
      let res = await deleteProducts(user.id);
      if (res && res.errcode !== 0) {
        alert(res.errMessage);
        toast.error("Xóa thất bại");
      } else {
        await this.getAllUserFromReact(this.state.idne,this.state.idbrand,this.state.selectedPriceRange,this.state.orderBy);
        toast.success("Xóa Thành công");
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  handleEditUser = (user) => {
    this.setState({
      isOpenModalEditProduct: true,
      productEdit: user,
    });
  };

  doEditUser = async (user) => {
    try {
      let res = await updateProductData(user);
      if (res && res.errcode === 0) {
        await this.getAllUserFromReact(this.state.idne,this.state.idbrand,this.state.selectedPriceRange,this.state.orderBy);
        toast.success("Sửa Thành công");
        this.setState({
          isOpenModalEditProduct: false,
        });
      } else {
        toast.error("Sửa Thất bại");
      }
    } catch (e) {
      console.log(e);
    }
  };

  handlePageChange(event, page) {
    this.setState({
      currentPage: page,
    });
  }

   formatCurrency(number) {
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

  /**Life cycle
   * Run component:
   * 1.run contrucstor-> init state
   * 2.did mouth(set state)
   * 3.render
   */

  render() {
    const { selectedPriceRange,orderBy } = this.state;
    let { idne,idbrand } = this.state;
    const { arrProducts, arrCate,arrBrand, currentPage, productsPerPage } = this.state;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = arrProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
    return (
      <div className="hello">
        <ModalProducts
          isOpen={this.state.isOpenModalProduct}
          toggleFromParent={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        <ModalCategories
          isOpen={this.state.isOpenModalCategories}
          toggleFromParent={this.toggleCategoriesModal}
          createNewCategories={this.createNewCategories}
        />
        {this.state.isOpenModalEditProduct && (
          <ModalEditProducts
            isOpen={this.state.isOpenModalEditProduct}
            toggleFromParent={this.toggleUserEditModal}
            currentUser={this.state.productEdit}
            editUser={this.doEditUser}
          />
        )}

        <div></div>
        <div className="users-table mt-4 mx-3">
          <div className="col">
            <div className="col-md-12">
              <div className="f-index">
                <div className="tabular--wrapper">
                  <button
                    className=" btn btn-primary px-3 mr-3"
                    onClick={() => this.handleAddNewUser()}
                  >
                    <i className="fas fa-user-plus mr-2"></i>Thêm sản phẩm
                  </button>
                  <button
                    className=" btn btn-primary px-3"
                    onClick={() => this.handleAddCategories()}
                  >
                    <i class="fas fa-box mr-2"></i>Thêm Loại sản phẩm
                  </button>

                  <h2 className="h2--title">Danh sách sản phẩm</h2>
                  <div className="locsanpham">
                    <select
                      className="form-control col-3 mr-2"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "idne");
                      }}
                      value={idne}
                    >
                      <option value="">Tất cả loại sản phẩm</option>
                      {arrCate &&
                        arrCate.length > 0 &&
                        arrCate.map((item, index) => {
                          return <option value={item.id}>{item.name}</option>;
                        })}
                    </select>

                    <select
                      className="form-control col-3 mr-2"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "idbrand");
                      }}
                      value={idbrand}
                    >
                      <option value="">Tất cả Hãng sản phẩm</option>
                      {arrBrand &&
                        arrBrand.length > 0 &&
                        arrBrand.map((item, index) => {
                          return <option value={item.id}>{item.name}</option>;
                        })}
                    </select>
                    <select
                      className="form-control col-3 mr-2"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "selectedPriceRange");
                      }}
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

                    <select
                      className="form-control col-2 mr-2"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "orderBy");
                      }}
                      value={orderBy}
                    >
                      <option value="">sắp xếp theo giá</option>
                      <option value="price-asc">Sắp xếp theo giá tăng dần</option>
                      <option value="price-desc">Sắp xếp theo giá giảm dần</option>
                     
                    </select>
                  </div>

                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                        <th>STT</th>
                          <th>Tên sản phẩm</th>
                          <th>giá</th>
                          <th>số lượng</th>
                          <th>Hãng</th>
                          <th>loại</th>
                          <th>hình ảnh</th>
                          <th>Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentProducts &&
                          currentProducts.map((item, index) => {
                            let imageBase64 = "";
                            if (item.image) {
                              imageBase64 = Buffer.from(
                                item.image,
                                "base64"
                              ).toString("binary");
                            }

                            return (
                              <tr key={index}>
                                <td>{index+1}</td>
                                <td>{item.name}</td>
                                <td>{this.formatCurrency(item.price)}</td>
                                <td>{item.quantity}</td>
                                <td>{item.idBrandData.name}</td>
                                <td>{item.idCateData.name}</td>
                                <td>
                                  <div
                                    className="imagene"
                                    style={{
                                      backgroundImage: `url(${imageBase64})`,
                                    }}
                                  ></div>
                                </td>

                                <td>
                                  <button
                                    className="btn-edit"
                                    onClick={() => {
                                      this.handleEditUser(item);
                                    }}
                                  >
                                    <i className="fa-regular fa-pen-to-square"></i>
                                  </button>

                                  <span> </span>

                                  <button
                                    className="btn-del"
                                    onClick={() => {
                                      this.handleDeleteUser(item);
                                    }}
                                  >
                                    <i className="fa-regular fa-trash-can"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                  <div className="phantrang">
                    <Stack spacing={2}>
                      <Pagination
                        shape="rounded"
                        count={Math.ceil(arrProducts.length / productsPerPage)}
                        page={currentPage}
                        onChange={this.handlePageChange}
                      />
                    </Stack>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductManager;
