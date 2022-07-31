import { Avatar, Button, List } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import formatter from "utils/formatter";
import config from "config/config";
import ReviewModal from "components/ReviewModal";

import "./style.css";

const OrderVariantList = ({ order, handleReview }) => {
  const [visibleReview, setVisibleReview] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState({});

  const showReviewModal = (variant) => {
    setVisibleReview(true);
    setSelectedVariant(variant);
  };

  const handleReviewSuccess = async (values) => {
    const data = {
      orderId: order.id,
      variantId: selectedVariant.id,
      ...values,
    };
    handleReview(data);
    setVisibleReview(false);
  };

  const handleReviewCancel = () => {
    setVisibleReview(false);
  };

  return (
    <>
      <ReviewModal
        title="Đánh giá"
        visible={visibleReview}
        handleSuccess={handleReviewSuccess}
        handleCancel={handleReviewCancel}
      />
      <List
        dataSource={order?.variants || []}
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

              {!variant.reviewed &&
                order.state === config.orderState.SUCCESS &&
                handleReview && (
                  <div>
                    <Button
                      type="primary"
                      onClick={() => showReviewModal(variant)}
                    >
                      Đánh giá
                    </Button>
                  </div>
                )}
            </div>
          </List.Item>
        )}
      ></List>
    </>
  );
};

export default OrderVariantList;
