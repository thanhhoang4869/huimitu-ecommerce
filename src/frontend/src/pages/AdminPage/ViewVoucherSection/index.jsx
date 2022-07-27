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
      title: "% giảm",
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
      title: "Giảm tối đa",
      dataIndex: "maximumDiscountPrice",
      render: (maximumDiscountPrice) => (
        <div>{formatter.formatPrice(maximumDiscountPrice)}</div>
      ),
      sorter: (a, b) => +a.stock - +b.stock,
    },
    {
      title: "Lượt dùng",
      render: (_, record) => (
        <div>
          {record.currentUsage} / {record.maximumUsage}
        </div>
      ),
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

  const onDeleteVoucher = async (voucherId) => {
    swal.fire(swalDeleteProps).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const result = await voucherService.deleteVoucher(voucherId);
          if (result.data.exitcode === 0) {
            swal.fire("Đã xóa voucher", "", "success");
            getAllVouchers();
          } else {
            swal.fire("Có lỗi xảy ra", "", "error");
          }
        } catch (err) {
          swal.fire("Có lỗi xảy ra", "", "error");
        }
      }
    });
  };

  const data = vouchers.map((voucher) => {
    return {
      key: voucher.voucherCode,
      action: (
        <div
          className="del"
          onClick={() => onDeleteVoucher(voucher.voucherCode)}
        >
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
