import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";

import { Form, Input } from "antd";
import { useParams } from "react-router-dom";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import VariantTable from "../VariantTable";
import "./style.css";

const EditProductSection = () => {
  const { id } = useParams();
  return (
    <>
      <Form layout="vertical">
        <Form.Item label="ID sản phẩm">
          <Input disabled value={id} />
        </Form.Item>
        <div className="flex-container ">
          <div className="flex-item mr-5">
            <Form.Item label="Danh mục cha">
              <Input disabled />
            </Form.Item>
          </div>
          <div className="flex-item">
            <Form.Item label="Danh mục">
              <Input disabled />
            </Form.Item>
          </div>
        </div>
        <Form.Item label="Tên sản phẩm">
          <Input />
        </Form.Item>
        <Form.Item label="Danh sách biến thể">
          <div className="text-key mb-2 addVar">Thêm biến thể</div>
          <VariantTable />
        </Form.Item>
        <Form.Item label="Mô tả sản phẩm">
          <div>
            <CKEditor editor={ClassicEditor} data="" />
          </div>
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
          <Button type="primary" size="large" style={{ width: "100%" }}>
            Cập nhật
          </Button>
        </div>
      </Form>
    </>
  );
};

export default EditProductSection;
