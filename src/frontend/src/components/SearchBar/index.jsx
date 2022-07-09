import React, { useState } from "react";
import swal from "sweetalert2";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const onClick = () => {
    if (search.length > 0) {
      alert(search);
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
          <form>
            {/* <div className="hero__search__categories">
              Tất cả
              <span className="arrow_carrot-down"></span>
            </div> */}
            <input
              type="text"
              placeholder="Bạn cần tìm gì?"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="button"
              onClick={onClick}
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
