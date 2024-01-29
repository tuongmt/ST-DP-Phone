import Saleservices from "../services/Saleservices";

let handlegetAllSale = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing require parameters",
      products: [],
    });
  }
  let Sale = await Saleservices.getAllSale(id);
  return res.status(200).json({
    errcode: 0,
    errMessage: "OK",
    Sale,
  });
};

let handleCreateSale = async (req, res) => {
  let message = await Saleservices.CreateSale(req.body);
  return res.status(200).json(message);
};

let handleDeleteSale = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing required parameters !",
    });
  }
  let message = await Saleservices.deleteSale(req.body.id);
  console.log(message);
  return res.status(200).json(message);
};

let handleEditSale = async (req, res) => {
  let data = req.body;
  let message = await Saleservices.updateSaleData(data);
  return res.status(200).json(message);
};

module.exports = {
  handlegetAllSale: handlegetAllSale,
  handleCreateSale: handleCreateSale,
  handleDeleteSale: handleDeleteSale,
  handleEditSale: handleEditSale,
};
