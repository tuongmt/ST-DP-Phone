import db from "../models/index";

let CreateOrderDetails = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.OrderDetail.create({
        order_id: data.order_id,
        product_id: data.product_id,
        quantity: data.quantity,
        total_price: data,
        total_price,
      });

      if (!data) {
        data = {};
      }
      resolve({
        errcode: 0,
        data: data,
      });

      resolve({
        errcode: 0,
        message: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};
let deleteOrderDetails = (OrderDetailsId) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Find all OrderDetail with the given order_id
      let orderDetailsList = await db.OrderDetail.findAll({
        where: { order_id: OrderDetailsId },
      });

      if (orderDetailsList.length === 0) {
        resolve({
          errcode: 2,
          errMessage: "No order details found with the given order_id",
        });
      }

      // Delete all OrderDetail with the given order_id
      await db.OrderDetail.destroy({
        where: { order_id: OrderDetailsId },
      });

      resolve({
        errcode: 0,
        errMessage: "Order details have been deleted!",
      });
    } catch (error) {
      reject({
        errcode: 1,
        errMessage: "Error deleting order details",
      });
    }
  });
};

let updateOrderDetailsData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errcode: 2,
          errMessage: "Missing required parameter",
        });
      }
      let OrderDetail = await db.OrderDetail.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (OrderDetail) {
        OrderDetail.quantity = data.quantity;
        await OrderDetail.save();
        resolve({
          errcode: 0,
          errMessage: "update OrderDetail succeeds !",
        });
      } else {
        resolve({
          errcode: 1,
          errMessage: "OrderDetail not found !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllOrderDetails = (OrderDetailsId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let OrderDetail = "";

      OrderDetail = db.OrderDetail.findAll({
        where: { order_id: OrderDetailsId },
        include: [
          {
            model: db.Product,
            as: "idProductData",
            attributes: ["name", "image", "price"],
          },
          {
            model: db.Order,
            as: "idOrderData",
            attributes: ["order_status"],
          },
        ],
        raw: false,
        nest: true,
      });

      resolve(OrderDetail);
    } catch (e) {
      reject(e);
    }
  });
};
let layhoadon = (orderId1) => {
  return new Promise(async (resolve, reject) => {
    try {
      let orders1 = "";

      if (orderId1 && orderId1 !== "ALL") {
        orders1 = await db.Order.findOne({
          where: { id_order: orderId1 },
        });
      }

      resolve(orders1);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllOrderDetails: getAllOrderDetails,
  CreateOrderDetails: CreateOrderDetails,
  deleteOrderDetails: deleteOrderDetails,
  updateOrderDetailsData: updateOrderDetailsData,
  layhoadon: layhoadon,
};
