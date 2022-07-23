import { ConsoleSqlOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Upload, Select } from "antd";

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
import category from "services/category";

import AddVariantModal from "../AddVariantModal";
import EditVariantModal from "../EditVariantModal";
const { Option } = Select;

const AddProductSection = () => {
  const [form] = useForm();
  const [parentCategories, setParentCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);

  const [product, setProduct] = useState({});
  const [description, setDescription] = useState("");
  const [variants, setVariants] = useState([]);

  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [selectedParentCateId, setSelectedParentCateId] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState({});

  const handleParentCateChange = (value) => {
    setSelectedParentCateId(value)
  };
  const showAddModal = () => {
    setVisibleAdd(true);
  };

  const showEditModal = (variant) => {
    setVisibleEdit(true);
    setSelectedVariant(variant);
  };

  const handleAddSuccess = async (values) => {
    console.log("Success:", values);
    setVariants([values, ...variants]);
    setVisibleAdd(false);
  };

  const handleAddCancel = () => {
    setVisibleAdd(false);
  };

  const handleEditSuccess = async (values) => {
    console.log("Success:", values);
  };

  const handleEditCancel = () => {
    setVisibleEdit(false);
  };

  const onFinish = async (values) => {
    //TODO
    values = {
      description,
      files: [],
      ...values,
    };
    console.log("Success:", values);

    try {
      // const respone = await productService.createProduct(values)
      // const productId = respone.data.productId

      // const productRespone = await productService.getProductById(productId)
      // setProduct(productRespone.data.product)
      
      // variants.map((variant) => createVariant(variant))
      // console.log(respone.data)
    } catch(error) {

    }
  };

  const inputHandler = (event, editor) => {
    setDescription(editor.getData());
  };

  const fetchCategories = async () => {
    try {
      const respone = await category.getCategoryList();
      if (respone.data.exitcode == 0) {
        setParentCategories(respone.data.categories);
        console.log("Categories", parentCategories);
      }
    } catch (e) {}
  };

  const fetchChildCategories = async () => {
    try {
      const respone = await category.getCategoryList();
      if (respone.data.exitcode == 0) {

        const category = respone.data.categories.find(category => category.id == selectedParentCateId);
        setChildCategories(category.children);
        console.log("Child Categories", childCategories);
      }
    } catch (e) {}
  };

  const createVariant = async (variant) => {
    variant = {
      productId: product.id,
      ...variant
    }
    console.log("Success:", variant);

    const response = await variantService.createVariant(variant);
    console.log(response.data);
  }

  useEffect(() => {
    form.resetFields();
  }, [product]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchChildCategories();
  }, [selectedParentCateId]);

  return (
    <>
      <AddVariantModal
        title="Title"
        visible={visibleAdd}
        handleSuccess={handleAddSuccess}
        handleCancel={handleAddCancel}
        product={product}
      />
      <EditVariantModal
        title="Title"
        variant={selectedVariant}
        visible={visibleEdit}
        setVisible={setVisibleEdit}
        handleSuccess={handleEditSuccess}
        handleCancel={handleEditCancel}
      />

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className="flex-container ">
          <div className="flex-item mr-5">
            <Form.Item
              name="bigCategoryName"
              label="Danh mục cha"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn danh mục cha!",
                },
              ]}
            >
              <Select showSearch onChange={handleParentCateChange}>
                {parentCategories.map((category) => (
                  <Option value={category.id}>{category.categoryName}</Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="flex-item">
            <Form.Item
              name="categoryName"
              label="Danh mục"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn danh mục!",
                },
              ]}
            >
              <Select showSearch onChange={handleParentCateChange}>
                {childCategories.map((category) => (
                  <Option value={category.id}>{category.categoryName}</Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </div>
        <Form.Item
          name="productName"
          label="Tên sản phẩm"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Danh sách biến thể">
          <div className="text-key mb-2 addVar" onClick={showAddModal}>
            Thêm biến thể
          </div>
          <VariantTable variants={variants} handleEdit={showEditModal} />
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

export default AddProductSection;
