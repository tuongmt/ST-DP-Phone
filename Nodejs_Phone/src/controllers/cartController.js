import Cartservices from "../services/CartServices";

let handlegetAllCart = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing require parameters",
      products: [],
    });
  }
  let Cart = await Cartservices.getAllCart(id);
  return res.status(200).json({
    errcode: 0,
    errMessage: "OK",
    Cart,
  });
};

let handleCreateCart = async (req, res) => {
  let message = await Cartservices.CreateCart(req.body);
  console.log(message);
  return res.status(200).json(message);
};

let handleDeleteCart = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing required parameters !",
    });
  }
  let message = await Cartservices.deleteCart(req.body.id);
  console.log(message);
  return res.status(200).json(message);
};

let handleEditCart = async (req, res) => {
  let data = req.body;
  let message = await Cartservices.updateCartData(data);
  return res.status(200).json(message);
};

module.exports = {
  handlegetAllCart: handlegetAllCart,
  handleCreateCart: handleCreateCart,
  handleDeleteCart: handleDeleteCart,
  handleEditCart: handleEditCart,
};
