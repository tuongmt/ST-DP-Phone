import bcryptjs from "bcryptjs";
import db from "../models/index";

const salt = bcryptjs.genSaltSync(10);

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcryptjs.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let handleUserLogin = (taikhoan, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUsertaikhoan(taikhoan);
      if (isExist) {
        let user = await db.User.findOne({
          attributes: [
            "taikhoan",
            "roleId",
            "password",
            "fullName",
            "phoneNumber",
            "email",
            "address",
            "image",
            "id",
          ], //  chỉ hiện taikhoan, roleid,
          where: { taikhoan: taikhoan },
          raw: false, // xóa passwword
        });
        if (user) {
          //compare password
          let check = await bcryptjs.compareSync(password, user.password);
          if (check) {
            (userData.errcode = 0), (userData.errMessage = "oke");
            delete user.password; // xóa passwword khỏi api khỏi lo bị hack
            userData.user = user;
          } else {
            userData.errcode = 3;
            userData.errMessage = "Mật khẩu sai";
          }
        } else {
          userData.errcode = 2;
          userData.errMessage = "Người dùng không tồn tại";
        }
      } else {
        //return error
        userData.errcode = 1;
        userData.errMessage =
          "taikhoan không tồn tại vui lòng  đăng kí hoặc kiểm tra lại";
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUsertaikhoan = (taikhoan) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { taikhoan: taikhoan },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

//userId là tham số truyền vào ví dụ id =1 hay  la 2 3 ......

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId == "ALL") {
        users = db.User.findAll({
          // ẩn mật khẩu
          attributes: {
            exclude: ["password"],
          },
          order: [["createdAt", "DESC"]],
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId }, //  userId laf cais tham so truyen vao
          // ẩn mật khẩu
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let CreateNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // check taikhoan is exist??
      let check = await checkUsertaikhoan(data.taikhoan);
      if (check == true) {
        resolve({
          errcode: 1,
          errMessage:
            "Tên người dùng đã tồn tại vui lòng nhập tên người dùng  khác",
        });
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          taikhoan: data.taikhoan,
          password: hashPasswordFromBcrypt,
          fullName: data.fullName,
          address: data.address,
          phoneNumber: data.phoneNumber,
          email: data.email,
          roleId: data.roleId,
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
let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let user = await db.User.findOne({
      where: { id: userId },
    });
    if (!user) {
      resolve({
        errcode: 2,
        errMessage: "the user isn't exist !",
      });
    }
    await db.User.destroy({
      where: { id: userId },
    });
    resolve({
      errcode: 0,
      errMessage: "the user is deleted !",
    });
  });
};
let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errcode: 2,
          errMessage: "Missing required parameter",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.fullName = data.fullName;
        user.address = data.address;
        user.phoneNumber = data.phoneNumber;
        user.email = data.email;
        user.roleId = data.roleId;
        if (data.avatar) {
          user.image = data.avatar;
        }

        user.image = data.avatar;
        await user.save();
        // await db.User.save({
        //     fistName:data.firstName,
        //     lastName:data.lastName,
        //     address:data.address,

        // }); //  muốn không bị lỗi TypeError: user.save is not a function thì vào config.json đổi raw: true --> false  là đc
        resolve({
          errcode: 0,
          errMessage: "update the user succeeds !",
        });
      } else {
        resolve({
          errcode: 1,
          errMessage: "User's not found !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errcode: 1,
          errMessage: "Vui lòng điền đủ Thông tin",
        });
      } else {
        let res = {};
        let allcode = await db.Allcode.findAll({
          where: { type: typeInput },
        });
        res.errcode = 0;
        res.data = allcode;
        resolve(res);
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  CreateNewUser: CreateNewUser,
  deleteUser: deleteUser,
  updateUserData: updateUserData,
  getAllCodeService: getAllCodeService,
};
