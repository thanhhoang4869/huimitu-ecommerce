import ProductResult from "components/ProductResult";
import Banner from "../Banner";
import CategoryBar from "../CategoryBar";
import SearchBar from "../SearchBar";

import { useLocation } from "react-router-dom";

const LandingTop = (props) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  return (
    <section className="hero">
      <div className="container">
        <div className="row">
          <CategoryBar categoryList={props.categoryList} />
          <div className="col-lg-9">
            <SearchBar />
            {searchParams.get("categoryId") || searchParams.get("searchQuery") ? (
              <ProductResult />
            ) : (
              <Banner />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingTop;
