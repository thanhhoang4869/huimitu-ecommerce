import React, { useEffect } from "react";
import { Button, Image, Space, Table, Tag } from "antd";
import formatter from "utils/formatter";
import { useContext } from "react";
import { AuthContext } from "context/AuthContext/AuthContext";
import { Link } from "react-router-dom";
import cartService from "services/cart";
import swal from "sweetalert2";

const CartPage = () => {
  const { cart, variants, fetchCart } = useContext(AuthContext);

  const handleDelete = async (variantId) => {
    try {
      const response = await cartService.deleteVariant(variantId);
      const { exitcode } = response.data;

      // eslint-disable-next-line default-case
      switch (exitcode) {
        case 0: {
          swal.fire({
            text: "Delete successfully",
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
    <div>
      <Table
        pagination={false}
        dataSource={variants.map((item) => ({
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
        <Button type="primary" size="large">
          Thanh toán
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
