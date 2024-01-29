import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRouters from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors";

require('dotenv').config();

let app = express();

// Sử dụng middleware cors
app.use(cors({
  origin: [process.env.URL_REACT, process.env.URL_REACT2], // Cho phép truy cập từ danh sách các domain được xác định trong biến môi trường
  methods: "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  credentials: true,
  allowedHeaders: "X-Requested-With,content-type",
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

viewEngine(app);
initWebRouters(app);
connectDB();

let port = process.env.PORT || 6969;
app.listen(port, () => {
  console.log("Backend Nodejs is running on the port: " + port);
});
