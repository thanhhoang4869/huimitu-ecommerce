import {
  Table,
  Space,
  Form,
  Select,
  Input,
  Row,
  Col,
  PageHeader,
  Button,
} from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import shippingAddressService from "services/shippingAddress";
import swal from "sweetalert2";

import { MapContainer, TileLayer, useMap, Marker } from "react-leaflet";
import { Icon } from "leaflet";
import marker from "leaflet/dist/images/marker-icon.png";

const markerIcon = new Icon({
  iconUrl: marker,
  iconSize: [16, 32],
});

const SetViewOnClick = ({ lat, long }) => {
  const map = useMap();
  map.setView([lat, long], map.getZoom());

  return null;
};

const ShippingAddressPage = () => {
  const [listShippingAddress, setListShippingAddress] = useState([]);
  const [lat, setLat] = useState(10);
  const [long, setLong] = useState(106);

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
      title: "Số điện thoại",
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
      <PageHeader title="Thêm địa chỉ giao hàng" />
      <Form wrapperCol={{ span: 14 }} labelCol={{ span: 10 }}>
        <Row>
          <Col span={12}>
            <Form.Item label="Tỉnh thành">
              <Select placeholder="Chọn tỉnh thành" size="large"></Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Quận huyện">
              <Select placeholder="Chọn quận huyện" size="large"></Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="Phường xã">
              <Select placeholder="Chọn phường xã" size="large"></Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Địa chỉ">
              <Input size="large" placeholder="Nhập địa chỉ"></Input>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="Tên người nhận">
              <Input size="large" placeholder="Nhập tên người nhận"></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Số điện thoại">
              <Input size="large" placeholder="Nhập số điện thoại"></Input>
            </Form.Item>
          </Col>
        </Row>
        <div className="ml-5 d-flex justify-content-center bordered">
          <MapContainer
            style={{
              height: "300px",
              width: "80%",
            }}
            center={[lat, long]}
            zoom={20}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat, long]} icon={markerIcon} />
            <SetViewOnClick lat={lat} long={long} />
          </MapContainer>
        </div>
        <div className="d-flex mt-3 justify-content-center">
          <Button className="mx-2" type="ghost" size="large">
            Tra cứu
          </Button>
          <Button
            className="mx-2"
            htmlType="submit"
            type="primary"
            size="large"
          >
            Thêm
          </Button>
        </div>
      </Form>
      <PageHeader title="Địa chỉ giao hàng" />
      <Table
        columns={columns}
        pagination={false}
        dataSource={listShippingAddress}
      ></Table>
    </div>
  );
};

export default ShippingAddressPage;
