import React from 'react'
import CategoryItem from './CategoryItem'



const CategorySlider = () => {
  //Some fake data to test
  var products = [
    {
      id: 0,
      name: "Decorating tools",
      img: "assets/img/categories/cat-1.jpg"
    },
    {
      id: 1,
      name: "Bakeware & Cookware",
      img: "assets/img/categories/cat-2.jpg"
    },
    {
      id: 2,
      name: "Kitchen tools",
      img: "assets/img/categories/cat-3.jpg"
    },
    {
      id: 3,
      name: "Bags & Tips",
      img: "assets/img/categories/cat-4.jpg"
    },
    {
      id: 4,
      name: "Cookie cutter",
      img: "assets/img/categories/cat-5.jpg"
    },
    {
      id: 5,
      name: "Cupcake & Muffin pan",
      img: "assets/img/categories/cat-6.jpg"
    },
    {
      id: 6,
      name: "Cookie sheets",
      img: "assets/img/categories/cat-7.jpg"
    },
    {
      id: 6,
      name: "Speciality cookware",
      img: "assets/img/categories/cat-8.jpg"
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

