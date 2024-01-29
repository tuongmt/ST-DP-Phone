import db from "../models/index";
const { Sequelize, Op } = require("sequelize");

let getAllOders = (orderId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let orders = "";

      if (orderId == "ALL") {
        orders = db.Order.findAll({
          order: [["createdAt", "DESC"]],
        });
      } else if (orderId && orderId !== "ALL") {
        orders = await db.Order.findAll({
          where: { order_idUser: orderId },
        });
      }

      resolve(orders);
    } catch (e) {
      reject(e);
    }
  });
};

const locdonhang = (orderId, selectedDate, statusFilter) => {
  return new Promise(async (resolve, reject) => {
    try {
      let orders = "";
      const queryOptions = {
        order: [["createdAt", "DESC"]],
        where: {},
      };

      if (orderId && orderId !== "ALL") {
        queryOptions.where.order_idUser = orderId;
      }

      if (selectedDate) {
        const startDate = new Date(selectedDate);
        startDate.setHours(0, 0, 0, 0); // Đặt giờ, phút và giây thành 00:00:00

        const endDate = new Date(selectedDate);
        endDate.setHours(23, 59, 59, 999); // Đặt giờ, phút và giây thành 23:59:59:999

        queryOptions.where.createdAt = {
          [Op.between]: [startDate, endDate],
        };
      }

      if (statusFilter) {
        queryOptions.where.order_status = statusFilter;
      }

      orders = await db.Order.findAll(queryOptions);
      resolve(orders);
    } catch (e) {
      reject(e);
    }
  });
};

let CreateOrders = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Tìm đơn hàng mới nhất để xác định ID tiếp theo
      const latestOrder = await db.Order.findOne({
        order: [["createdAt", "DESC"]],
      });

      let nextOrderId;
      if (latestOrder) {
        const latestOrderIdNumber = parseInt(
          latestOrder.id_order.substr(2),
          10
        );
        nextOrderId = `HD${(latestOrderIdNumber + 1)
          .toString()
          .padStart(2, "0")}`;
      } else {
        // Nếu không có đơn hàng trước đó, bắt đầu bằng HD01
        nextOrderId = "HD01";
      }

      // Tạo đơn hàng mới
      await db.Order.create({
        id_order: nextOrderId,
        receiver: data.receiver,
        order_status: data.order_status,
        receiving_point: data.receiving_point,
        phoneNumber: data.phoneNumber,
        total_value: data.total_value,
        note: data.note,
        payment: data.payment,
        order_idUser: data.order_idUser,
      });

      const productListWithOrderId = data.productList.map((item) => ({
        ...item,
        order_id: nextOrderId,
      }));
      await db.OrderDetail.bulkCreate(productListWithOrderId);

      resolve({
        errcode: 0,
        message: "OK",
        data: {
          ...data,
          id_order: nextOrderId,
        },
        productListWithOrderId: { order_id: nextOrderId },
      });
    } catch (e) {
      reject(e);
    }
  });
};

let deleteOrders = (orderId) => {
  return new Promise(async (resolve, reject) => {
    let orders = await db.Order.findOne({
      where: { id: orderId },
    });
    if (!orders) {
      resolve({
        errcode: 2,
        errMessage: "orders isn't exist !",
      });
    }
    await db.Order.destroy({
      where: { id: orderId },
    });
    resolve({
      errcode: 0,
      errMessage: "orders is deleted !",
    });
  });
};

let updateOrderData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errcode: 2,
          errMessage: "Missing required parameter",
        });
      }
      let Order = await db.Order.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (Order) {
        Order.order_status = "Đã xác nhận";
        await Order.save();
        resolve({
          errcode: 0,
          errMessage: "update Order succeeds !",
        });
      } else {
        resolve({
          errcode: 1,
          errMessage: "Order not found !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllOders: getAllOders,
  CreateOrders: CreateOrders,
  deleteOrders: deleteOrders,
  updateOrderData: updateOrderData,
  locdonhang: locdonhang,
};
