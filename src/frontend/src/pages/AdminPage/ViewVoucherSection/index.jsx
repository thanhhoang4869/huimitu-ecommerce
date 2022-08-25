import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import swal from "sweetalert2";

import i18n from "lang/i18n";
import { useTranslation } from "react-i18next";

import voucherService from "services/voucher";
import formatter from "utils/formatter";

const ViewVoucherSection = () => {
  const { t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language"));
  }, []);

  const [vouchers, setVouchers] = useState([]);

  const swalDeleteProps = {
    title: t("voucher.sureDelete"),
    text: t("voucher.warningDelete"),
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: "Hủy",
    confirmButtonText: "Xóa",
    customClass: {
      cancelButton: "order-1",
      confirmButton: "order-2",
    },
  };
  const columns = [
    {
      title: t("voucher.voucherCode"),
      dataIndex: "voucherCode",
      align: "center",
    },
    {
      title: t("voucher.percentDiscount"),
      dataIndex: "percentageDiscount",
      render: (percentageDiscount) => <div>{percentageDiscount}%</div>,
    },
    {
      title: t("voucher.minimumPrice"),
      dataIndex: "minimumPrice",
      render: (minimumPrice) => (
        <div>{formatter.formatPrice(minimumPrice)}</div>
      ),
      sorter: (a, b) => +a.minPrice - +b.minPrice,
    },
    {
      title: t("voucher.maximumDiscountPrice"),
      dataIndex: "maximumDiscountPrice",
      render: (maximumDiscountPrice) => (
        <div>{formatter.formatPrice(maximumDiscountPrice)}</div>
      ),
      sorter: (a, b) => +a.stock - +b.stock,
    },
    {
      title: t("voucher.usage"),
      render: (_, record) => (
        <div>
          {record.currentUsage} / {record.maximumUsage}
        </div>
      ),
    },
    {
      title: t("voucher.startDate"),
      dataIndex: "startDate",
    },
    {
      title: t("voucher.endDate"),
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
            swal.fire(t("voucher.deletedVoucher"), "", "success");
            getAllVouchers();
          } else {
            swal.fire(t("voucher.haveError"), "", "error");
          }
        } catch (err) {
          swal.fire(t("voucher.haveError"), "", "error");
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
          showTotal: (total) => `${total} ${t("voucher.voucher", {count: total})}`,
        }}
        columns={columns}
        dataSource={data}
      />
    </>
  );
};

export default ViewVoucherSection;
