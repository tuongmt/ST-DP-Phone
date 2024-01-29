import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { locdonhang, deleteOrders, updateorderData } from "../../userService";
import { toast } from "react-toastify";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./ModalProducts.scss";
import { format } from "date-fns";

const OrderManager = () => {
  const [arrOrders, setArrOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const productsPerPage = 5;

  useEffect(() => {
    getAllOrdersFromReact();
  }, [selectedDate, statusFilter, currentPage]);
  const formattedDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";

  const getAllOrdersFromReact = async () => {
    try {
      const response = await locdonhang("ALL", formattedDate, statusFilter);

      if (response && response.errcode === 0) {
        setArrOrders(response.orders);
      }
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  const handleDeleteOrders = async (user) => {
    try {
      const res = await deleteOrders(user.id);
      if (res && res.errcode !== 0) {
        alert(res.errMessage);
        toast.error("Xóa thất bại");
      } else {
        getAllOrdersFromReact();
        toast.success("Xóa Thành công");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const capnhattrangthai = async (data) => {
    try {
      await updateorderData({
        id: data.id,
        // other update data
      });
      await getAllOrdersFromReact();
      toast.success("Xác nhận thành công");
    } catch (e) {
      toast.error("Xác nhận thất bại");
      console.error("Error updating order", e);
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const formatDate = (isoDate) => {
    const dateObject = new Date(isoDate);
 
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();

    return `${day}/${month}/${year}`;
  };

  console.log("xem ngay cai",selectedDate);

  return (
    <div className="hello">
      <div className="users-table mt-4 mx-3">
        <div className="col">
          <div className="col-md-12">
            <div className="f-index">
              <div className="tabular--wrapper">
                <h2 className="h2--title">Danh sách Đơn hàng</h2>
                <div className="locsanpham">
                  <div className="form-group">
                    <label>Đơn hàng theo ngày:</label>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      dateFormat="dd/MM/yyyy"
                      className="form-control"
                    />
                  </div>

                  <select
                    className="form-control col-3 mr-3"
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="">Đơn hàng theo trạng thái</option>
                    <option value="Đang chờ để duyệt">chưa xác nhận</option>
                    <option value="Đã xác nhận">đã xác nhận</option>
                  </select>
                </div>
                <div className="table-container">
                  <table>
                    <thead>
                    <tr>
                        <th>Người Nhận</th>
                        <th>Ngày đặt</th>
                        <th>Địa chỉ nhận hàng</th>
                        <th>Số điện thoại</th>
                        <th>Phương thức thanh toán</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                        <th>ghi chú</th>
                        <th>Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {arrOrders.map((item, index) => (
                        <tr key={index}>
                         <td>{item.receiver}</td>
                            <td>{formatDate(item.createdAt)}</td>
                            <td>{item.receiving_point}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.payment}</td>
                            <td>{new Intl.NumberFormat().format(item.total_value)} đ</td>




                            <td>{item.order_status}</td>
                            <td>{item.note}</td>
                          <td>
                            <button
                              className="btn-edit"
                              onClick={() => capnhattrangthai(item)}
                            >
                              Xác nhận
                            </button>
                            <span> </span>
                            <button
                              className="btn-del"
                              onClick={() => handleDeleteOrders(item)}
                            >
                              Xóa
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="phantrang">
                  <Stack spacing={2}>
                    <Pagination
                      shape="rounded"
                      count={Math.ceil(arrOrders.length / productsPerPage)}
                      page={currentPage}
                      onChange={handlePageChange}
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
};

export default OrderManager;
