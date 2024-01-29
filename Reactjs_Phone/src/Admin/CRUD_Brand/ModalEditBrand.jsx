import React, { Component } from "react";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import "./ModalEditProducts.scss";
import _ from "lodash";
import { Buffer } from "buffer";
import CommonUtils from "../../utils/CommonUtils";


class ModalEditBrand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      avatar: "",
      previewImgURL: "",
    };
  }

  componentDidMount() {
    let user = this.props.currentUser;
    // cachs 2 //let {CurrentUser}=this.props;
    let imageBase64 = "";
    if (user.image) {
      // const imageBuffer = Buffer.from(JSON.stringify(user.image));
      imageBase64 = new Buffer.from(user.image, "base64").toString("binary");
    }
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        previewImgURL: imageBase64,
      });
    }
  }

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

  checkValideInputEdit = () => {
    let isValid = true;
    let arrInput = ["name"];

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
          Sửa Hãng sản phẩm
        </ModalHeader>
        <ModalBody>
          <div className="user-redux-body">
            <div className="container center">
              <div className="row-12">
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Tên Hãng sản phẩm</label>
                    <input
                      className="form-control"
                      placeholder="iphone"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "name");
                      }}
                      value={this.state.name}
                    />
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

export default ModalEditBrand;
