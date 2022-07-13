import Breadcrumb from "components/Breadcrumb";
import ItemHorizonList from "components/ItemHorizonList";
import Paging from "components/Paging";
import { useEffect, useState } from "react";
import {
  useLocation,
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import FilterSection from "components/FilterSection";
import { default as productService } from "services/product";
import swal from "sweetalert2";
import { cleanObj } from "utils/objectUtils";

const ProductResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [category, setCategory] = useState({});
  const [childCategory, setChildCategory] = useState({});
  const [isBigCategory, setIsBigCategory] = useState(false);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [isSearchByCategory, setIsSearchByCategory] = useState();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const [query, setQuery] = useState({
    page: searchParams.get("page"),
    sortType: searchParams.get("sortType"),
    searchQuery: searchParams.get("searchQuery"),
    categoryId: searchParams.get("categoryId"),
    minPrice: searchParams.get("minPrice"),
    maxPrice: searchParams.get("maxPrice"),
  });

  const categoryList = JSON.parse(localStorage.getItem("categoryList"));

  const location = useLocation();
  const navigate = useNavigate();

  const navigateSearch = (query) => {
    const queryClean = cleanObj(query);
    navigate({
      pathname: `/product`,
      search: `${createSearchParams(queryClean)}`,
    });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get("page") || 1;
    const categoryId = searchParams.get("categoryId");
    const searchQuery = searchParams.get("searchQuery");
    const sortType = searchParams.get("sortType");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    const newQuery = {
      page: page,
      sortType: sortType,
      searchQuery: searchQuery,
      categoryId: categoryId,
      minPrice: minPrice,
      maxPrice: maxPrice,
    };
    setIsSearchByCategory(categoryId);
    setQuery(newQuery);
    search(newQuery);
  }, [location]); // eslint-disable-line

  const search = (data) => {
    getCategory(data.categoryId);
    if (data.categoryId) {
      getTotalProductsByCategory(data);
      getProductsByCategory(data);
    } else {
      getTotalProductsBySearch(data);
      getProductsBySearch(data);
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

  const getProductsBySearch = async (data) => {
    try {
      const request = {
        searchQuery: data.searchQuery,
        limit: 6,
        offset: +(data.page - 1) * 6,
        minPrice: data.minPrice,
        maxPrice: data.maxPrice,
        sortType: data.sortType,
      };
      const response = await productService.getProductsBySearchQuery(request);
      setProducts(response.data.products);
    } catch (error) {
      if (error.response.status === 500) {
        navigate("/error");
      } else {
        navigate("/404");
      }
    }
  };

  const getTotalProductsBySearch = async (data) => {
    try {
      const request = {
        searchQuery: data.searchQuery,
        minPrice: data.minPrice,
        maxPrice: data.maxPrice,
      };
      const response = await productService.countBysearchQuery(request);
      setTotal(response.data.count);
    } catch (error) {
      if (error.response.status === 500) {
        navigate("/error");
      } else {
        navigate("/404");
      }
    }
  };

  const getProductsByCategory = async (data) => {
    try {
      const request = {
        categoryId: +data.categoryId,
        limit: 6,
        offset: +(data.page - 1) * 6,
        minPrice: +data.minPrice,
        maxPrice: +data.maxPrice,
        sortType: data.sortType,
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

  const getTotalProductsByCategory = async (data) => {
    try {
      const request = {
        categoryId: +data.categoryId,
        minPrice: +data.minPrice,
        maxPrice: +data.maxPrice,
      };
      const response = await productService.countByCategory(request);
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
    } else if (minPrice >= maxPrice) {
      return swal.fire({
        title: "Error",
        text: "Vui lòng nhập khoảng giá hợp lệ!",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      navigateSearch({
        ...query,
        minPrice: minPrice,
        maxPrice: maxPrice,
      });
    }
  };

  const onPageChange = (page) => {
    navigateSearch({
      ...query,
      page: page,
    });
  };

  const onSortChange = (sortType) => {
    navigateSearch({
      ...query,
      sortType: sortType,
    });
  };

  return (
    <>
      {query.categoryId ? (
        <Breadcrumb
          isBigCategory={isBigCategory}
          category={category}
          childCategory={childCategory}
        />
      ) : (
        <div className="mt-4 mb-4" style={{ marginLeft: "15px" }}>
          <h5 className="text-key">Từ khóa: {query.searchQuery}</h5>
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
