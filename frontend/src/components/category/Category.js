import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ClearError,
  getCategorie,
} from "../../actions/ProductAction";
import ProductCard from "../home/assets/ProductCard";
import Loader from "../layout/loader/Loader";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import { FaAlignLeft } from "react-icons/fa6";
import Asidebar from "../layout/aside/Asidebar";
import ErrorPage from "../404Page/ErrorPage";
import { getAllCategories } from "../../actions/CategoreAction";
const Category = () => {

  const { category } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const {
    loading: catLoading,
    allcategroes,
    error: caterror,
  } = useSelector((state) => state.allCategroe);

  const { loding, products, productsCount, error, resultPerPage } = useSelector(
    (state) => state.catProducts
  );
  
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  //this use state for mob
  const [sideBarActive, setsideBarActive] = useState(false);

  //current page
  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const categoriesHeandler = (e) => {   
    setsideBarActive(false);
  };

  // Rating filter
  const [ratings, setRatings] = useState(0);
  const ratingsHeandle = (e, newRatings) => {
    setRatings(newRatings);
  };

  //current price
  const [price, setPrice] = useState([0, 25000]);
  const priceHeandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  //clear all filter

  const [clearFilter, setClearFilter] = useState(false);

  const clearFilterHeandler = (e) => {
    setCurrentPage(1);
    setPrice([0, 25000]);
    setRatings(0);
    setClearFilter(true);
    setsideBarActive(false);
  };

  const mobFillterFun = () => {
    setsideBarActive(!sideBarActive);
  };

  //---------- filter categore by url
  const catArray = [...allcategroes];
  const cat = catArray.find((item) => item.slug === category);

  const isValidCategory = cat && cat;

  //---------- filter categore by url -- end
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError);
    }
    if (clearFilter) {
      setClearFilter(false);

      //   dispatch(getProduct(currentPage, price, categorie,subcategory, ratings));
      dispatch(getCategorie(currentPage, price, cat && cat._id, ratings));
    }

    dispatch(getAllCategories());
    dispatch(getCategorie(currentPage, price, cat && cat._id, ratings));
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch, category, alert, currentPage, error, price, ratings]);

  // let productCategory = "";
  // if (products) {
  //   for (let i = 0; i < products.length; i++) {
  //     productCategory = products[0].category;
  //   }
  // }

  return (
    <>
      {!isValidCategory ? (
        <ErrorPage />
      ) : (
        <>
          {/* <MetaData
            title={productCategory}
            content={productCategory}
            keywords={productCategory}
          /> */}
          {/* <MetaData title={'Product'} /> */}
          <section className="section-cont">
            <div className="product-cont-row shop-page">
              <div id="prod-cont" className="prod-cont cont-area-h">
                <aside
                  className={`aside-bar-cont  ${
                    sideBarActive ? "sidebar-active" : ""
                  }`}
                >
                  <div className="sidebar-cont">
                    <div className="side-bar">
                      <Asidebar
                        price={price} // filter price input slider
                        inputevent={priceHeandler} // filter price event handler
                        // categories={categories} // filter  categories
                        categoriesHeandler={categoriesHeandler} // filter event categoriesHeandler
                        ratingsHeandle={ratingsHeandle} //Rating filter input handler
                        ratings={ratings} // rating filter
                        clearFilterHeandler={clearFilterHeandler} //clearFilterHeandler filter input handler
                        clearFilter={clearFilter} // clearFilterHeandler usestate
                      />
                    </div>
                  </div>
                </aside>
                {windowWidth < 900 ? (
                  <div className="mob-filter">
                    <p onClick={mobFillterFun}>
                      <FaAlignLeft /> Filter
                    </p>
                  </div>
                ) : (
                  <div></div>
                )}
                <div className="prod-cont-row p-sho-cont">
                  {loding ? (
                    <Loader />
                  ) : (
                    <>
                      {products &&
                        products.filter(item=>item.productstatus===true).map((product, i) => (
                          <ProductCard key={product._id} product={product} />
                        ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>

          {resultPerPage < productsCount && (
            <div className="pagination-box">
              <Pagination
                totalItemsCount={productsCount}
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-items"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Category;
