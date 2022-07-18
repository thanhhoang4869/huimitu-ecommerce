import { Input, Button } from "antd";
import PaypalButton from "components/PaypalButton";
import { useContext } from "react";
import "./style.css";
import { CheckoutContext } from "context/CheckoutContext";
import formatter from "utils/formatter";

const { Search } = Input;

const TotalSection = (props) => {
  const { paymentMethod, setPaymentMethod } = useContext(CheckoutContext);

  const variants = props.variants;

  return (
    <div className="col-md-5 order-md-2 mb-4">
      <div className="cart p-3">
        <div className="d-flex medium semi-thick justify-content-between align-items-center mb-3">
          <span>Đơn hàng</span>
          <span className="badge badge-secondary badge-pill">3</span>
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

          <li className="list-group-item d-flex justify-content-between">
            <div>
              <div className="prod-code my-0 text-key">Mã voucher</div>
              <small className="text-orange semi-thick">VUIBEPBANH</small>
            </div>
            <span className="text-orange semi-thick">-$5</span>
          </li>

          <li className="list-group-item">
            <li className="text-muted mb-2 d-flex justify-content-between">
              <span>Tổng tiền sản phẩm</span>
              <span>12</span>
            </li>
            <li className="text-muted mb-2 d-flex justify-content-between">
              <span>Phí ship</span>
              <span>12</span>
            </li>
            <li className="text-muted mb-2 d-flex justify-content-between">
              <span>Giảm giá</span>
              <span>12</span>
            </li>
            <li className="d-flex justify-content-between">
              <span className="medium text-key semi-thick">Tổng cộng</span>
              <strong className="medium text-key">$20</strong>
            </li>
          </li>
        </ul>

        <Search
          placeholder="Nhập mã voucher"
          allowClear
          enterButton="Sử dụng"
          size="large"
        />
      </div>
      {paymentMethod == 2 ? (
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
