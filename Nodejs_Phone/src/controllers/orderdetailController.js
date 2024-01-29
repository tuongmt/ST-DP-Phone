import Oderdetailservices from "../services/OrderDetailServices";

let handlegetAllOderdetail = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing require parameters",
      products: [],
    });
  }
  let Oderdetail = await Oderdetailservices.getAllOrderDetails(id);
  return res.status(200).json({
    errcode: 0,
    errMessage: "OK",
    Oderdetail,
  });
};

let handleCreateOderdetail = async (req, res) => {
  let message = await Oderdetailservices.CreateOrderDetails(req.body);
  console.log(message);
  return res.status(200).json(message);
};

let handleDeleteOderdetail = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing required parameters !",
    });
  }
  let message = await Oderdetailservices.deleteOrderDetails(req.body.id);
  console.log(message);
  return res.status(200).json(message);
};

let handleEditOderdetail = async (req, res) => {
  let data = req.body;
  let message = await Oderdetailservices.updateOrderDetailsData(data);
  return res.status(200).json(message);
};

let handleLayhoadon = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing require parameters",
    });
  }
  let orders1 = await Oderdetailservices.layhoadon(id);

  return res.status(200).json({
    errcode: 0,
    errMessage: "OK",
    orders1,
  });
};

module.exports = {
  handlegetAllOderdetail: handlegetAllOderdetail,
  handleCreateOderdetail: handleCreateOderdetail,
  handleDeleteOderdetail: handleDeleteOderdetail,
  handleEditOderdetail: handleEditOderdetail,
  handleLayhoadon: handleLayhoadon,
};
