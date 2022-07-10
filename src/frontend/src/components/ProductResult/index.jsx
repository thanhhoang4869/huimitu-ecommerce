import Breadcrumb from "components/Breadcrumb";
import ItemHorizonList from "components/ItemHorizonList";
import Paging from "components/Paging";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { default as productService } from "services/product";
import FilterSection from "components/FilterSection";
import swal from "sweetalert2";

const ProductResult = () => {
  const [category, setCategory] = useState({});
  const [childCategory, setChildCategory] = useState({});
  const [isBigCategory, setIsBigCategory] = useState(false);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [isSearchByCategory, setIsSearchByCategory] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [keyword, setKeyword] = useState("");

  const categoryList = JSON.parse(localStorage.getItem("categoryList"));

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get("page");
    const categoryId = searchParams.get("category");
    const keywordParam = searchParams.get("keyword");

    setIsSearchByCategory(categoryId);

    if (categoryId) {
      searchByCategory(categoryId, page);
    } else if (keywordParam) {
      setKeyword(keywordParam);
      searchByKeyword(keywordParam, page);
    }
  }, [location]); // eslint-disable-line

  const searchByKeyword = (keyword, page) => {
    getProductsByKeyword(keyword, page);
    getTotalProductByKeyword(keyword);
  };

  const searchByCategory = (categoryId, page) => {
    getCategory(categoryId);
    getProductsByCategory(categoryId, page);
    getTotalProductByCategory(categoryId);
  };

  const getProductsByKeyword = async (keyword, page) => {
    try {
      const request = {
        keyword,
        limit: 6,
        offset: +(page - 1) * 6,
      };
      const response = await productService.getProductsByKeyword(request);
      setProducts(response.data.products);
    } catch (error) {
      if (error.response.status === 500) {
        navigate("/error");
      } else {
        navigate("/404");
      }
    }
  };

  const getTotalProductByKeyword = async (keyword) => {
    try {
      const response = await productService.countByKeyword(keyword);
      setTotal(response.data.count);
    } catch (error) {
      if (error.response.status === 500) {
        navigate("/error");
      } else {
        navigate("/404");
      }
    }
  };

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

  const getProductsByCategory = async (categoryId, page) => {
    try {
      const request = {
        categoryId: +categoryId,
        limit: 6,
        offset: +(page - 1) * 6,
      };
      const response = await productService.getProductsByCategory(request);
      setProducts(response.data.products);
    } catch (error) {
      if (error.response.status === 500) {
        navigate("/error");
      } else {
        navigate("/404");
      }
    }
  };

  const getTotalProductByCategory = async (categoryId) => {
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

  const onMinPriceChange = (value) => {
    setMinPrice(value);
  };

  const onMaxPriceChange = (value) => {
    setMaxPrice(value);
  };

  const handleFilter = async () => {
    if (!minPrice && !maxPrice) {
      return swal.fire({
        title: "Error",
        text: "Vui lòng nhập khoảng giá!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
    if (minPrice >= maxPrice) {
      return swal.fire({
        title: "Error",
        text: "Vui lòng nhập khoảng giá hợp lệ!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
    console.log("min", minPrice);
    console.log("max", maxPrice);
  };

  const onPageChange = (page) => {
    navigate({
      pathname: `/category/${category.id}`,
      search: `?page=${page}`,
    });
  };

  const mapCategoriesToLinearList = (categoryList) => {
    if (!categoryList) {
      return [];
    }

    let linearList = [];
    for (let category in categoryList) {
      const { children, ...rest } = categoryList[category];
      linearList.push(rest);

      const result = mapCategoriesToLinearList(children);
      linearList = linearList.concat(result);
    }
    return linearList;
  };

  return (
    <>
      {isSearchByCategory ? (
        <Breadcrumb
          isBigCategory={isBigCategory}
          category={category}
          childCategory={childCategory}
        />
      ) : (
        <div className="mt-4 mb-4" style={{ marginLeft: "15px" }}>
          <h5 className="text-key">Từ khóa: {keyword}</h5>
        </div>
      )}

      <section className="mb-3 mt-3">
        <div className="container">
          <div style={{ marginBottom: "40px" }}>
            <FilterSection
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMinPrice={onMinPriceChange}
              setMaxPrice={onMaxPriceChange}
              onFilter={handleFilter}
              disableSelect={isSearchByCategory}
              categoryList={mapCategoriesToLinearList(categoryList)}
            />
          </div>

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
