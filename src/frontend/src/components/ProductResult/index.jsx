import Breadcrumb from "components/Breadcrumb";
import ItemHorizonList from "components/ItemHorizonList";
import Paging from "components/Paging";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { default as productService } from "services/product";

const ProductResult = () => {
  const [category, setCategory] = useState({});
  const [childCategory, setChildCategory] = useState({});
  const [isBigCategory, setIsBigCategory] = useState(false);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const categoryList = JSON.parse(localStorage.getItem("categoryList"));

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get("page");
    getCategory(+location.pathname.split("/")[2]);
    getProducts(+location.pathname.split("/")[2], page);
    getTotalProduct(+location.pathname.split("/")[2]);
  }, [location]); // eslint-disable-line

  const getCategory = (categoryId) => {
    for (let category in categoryList) {
      if (+categoryList[category].id === +categoryId) {
        setIsBigCategory(true);
        setCategory(categoryList[category]);
      } else {
        const children = categoryList[category].children;
        for (let index in children) {
          if (+children[index].id === +categoryId) {
            setIsBigCategory(false);
            setCategory(categoryList[category]);
            setChildCategory(children[index]);
          }
        }
      }
    }
  };

  const getProducts = async (categoryId, page) => {
    try {
      const request = {
        categoryId: +categoryId,
        limit: 6,
        offset: +(page - 1) * 6,
      };
      const response = await productService.getProductsByCategory(request);
      setProducts(response.data.products);
      console.log("Result page: ", response.data.products);
    } catch (error) {
      if (error.response.status === 500) {
        navigate("/error");
      } else {
        navigate("/404");
      }
    }
  };

  const getTotalProduct = async (categoryId) => {
    try {
      const response = await productService.countByCategory(categoryId);
      setTotal(response.data.count);
    } catch (error) {
      if (error.response.status === 500) {
        navigate("/error");
      } else {
        navigate("/404");
      }
    }
  };

  const onPageChange = (page) => {
    navigate({
      pathname: `/category/${category.id}`,
      search: `?page=${page}`,
    });
  };

  return (
    <>
      <Breadcrumb
        isBigCategory={isBigCategory}
        category={category}
        childCategory={childCategory}
      />
      <section className="mb-3 mt-3">
        <div className="container">
          {/* <div className="row">
            <div className="section-title">
              <h4>Result</h4>
            </div>
          </div> */}
          {products.length > 0 ? (
            <>
              <ItemHorizonList products={products} isResult={true} />
              <div style={{ textAlign: "end" }}>
                <Paging total={total} onPageChange={onPageChange} />
              </div>
            </>
          ) : (
            <>
              <div style={{ height: "50vh" }}>Không có sản phẩm.</div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductResult;
