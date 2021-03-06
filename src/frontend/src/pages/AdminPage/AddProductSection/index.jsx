import { UploadOutlined, VideoCameraAddOutlined } from "@ant-design/icons";
import { Button, Select, Upload } from "antd";

import { Form, Input } from "antd";
import { useEffect, useState } from "react";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import VariantTable from "../VariantTable";

import { useForm } from "antd/lib/form/Form";
import { isImage, sizeLessMegaByte } from "utils/validator";
import swal from "sweetalert2";

import category from "services/category";
import variantService from "services/variant";
import { default as productService } from "services/product";

import "./style.css";

import AddVariantModal from "../AddVariantModal";
import EditVariantModal from "../EditVariantModal";
import { useNavigate } from "react-router-dom";
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

  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedParentCateId, setSelectedParentCateId] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState({});

  const [loading, setLoading] = useState(false);

  const navigator = useNavigate();

  const handleParentCateChange = (value) => {
    setSelectedParentCateId(value);
  };
  const showAddModal = () => {
    setVisibleAdd(true);
  };

  const showEditModal = (variant) => {
    setVisibleEdit(true);
    setSelectedVariant(variant);
  };

  const handleAddSuccess = async (values) => {
    setVariants([values, ...variants]);
    setVisibleAdd(false);
  };

  const handleAddCancel = () => {
    setVisibleAdd(false);
  };

  const handleEditSuccess = async (values) => {
    variants.some((variant, index) => {
      if (variant === selectedVariant) {
        variants[index] = values
        return true
      }
    })
    setVariants(variants);
    setVisibleEdit(false);
  };

  const handleEditCancel = () => {
    setVisibleEdit(false);
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const responseProduct = await productService.createProduct(
        values,
        description,
        selectedImages
      );

      const { exitcode, productId } = responseProduct.data;
      let success = exitcode === 0;

      // eslint-disable-next-line default-case
      switch (exitcode) {
        case 0: {
          variants.forEach(async (element) => {
            const response = await variantService.createVariant({
              productId: productId,
              variantName: element.variantName,
              price: element.price,
              discountPrice: element.discountPrice,
              stock: element.stock,
            });
            const { exitcode } = response;
            success = success && exitcode === 0;
          });
          if (success) {
            await swal.fire({
              title: "Th??m s???n ph???m",
              text: "Th??m s???n ph???m th??nh c??ng",
              icon: "success",
              confirmButtonText: "OK",
            });
            navigator("/admin/viewProduct");
          }
          break;
        }
        case 101: {
          await swal.fire({
            title: "Th??m s???n ph???m",
            text: "Vui l??ng th??m h??nh ???nh",
            icon: "info",
            confirmButtonText: "OK",
          });
          break;
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputHandler = (event, editor) => {
    setDescription(editor.getData());
  };

  const fetchCategories = async () => {
    try {
      const respone = await category.getCategoryList();
      const { exitcode } = respone.data;
      if (exitcode === 0) {
        setParentCategories(respone.data.categories);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchChildCategories = async () => {
    try {
      const response = await category.getCategoryList();
      const { exitcode, categories } = response.data;
      if (exitcode == 0) {
        const category = categories.find(
          (category) => category.id == selectedParentCateId
        );
        setChildCategories(category.children);
      }
    } catch (e) {}
  };

  useEffect(() => {
    form.resetFields();
  }, [product]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchChildCategories();
  }, [selectedParentCateId]);

  const uploadProps = {
    listType: "picture",
    multiple: true,
    maxCount: 10 - images.length,
    accept: "image/png, image/jpeg",
    showUploadList: true,

    async beforeUpload(file) {
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
        setVisible={setVisibleEdit}
        handleSuccess={handleEditSuccess}
        handleCancel={handleEditCancel}
      />

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className="flex-container ">
          <div className="flex-item mr-5">
            <Form.Item
              label="Danh m???c cha"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng ch???n danh m???c cha!",
                },
              ]}
            >
              <Select onChange={handleParentCateChange}>
                {parentCategories.map((category) => (
                  <Option value={category.id}>{category.categoryName}</Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="flex-item">
            <Form.Item
              name="categoryId"
              label="Danh m???c"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng ch???n danh m???c!",
                },
              ]}
            >
              <Select onChange={handleParentCateChange}>
                {childCategories.map((category) => (
                  <Option value={category.id}>{category.categoryName}</Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </div>
        <Form.Item
          name="productName"
          label="T??n s???n ph???m"
          rules={[
            {
              required: true,
              message: "Vui l??ng nh???p t??n!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Danh s??ch bi???n th???">
          <div className="text-key mb-2 addVar" onClick={showAddModal}>
            Th??m bi???n th???
          </div>
          <VariantTable variants={variants} handleEdit={showEditModal} />
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
            loading={loading}
            disabled={loading}
            type="primary"
            htmlType="submit"
            size="large"
            style={{ width: "100%" }}
          >
            Th??m s???n ph???m
          </Button>
        </div>
      </Form>
    </>
  );
};

export default AddProductSection;
