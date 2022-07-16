import { Table, Space } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import shippingAddressService from "services/shippingAddress";
import swal from "sweetalert2";

const ShippingAddressPage = () => {
  const [listShippingAddress, setListShippingAddress] = useState([]);

  const fetchShippingAddress = async () => {
    try {
      const response = await shippingAddressService.getListShippingAddress();
      const { exitcode, shippingAddresses } = response.data;
      if (exitcode === 0) {
        setListShippingAddress(shippingAddresses);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchShippingAddress();
  }, []);

  const handleDelete = async (shippingAddressId) => {
    try {
      const response = await shippingAddressService.deleteShippingAddress(
        shippingAddressId
      );
      const { exitcode } = response.data;
      if (exitcode === 0) {
        swal.fire({
          text: "Xoá địa điểm giao hàng thành công",
          icon: "success",
          confirmButtonText: "OK",
        });
        fetchShippingAddress();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phường",
      dataIndex: "wardName",
      key: "wardName",
    },
    {
      title: "Quận",
      dataIndex: "districtName",
      key: "districtName",
    },
    {
      title: "Thành phố",
      dataIndex: "provinceName",
      key: "provinceName",
    },
    {
      title: "Người nhận hàng",
      dataIndex: "receiverName",
      key: "receiverName",
    },
    {
      title: "Số điện thoại người nhận",
      dataIndex: "receiverPhone",
      key: "receiverPhone",
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
      <Table columns={columns} pagination={false} dataSource={listShippingAddress}></Table>
    </div>
  );
};

export default ShippingAddressPage;
