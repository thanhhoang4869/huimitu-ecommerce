import { Avatar, Button, List } from "antd";
import React, { useState }   from "react";
import { Link } from "react-router-dom";
import formatter from "utils/formatter";
import config from "config/config";
import ReviewModal from "components/ReviewModal";


import "./style.css";

const ProductList = ({ productList, order, handleReview }) => {

  const [visibleAdd, setVisibleAdd] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState({});

  const showAddModal = (variant) => {
    setVisibleAdd(true);
    setSelectedVariant(variant);
  };

  const handleAddSuccess = async (values) => {
    const data = {
      orderId: order.id,
      variantId: selectedVariant.id,
      ...values
    }
    handleReview(data);
    console.log("Success:", values);
    setVisibleAdd(false);
  };

  const handleAddCancel = () => {
    setVisibleAdd(false);
  };

  return (
    <>
    <ReviewModal
        title="Title"
        visible={visibleAdd}
        handleSuccess={handleAddSuccess}
        handleCancel={handleAddCancel}
      />
    <List
      dataSource={productList}
      renderItem={(variant) => (
        <List.Item key={variant.id}>
          <List.Item.Meta
            avatar={
              <Avatar
                className="product-img"
                shape="square"
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                src={variant.image}
              />
            }
            title={
              <Link to={`/product/detail/${variant.productId}`}>
                {variant.variantName}
              </Link>
            }
            description={
              <>
                <p className="product-description">{variant.variantName}</p>
                <span className="product-quantity">{`x${variant.quantity}`}</span>
              </>
            }
          />
          <div className="color-key text-right">
            <div className="py-2">
              {formatter.formatPrice(variant.variantPrice * variant.quantity)}
            </div>

            {!variant.reviewed && order.state === config.orderState.SUCCESS && (
              <div>
                <Button type="primary" onClick={() => showAddModal(variant)}>Đánh giá</Button>
              </div>
            )}
          </div>
        </List.Item>
      )}
    ></List>
    </>
  );
};

export default ProductList;
