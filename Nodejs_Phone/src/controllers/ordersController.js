import OrderServices from "../services/OrderServices";

let handleGetAllOrders = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing require parameters",
      products: [],
    });
  }
  let orders = await OrderServices.getAllOders(id);

  return res.status(200).json({
    errcode: 0,
    errMessage: "OK",
    orders,
  });
};

let handleLocdonhang = async (req, res) => {
  let id = req.query.id; //all, id
  let createdAt = req.query.createdAt;
  let order_status = req.query.order_status;
  if (!id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing require parameters",
      products: [],
    });
  }
  let orders = await OrderServices.locdonhang(id, createdAt, order_status);

  return res.status(200).json({
    errcode: 0,
    errMessage: "OK",
    orders,
  });
};

let handleCreateOrders = async (req, res) => {
  let message = await OrderServices.CreateOrders(req.body);
  console.log(message);
  return res.status(200).json(message);
};

let handleDeleteOrders = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing required parameters !",
    });
  }
  let message = await OrderServices.deleteOrders(req.body.id);
  console.log(message);
  return res.status(200).json(message);
};

let handleEditOder = async (req, res) => {
  let data = req.body;
  let message = await OrderServices.updateOrderData(data);
  return res.status(200).json(message);
};

module.exports = {
  handleGetAllOrders: handleGetAllOrders,
  handleCreateOrders: handleCreateOrders,
  handleDeleteOrders: handleDeleteOrders,
  handleEditOder: handleEditOder,
  handleLocdonhang: handleLocdonhang,
};
