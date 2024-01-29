import categories from "../models/category";
import db from "../models/index";
const { Sequelize, Op } = require("sequelize");

let getAllProducts = (productId, idne, idbrand, priceRange, orderBy) => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = "";

      // Khởi tạo các điều kiện truy vấn
      let queryConditions = {};

      // Lọc theo ID sản phẩm
      if (productId && productId !== "ALL") {
        queryConditions.id = productId;
      }

      // Lọc theo ID hãng
      if (idne && idne !== "") {
        queryConditions.idCate = idne;
      }
      if (idbrand && idbrand !== "") {
        queryConditions.idBrand = idbrand;
      }

      // Lọc theo mức giá
      if (priceRange && priceRange !== "") {
        const [minPrice, maxPrice] = priceRange
          .split("-")
          .map((price) => parseFloat(price));
        queryConditions.price = {
          [Op.between]: [minPrice, maxPrice],
        };
      }

      // Thêm điều kiện sắp xếp
      let orderCondition = [];
      if (orderBy === "price-asc") {
        orderCondition.push(["price", "ASC"]);
      } else if (orderBy === "price-desc") {
        orderCondition.push(["price", "DESC"]);
      } else {
        // Sắp xếp mặc định theo createdAt DESC nếu không có điều kiện sắp xếp
        orderCondition.push(["createdAt", "DESC"]);
      }

      // Truy vấn database
      products = await db.Product.findAll({
        where: queryConditions,
        order: orderCondition,
        include: [
          {
            model: db.Category,
            as: "idCateData",
            attributes: ["name"],
          },
          {
            model: db.Brand,
            as: "idBrandData",
            attributes: ["name"],
          },
        ],
        raw: false,
        nest: true,
      });

      resolve(products);
    } catch (e) {
      reject(e);
    }
  });
};

let DeltaiProduct = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = "";

      if (productId && productId !== "ALL") {
        products = await db.Product.findOne({
          where: { id: productId },
          include: [
            {
              model: db.Category,
              as: "idCateData",
              attributes: ["name"],
            },
            {
              model: db.Brand,
              as: "idBrandData",
              attributes: ["name"],
            },
          ],
          raw: false,
          nest: true,
        });
      }

      resolve(products);
    } catch (e) {
      reject(e);
    }
  });
};

let checkproductname = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = await db.Product.findOne({
        where: { name: name },
      });
      if (products) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let CreateProducts = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // check taikhoan is exist??
      let check = await checkproductname(data.name);
      if (check == true) {
        resolve({
          errcode: 1,
          errMessage:
            "Tên người dùng đã tồn tại vui lòng nhập tên người dùng  khác",
        });
      } else {
        await db.Product.create({
          name: data.name,
          price: data.price,
          quantity: data.quantity,
          image: data.avatar,
          idCate: data.idCate,
          idBrand: data.idBrand,
        });
        if (data && data.image) {
          data.image = Buffer.from(data.image, "base64").toString("binary");
        }
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
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteProducts = (productId) => {
  return new Promise(async (resolve, reject) => {
    let products = await db.Product.findOne({
      where: { id: productId },
    });
    if (!products) {
      resolve({
        errcode: 2,
        errMessage: "product isn't exist !",
      });
    }
    await db.Product.destroy({
      where: { id: productId },
    });
    resolve({
      errcode: 0,
      errMessage: "product is deleted !",
    });
  });
};
let updateProductData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.name) {
        resolve({
          errcode: 2,
          errMessage: "Missing required parameter",
        });
      }
      let products = await db.Product.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (products) {
        products.name = data.name;
        products.price = data.price;
        products.quantity = data.quantity;
        products.idCate = data.idCate;
        products.idBrand = data.idBrand;
        if (data.avatar) {
          products.image = data.avatar;
        }

        products.image = data.avatar;
        await products.save();
        resolve({
          errcode: 0,
          errMessage: "update product succeeds !",
        });
      } else {
        resolve({
          errcode: 1,
          errMessage: "product not found !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let checkcategoriesname = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let category = await db.Category.findOne({
        where: { name: name },
      });
      if (category) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let checkbrandname = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let brands = await db.Brand.findOne({
        where: { name: name },
      });
      if (brands) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let CreateCategories = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // check taikhoan is exist??
      let check = await checkcategoriesname(data.name);
      let check1 = await checkbrandname(data.name);
      if (check == true) {
        resolve({
          errcode: 1,
          errMessage: "Tên loại sản phẩm này đã tồn tại",
        });
      } else if (check1 == true) {
        resolve({
          errcode: 1,
          errMessage: "Tên hãng sản phẩm này đã tồn tại",
        });
      } else {
        await db.Category.create({
          name: data.name,
          image: data.avatar,
        });
        if (data && data.image) {
          data.image = Buffer.from(data.image, "base64").toString("binary");
        }
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
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteCategories = (CategoriesId) => {
  return new Promise(async (resolve, reject) => {
    let category = await db.Category.findOne({
      where: { id: CategoriesId },
    });
    if (!category) {
      resolve({
        errcode: 2,
        errMessage: "loại sản phẩm  không tồn tại",
      });
    }
    await db.Category.destroy({
      where: { id: CategoriesId },
    });
    resolve({
      errcode: 0,
      errMessage: "loại sản phẩm đã bị xóa !",
    });
  });
};

let updateCategoriesData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errcode: 2,
          errMessage: "Missing required parameter",
        });
      }
      let categories = await db.Category.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (categories) {
        categories.name = data.name;
        if (data.avatar) {
          categories.image = data.avatar;
        }

        categories.image = data.avatar;

        await categories.save();
        resolve({
          errcode: 0,
          errMessage: "update categories succeeds !",
        });
      } else {
        resolve({
          errcode: 1,
          errMessage: "categories not found !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllCategories = (categoriesId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let categories = "";
      if (categoriesId == "ALL") {
        categories = db.Category.findAll({
          order: [["createdAt", "ASC"]],
        });
      }
      if (categoriesId && categoriesId !== "ALL") {
        categories = await db.Category.findOne({
          where: { id: categoriesId }, //  productId laf cais tham so truyen vao
        });
      }
      resolve(categories);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllProducts: getAllProducts,
  DeltaiProduct: DeltaiProduct,
  CreateProducts: CreateProducts,
  deleteProducts: deleteProducts,
  updateProductData: updateProductData,
  CreateCategories: CreateCategories,
  deleteCategories: deleteCategories,
  getAllCategories: getAllCategories,
  updateCategoriesData: updateCategoriesData,
};
