import React from "react";
import Cards2 from "./Cards/Cards2";

const LatestProducts = ({ products }) => {
  return (
    <>
    <div className="title">
    <h2>Latest Products</h2>
    </div>
      {products &&
        products
          .slice(0, 5)
          .filter((item) => item.productstatus === true)
          .map((product, i) => (
            <div key={i}>
              <Cards2 key={product._id} product={product} />
            </div>
          ))}
    </>
  );
};

export default LatestProducts;
