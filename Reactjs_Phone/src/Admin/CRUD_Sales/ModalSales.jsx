import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import { toast } from "react-toastify";
import "./ModalProducts.scss";
import _ from "lodash";


class ModalCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "" 
    };
    this.listenToEmitter();
  }
  listenToEmitter = () => {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      //reset state
      this.setState({
      name: "",
      });
    });
  };
 componentDidMount() {
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
  checkValideInput = () => {
    let isValid = true;
    let arrInput = [
      "name",
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

  handleAddCategories = () => {
    let isValid = this.checkValideInput();

    if (isValid == true) {
      //call api create modal
      //  console.log('check props child:',this.props);
      this.props.createNewCategories(this.state);
      // console.log('data modal:',this.state)
      toast.success("Tạo Thành công");
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
          Thêm loại sản phẩm
        </ModalHeader>
        <ModalBody>
          <div className="user-redux-body">
            <div className="container center">
              <div className="row-12">
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Tên loại sản phẩm </label>
                    <input
                      className="form-control"
                      placeholder="Iphone..."
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "name");
                      }}
                      value={this.state.name}
                    />
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
              this.handleAddCategories();
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

export default ModalCategories;
