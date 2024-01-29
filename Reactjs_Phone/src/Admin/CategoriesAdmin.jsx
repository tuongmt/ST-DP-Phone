import CategoriesManager from "./CRUD_Categories/CategoriesManager";
import "./Admin.scss";
import { DashBoard } from "./Components/DashBoard";
import { Header } from "./Components/Header";
export const CategoriesAdmin = () => {
  return (
    <>
      <div className="admin">
        <Header />
        <div className="main--content d_flex">
          <div>
            <DashBoard />
          </div>
          <div className="user_manage">
            <CategoriesManager />
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesAdmin;
