import React, { useState, useEffect } from "react";

import { PhoneCard } from "./PhoneCard";
import "./Phone.css";
import { useParams } from "react-router-dom";
import { getAllCategories} from "../../userService";
export const Phone = ({ addToCart }) => {

  const { id } = useParams();

  const [arrCategories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategoriesReact();
  }, []);

  const getAllCategoriesReact = async () => {
    let response = await getAllCategories(id);
    if (response && response.errcode === 0) {
      setCategories(response.categories);
    }
  };




  
  return (
    <>
      <section className="flash">
        <div className="container">
          <div className="heading-p">

            {id&&id==20?<h1>Tất cả sản phẩm</h1>:<h1>Sản phẩm về {arrCategories.name}</h1>}
            
          </div>
         
         <div>
         <PhoneCard  addToCart={addToCart} />
         </div>
        
        </div>
      </section>
    </>
  );
};
