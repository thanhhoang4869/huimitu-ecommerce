import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";

import { Form, Input } from "antd";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import VariantTable from "../VariantTable";

import { useForm } from "antd/lib/form/Form";

import "./style.css";
import productService from "services/product";
import variantService from "services/variant";
import AddVariantModal from "../AddVariantModal";
import EditVariantModal from "../EditVariantModal";
import swal from "sweetalert2";

const EditProductSection = () => {
  const { id } = useParams();
  const [form] = useForm();
  const [product, setProduct] = useState({});
  const [description, setDescription] = useState("");
  const [variants, setVariants] = useState("[]");

  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState({});

  const showAddModal = () => {
    setVisibleAdd(true);
  };

  const showEditModal = (variant) => {
    setVisibleEdit(true);
    setSelectedVariant(variant);
  };

  const handleAddCancel = () => {
    setVisibleAdd(false);
  };

  const handleEditCancel = () => {
    setVisibleEdit(false);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const getProductById = async () => {
    const response = await productService.getProductById(id);
    const { product } = response.data;
    setProduct(product);
    setDescription(product.description);
  };

  const getVariants = async () => {
    const response = await variantService.getByProductId(id);
    const { variants } = response.data;
    console.log(variants);
    setVariants(JSON.stringify(variants));
  };

  const inputHandler = (event, editor) => {
    setDescription(editor.getData());
  };

  useEffect(() => {
    getProductById();
  }, [id]);

  useEffect(() => {
    getVariants();
  }, [variants]);

  useEffect(() => {
    form.resetFields();
  }, [product]);

  return (
    <>
      <AddVariantModal
        title="Title"
        visible={visibleAdd}
        handleCancel={handleAddCancel}
      />
      <EditVariantModal
        title="Title"
        visible={visibleEdit}
        handleCancel={handleEditCancel}
      />

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item initialValue={id} name="id" label="ID sản phẩm">
          <Input disabled />
        </Form.Item>
        <div className="flex-container ">
          <div className="flex-item mr-5">
            <Form.Item
              initialValue={product?.category?.categoryName}
              name="bigCategoryName"
              label="Danh mục cha"
            >
              <Input disabled />
            </Form.Item>
          </div>
          <div className="flex-item">
            <Form.Item
              initialValue={product?.category?.children?.categoryName}
              name="categoryName"
              label="Danh mục"
            >
              <Input disabled />
            </Form.Item>
          </div>
        </div>
        <Form.Item
          initialValue={product?.productName}
          name="productName"
          label="Tên sản phẩm"
        >
          <Input />
        </Form.Item>
        <Form.Item label="Danh sách biến thể">
          <div className="text-key mb-2 addVar" onClick={showAddModal}>
            Thêm biến thể
          </div>
          <VariantTable
            variants={JSON.parse(variants)}
            handleEdit={showEditModal}
          />
        </Form.Item>
        <Form.Item label="Mô tả sản phẩm">
          <CKEditor
            editor={ClassicEditor}
            data={description}
            onChange={inputHandler}
          />
        </Form.Item>

        <div>
          <Form.Item label="Upload thêm hình ảnh" valuePropName="fileList">
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture"
              maxCount={5}
              multiple
            >
              <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
            </Upload>
          </Form.Item>
        </div>

        <div
          className="mt-5"
          style={{
            textAlign: "end",
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{ width: "100%" }}
          >
            Cập nhật
          </Button>
        </div>
      </Form>
    </>
  );
};

export default EditProductSection;
