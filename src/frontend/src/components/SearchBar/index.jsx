import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";

const SearchBar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.length > 0) {
      navigate({
        pathname: `/product`,
        search: `searchQuery=${search}&page=1`,
      });
      setSearch("");
    } else {
      swal.fire({
        title: "Info",
        text: "Vui lòng nhập từ khóa",
        icon: "info",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <div className="hero__search">
        <div className="hero__search__form" style={{ borderRadius: "5px" }}>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Bạn cần tìm gì?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className="site-btn bg-key"
              style={{
                borderTopRightRadius: "5px",
                borderBottomRightRadius: "5px",
              }}
            >
              Tìm kiếm
            </button>
          </form>
        </div>

        <div className="hero__search__phone">
          <div className="hero__search__phone__icon">
            <i className="fa fa-phone"></i>
          </div>
          <div className="hero__search__phone__text">
            <h6>0933443839</h6>
            <span>Phục vụ 24/7</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
