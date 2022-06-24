import React from 'react'

const BestSellerItem = ({product}) => {
    return (
        <div className="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat">
            <div className="featured__item">
                <div
                    className="featured__item__pic set-bg"
                    data-setbg={product.img}
                >
                    <ul className="featured__item__pic__hover">
                        <li>
                            <a href="#">
                                <i className="fa fa-heart"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-retweet"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-shopping-cart"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="featured__item__text">
                    <h6>
                        <a href="#">{product.name}</a>
                    </h6>
                    <h5>{`$${product.price.toFixed(2)}`}</h5>
                </div>
            </div>
        </div>

    )
}

export default BestSellerItem