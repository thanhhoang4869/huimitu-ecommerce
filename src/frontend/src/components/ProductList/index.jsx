import { Avatar, List } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import formatter from "utils/formatter";

import "./style.css";

const ProductList = ({ productList }) => {
  return (
    <List
      dataSource={productList}
      renderItem={(product) => (
        <List.Item key={product.id}>
          <List.Item.Meta
            avatar={
              <Avatar
                className="product-img"
                shape="square"
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                src={product.image}
              />
            }
            title={
              <Link to={`/product/detail/${product.productId}`}>
                {product.variantName}
              </Link>
            }
            description={
              <>
                <p className="product-description">{product.variantName}</p>
                <span className="product-quantity">{`x${product.quantity}`}</span>
              </>
            }
          />
          <span className="color-key">
            {formatter.formatPrice(product.variantPrice * product.quantity)}
          </span>
        </List.Item>
      )}
    ></List>
  );
};

export default ProductList;
