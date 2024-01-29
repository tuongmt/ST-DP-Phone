
import UserManage from "./CRUD_User/UserManage";
import "./Admin.scss";
import { DashBoard } from "./Components/DashBoard";
import { Header } from "./Components/Header";
export const IndexAdmin = () => {
  return (
    <>
    
      <div className="admin">
      <Header />
        
        <div className="main--content d_flex">
        <div>
        <DashBoard />
        </div>
        <div className="user_manage">
        <UserManage/>
        </div>
          
        </div>
        
      </div>
     
    </>
  );
};

export default IndexAdmin;
