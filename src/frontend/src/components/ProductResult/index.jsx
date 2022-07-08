import Breadcrumb from "components/Breadcrumb";
import ItemHorizonList from "components/ItemHorizonList";
import Paging from "components/Paging";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ProductResult = () => {
  const location = useLocation();
  const [category, setCategory] = useState({});
  const [childCategory, setChildCategory] = useState({});
  const categoryList = JSON.parse(localStorage.getItem("categoryList"));

  useEffect(() => {
    const categoryId = window.location.pathname.split("/")[2];
    for (let category in categoryList) {
      const children = categoryList[category].children;
      for (let child in children) {
        if (+children[child].id === +categoryId) {
          setCategory(categoryList[category]);
          setChildCategory(children[child]);
        }
      }
    }
  }, [window.location.pathname]);

  return (
    <>
      <Breadcrumb category={category} childCategory={childCategory} />
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
