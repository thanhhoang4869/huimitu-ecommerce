import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";

import { Form, Input } from "antd";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import VariantTable from "../VariantTable";

import { useForm } from "antd/lib/form/Form";
import { isImage, sizeLessMegaByte } from "utils/validator";
import swal from "sweetalert2";

import "./style.css";
import productService from "services/product";
import variantService from "services/variant";
import AddVariantModal from "../AddVariantModal";
import EditVariantModal from "../EditVariantModal";

const EditProductSection = () => {
  const { id } = useParams();
  const [form] = useForm();
  const [product, setProduct] = useState({});
  const [imageCount, setImageCount] = useState(0);
  const [currentSelectedImageCount, setCurrentSelectedImageCount] = useState(0);
  const [description, setDescription] = useState("");
  const [variants, setVariants] = useState("[]");

  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState({});
  const [allowUpload, setAllowUpload] = useState(true);
  const [images, setImages] = useState([]);

  const showAddModal = () => {
    setVisibleAdd(true);
  };

  const showEditModal = (variant) => {
    setVisibleEdit(true);
    setSelectedVariant(variant);
  };

  const handleAddSuccess = async (values) => {
    values = {
      productId: product.id,
      ...values,
    };
    const response = await variantService.createVariant(values);

    if (response.data.exitcode === 0) {
      setVisibleAdd(false);
    }
    getVariants();
  };

  const handleAddCancel = () => {
    setVisibleAdd(false);
  };

  const handleEditSuccess = async (values) => {
    console.log("Success:", values);

    const response = await variantService.updateVariant(values);
    console.log(response.data);

    if (response.data.exitcode === 0) {
      setVisibleEdit(false);
      getVariants();
    }
  };

  const handleEditCancel = () => {
    setVisibleEdit(false);
  };

  const onFinish = async (values) => {
    values.description = description;
    values.productImg = images;
    console.log("Success:", values);

    try {
      const response = await productService.updateProduct(values);
      if (response.data.exitcode === 0) {
        swal.fire("Thành công", "Cập nhật phẩm thành công", "success");
      } else {
        swal.fire(
          "Thất bại",
          "Cập nhật phẩm thất bại. Vui lòng thử lại sau",
          "error"
        );
      }
    } catch (error) {
      swal.fire("Thất bại", error.message, "error");
    }
  };

  const getProductById = async () => {
    const response = await productService.getProductById(id);
    const { product } = response.data;
    setProduct(product);
    setImages(product.images);
    setDescription(product.description ? product.description : "");
  };

  const getVariants = async () => {
    const response = await variantService.getByProductId(id);
    const { variants } = response.data;
    setVariants(JSON.stringify(variants));
  };

  const inputHandler = (event, editor) => {
    setDescription(editor.getData());
  };

  useEffect(() => {
    getProductById();
  }, [id]); // eslint-disable-line

  useEffect(() => {
    getVariants();
  }, [variants]); //eslint-disable-line

  useEffect(() => {
    setImageCount(product?.images?.length);
  }, [images]); //eslint-disable-line

  useEffect(() => {
    form.resetFields();
  }, [product]); //eslint-disable-line

  console.log(imageCount);

  const uploadProps = {
    listType: "picture",
    multiple: true,
    maxCount: 10 - imageCount,
    accept: "image/png, image/jpeg",
    showUploadList: true,

    onChange({ file, fileList }) {
      console.log("Length", fileList.length);
      if (fileList.length >= 10 - imageCount) {
        setAllowUpload(false);
        setCurrentSelectedImageCount(fileList.length);
      } else {
        setAllowUpload(true);
        setImages([...images, file]);
        setCurrentSelectedImageCount(fileList.length);
      }
    },

    async beforeUpload(file) {
      console.log("Max count:", 10 - imageCount);
      if (!(isImage(file.type) && sizeLessMegaByte(file.size, 5))) {
        swal.fire({
          text: "Bạn chỉ có thể upload file hình (png, jpg) không quá 5MB",
          icon: "error",
          confirmButtonText: "OK",
        });
        return false;
      }
      return false;
    },
  };

  return (
    <>
      <AddVariantModal
        title="Title"
        visible={visibleAdd}
        handleSuccess={handleAddSuccess}
        handleCancel={handleAddCancel}
      />
      <EditVariantModal
        title="Title"
        variant={selectedVariant}
        visible={visibleEdit}
        handleSuccess={handleEditSuccess}
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
          <Form.Item
            label={`Upload thêm hình ảnh (Còn lại ${
              10 - imageCount - currentSelectedImageCount
            })`}
            valuePropName="fileList"
          >
            <div className="mb-2 text-primary text-md">
              Mỗi sản phẩm có tối đa 10 hình ảnh.
            </div>
            <div className="mb-2">Số ảnh hiện tại: {imageCount}</div>
            <div className="mb-2">
              Số ảnh đã chọn: {currentSelectedImageCount}
            </div>
            <Upload {...uploadProps}>
              <Button disabled={!allowUpload} icon={<UploadOutlined />}>
                Chọn hình ảnh
              </Button>
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
