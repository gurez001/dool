import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import LatestProducts from "./assets/LatestProducts";
import PopularProduct from "./assets/PopularProduct";

const SaleSection = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loding, error, products, newproducts } = useSelector(
    (state) => state.products
  );
  console.log(products);
  const { error: fProductError,product:t_s_product } = useSelector((state) => state.productFeature);

  return (
    <>
      <section id="homepage" className="section-cont">
        <div className="containor">
          <div>
            <LatestProducts products={products} />
          </div>
          <div>
            <PopularProduct products={t_s_product} />
          </div>
        </div>
      </section>
    </>
  );
};

export default SaleSection;
