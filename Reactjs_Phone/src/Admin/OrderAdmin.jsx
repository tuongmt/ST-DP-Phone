import OrderManager from "./Manager_Order/OrderManager";
import "./Admin.scss";
import { DashBoard } from "./Components/DashBoard";
import { Header } from "./Components/Header";
export const OrderAdmin = () => {
  return (
    <>
    
      <div className="admin">
      <Header />
        
        <div className="main--content d_flex">
          <div>
        <DashBoard />
        </div>
        <div className="user_manage">
        <OrderManager/>
        </div>
        </div>
        
      </div>
     
    </>
  );
};

export default OrderAdmin;
