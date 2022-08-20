import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";

import { Form, Input } from "antd";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import VariantTable from "../VariantTable";

import { useForm } from "antd/lib/form/Form";
import { isImage, sizeLessMegaByte } from "utils/validator";
import swal from "sweetalert2";

import i18n from "lang/i18n";
import { useTranslation } from "react-i18next";

import "./style.css";
import productService from "services/product";
import variantService from "services/variant";
import AddVariantModal from "../AddVariantModal";
import EditVariantModal from "../EditVariantModal";

const EditProductSection = () => {
  const { t } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language"));
  }, []);

  const { id } = useParams();
  const [form] = useForm();
  const [product, setProduct] = useState({});
  const [description, setDescription] = useState("");
  const [variants, setVariants] = useState("[]");

  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState({});

  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([]);

  const navigate = useNavigate();

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
    try {
      const response = await productService.updateProduct(
        values,
        description,
        selectedImages
      );
      const { exitcode } = response.data;
      if (exitcode === 0) {
        swal.fire(
          t("editProductSection.success"),
          t("editProductSection.updateProductSuccess"),
          "success"
        );
        navigate("/admin/viewProduct");
      } else {
        swal.fire(
          t("editProductSection.fail"),
          t("editProductSection.updateProductFail"),
          "error"
        );
      }
    } catch (error) {
      swal.fire(t("editProductSection.fail"), error.message, "error");
    }
  };

  const getProductById = async () => {
    try {
      const response = await productService.getProductById(id);
      const { product } = response.data;
      setProduct(product);
      setDescription(product.description || "");
    } catch (error) {
      navigate("/error");
    }
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
  }, []); // eslint-disable-line

  useEffect(() => {
    getVariants();
  }, [variants]); //eslint-disable-line

  useEffect(() => {
    form.resetFields();
    setImages(product.images || []);
  }, [product]); //eslint-disable-line

  const uploadProps = {
    listType: "picture",
    multiple: true,
    maxCount: 10 - images.length,
    accept: "image/png, image/jpeg",
    showUploadList: true,
    fileList: selectedImages,

    async beforeUpload(file, fileList) {
      const filteredFileList = fileList.filter(
        (file) => isImage(file.type) && sizeLessMegaByte(file.size, 5)
      );
      if (fileList.length > filteredFileList.length) {
        swal.fire({
          title: t("addProductSection.addProduct"),
          text: t("addProductSection.uploadImageSizeWarning"),
          icon: "error",
          confirmButtonText: "OK",
        });
      }
      filteredFileList.forEach((item) => {
        let reader = new window.FileReader();
        reader.onloadend = () => {
          item.thumbUrl = reader.result;
        };
        reader.readAsDataURL(item);
      });
      setSelectedImages([...filteredFileList, ...selectedImages]);

      return false;
    },

    onRemove: (file) => {
      const index = selectedImages.indexOf(file);
      const newFileList = selectedImages.slice();
      newFileList.splice(index, 1);
      setSelectedImages(newFileList);
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
        <Form.Item
          initialValue={id}
          name="id"
          label={t("editProductSection.productID")}
        >
          <Input disabled />
        </Form.Item>
        <div className="flex-container ">
          <div className="flex-item mr-5">
            <Form.Item
              initialValue={product?.category?.categoryName}
              name="bigCategoryName"
              label={t("editProductSection.parentCategory")}
            >
              <Input disabled />
            </Form.Item>
          </div>
          <div className="flex-item">
            <Form.Item
              initialValue={product?.category?.children?.categoryName}
              name="categoryName"
              label={t("editProductSection.category")}
            >
              <Input disabled />
            </Form.Item>
          </div>
        </div>
        <Form.Item
          initialValue={product?.productName}
          name="productName"
          label={t("editProductSection.productName")}
        >
          <Input />
        </Form.Item>
        <Form.Item label={t("editProductSection.variantList")}>
          <div className="text-key mb-2 addVar" onClick={showAddModal}>
            {t("editProductSection.addVariant")}
          </div>
          <VariantTable
            variants={JSON.parse(variants)}
            handleEdit={showEditModal}
          />
        </Form.Item>
        <Form.Item label={t("editProductSection.productDescription")}>
          <CKEditor
            editor={ClassicEditor}
            data={description}
            onChange={inputHandler}
          />
        </Form.Item>
        <div>
          <Form.Item
            label={`Upload ${t("editProductSection.moreImage")} (${
              10 - images.length - selectedImages.length
            } ${t("editProductSection.remain")})`}
            valuePropName="fileList"
          >
            <div className="mb-2 text-primary text-md">
              {t("editProductSection.productImageRule")}.
            </div>
            <div className="mb-2">
              {t("editProductSection.currentNoImage")}: {images.length}
            </div>
            <div className="mb-2">
              {t("editProductSection.noImageSelected")}: {selectedImages.length}
            </div>
            <Upload {...uploadProps}>
              <Button
                disabled={!(selectedImages?.length + images?.length < 10)}
                icon={<UploadOutlined />}
              >
                {t("editProductSection.selectImage")}
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
            {t("editProductSection.update")}
          </Button>
        </div>
      </Form>
    </>
  );
};

export default EditProductSection;
