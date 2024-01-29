import React, { Component } from "react";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import "./ModalEditProducts.scss";
import _ from "lodash";
import { Buffer } from "buffer";
import CommonUtils from "../../utils/CommonUtils";
import {getAllCategories, getAllBrand} from "../../userService";

class ModalEditProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrCate:[],
      arrBrand:[],
      name: "",
      price: "",
      quantity: "",
      idCate: "",
      idBrand:"",
      avatar: "",
      previewImgURL: " ",
    };
  }

  async componentDidMount() {
    await this.getAllCategoriesReact();
    await this.getAllBrandReact();
    let user = this.props.currentUser;
    // cachs 2 //let {CurrentUser}=this.props;
    if (user && !_.isEmpty(user)) {
      let imageBase64 = "";
      if (user.image) {
        // const imageBuffer = Buffer.from(JSON.stringify(user.image));
        imageBase64 = new Buffer.from(user.image, "base64").toString("binary");
      }
      this.setState({
        id: user.id,
        name: user.name,
        price: user.price,
        quantity: user.quantity,
        idCate: user.idCate,
        idBrand: user.idBrand,
        avatar: user.avatar,
        previewImgURL: imageBase64,
      });
    }
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

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
  handleOnChangeInput = (event, id) => {
    //good code
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {
        // console.log('check good state: ',this.state);
      }
    );
    //console.log('copystate: ',copyState);

    // console.log(event.target.value,id)
  };

  checkValideInputEdit = () => {
    let isValid = true;
    let arrInput = ["name", "price", "quantity", "idCate","idBrand"];

    for (let i = 0; i < arrInput.length; i++) {
      console.log("check inside loop", this.state[arrInput[i]], arrInput[i]);
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }

    return isValid;
  };

  handleSaveUser = () => {
    let isValid = this.checkValideInputEdit();

    if (isValid == true) {
      this.props.editUser(this.state);
    }
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);

      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        avatar: base64,
      });
    }
  };

  handleOnChangeInputPrice = (event, field) => {
    // Loại bỏ các dấu phẩy từ giá trị người dùng nhập
    const inputValue = event.target.value.replace(/,/g, '');

    // Kiểm tra xem giá trị có phải là số không
    if (!isNaN(inputValue)) {
      // Cập nhật state
      this.setState({
        [field]: inputValue
      });
    }
  };

  render() {
    const formattedPrice = new Intl.NumberFormat('en-US').format(this.state.price);
    let category=this.state.arrCate;
    let brand=this.state.arrBrand;
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"model-user-container"}
        size="lg"
        centered
      >
        <ModalHeader
          className="header-user-content"
          toggle={() => {
            this.toggle();
          }}
        >
          Sửa Thông tin sản phẩm
        </ModalHeader>
        <ModalBody>
          <div className="user-redux-body">
            <div className="container center">
              <div className="row-12">
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Tên sản phẩm</label>
                    <input
                      className="form-control"
                      placeholder="iphone"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "name");
                      }}
                      value={this.state.name}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Giá</label>
                    <input
                          type="text"
                          className="form-control"
                          placeholder="10,000,000"
                          onChange={(event) => {
                            this.handleOnChangeInputPrice(event, "price");
                          }}
                          value={formattedPrice} // Hiển thị giá trị đã được định dạng
                        />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label>Số Lượng</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="50"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "quantity");
                      }}
                      value={this.state.quantity}
                    />
                  </div>
                </div>
                <div className="form-row">
                <div className="form-group col-md-6">
                    <label>Loại</label> 
                    <select className="form-control"
                     onChange={(event) => {
                      this.handleOnChangeInput(event, "idCate");
                    }}
                    value={this.state.idCate}>
                         <option  value=''>Chọn loại sản phẩm</option>
                     {
                      category&&category.length>0
                      &&category.map((item,index)=>{
                        return(
                          <option  value={item.id}>{item.name}</option>
                        )
                      })
                     }
                     
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <label>Hãng</label> 
                    <select className="form-control"
                     onChange={(event) => {
                      this.handleOnChangeInput(event, "idBrand");
                    }}
                    value={this.state.idBrand}>
                         <option  value=''>Chọn Hãng sản phẩm</option>
                     {
                      brand&&brand.length>0
                      &&brand.map((item,index)=>{
                        return(
                          <option  value={item.id}>{item.name}</option>
                        )
                      })
                     }
                     
                    </select>
                  </div>

                  <div className="form-group col-md-3">
                    <label>Hình ảnh</label>
                    <div className="lamdep">
                      <input
                        type="file"
                        id="previewImg"
                        hidden
                        onChange={(event) => this.handleOnChangeImage(event)}
                      ></input>

                      <label className="label-upload" htmlFor="previewImg">
                        tải ảnh <i className="fas fa-upload"></i>
                      </label>
                      <div
                        className="preview-image"
                        onClick={this.handleImageClick}
                        style={{
                          backgroundImage: `url(${this.state.previewImgURL})`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="primary"
            color="primary"
            className="px-3"
            onClick={() => {
              this.handleSaveUser();
            }}
          >
            Lưu thay đổi
          </Button>
          <Button
            variant="secondary"
            color="danger"
            className="px-3"
            onClick={() => {
              this.toggle();
            }}
          >
            Đóng
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalEditProducts;
