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

import i18n from "lang/i18n";
import { useTranslation } from "react-i18next";

import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  useMapEvents,
} from "react-leaflet";
import { Icon } from "leaflet";
import marker from "leaflet/dist/images/marker-icon.png";
import locationService from "services/location";
import { useContext } from "react";
import { AccountContext } from "context/AccountContext";

const markerIcon = new Icon({
  iconUrl: marker,
  iconSize: [16, 32],
});

const SetViewOnClick = ({ lat, long }) => {
  const map = useMap();
  map.setView([lat, long], map.getZoom());

  return null;
};

const LocationFinderDummy = ({ onClick }) => {
  useMapEvents({
    click(e) {
      onClick(e);
    },
  });
  return null;
};

const ShippingAddressPage = () => {
  const { t } = useTranslation();

  const [lat, setLat] = useState(10);
  const [long, setLong] = useState(106);

  const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);

  const [selectProvinceId, setSelectProvinceId] = useState();
  const [selectDistrictId, setSelectDistrictId] = useState();
  const [selectWardId, setSelectWardId] = useState();
  const [address, setAddress] = useState("");

  const { shippingAddress, fetchShippingAddress } = useContext(AccountContext);

  
  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language"));
  }, []);

  const handleQueryCoordinate = async () => {
    try {
      const response = await locationService.getCoordinate(
        selectProvinceId,
        selectDistrictId,
        selectWardId,
        address
      );
      const { coordinates } = response.data;
      setLong(coordinates[0]);
      setLat(coordinates[1]);
    } catch (err) {
      console.error(err);
      swal.fire({
        text: t("shippingAddressPage.searchFail"),
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleAddShippingAddress = async () => {
    try {
      const response = await shippingAddressService.addShippingAddress(
        address,
        selectWardId,
        selectDistrictId,
        selectProvinceId,
        lat,
        long
      );
      const { exitcode } = response.data;
      if (exitcode === 0) {
        swal.fire({
          text: t("shippingAddressPage.addSuccess"),
          icon: "success",
          confirmButtonText: "OK",
        });
        fetchShippingAddress();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setLat(lat);
    setLong(lng);
  };

  const fetchProvince = async () => {
    try {
      const response = await locationService.getListProvince();
      const { exitcode, provinces } = response.data;
      if (exitcode === 0) {
        setListProvince(provinces);
        setSelectProvinceId(provinces[0].id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDistrict = async () => {
    try {
      if (!selectProvinceId) return;

      const response = await locationService.getListDistrict(selectProvinceId);
      const { exitcode, districts } = response.data;
      if (exitcode === 0) {
        setListDistrict(districts);
        setSelectDistrictId(districts[0].id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchWard = async () => {
    try {
      if (!selectProvinceId || !selectDistrictId) return;

      const response = await locationService.getListWard(
        selectProvinceId,
        selectDistrictId
      );
      const { exitcode, wards } = response.data;
      if (exitcode === 0) {
        setListWard(wards);
        setSelectWardId(wards[0].id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDistrict();
  }, [selectProvinceId]);

  useEffect(() => {
    fetchWard();
  }, [selectProvinceId, selectDistrictId]);

  useEffect(() => {
    fetchShippingAddress();
    fetchProvince();
  }, []);

  const handleDelete = async (shippingAddressId) => {
    try {
      const response = await shippingAddressService.deleteShippingAddress(
        shippingAddressId
      );
      const { exitcode } = response.data;
      if (exitcode === 0) {
        swal.fire({
          text: t("shippingAddressPage.deleteSuccess"),
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
      title: t("shippingAddressPage.address"),
      dataIndex: "address",
      key: "address",
    },
    {
      title: t("shippingAddressPage.ward"),
      dataIndex: "wardName",
      key: "wardName",
    },
    {
      title: t("shippingAddressPage.district"),
      dataIndex: "districtName",
      key: "districtName",
    },
    {
      title: t("shippingAddressPage.city"),
      dataIndex: "provinceName",
      key: "provinceName",
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
      <PageHeader title={t("shippingAddressPage.title")}/>
      <Form wrapperCol={{ span: 14 }} labelCol={{ span: 10 }}>
        <Row>
          <Col span={12}>
            <Form.Item label={t("shippingAddressPage.city")}>
              <Select
                placeholder={t("shippingAddressPage.chooseCity")}
                size="large"
                value={selectProvinceId}
                onSelect={(value) => {
                  setSelectProvinceId(value);
                }}
              >
                {listProvince.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.provinceName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t("shippingAddressPage.district")}>
              <Select
                placeholder={t("shippingAddressPage.chooseDistrict")}
                size="large"
                value={selectDistrictId}
                onChange={(value) => {
                  setSelectDistrictId(value);
                }}
              >
                {listDistrict.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.districtName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label={t("shippingAddressPage.ward")}>
              <Select
                value={selectWardId}
                onChange={(value) => {
                  setSelectWardId(value);
                }}
                placeholder={t("shippingAddressPage.chooseWard")}
                size="large"
              >
                {listWard.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.wardName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t("shippingAddressPage.address")} name="address">
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                size="large"
                placeholder={t("shippingAddressPage.enterAddress")}
              ></Input>
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
            <LocationFinderDummy onClick={handleMapClick} />
          </MapContainer>
        </div>
        <div className="d-flex mt-3 justify-content-center">
          <Button
            onClick={handleQueryCoordinate}
            className="mx-2"
            type="ghost"
            size="large"
          >
            {t("shippingAddressPage.search")}
          </Button>
          <Button
            className="mx-2"
            onClick={handleAddShippingAddress}
            type="primary"
            size="large"
          >
            {t("shippingAddressPage.add")}
          </Button>
        </div>
      </Form>
      <PageHeader title={t("shippingAddressPage.shippingAddress")} />
      <Table
        columns={columns}
        pagination={false}
        dataSource={shippingAddress}
      ></Table>
    </div>
  );
};

export default ShippingAddressPage;
