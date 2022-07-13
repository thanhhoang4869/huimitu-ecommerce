import Breadcrumb from "components/Breadcrumb";
import ItemHorizonList from "components/ItemHorizonList";
import Paging from "components/Paging";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import FilterSection from "components/FilterSection";
import { default as productService } from "services/product";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSearchBaseQuery, setCurrentSearchBaseQuery] = useState("");

  const categoryList = JSON.parse(localStorage.getItem("categoryList"));

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get("page") || 1;
    const categoryId = searchParams.get("category");
    const searchQueryParam = searchParams.get("searchQuery");
    const sortType = searchParams.get("sortType") || "asc";

    setIsSearchByCategory(categoryId);

    if (categoryId) {
      searchByCategory(categoryId, sortType, page);
      setCurrentSearchBaseQuery(`?category=${categoryId}`);
    } else if (searchQueryParam) {
      setSearchQuery(searchQueryParam);
      searchBySearchQuery(searchQueryParam, sortType, page);
      setCurrentSearchBaseQuery(`?searchQuery=${searchQueryParam}`);
    }
  }, [location]); // eslint-disable-line

  const searchBySearchQuery = (searchQuery, sortType, page) => {
    getProductsBySearchQuery(searchQuery, sortType, page);
    getTotalProductBysearchQuery(searchQuery);
  };

  const searchByCategory = (categoryId, sortType, page) => {
    getCategory(categoryId);
    getProductsByCategory(categoryId, sortType, page);
    getTotalProductByCategory(categoryId);
  };

  const getProductsBySearchQuery = async (searchQuery, sortType, page) => {
    try {
      const request = {
        searchQuery: searchQuery,
        limit: 6,
        offset: +(page - 1) * 6,
        sortType: sortType,
      };
      const response = await productService.getProductsBySearchQuery(request);
      console.log(response.data.products);
      setProducts(response.data.products);
    } catch (error) {
      if (error.response.status === 500) {
        navigate("/error");
      } else {
        navigate("/404");
      }
    }
  };

  const getTotalProductBysearchQuery = async (searchQuery) => {
    try {
      const response = await productService.countBysearchQuery(searchQuery);
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

  const getProductsByCategory = async (categoryId, sortType, page) => {
    try {
      const request = {
        categoryId: +categoryId,
        limit: 6,
        offset: +(page - 1) * 6,
        sortType: sortType,
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
      pathname: `/product`,
      search: `${currentSearchBaseQuery}&page=${page}`,
    });
  };

  const onSortChange = (sortType) => {
    setCurrentSearchBaseQuery(
      `?${currentSearchBaseQuery}&sortType=${sortType}`
    );
    navigate({
      pathname: `/product`,
      search: `${currentSearchBaseQuery}&sort=${sortType}`,
    });
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
          <h5 className="text-key">Từ khóa: {searchQuery}</h5>
        </div>
      )}

      <section className="mb-3 mt-3">
        <div className="container">
          <div style={{ marginBottom: "40px" }}>
            <FilterSection
              onSortChange={onSortChange}
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMinPrice={onMinPriceChange}
              setMaxPrice={onMaxPriceChange}
              onFilter={handleFilter}
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
