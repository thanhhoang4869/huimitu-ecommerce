import { Input } from "antd";
const { Search } = Input;

const TotalSection = () => {
  return (
    <div className="col-md-5 order-md-2 mb-4">
      <div className="cart p-3">
        <div className="d-flex medium semi-thick justify-content-between align-items-center mb-3">
          <span>Đơn hàng</span>
          <span className="badge badge-secondary badge-pill">3</span>
        </div>
        <ul className="list-group mb-3">
          <li className="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 className="my-0 name">Tên sản phẩm</h6>
              <small className="text-muted">2x</small>
            </div>
            <span className="text-muted">$12</span>
          </li>
          <li className="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 className="my-0 name">Tên sản phẩm</h6>
              <small className="text-muted">2x</small>
            </div>
            <span className="text-muted">$12</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <div>
              <div className="prod-code my-0 text-key">Mã voucher</div>
              <small className="text-orange semi-thick">VUIBEPBANH</small>
            </div>
            <span className="text-orange semi-thick">-$5</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span className="medium text-key semi-thick">Tổng cộng</span>
            <strong className="medium text-key">$20</strong>
          </li>
        </ul>

        <Search
          placeholder="Nhập mã voucher"
          allowClear
          enterButton="Sử dụng"
          size="large"
        />
      </div>
    </div>
  );
};

export default TotalSection;
