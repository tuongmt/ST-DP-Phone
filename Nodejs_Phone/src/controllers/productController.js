import productServices from "../services/productServices";

let handleGetAllProducts = async (req, res) => {
  let id = req.query.id; //all, id
  let idCate = req.query.idCate;
  let idBrand = req.query.idBrand;
  let price = req.query.price;
  let orderBy = req.query.orderBy;
  if (!id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing require parameters",
      products: [],
    });
  }
  let products = await productServices.getAllProducts(
    id,
    idCate,
    idBrand,
    price,
    orderBy
  );
  return res.status(200).json({
    errcode: 0,
    errMessage: "OK",
    products,
  });
};

let handleDeltaiProduct = async (req, res) => {
  let id = req.query.id; //all, id

  if (!id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing require parameters",
      products: [],
    });
  }
  let products = await productServices.DeltaiProduct(id);
  console.log(products);
  return res.status(200).json({
    errcode: 0,
    errMessage: "OK",
    products,
  });
};

let handleCreateProducts = async (req, res) => {
  let message = await productServices.CreateProducts(req.body);
  console.log(message);
  return res.status(200).json(message);
};

let handleDeleteProducts = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing required parameters !",
    });
  }
  let message = await productServices.deleteProducts(req.body.id);
  console.log(message);
  return res.status(200).json(message);
};
let handleEditProducts = async (req, res) => {
  let data = req.body;
  let message = await productServices.updateProductData(data);
  return res.status(200).json(message);
};

// cua categories

let handlegetAllCategories = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing require parameters",
      products: [],
    });
  }
  let categories = await productServices.getAllCategories(id);
  return res.status(200).json({
    errcode: 0,
    errMessage: "OK",
    categories,
  });
};

let handleCreateCategories = async (req, res) => {
  let message = await productServices.CreateCategories(req.body);
  console.log(message);
  return res.status(200).json(message);
};

let handleDeleteCategories = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing required parameters !",
    });
  }
  let message = await productServices.deleteCategories(req.body.id);
  console.log(message);
  return res.status(200).json(message);
};

let handleEditCategories = async (req, res) => {
  let data = req.body;
  let message = await productServices.updateCategoriesData(data);
  return res.status(200).json(message);
};

module.exports = {
  handleGetAllProducts: handleGetAllProducts,
  handleCreateProducts: handleCreateProducts,
  handleDeleteProducts: handleDeleteProducts,
  handleEditProducts: handleEditProducts,
  handlegetAllCategories: handlegetAllCategories,
  handleCreateCategories: handleCreateCategories,
  handleDeleteCategories: handleDeleteCategories,
  handleEditCategories: handleEditCategories,
  handleDeltaiProduct: handleDeltaiProduct,
};
