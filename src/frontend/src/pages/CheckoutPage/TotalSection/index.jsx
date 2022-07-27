import { Input, Button } from "antd";
import MyPaypalButton from "components/MyPaypalButton";
import "./style.css";
import formatter from "utils/formatter";
import { Link } from "react-router-dom";

const { Search } = Input;

const TotalSection = (props) => {
  const paymentId = props.paymentId;
  const variants = props.variants || [];
  const voucherCode = props.voucherCode;
  const handleApplyVoucherCode = props.handleApplyVoucherCode;
  const shippingAddressId = props.shippingAddressId;
  const receiverName = props.receiverName;
  const receiverPhone = props.receiverPhone;

  const totalPrice = props.totalPrice || 0;
  const shippingPrice = props.shippingPrice || 0;
  const discountPrice = props.discountPrice || 0;
  const finalPrice = props.finalPrice || 0;

  const handleCheckout = props.handleCheckout;
  const loading = props.loading;

  return (
    <div className="col-md-5 order-md-2 mb-4">
      <div className="cart p-3">
        <div className="d-flex medium semi-thick justify-content-between align-items-center mb-3">
          <span>Đơn hàng</span>
        </div>
        <ul className="list-group mb-3">
          {variants.map((item) => (
            <li className="list-group-item d-flex justify-content-between">
              <div>
                <Link to={`/product/detail/${item.productId}`}>
                  <h6 className="my-0 name">{item.variantName}</h6>
                </Link>
                <small className="text-muted">x{item.quantity}</small>
              </div>
              <span className="text-muted">
                {formatter.formatPrice(
                  (item.discountPrice || item.price) * item.quantity
                )}
              </span>
            </li>
          ))}

          {voucherCode && (
            <li className="list-group-item d-flex justify-content-between">
              <div>
                <div className="my-0 text-key">Mã voucher</div>
                <small className="text-orange semi-thick">{voucherCode}</small>
              </div>
              <span className="text-orange semi-thick">
                -{formatter.formatPrice(discountPrice)}
              </span>
            </li>
          )}

          <li className="list-group-item">
            <li className="text-muted mb-2 d-flex justify-content-between">
              <span>Tổng tiền sản phẩm</span>
              <span>{formatter.formatPrice(totalPrice)}</span>
            </li>
            <li className="text-muted mb-2 d-flex justify-content-between">
              <span>Phí ship</span>
              <span>{formatter.formatPrice(shippingPrice)}</span>
            </li>
            {discountPrice > 0 && (
              <li className="text-muted mb-2 d-flex justify-content-between">
                <span>Giảm giá</span>
                <span>-{formatter.formatPrice(discountPrice)}</span>
              </li>
            )}
            <li className="d-flex justify-content-between">
              <span className="medium text-key semi-thick">Tổng cộng</span>
              <strong className="medium text-key">
                {formatter.formatPrice(finalPrice)}
              </strong>
            </li>
          </li>
        </ul>

        <Search
          placeholder="Nhập mã voucher"
          allowClear
          enterButton="Sử dụng"
          size="large"
          onSearch={handleApplyVoucherCode}
        />
      </div>
      {paymentId === 1 && (
        <div className="mt-4">
          <MyPaypalButton
            loading={loading}
            disabled={loading}
            shippingAddressId={shippingAddressId}
            receiverPhone={receiverPhone}
            receiverName={receiverName}
            handleCheckout={handleCheckout}
          />
        </div>
      )}
      {paymentId === 2 && (
        <Button
          loading={loading}
          disabled={loading}
          type="primary"
          className="mt-4"
          onClick={handleCheckout}
          size="large"
          style={{ width: "100%", backgroundColor: "#a50064" }}
        >
          Thanh toán với MOMO
        </Button>
      )}
      {paymentId === 3 && (
        <Button
          loading={loading}
          disabled={loading}
          type="primary"
          className="mt-4"
          onClick={handleCheckout}
          size="large"
          style={{ width: "100%" }}
        >
          Đặt hàng
        </Button>
      )}
    </div>
  );
};

export default TotalSection;
