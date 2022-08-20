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
import { min } from "moment";

import i18n from "lang/i18n";
import { useTranslation } from "react-i18next";

const ProductResult = () => {
  const { t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language"));
  }, []);

  const [searchParams] = useSearchParams();

  const [category, setCategory] = useState({});
  const [childCategory, setChildCategory] = useState({});
  const [isBigCategory, setIsBigCategory] = useState(false);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
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

    console.log(minPrice, minPrice == null);

    const newQuery = {
      sortType: sortType,
      searchQuery: searchQuery,
      categoryId: categoryId,
      page: page,
      minPrice: minPrice == null ? undefined : +minPrice,
      maxPrice: minPrice == null ? undefined : +maxPrice,
    };
    const newRequest = {
      ...newQuery,
      limit: 6,
      offset: +(page - 1) * 6,
    };
    setQuery(newQuery);
    search(newRequest);
  }, [location]); // eslint-disable-line

  const search = (data) => {
    getCategory(data.categoryId);
    if (data.searchQuery) {
      getTotalProductsBySearch(data);
      getProductsBySearch(data);
    } else {
      getTotalProducts(data);
      getProducts(data);
    }
  };

  const getCategory = (categoryId) => {
    try {
      if (!categoryId) {
        setIsBigCategory(false);
        return;
      }

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
              break;
            }
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getProductsBySearch = async (query) => {
    try {
      const response = await productService.getProductsBySearchQuery(query);
      setProducts(response.data.products);
    } catch (err) {
      console.error(err);
    }
  };

  const getTotalProductsBySearch = async (query) => {
    try {
      const response = await productService.countBysearchQuery(query);
      setTotal(response.data.count);
    } catch (err) {
      console.error(err);
    }
  };

  const getProducts = async (query) => {
    try {
      const response = await productService.getProducts(query);
      setProducts(response.data.products);
    } catch (err) {
      console.error(err);
    }
  };

  const getTotalProducts = async (query) => {
    try {
      const response = await productService.countProducts(query);
      setTotal(response.data.count);
    } catch (err) {
      console.error(err);
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
        text: t("productResult.pleaseEnterPrice"),
        icon: "error",
        confirmButtonText: "OK",
      });
    } else if (minPrice >= maxPrice) {
      return swal.fire({
        title: "Error",
        text: t("productResult.pleaseEnterValidPrice"),
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
    if (sortType === "default") {
      sortType = null;
    }
    navigateSearch({
      ...query,
      sortType: sortType,
    });
  };

  return (
    <>
      {query.categoryId && (
        <Breadcrumb
          isBigCategory={isBigCategory}
          category={category}
          childCategory={childCategory}
        />
      )}
      {query.searchQuery && (
        <div className="mt-4 mb-4" style={{ marginLeft: "15px" }}>
          <h5 className="text-key">{t("productResult.keyword") + ": "} {query.searchQuery}</h5>
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
                <Paging
                  total={total}
                  onPageChange={onPageChange}
                  current={+query.page}
                />
              </div>
            </>
          ) : (
            <>
              <div style={{ height: "50vh" }}>{t("productResult.notFound")}</div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductResult;
