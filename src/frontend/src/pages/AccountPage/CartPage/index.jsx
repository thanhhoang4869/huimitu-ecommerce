import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Image, Row, Space, Table, Tag } from "antd";
import formatter from "utils/formatter";
import { useContext } from "react";
import { AccountContext } from "context/AccountContext";
import { Link } from "react-router-dom";
import cartService from "services/cart";
import swal from "sweetalert2";
import "./style.css";

const CartPage = () => {
  const { cart, fetchCart } = useContext(AccountContext);
  const navigate = useNavigate();

  const handleDelete = async (variantId) => {
    try {
      const result = await swal.fire({
        text: "Bạn có chắc muốn xóa sản phẩm?",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "Hủy",
        confirmButtonText: "Chắc chắn",
        customClass: {
          cancelButton: "order-1",
          confirmButton: "order-2",
        },
      });
      if (result.isDismissed) {
        return;
      }

      const response = await cartService.deleteVariant(variantId);
      const { exitcode } = response.data;

      // eslint-disable-next-line default-case
      switch (exitcode) {
        case 0: {
          swal.fire({
            text: "Xoá thành công",
            icon: "success",
            confirmButtonText: "OK",
          });
          fetchCart();
          break;
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateQuantity = async (variantId, newQuantity) => {
    try {
      if (newQuantity === 0) {
        const result = await swal.fire({
          text: "Bạn có chắc muốn xóa sản phẩm?",
          icon: "question",
          showCancelButton: true,
          cancelButtonText: "Hủy",
          confirmButtonText: "Chắc chắn",
          customClass: {
            cancelButton: "order-1",
            confirmButton: "order-2",
          },
        });
        if (result.isDismissed) {
          return;
        }
      }

      const response = await cartService.updateVariant(variantId, newQuantity);
      const { exitcode } = response.data;
      if (exitcode === 0) {
        fetchCart();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    try {
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  }, []);

  const columns = [
    {
      dataIndex: "image",
      key: "image",
      render: (image) => <Image height="64px" src={image} />,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "variantName",
      key: "variantName",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => (
        <Row>
          <Col span={8}>
            <Button
              onClick={() =>
                handleUpdateQuantity(record.id, record.quantity - 1)
              }
              size="small"
              style={{ width: "32px" }}
            >
              -
            </Button>
          </Col>
          <Col span={8}>
            <div className="centered">{quantity}</div>
          </Col>
          <Col span={8} className="d-flex flex-row-reverse">
            <Button
              onClick={() =>
                handleUpdateQuantity(record.id, record.quantity + 1)
              }
              size="small"
              style={{ width: "32px" }}
            >
              +
            </Button>
          </Col>
        </Row>
      ),
    },
    {
      title: "Giá",
      dataIndex: ["price", "discountPrice"],
      key: "price",
      render: (_, record) => {
        const { price, discountPrice } = record;
        return (
          <div>
            <div>
              {discountPrice && (
                <strike>{`${formatter.formatPrice(price)}₫`}</strike>
              )}
            </div>
            {`${formatter.formatPrice(discountPrice || price)}₫`}
          </div>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "stock",
      key: ["stock", "quantity"],
      render: (_, record) => {
        const { stock, quantity } = record;
        return stock >= quantity ? (
          <Tag color="success">Còn hàng</Tag>
        ) : (
          <Tag color="warning">Không đủ hàng</Tag>
        );
      },
    },
    {
      key: "delete",
      render: (_, record) => (
        <Space size="large">
          <Link to="" onClick={() => handleDelete(record.id)}>
            <i className="fa fa-trash"></i>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <Table
        pagination={false}
        dataSource={cart.variants.map((item) => ({
          key: item.id,
          ...item,
        }))}
        columns={columns}
      />
      <div className="d-flex justify-content-between align-items-end">
        <div>
          <p className="my-2">
            <b>Tổng số lượng: </b>
            {formatter.formatPrice(cart.count)} sản phẩm
          </p>
          <p className="my-2">
            <b>Tổng thành tiền: </b>
            {formatter.formatPrice(cart.total)} VND
          </p>
        </div>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            navigate("/checkout");
          }}
          disabled={
            cart.variants.filter((item) => item.stock < item.quantity).length >
              0 || cart.variants.length < 1
          }
        >
          Đặt hàng
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
