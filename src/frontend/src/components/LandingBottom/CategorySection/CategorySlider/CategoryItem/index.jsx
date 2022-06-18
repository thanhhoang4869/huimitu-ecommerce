import React from 'react'

const CategoryItem = ({product}) => {
  return (
    <div className="col-lg-3">
        <div
        className="categories__item set-bg"
        data-setbg={product.img}
        >
            <h5>
                <a href="#">{product.name}</a>
            </h5>
        </div>
  </div>
  )
}

export default CategoryItem