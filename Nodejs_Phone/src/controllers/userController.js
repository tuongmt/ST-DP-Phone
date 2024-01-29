import userSevices from "../services/userServices";

let handleLogin = async (req, res) => {
  let taikhoan = req.body.taikhoan;
  let password = req.body.password;
  //check taikhoan exist
  if (!taikhoan || !password) {
    return res.status(500).json({
      errcode: 1,
      message: "vui lòng điền đầy đủ thông tin",
    });
  }

  //compare password

  // return userInfor
  //access_token:jWT JSON web token
  let userData = await userSevices.handleUserLogin(taikhoan, password);
  console.log(userData);
  return res.status(200).json({
    errcode: userData.errcode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {}, // check trên api in ra
  });
};
let handleGetAllUser = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing require parameters",
      users: [],
    });
  }
  let users = await userSevices.getAllUsers(id);
  return res.status(200).json({
    errcode: 0,
    errMessage: "OK",
    users,
  });
};
let handleCreateNewUser = async (req, res) => {
  let message = await userSevices.CreateNewUser(req.body);
  console.log(message);
  return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing required parameters !",
    });
  }
  let message = await userSevices.deleteUser(req.body.id);
  console.log(message);
  return res.status(200).json(message);
};
let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userSevices.updateUserData(data);
  return res.status(200).json(message);
};

let getAllCode = async (req, res) => {
  try {
    let data = await userSevices.getAllCodeService(req.query.type);
    return res.status(200).json(data);
  } catch (e) {
    console.log("get allcode error", e);
    return res.status(200).json({
      errcode: -1,
      errMessage: "Error from sever",
    });
  }
};

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUser: handleGetAllUser,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
  getAllCode: getAllCode,
};
