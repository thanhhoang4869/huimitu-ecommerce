import React from 'react'
import CategoryItem from './CategoryItem'



const CategorySlider = () => {
  //Some fake data to test
  var products = [
    {
      id: 0,
      name: "Cupcake mould",
      img: ""
    },
    {
      id: 1,
      name: "Round mould",
      img: ""
    },
    {
      id: 2,
      name: "Heart mould",
      img: ""
    }
  ]

  return (
    <div class="categories__slider owl-carousel">
      {
        products.map((product) => {
          return <CategoryItem key={product.id} product={product}/>
        })
      }
    </div>
  )
}

export default CategorySlider

