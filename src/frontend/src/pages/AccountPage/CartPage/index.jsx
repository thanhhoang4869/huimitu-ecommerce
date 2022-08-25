import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Image, Row, Space, Table, Tag } from "antd";
import formatter from "utils/formatter";
import { useContext } from "react";
import { AccountContext } from "context/AccountContext";
import { Link } from "react-router-dom";
import cartService from "services/cart";
import swal from "sweetalert2";
import { DeleteOutlined } from "@ant-design/icons";
import i18n from "lang/i18n";
import { useTranslation } from "react-i18next";


const swalDeleteProps = {
  text: "Bạn có chắc muốn xóa sản phẩm?",
  icon: "warning",
  showCancelButton: true,
  cancelButtonText: "Hủy",
  confirmButtonText: "Xóa",
  customClass: {
    cancelButton: "order-1",
    confirmButton: "order-2",
  },
};

const CartPage = () => {
  const { t } = useTranslation();
  const { cart, fetchCart } = useContext(AccountContext);
  const navigate = useNavigate();

  const handleDelete = async (variantId) => {
    try {
      const result = await swal.fire(swalDeleteProps);
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
        const result = await swal.fire(swalDeleteProps);
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
    i18n.changeLanguage(localStorage.getItem("language"));
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
      title: t("cartPage.productName"),
      dataIndex: "variantName",
      key: "variantName",
      render: (variantName, record) => (
        <Link to={`/product/detail/${record.productId}`}>
          <div>{variantName}</div>
        </Link>
      ),
    },
    {
      title: t("cartPage.quantity"),
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
      title: t("cartPage.price"),
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
      title: t("cartPage.status"),
      dataIndex: "stock",
      key: ["stock", "quantity"],
      render: (_, record) => {
        const { stock, quantity } = record;
        return stock >= quantity ? (
          <Tag color="success">{t("cartPage.inStock")}</Tag>
        ) : (
          <Tag color="warning">{t("cartPage.outStock")}</Tag>
        );
      },
    },
    {
      key: "delete",
      render: (_, record) => (
        <Space size="large">
          <div className="del" onClick={() => handleDelete(record.id)}>
            <DeleteOutlined />
          </div>
        </Space>
      ),
    },
  ];

  return (
    <div
      style={{
        minHeight: "70vh",
      }}
    >
      <Table
        pagination={false}
        dataSource={(cart?.variants || []).map((item) => ({
          key: item.id,
          ...item,
        }))}
        columns={columns}
      />
      <div className="d-flex justify-content-between align-items-end">
        <div>
          <p className="my-2">
            <b>{t("cartPage.totalProduct") + ": "} </b>
            {formatter.formatPrice(cart.count)} {t("cartPage.product", {count: cart.count} )}
          </p>
          <p className="my-2">
            <b>{t("cartPage.totalPrice") + ": "}</b>
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
            (cart?.variants || []).filter((item) => item.stock < item.quantity)
              .length > 0 || (cart.variants || []).length < 1
          }
        >
          {t("cartPage.order")}
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
