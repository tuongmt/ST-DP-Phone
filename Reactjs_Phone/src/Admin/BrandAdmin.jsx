import BrandManager from "./CRUD_Brand/BrandManager";
import "./Admin.scss";
import { DashBoard } from "./Components/DashBoard";
import { Header } from "./Components/Header";
export const BrandAdmin = () => {
  return (
    <>
    <div className="admin">
        <Header />
        <div className="main--content d_flex">
          <div>
            <DashBoard />
          </div>
          <div className="user_manage">
          <BrandManager/>
          </div>
        </div>
      </div>
     
    </>
  );
};

export default BrandAdmin;
