import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import swal from "sweetalert2";

import voucherService from "services/voucher";
import formatter from "utils/formatter";

const swalDeleteProps = {
  title: "Bạn chắc chắn muốn xóa voucher này?",
  text: "Voucher đã xóa sẽ không thể khôi phục!",
  icon: "warning",
  showCancelButton: true,
  cancelButtonText: "Hủy",
  confirmButtonText: "Xóa",
  customClass: {
    cancelButton: "order-1",
    confirmButton: "order-2",
  },
};

const ViewVoucherSection = () => {
  const [vouchers, setVouchers] = useState([]);

  const columns = [
    {
      title: "Mã",
      dataIndex: "voucherCode",
      align: "center",
    },
    {
      title: "Phần trăm giảm",
      dataIndex: "percentageDiscount",
      render: (percentageDiscount) => <div>{percentageDiscount}%</div>,
    },
    {
      title: "Giá tối thiểu",
      dataIndex: "minimumPrice",
      render: (minimumPrice) => (
        <div>{formatter.formatPrice(minimumPrice)}</div>
      ),
      sorter: (a, b) => +a.minPrice - +b.minPrice,
    },
    {
      title: "Giá giảm tối đa",
      dataIndex: "maximumDiscountPrice",
      render: (maximumDiscountPrice) => (
        <div>{formatter.formatPrice(maximumDiscountPrice)}</div>
      ),
      sorter: (a, b) => +a.stock - +b.stock,
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
    },
    {
      dataIndex: "action",
    },
  ];

  const onDeleteVoucher = async (id) => {
    try {
      const result = await swal.fire(swalDeleteProps);
      if (result.isConfirmed) {
        swal.fire("Đã xóa voucher", "", "success");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const data = vouchers.map((voucher) => {
    return {
      key: voucher.voucherCode,
      action: (
        <div className="del" onClick={onDeleteVoucher}>
          <DeleteOutlined />
        </div>
      ),
      ...voucher,
    };
  });

  const getAllVouchers = async () => {
    const res = await voucherService.getVouchers();
    setVouchers(res.data.vouchers);
    console.log(vouchers);
  };

  useEffect(() => {
    getAllVouchers();
  }, []);

  return (
    <>
      <Table
        pagination={{
          pageSize: 5,
          showTotal: (total) => `${total} voucher`,
        }}
        columns={columns}
        dataSource={data}
      />
    </>
  );
};

export default ViewVoucherSection;
