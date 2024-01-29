import ProductManager from "./CRUD_Products/ProductManager";
import "./Admin.scss";
import { DashBoard } from "./Components/DashBoard";
import { Header } from "./Components/Header";
export const ProductAdmin = () => {
  return (
    <>
      <div className="admin">
        <Header />

        <div className="main--content d_flex">
          <div>
            <DashBoard />
          </div>

          <div className="user_manage">
            <ProductManager />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductAdmin;
