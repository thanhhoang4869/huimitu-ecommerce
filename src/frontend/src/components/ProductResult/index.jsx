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
  const [categoryId, setCategoryId] = useState(1);
  const categoryList = JSON.parse(localStorage.getItem("categoryList"));
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setCategoryId(+location.pathname.split("/")[2]);
    getCategory(categoryId);
    getProducts(categoryId);
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

  const getProducts = async () => {
    try {
      const request = {
        categoryId: +categoryId,
        limit: 6,
        offset: 0,
      };
      const response = await productService.getProductsByCategory(request);
      const products = response.data.products;
      setProducts(products);
      console.log(response.data.products);
    } catch (error) {
      if (error.response.status === 500) {
        navigate("/error");
      } else {
        navigate("/404");
      }
    }
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
          <ItemHorizonList isResult={true} />
          <div style={{ textAlign: "end" }}>
            <Paging />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductResult;
