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

import "./style.css";
import productService from "services/product";
import variantService from "services/variant";
import AddVariantModal from "../AddVariantModal";
import EditVariantModal from "../EditVariantModal";

const EditProductSection = () => {
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
        swal.fire("Th??nh c??ng", "C???p nh???t s???n ph???m th??nh c??ng", "success");
        navigate("/admin/viewProduct");
      } else {
        swal.fire(
          "Th???t b???i",
          "C???p nh???t s???n ph???m th???t b???i. Vui l??ng th??? l???i sau",
          "error"
        );
      }
    } catch (error) {
      swal.fire("Th???t b???i", error.message, "error");
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

    async beforeUpload(file) {
      console.log("Go");
      if (!(isImage(file.type) && sizeLessMegaByte(file.size, 5))) {
        swal.fire({
          text: "B???n ch??? c?? th??? upload file h??nh (png, jpg) kh??ng qu?? 5MB",
          icon: "error",
          confirmButtonText: "OK",
        });
        return false;
      }
      setSelectedImages([file, ...selectedImages]);

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
        <Form.Item initialValue={id} name="id" label="ID s???n ph???m">
          <Input disabled />
        </Form.Item>
        <div className="flex-container ">
          <div className="flex-item mr-5">
            <Form.Item
              initialValue={product?.category?.categoryName}
              name="bigCategoryName"
              label="Danh m???c cha"
            >
              <Input disabled />
            </Form.Item>
          </div>
          <div className="flex-item">
            <Form.Item
              initialValue={product?.category?.children?.categoryName}
              name="categoryName"
              label="Danh m???c"
            >
              <Input disabled />
            </Form.Item>
          </div>
        </div>
        <Form.Item
          initialValue={product?.productName}
          name="productName"
          label="T??n s???n ph???m"
        >
          <Input />
        </Form.Item>
        <Form.Item label="Danh s??ch bi???n th???">
          <div className="text-key mb-2 addVar" onClick={showAddModal}>
            Th??m bi???n th???
          </div>
          <VariantTable
            variants={JSON.parse(variants)}
            handleEdit={showEditModal}
          />
        </Form.Item>
        <Form.Item label="M?? t??? s???n ph???m">
          <CKEditor
            editor={ClassicEditor}
            data={description}
            onChange={inputHandler}
          />
        </Form.Item>
        <div>
          <Form.Item
            label={`Upload th??m h??nh ???nh (C??n l???i ${
              10 - images.length - selectedImages.length
            })`}
            valuePropName="fileList"
          >
            <div className="mb-2 text-primary text-md">
              M???i s???n ph???m c?? t???i ??a 10 h??nh ???nh.
            </div>
            <div className="mb-2">S??? ???nh hi???n t???i: {images.length}</div>
            <div className="mb-2">S??? ???nh ???? ch???n: {selectedImages.length}</div>
            <Upload {...uploadProps}>
              <Button
                disabled={!(selectedImages?.length + images?.length < 10)}
                icon={<UploadOutlined />}
              >
                Ch???n h??nh ???nh
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
            C???p nh???t
          </Button>
        </div>
      </Form>
    </>
  );
};

export default EditProductSection;
