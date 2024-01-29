import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import { toast } from "react-toastify";
import "./ModalUser.scss";
import _ from "lodash";
import CommonUtils from "../../utils/CommonUtils";

class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taikhoan: "",
      password: "",
      fullName: "",
      address: "",
      phoneNumber: "",
      email: "",
      roleId: "R1",
      avatar: "",
      previewImgURL: " ",
    };
    this.listenToEmitter();
  }
  listenToEmitter = () => {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      //reset state
      this.setState({
        taikhoan: "",
        password: "",
        fullName: "",
        address: "",
        phoneNumber: "",
        email: "",
        roleId: "R1",
        avatar: "",
        previewImgURL: " ",
      });
    });
  };
  componentDidMount() {}

  toggle = () => {
    this.props.toggleFromParent();
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
  checkValideInput = () => {
    let isValid = true;
    let arrInput = [
      "taikhoan",
      "password",
      "fullName",
      "address",
      "phoneNumber",
      "email",
      "roleId",
    ];

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

  handleAddNewUser = () => {
    let isValid = this.checkValideInput();

    if (isValid == true) {
      //call api create modal
      //  console.log('check props child:',this.props);
      this.props.createNewUser(this.state);
      // console.log('data modal:',this.state)
      toast.success("Tạo Thành công");
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

  render() {
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
          Thêm mới tài khoản khách hàng
        </ModalHeader>
        <ModalBody>
          <div className="user-redux-body">
            <div className="container center">
              <div className="row-12">
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>UserName</label>
                    <input
                      className="form-control"
                      placeholder="UserName"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "taikhoan");
                      }}
                      value={this.state.taikhoan}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Mật khẩu</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="********"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "password");
                      }}
                      value={this.state.password}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label>Họ và Tên</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Anh"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "fullName");
                      }}
                      value={this.state.fullName}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Địa chỉ</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="1234 Main St"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "address");
                      }}
                      value={this.state.address}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Số Điện thoại</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="0123456789"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "phoneNumber");
                      }}
                      value={this.state.phoneNumber}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Email</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="0123456789"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "email");
                      }}
                      value={this.state.email}
                    />
                  </div>

                  <div className="form-group col-md-3">
                    <label>Quyền</label>
                    <select className="form-control"
                     onChange={(event) => {
                      this.handleOnChangeInput(event, "roleId");
                    }}
                    value={this.state.roleId}>
                      <option value='R1'>Admin</option>
                      <option value='R2'>Khách hàng</option>
                     
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
              this.handleAddNewUser();
            }}
          >
            Thêm
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

export default ModalUser;
