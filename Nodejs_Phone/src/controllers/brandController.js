import Brandservices from "../services/Brandservices";

let handlegetAllBrand = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing require parameters",
      products: [],
    });
  }
  let Brand = await Brandservices.getAllBrands(id);

  return res.status(200).json({
    errcode: 0,
    errMessage: "OK",
    Brand,
  });
};

let handleCreateBrand = async (req, res) => {
  let message = await Brandservices.CreateBrands(req.body);
  console.log(message);
  return res.status(200).json(message);
};

let handleDeleteBrand = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing required parameters !",
    });
  }
  let message = await Brandservices.deleteBrands(req.body.id);
  console.log(message);
  return res.status(200).json(message);
};

let handleEditBrand = async (req, res) => {
  let data = req.body;
  let message = await Brandservices.updateBrandsData(data);
  return res.status(200).json(message);
};

module.exports = {
  handlegetAllBrand: handlegetAllBrand,
  handleCreateBrand: handleCreateBrand,
  handleDeleteBrand: handleDeleteBrand,
  handleEditBrand: handleEditBrand,
};
