import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllCategories } from "../../userService";
import { Buffer } from "buffer";

export const Categories = () => {
  const [arrCategories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategoriesReact();
  }, []);

  const getAllCategoriesReact = async () => {
    let response = await getAllCategories("ALL");
    if (response && response.errcode === 0) {
      // Assuming the response.categories is an array
      setCategories(response.categories);

      // Move element at index 5 to the beginning
      if (response.categories.length >= 6) {
        const newArrCategories = [...response.categories];
        const elementToMove = newArrCategories.splice(4, 1)[0];
        newArrCategories.unshift(elementToMove);
        setCategories(newArrCategories);
      }
    }
  };

  return (
    <>
      <div className="category">
        {arrCategories.map((value, index) => {
          let imageBase64 = '';
          if (value.image) {
            imageBase64 = Buffer.from(value.image, 'base64').toString('binary');
          }
          console.log(imageBase64);

          let toPath = "/phone";
          toPath = `${toPath}/${value.id}`;

          return (
            <Link to={toPath} key={value.id}>
              <div className="box f_flex">
                <img src={imageBase64} alt={`Category ${index + 1}`} />
                <span>{value.name}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};
