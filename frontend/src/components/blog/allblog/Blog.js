import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClearError, GetBlogPost } from "../../../actions/BlogPostAction";
import { useAlert } from "react-alert";
import BlogPostCards from "./BlogPostCards";
import BlogCategory from "./BlogCategory";
import { GetBlogCategory } from "../../../actions/BlogCategoryAction";
import Loader from "../../layout/loader/Loader";

function Blog() {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, blog, error } = useSelector((state) => state.allBlog);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    dispatch(GetBlogPost());
    dispatch(GetBlogCategory());
  }, [dispatch, alert, error]);
  return (
    <>
      <div className="cont-area-h">
        <div className="cont-row">
          <div className="blog-left">
            <div id="blog-cards" className="blog-row">
              {loading ? (
                <Loader />
              ) : (
                <>
                  {blog.map((item, i) => (
                    <div key={i} className="blog-post">
                      {/* <NavLink  to={`/blog/${item.slug}`}> */}
                      <BlogPostCards item={item} />
                      {/* </NavLink> */}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
          <div className="blog-right">
            <div className="right-row">
              <h2>Blog category</h2>
              <BlogCategory />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Blog;
