import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import productController from "../controllers/productController";
import orderController from "../controllers/ordersController";
import brandController from "../controllers/brandController";

import SaleController from "../controllers/saleController";

import CartController from "../controllers/cartController";
import OrderdetailController from "../controllers/orderdetailController";

let router = express.Router();

let initWebRouters = (app) => {
  router.get("/", homeController.getHomePage); // gọi file controller và
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);

  router.post("/post-crud", homeController.postCRUD); // link acction

  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  //api cua User
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUser);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.get("/api/allcode", userController.getAllCode);

  //api cua san pham
  router.get("/api/get-all-products", productController.handleGetAllProducts);
  router.get("/api/get-deltai-product", productController.handleDeltaiProduct);
  router.post(
    "/api/create-new-products",
    productController.handleCreateProducts
  );
  router.put("/api/edit-products", productController.handleEditProducts);
  router.delete("/api/delete-products", productController.handleDeleteProducts);

  //api cua  cart
  router.post("/api/create-new-cart", CartController.handleCreateCart);
  router.delete("/api/delete-cart", CartController.handleDeleteCart);
  router.put("/api/edit-cart", CartController.handleEditCart);
  router.get("/api/get-all-cart", CartController.handlegetAllCart);

  //api cua oderdetail
  router.post(
    "/api/create-new-Orderdetail",
    OrderdetailController.handleCreateOderdetail
  );
  router.delete(
    "/api/delete-Orderdetail",
    OrderdetailController.handleDeleteOderdetail
  );
  router.put(
    "/api/edit-Orderdetail",
    OrderdetailController.handleEditOderdetail
  );
  router.get(
    "/api/get-all-Orderdetail",
    OrderdetailController.handlegetAllOderdetail
  );
  router.get("/api/get-lay-hoa-don", OrderdetailController.handleLayhoadon);

  //api cua brand
  router.post("/api/create-new-brand", brandController.handleCreateBrand);
  router.delete("/api/delete-brand", brandController.handleDeleteBrand);
  router.put("/api/edit-brand", brandController.handleEditBrand);
  router.get("/api/get-all-brand", brandController.handlegetAllBrand);

  // api cuar sale
  router.post("/api/create-new-sale", SaleController.handleCreateSale);
  router.delete("/api/delete-sale", SaleController.handleDeleteSale);
  router.put("/api/edit-sale", SaleController.handleEditSale);
  router.get("/api/get-all-sale", SaleController.handlegetAllSale);

  //api cua categories
  router.post(
    "/api/create-new-categories",
    productController.handleCreateCategories
  );
  router.delete(
    "/api/delete-categories",
    productController.handleDeleteCategories
  );
  router.put("/api/edit-categories", productController.handleEditCategories);
  router.get(
    "/api/get-all-categories",
    productController.handlegetAllCategories
  );

  //api cua orders
  router.get("/api/get-all-orders", orderController.handleGetAllOrders);

  router.post("/api/create-new-orders", orderController.handleCreateOrders);
  router.delete("/api/delete-orders", orderController.handleDeleteOrders);
  router.put("/api/edit-orders", orderController.handleEditOder);

  router.get("/api/loc-don-hang", orderController.handleLocdonhang);
  
  // thêm  trang mới  khi /tanh
  router.get("/tanh", (req, res) => {
    return res.send("Hello world with NTanh");
  });

  return app.use("/", router);
};
module.exports = initWebRouters;
