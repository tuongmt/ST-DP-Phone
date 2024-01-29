import React from "react";
import { Home } from "../component/MainPage/Home";
import { FlashDeals } from "../component/flashDeals/FlashDeals";
import { TopCate } from "../component/top/TopCate";
import { NewArrivals } from "../component/newarrivals/NewArrivals";
import { Discount } from "../component/discount/Discount";
import { Shop } from "../component/shop/Shop";
import { Anno } from "../component/announcements/Anno";
import { Wrapper } from "../component/wrapper/Wrapper";

export const Pages = ({
  productItems,
  cartItem,
  addToCart,
  shopItems,
  itemDetail,
}) => {
  return (
    <>
      <Home cartItem={cartItem} />
      <FlashDeals
        productItems={productItems}
        addToCart={addToCart}
        itemDetail={itemDetail}
      />
      {/* <TopCate />
      <NewArrivals />
      <Discount />
      <Shop
        shopItems={shopItems}
        addToCart={addToCart}
        itemDetail={itemDetail}
      />
      <Anno /> */}
      <Wrapper />
    </>
  );
};
