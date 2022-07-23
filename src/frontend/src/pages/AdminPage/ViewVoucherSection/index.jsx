import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import swal from "sweetalert2";

import voucherService from "services/voucher";

const ViewVoucherSection = () => {
  const [vouchers, setVouchers] = useState([])

  const columns = [
    {
      title: "Mã",
      dataIndex: "voucherCode",
      align: "center"
    },
    {
      title: "% giảm",
      dataIndex: "percentageDiscount",
    },
    {
      title: "Giá tối thiểu",
      dataIndex: "minimumPrice",
      sorter: (a, b) => +a.minPrice - +b.minPrice,
    },
    {
      title: "Giá giảm tối đa",
      dataIndex: "maximumDiscountPrice",
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
    swal
      .fire({
        title: "Bạn chắc chắn muốn xóa voucher này?",
        text: "Voucher đã xóa sẽ không thể khôi phục!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        CancelButtonText: "Hủy",
        confirmButtonText: "Xóa",
      })
      .then((result) => {
        if (result.isConfirmed) {
          //TODO
          swal.fire("Đã xóa voucher", "", "success");
        }
      });
  };

  const data = vouchers.map((voucher) => {
    return {
      key: voucher.voucherCode,
      action: (
        <div className="del" onClick={onDeleteVoucher}>
          <DeleteOutlined />
        </div>
      ),
      ...voucher
    };
  });

  const getAllVouchers = async () => {
    const res = await voucherService.getVouchers();
    setVouchers(res.data.vouchers);
    console.log(vouchers)
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
