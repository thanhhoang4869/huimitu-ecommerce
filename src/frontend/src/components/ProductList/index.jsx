import { Avatar, List } from "antd";
import React from "react";
import formatter from "utils/formatter";

import "./style.css";

const ProductList = ({ productList }) => {
  return (
    <List
      dataSource={productList}
     
      renderItem={(product) => (
        <List.Item key={product.variant_id}>
          <List.Item.Meta
            avatar={
              <Avatar
                className="product-img"
                shape="square"
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                src="https://5.imimg.com/data5/MS/HP/ON/SELLER-40186332/garden-planters-500x500.jpg"
              />
            }
            title={<a href="https://ant.design">{product.productName}</a>}
            description={
              <>
                <p className="product-description">
                  {
                    "Ant Design, a design language for background applications, is refined by Ant UED Team"
                  }
                </p>
                <span className="product-quantity">{"x1"}</span>
              </>
            }
          />
          <span className="color-key">{formatter.formatPrice(product.price)}</span>
        </List.Item>
      )}
    ></List>
  );
};

export default ProductList;
