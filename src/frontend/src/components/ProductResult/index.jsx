import Breadcrumb from "components/Breadcrumb";
import ItemHorizonList from "components/ItemHorizonList";
import Paging from "components/Paging";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ProductResult = () => {
  const [category, setCategory] = useState({});
  const [childCategory, setChildCategory] = useState({});
  const [isBigCategory, setIsBigCategory] = useState(false);
  const categoryList = JSON.parse(localStorage.getItem("categoryList"));
  const location = useLocation();

  useEffect(() => {
    const categoryId = location.pathname.split("/")[2];

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
  }, [location]); // eslint-disable-line

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
