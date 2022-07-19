import { Input, Button } from "antd";
import PaypalButton from "components/PaypalButton";
import "./style.css";
import formatter from "utils/formatter";

const { Search } = Input;

const TotalSection = (props) => {
  const paymentId = props.paymentId;
  const variants = props.variants || [];
  const shippingPrice = props.shippingPrice || 0;
  const voucherPrice = props.voucherPrice || 0;
  const voucherCode = props.voucherCode;
  const handleApplyVoucherCode = props.handleApplyVoucherCode;

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
                <h6 className="my-0 name">{item.variantName}</h6>
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
                -{formatter.formatPrice(voucherPrice)}
              </span>
            </li>
          )}

          <li className="list-group-item">
            <li className="text-muted mb-2 d-flex justify-content-between">
              <span>Tổng tiền sản phẩm</span>
              <span>
                {formatter.formatPrice(
                  variants.reduce(
                    (previous, item) =>
                      previous +
                      item.quantity * (item.discountPrice || item.price),
                    0
                  )
                )}
              </span>
            </li>
            <li className="text-muted mb-2 d-flex justify-content-between">
              <span>Phí ship</span>
              <span>{formatter.formatPrice(shippingPrice)}</span>
            </li>
            <li className="d-flex justify-content-between">
              <span className="medium text-key semi-thick">Tổng cộng</span>
              <strong className="medium text-key">$20</strong>
            </li>
          </li>
        </ul>

        <Search
          on
          placeholder="Nhập mã voucher"
          allowClear
          enterButton="Sử dụng"
          size="large"
          onSearch={handleApplyVoucherCode}
        />
      </div>
      {paymentId === 2 ? (
        <div className="mt-4">
          <PaypalButton />
        </div>
      ) : (
        <Button
          type="primary"
          className="mt-4"
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
